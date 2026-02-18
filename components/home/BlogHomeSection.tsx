'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getAllPublishedBlog, getBlogs } from '@/lib/actions/blog-actions';

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

export function BlogHomeSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ No authentication needed - public blogs only
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllPublishedBlog(); 
      console.log('Fetched blogs:', data);
      setBlogs(data.slice(0, 3)); // Show only 3 latest blogs
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Format date
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 md:px-20">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#006666] border-t-transparent" />
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 md:px-20">
          <div className="text-center">
            <p className="text-slate-600">No blog posts available yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-20">
        <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900 md:text-4xl">Latest from our blog</h2>
            <p className="text-lg text-slate-600">
              Stay updated with the latest trends, news, and insights from the Kamna Group of Companies.
            </p>
          </div>
          <Link
            href="/blog-kamna"
            className="rounded-md bg-[#006666] px-4 py-2 text-sm font-medium text-white hover:bg-[#004c4c] md:px-6 md:py-3 md:text-base"
          >
            View All Posts
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {blogs.map((post) => (
            <Link
              key={post.id}
              href={`/blog-kamna/blog/${post.id}`} // ✅ Navigate with ID
              className="group cursor-pointer"
            >
              <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-md bg-slate-100">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-200 text-slate-400">No Image</div>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-[#00B4D8]">{post.category}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{formatDate(post.createdAt)}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{post.readTime} min read</span>
                </div>
                <h3 className="text-2xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-[#006666]">
                  {post.title}
                </h3>
                <p className="line-clamp-2 text-slate-600">{post.excerpt}</p>
                <div className="flex items-center gap-2 pt-2 font-medium text-[#006666]">
                  Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
