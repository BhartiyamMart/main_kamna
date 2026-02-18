'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from './user-actions';
import { uploadImageToS3, deleteImageFromS3 } from '@/lib/s3';

/* ---------------------------
   HELPER: CHECK ADMIN
--------------------------- */
export async function requireAdmin(token: string) {
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
  try {
    await requireAdmin(token);

    const imageUrl = await uploadImageToS3(base64Data, fileName);

    return { success: true, imageUrl };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to upload image' };
  }
}

/* ---------------------------
   DELETE IMAGE IMMEDIATELY
--------------------------- */
export async function deleteBlogImage(token: string, imageUrl: string): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin(token);
    await deleteImageFromS3(imageUrl);

    return { success: true };
  } catch (error: any) {
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
  try {
    await requireAdmin(token);

    const slug = generateSlug(data.title);
    const publishedAt = data.published ? new Date() : undefined;

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

    return blog;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create blog');
  }
}


export async function getAllPublishedBlog(){
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });

    return blogs;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch blogs');
  }


}




/* ---------------------------
   GET ALL BLOGS ADMIN
--------------------------- */
export async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return blogs;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch blogs');
  }
}

export async function getBlogById(id: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      throw new Error('Blog not found');
    }

    return blog;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch blog');
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
  try {
    await requireAdmin(token);

    const existingBlog = await prisma.blog.findUnique({ where: { id } });
    if (!existingBlog) throw new Error('Blog not found');

    const slug = data.title ? generateSlug(data.title) : existingBlog.slug;

    const publishedAt = data.published && !existingBlog.published ? new Date() : existingBlog.publishedAt;

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        ...data,
        slug,
        publishedAt,
      },
    });

    return blog;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update blog');
  }
}

/* ---------------------------
   DELETE BLOG (ADMIN ONLY)
--------------------------- */
export async function deleteBlog(token: string, id: string) {
  try {
    await requireAdmin(token);

    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) throw new Error('Blog not found');

    // Delete image from S3 if exists
    if (blog.image) {
      await deleteImageFromS3(blog.image);
    }

    await prisma.blog.delete({ where: { id } });

    return { success: true };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to delete blog');
  }
}
