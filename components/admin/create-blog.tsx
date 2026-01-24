"use client";
 
import React, { useState, useEffect } from "react";
import { Pencil, Trash, Plus, Upload, X, FileText, Image as ImageIcon, Video } from "lucide-react";
import TextEditor from "./text-editor";

 
interface MediaFile {
  id: string;
  file: string; // base64 or URL
  type: 'image' | 'video';
  name: string;
}
 
interface Blog {
  id: number;
  category: string;
  title: string;
  media: MediaFile[];
  subtitle: string;
  description: string;
  createdAt: string;
  author: string;
}
 
export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>(() => {
    if (typeof window !== "undefined") {
      const savedBlogs = localStorage.getItem("blogs");
      return savedBlogs ? JSON.parse(savedBlogs) : [];
    }
    return [];
  });
 
  const [currentView, setCurrentView] = useState<"list" | "form">("list");
  const [editId, setEditId] = useState<number | null>(null);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
 
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    subtitle: "",
    description: "",
    author: "",
  });
 
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("blogs", JSON.stringify(blogs));
    }
  }, [blogs]);
 
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
 
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  // Handle multiple file upload (images and videos)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
 
    Array.from(files).forEach((file) => {
      // Check file type
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
 
      if (!isImage && !isVideo) {
        alert(`${file.name}: Please upload only images or videos`);
        return;
      }
 
      // Check file size (20MB limit for videos, 5MB for images)
      const maxSize = isVideo ? 20 * 1024 * 1024 : 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(`${file.name}: File size should be less than ${isVideo ? '20MB' : '5MB'}`);
        return;
      }
 
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMedia: MediaFile = {
          id: Date.now().toString() + Math.random(),
          file: reader.result as string,
          type: isImage ? 'image' : 'video',
          name: file.name,
        };
        setMediaFiles((prev) => [...prev, newMedia]);
      };
      reader.readAsDataURL(file);
    });
 
    // Reset input
    e.target.value = '';
  };
 
  // Remove specific media file
  const removeMedia = (id: string) => {
    setMediaFiles((prev) => prev.filter((media) => media.id !== id));
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
    if (editId !== null) {
      setBlogs((prev) =>
        prev.map((blog) =>
          blog.id === editId ? { ...blog, ...formData, media: mediaFiles } : blog
        )
      );
    } else {
      const newBlog: Blog = {
        id: Date.now(),
        ...formData,
        media: mediaFiles,
        createdAt: formatDate(new Date()),
      };
      setBlogs([newBlog, ...blogs]);
    }
 
    resetForm();
  };
 
  const resetForm = () => {
    setFormData({
      category: "",
      title: "",
      subtitle: "",
      description: "",
      author: "",
    });
    setEditId(null);
    setCurrentView("list");
    setMediaFiles([]);
  };
 
  const handleEdit = (blog: Blog) => {
    setFormData({
      category: blog.category,
      title: blog.title,
      subtitle: blog.subtitle,
      description: blog.description,
      author: blog.author,
    });
    setEditId(blog.id);
    setCurrentView("form");
    setMediaFiles(blog.media || []);
  };
 
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    }
  };
 
  const openAddForm = () => {
    resetForm();
    setCurrentView("form");
  };
 
  // LIST VIEW
  if (currentView === "list") {
    return (
      <div className="min-h-screen w-full bg-gray-50 pt-50">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
          <div className="px-6 md:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Blog Management</h1>
                <p className="text-gray-600">
                  {blogs.length === 0
                    ? "Get started by creating your first blog post"
                    : `Managing ${blogs.length} blog ${blogs.length === 1 ? "post" : "posts"}`}
                </p>
              </div>
              {blogs.length > 0 && (
                <button
                  onClick={openAddForm}
                  className="flex items-center gap-1 bg-[#F0701E] text-white px-2 py-2 rounded-lg hover:bg-[#d96419] transition-all duration-200 font-medium shadow-sm"
                >
                  <Plus size={20} />
                  Add New Blog
                </button>
              )}
            </div>
          </div>
        </div>
 
        <div className="px-6 md:px-8 py-4">
          {blogs.length === 0 ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText size={32} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">No blogs yet</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Start sharing your thoughts and ideas with the world. Create your first blog post to get started.
                </p>
                <button
                  onClick={openAddForm}
                  className="inline-flex items-center gap-1 bg-[#F0701E] text-white px-2 py-2 rounded-lg hover:bg-[#d96419] transition-all duration-200 font-medium shadow-sm"
                >
                  <Plus size={20} />
                  Create First Blog
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Media</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {blogs.map((blog, index) => (
                      <tr key={blog.id} className="hover:bg-gray-50 transition-all duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium max-w-md truncate">{blog.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{blog.author}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-xs font-medium bg-gray-50 text-gray-700 rounded-full">
                            {blog.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {blog.media?.length || 0} file(s)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog.createdAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(blog)}
                              className="p-2 text-gray-600 hover:text-[#F0701E] hover:bg-gray-50 rounded-lg transition-all duration-200"
                              title="Edit"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(blog.id)}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
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
      <div className="   bg-white border-b border-gray-100 shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">
            {editId ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          <p className="text-gray-600">
            {editId
              ? "Update the details of your blog post"
              : "Fill in the details to publish a new blog"}
          </p>
        </div>
      </div>
 
      <div>
        <div className="bg-white border border-gray-100 p-8 md:p-10 lg:p-12 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category and Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-[#F0701E]">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0701E] focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Recipes, Wellness"
                  required
                />
              </div>
 
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author <span className="text-[#F0701E]">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0701E] focus:border-transparent transition-all duration-200"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>
 
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-[#F0701E]">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0701E] focus:border-transparent transition-all duration-200"
                placeholder="Enter a compelling title"
                required
              />
            </div>
 
            {/* Subtitle */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0701E] focus:border-transparent transition-all duration-200"
                placeholder="Add a subtitle (optional)"
              />
            </div>
 
            {/* Media Upload Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Media (Images & Videos)
              </label>
 
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-[#F0701E] transition-all duration-200">
                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-gray-900 font-semibold hover:text-[#F0701E] transition-colors duration-200">
                    Click to upload
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Images (PNG, JPG, JPEG - max 5MB) or Videos (MP4, WebM - max 20MB)
                </p>
                <p className="text-xs text-gray-500">
                  You can select multiple files at once
                </p>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
 
              {/* Media Preview Grid */}
              {mediaFiles.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Uploaded Media ({mediaFiles.length})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {mediaFiles.map((media) => (
                      <div
                        key={media.id}
                        className="relative group border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => removeMedia(media.id)}
                          className="absolute top-2 right-2 z-10 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X size={14} />
                        </button>
 
                        {media.type === 'image' ? (
                          <div className="relative w-full h-32">
                            <img
                              src={media.file}
                              alt={media.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                              <div className="flex items-center gap-1">
                                <ImageIcon size={12} className="text-white" />
                                <p className="text-[10px] text-white truncate">
                                  {media.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="relative w-full h-32">
                            <video
                              src={media.file}
                              className="w-full h-full object-cover"
                              controls={false}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Video size={32} className="text-white" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                              <div className="flex items-center gap-1">
                                <Video size={12} className="text-white" />
                                <p className="text-[10px] text-white truncate">
                                  {media.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
 
            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <TextEditor
                value={formData.description}
                onChange={(val) =>
                  setFormData({ ...formData, description: val })
                }
              />
 
            </div>
 
            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#F0701E] text-white px-6 py-3.5 rounded-lg hover:bg-[#d96419] transition-all duration-200 font-semibold shadow-sm"
              >
                {editId ? "Update Blog Post" : "Publish Blog Post"}
              </button>
              <button
                type="button"
                onClick={() => setCurrentView("list")}
                className="px-8 py-3.5 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold"
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