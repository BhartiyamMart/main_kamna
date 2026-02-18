'use client';

import React, { useState, useEffect } from 'react';
import { Pencil, Trash, Plus, Upload, X, FileText, Loader2 } from 'lucide-react';
import TextEditor from './text-editor';
import toast from 'react-hot-toast';
import { compressImage } from '@/lib/imageCompression';
import {
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
  deleteBlogImage,
  getBlogs,
} from '@/lib/actions/blog-actions';
import { checkAdminAuth } from '@/lib/actions/cookies';

interface Blog {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
  author: string;
  readTime: number;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  slug: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'form'>('list');
  const [editId, setEditId] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [previousImageUrl, setPreviousImageUrl] = useState<string | null>(null); // ✅ Track old image
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    category: '',
    title: '',
    excerpt: '',
    content: '',
    author: '',
    readTime: '15',
    featured: false,
    published: false,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await checkAdminAuth();

      if (!response.token) {
        toast.error('No authentication token found');
        return;
      }

      const data = await getBlogs();
      console.log('Fetched blogs:', data);
      setBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      toast.error('Failed to load blogs');
    }
  };

  const formatDate = (date: Date): string => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === 'readTime') {
      // Only allow numbers
      const regex = /^[0-9]*$/;
      if (regex.test(value)) {
        // Enforce max 60 min limit
        const numValue = parseInt(value, 10);
        if (!value || (numValue >= 0 && numValue <= 60)) {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // ✅ Handle image upload with proper old image tracking
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');

    if (!isImage) {
      toast.error('Please upload only images (PNG, JPG, JPEG)');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast.error('File size should be less than 100MB');
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading('Compressing image...');

    try {
      const base64Data = await compressImage(file);
      toast.loading('Uploading to S3...', { id: toastId });

      const response = await checkAdminAuth();
      const token = response.token;
      if (!token) {
        toast.error('Please login first', { id: toastId });
        setIsUploading(false);
        return;
      }

      const result = await uploadBlogImage(token, base64Data, file.name);

      if (result.success && result.imageUrl) {
        // ✅ Delete old image only if a new one is uploaded
        if (uploadedImageUrl) {
          console.log('Deleting old image:', uploadedImageUrl);
          await deleteBlogImage(token, uploadedImageUrl);
        }

        setUploadedImageUrl(result.imageUrl);
        toast.success('Image uploaded successfully!', { id: toastId });
      } else {
        toast.error(result.error || 'Upload failed', { id: toastId });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image', { id: toastId });
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // ✅ Remove uploaded image from S3
  const removeUploadedImage = async () => {
    if (!uploadedImageUrl) return;

    const response = await checkAdminAuth();
    if (!response.token) {
      toast.error('Authentication required');
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading('Removing image...');

    try {
      const result = await deleteBlogImage(response.token, uploadedImageUrl);
      if (result.success) {
        setUploadedImageUrl(null);
        toast.success('Image removed successfully!', { id: toastId });
      } else {
        toast.error(result.error || 'Failed to remove image', { id: toastId });
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to remove image', { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await checkAdminAuth();

    if (!response.token) {
      toast.error('Authentication token not found');
      return;
    }

    setLoading(true);
    const toastId = toast.loading(editId ? 'Updating blog...' : 'Creating blog...');

    try {
      const blogData = {
        ...formData,
        readTime: parseInt(formData.readTime.toString(), 10) || 0,
        image: uploadedImageUrl || undefined, // ✅ Use new image
      };

      if (editId) {
        // ✅ Delete previous image if it was replaced
        if (previousImageUrl && uploadedImageUrl && previousImageUrl !== uploadedImageUrl) {
          console.log('Deleting replaced image:', previousImageUrl);
          await deleteBlogImage(response.token, previousImageUrl);
        }

        await updateBlog(response.token, editId, blogData);
        toast.success('Blog updated successfully!', { id: toastId });
      } else {
        await createBlog(response.token, blogData);
        toast.success('Blog created successfully!', { id: toastId });
      }

      await fetchBlogs();
      resetForm();
    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error(error.message || 'Failed to save blog', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      category: '',
      title: '',
      excerpt: '',
      content: '',
      author: '',
      readTime: '15',
      featured: false,
      published: false,
    });
    setEditId(null);
    setCurrentView('list');
    setUploadedImageUrl(null);
    setPreviousImageUrl(null);
  };

  const handleEdit = (blog: Blog) => {
    setFormData({
      category: blog.category,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      readTime: blog.readTime.toString(),
      featured: blog.featured,
      published: blog.published,
    });
    setEditId(blog.id);
    setUploadedImageUrl(blog.image);
    setPreviousImageUrl(blog.image); // ✅ Store original image
    setCurrentView('form');
  };

  const handleDelete = async (id: string) => {
    const response = await checkAdminAuth();
    if (!response.token) {
      toast.error('Authentication required');
      return;
    }

    const confirmed = confirm('Are you sure you want to delete this blog?');
    if (!confirmed) return;

    setLoading(true);
    const toastId = toast.loading('Deleting blog...');

    try {
      await deleteBlog(response.token, id);
      await fetchBlogs();
      toast.success('Blog deleted successfully!', { id: toastId });
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete blog', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    resetForm();
    setCurrentView('form');
  };

  // LIST VIEW
  if (currentView === 'list') {
    return (
      <div className="min-h-screen w-full bg-gray-50 pt-15">
        <div className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50">
          <div className="px-6 py-4 md:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Blog Management</h1>
                <p className="text-gray-600">
                  {blogs.length === 0
                    ? 'Get started by creating your first blog post'
                    : `Managing ${blogs.length} blog ${blogs.length === 1 ? 'post' : 'posts'}`}
                </p>
              </div>
              {blogs.length > 0 && (
                <button
                  onClick={openAddForm}
                  disabled={loading}
                  className="flex cursor-pointer items-center gap-1 rounded-lg bg-[#21502c] hover:bg-[#3b864c] px-4 py-2 font-medium text-white shadow-sm transition-all duration-200  disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus size={20} />
                  Add New Blog
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 md:px-8">
          {blogs.length === 0 ? (
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="max-w-md text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
                  <FileText size={32} className="text-gray-400" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-gray-900">No blogs yet</h3>
                <p className="mb-8 leading-relaxed text-gray-600">
                  Start sharing your thoughts and ideas with the world. Create your first blog post to get started.
                </p>
                <button
                  onClick={openAddForm}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-red-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#d96419]"
                >
                  <Plus size={20} />
                  Create First Blog
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                        Author
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                        Read Time
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {blogs.map((blog, index) => (
                      <tr key={blog.id} className="transition-all duration-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{index + 1}</td>
                        <td className="max-w-md truncate px-6 py-4 text-sm font-medium text-gray-900">{blog.title}</td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">{blog.author}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                            {blog.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{blog.readTime} min</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            {blog.featured && (
                              <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                Featured
                              </span>
                            )}
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${blog.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                }`}
                            >
                              {blog.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                          {formatDate(blog.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(blog)}
                              disabled={loading}
                              className="cursor-pointer rounded-lg p-2 text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-[#F0701E] disabled:cursor-not-allowed disabled:opacity-50"
                              title="Edit"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(blog.id)}
                              disabled={loading}
                              className="cursor-pointer rounded-lg p-2 text-gray-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                              title="Delete"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // FORM VIEW
  return (
    <div className="min-h-screen w-full bg-gray-50 pt-14">
      <div className="border-b border-gray-100 bg-white shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">{editId ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
          <p className="text-gray-600">
            {editId ? 'Update the details of your blog post' : 'Fill in the details to publish a new blog'}
          </p>
        </div>
      </div>

      <div>
        <div className="border border-gray-100 bg-white p-8 shadow-sm md:p-10 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category and Author */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#F0701E] focus:outline-none"
                  placeholder="e.g., Recipes, Wellness"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#F0701E] focus:outline-none"
                  placeholder="Your name"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#F0701E] focus:outline-none"
                placeholder="Enter a compelling title"
                required
                disabled={loading}
              />
            </div>

            {/* Excerpt/Subtitle */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#F0701E] focus:outline-none"
                placeholder="Add a short excerpt or subtitle"
                required
                disabled={loading}
              />
            </div>

            {/* Featured Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Featured Image</label>

              {!uploadedImageUrl ? (
                <div className="rounded-lg border-2 border-dashed border-gray-200 p-8 text-center transition-all duration-200 hover:border-[#3b864c]">
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="mx-auto mb-4 animate-spin text-[#F0701E]" size={48} />
                      <p className="text-sm text-gray-600">Compressing and uploading to S3...</p>
                      <p className="mt-1 text-xs text-gray-500">This may take a moment</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="font-semibold text-gray-900 transition-colors duration-200 hover:text-[#3b864c]">
                          Click to upload
                        </span>
                        <span className="text-gray-600"> or drag and drop</span>
                      </label>
                      <p className="mt-2 text-xs text-gray-500">Images (PNG, JPG, JPEG - max 100MB)</p>
                      <p className="text-xs text-gray-500">Image will be compressed and uploaded to S3 automatically</p>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={isUploading || loading}
                      />
                    </>
                  )}
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-lg border border-gray-200">
                  <img src={uploadedImageUrl} alt="Uploaded" className="h-64 w-full object-cover" />
                  <button
                    type="button"
                    onClick={removeUploadedImage}
                    disabled={isUploading || loading}
                    className="absolute top-2 right-2 cursor-pointer rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isUploading ? <Loader2 className="animate-spin" size={16} /> : <X size={16} />}
                  </button>
                  <div className="absolute right-0 bottom-0 left-0 bg-black/50 px-4 py-2">
                    <p className="text-xs text-white">Uploaded to S3</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description/Content */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Content <span className="text-red-500">*</span>
              </label>
              <TextEditor value={formData.content} onChange={(val) => setFormData({ ...formData, content: val })} />
            </div>

            {/* Read Time, Featured, Published */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Read Time (minutes) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#3b864c] focus:outline-none"
                  placeholder="Enter the estimated read time in minutes "
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Featured Post</label>
                <div className="flex h-12 items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-5 w-5 cursor-pointer rounded border-gray-300 text-[#F0701E]"
                    disabled={loading}
                  />
                  <span className="ml-3 text-sm text-gray-600">Mark as featured</span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Publish Status</label>
                <div className="flex h-12 items-center">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="h-5 w-5 cursor-pointer rounded border-gray-300 text-[#F0701E]"
                    disabled={loading}
                  />
                  <span className="ml-3 text-sm text-gray-600">Publish now</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || isUploading}
                className="flex-1 cursor-pointer rounded-lg bg-[#21502c] hover:bg-[#3b864c] px-6 py-3.5 font-semibold text-white shadow-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    {editId ? 'Updating...' : 'Creating...'}
                  </span>
                ) : (
                  <>{editId ? 'Update Blog Post' : 'Publish Blog Post'}</>
                )}
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('list')}
                disabled={loading || isUploading}
                className="cursor-pointer rounded-lg border-2 border-gray-200 px-8 py-3.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
