'use server';

import {prisma} from '@/lib/prisma';
import { getCurrentUser } from './user-actions'; // Use your token-based auth helper

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
    publishedAt?: Date;
    slug: string;
  }
) {
  await requireAdmin(token); // Only admins can create

  return await prisma.blog.create({ data });
}

/* ---------------------------
   GET ALL BLOGS (PUBLIC)
--------------------------- */
export async function getBlogs() {
  return await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
}

/* ---------------------------
   GET BLOG BY ID (PUBLIC)
--------------------------- */
export async function getBlogById(id: string) {
  return await prisma.blog.findUnique({ where: { id } });
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
    publishedAt?: Date;
    slug: string;
  }>
) {
  await requireAdmin(token);

  return await prisma.blog.update({ where: { id }, data });
}

/* ---------------------------
   DELETE BLOG (ADMIN ONLY)
--------------------------- */
export async function deleteBlog(token: string, id: string) {
  await requireAdmin(token);

  return await prisma.blog.delete({ where: { id } });
}
