'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from './user-actions';
import { uploadImageToS3, deleteImageFromS3 } from '@/lib/s3';

/* ---------------------------
   HELPER: CHECK ADMIN
--------------------------- */
async function requireAdmin(token: string) {
  const user = await getCurrentUser(token);
  if (!user) throw new Error('Unauthorized: Token invalid or expired');
  if (user.role !== 'ADMIN') throw new Error('Forbidden: Admin access required');
  return user;
}

/* ---------------------------
   HELPER: GENERATE SLUG
--------------------------- */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* ---------------------------
   UPLOAD IMAGE IMMEDIATELY
--------------------------- */
export async function uploadBlogImage(
  token: string,
  base64Data: string,
  fileName: string
): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  console.log('🔐 Checking admin auth...');
  
  try {
    await requireAdmin(token);
    console.log('✅ Admin verified');
    
    const imageUrl = await uploadImageToS3(base64Data, fileName);
    console.log('✅ Upload successful:', imageUrl);
    
    return { success: true, imageUrl };
  } catch (error: any) {
    console.error('❌ Upload error:', error);
    return { success: false, error: error.message || 'Failed to upload image' };
  }
}

/* ---------------------------
   DELETE IMAGE IMMEDIATELY
--------------------------- */
export async function deleteBlogImage(
  token: string,
  imageUrl: string
): Promise<{ success: boolean; error?: string }> {
  console.log('🗑️ Deleting image:', imageUrl);
  
  try {
    await requireAdmin(token);
    await deleteImageFromS3(imageUrl);
    console.log('✅ Delete successful');
    return { success: true };
  } catch (error: any) {
    console.error('❌ Delete error:', error);
    return { success: false, error: error.message || 'Failed to delete image' };
  }
}

/* ---------------------------
   CREATE BLOG (ADMIN ONLY)
--------------------------- */
export async function createBlog(
  token: string,
  data: {
    title: string;
    excerpt: string;
    content: string;
    image?: string;
    category: string;
    author: string;
    readTime: number;
    featured?: boolean;
    published?: boolean;
  }
) {
  console.log('📝 Creating blog:', data.title);
  console.log('📊 Data:', {
    ...data,
    content: data.content.substring(0, 50) + '...',
  });
  
  try {
    await requireAdmin(token);
    console.log('✅ Admin verified');

    const slug = generateSlug(data.title);
    const publishedAt = data.published ? new Date() : undefined;

    console.log('💾 Saving to database...');
    
    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image,
        category: data.category,
        author: data.author,
        readTime: data.readTime,
        featured: data.featured ?? false,
        published: data.published ?? false,
        publishedAt,
        slug,
      },
    });

    console.log('✅ Blog created successfully:', blog.id);
    return blog;
  } catch (error: any) {
    console.error('❌ Create blog error:', error);
    throw new Error(error.message || 'Failed to create blog');
  }
}

/* ---------------------------
   GET ALL BLOGS ADMIN
--------------------------- */
export async function getAllBlogsAdmin(token: string) {
  console.log('📚 Fetching all blogs (admin)...');
  
  try {
    await requireAdmin(token);
    
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    console.log('✅ Fetched', blogs.length, 'blogs');
    return blogs;
  } catch (error: any) {
    console.error('❌ Fetch blogs error:', error);
    throw new Error(error.message || 'Failed to fetch blogs');
  }
}

/* ---------------------------
   UPDATE BLOG (ADMIN ONLY)
--------------------------- */
export async function updateBlog(
  token: string,
  id: string,
  data: Partial<{
    title: string;
    excerpt: string;
    content: string;
    image?: string;
    category: string;
    author: string;
    readTime: number;
    featured?: boolean;
    published?: boolean;
  }>
) {
  console.log('📝 Updating blog:', id);
  
  try {
    await requireAdmin(token);

    const existingBlog = await prisma.blog.findUnique({ where: { id } });
    if (!existingBlog) throw new Error('Blog not found');

    const slug = data.title ? generateSlug(data.title) : existingBlog.slug;

    const publishedAt =
      data.published && !existingBlog.published
        ? new Date()
        : existingBlog.publishedAt;

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        ...data,
        slug,
        publishedAt,
      },
    });

    console.log('✅ Blog updated successfully');
    return blog;
  } catch (error: any) {
    console.error('❌ Update blog error:', error);
    throw new Error(error.message || 'Failed to update blog');
  }
}

/* ---------------------------
   DELETE BLOG (ADMIN ONLY)
--------------------------- */
export async function deleteBlog(token: string, id: string) {
  console.log('🗑️ Deleting blog:', id);
  
  try {
    await requireAdmin(token);

    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) throw new Error('Blog not found');

    // Delete image from S3 if exists
    if (blog.image) {
      console.log('🗑️ Deleting associated image from S3...');
      await deleteImageFromS3(blog.image);
    }

    await prisma.blog.delete({ where: { id } });
    console.log('✅ Blog deleted successfully');
    
    return { success: true };
  } catch (error: any) {
    console.error('❌ Delete blog error:', error);
    throw new Error(error.message || 'Failed to delete blog');
  }
}
