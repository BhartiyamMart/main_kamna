'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Send, User, ArrowLeft, Loader2 } from 'lucide-react';
import Header from '@/components/home/header';
import Footer from '@/components/home/footer';
import { getBlogById } from '@/lib/actions/blog-actions';
import toast from 'react-hot-toast';

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

// ✅ Correct way to receive params in Next.js 15+
export default function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params); // ✅ Unwrap the Promise
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log('Fetching blog with ID:', resolvedParams.id); // Debug log
        setLoading(true);
        const data = await getBlogById(resolvedParams.id);
        setBlog(data);
      } catch (error) {
        console.error('Failed to fetch blog:', error);
        toast.error('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (resolvedParams.id) {
      fetchBlog();
    }
  }, [resolvedParams.id]);

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-[#d9af00]" />
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Header />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Blog not found</h2>
            <p className="mb-6 text-gray-600">The blog post you're looking for doesn't exist.</p>
            <Link
              href="/blog-kamna"
              className="inline-flex items-center gap-2 rounded-lg bg-[#21502c] px-6 py-3 text-white hover:bg-[#2a6638]"
            >
              <ArrowLeft size={20} />
              Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <section className="container mx-auto mt-18 flex h-[60vh] flex-col items-center justify-center bg-[url('/img/work_img.jpg')] bg-cover bg-center px-4 lg:px-22">
        <img src="/img/career-img.gif" alt="Kamna Cafe Logo" className="mb-6 h-auto w-40 lg:w-44" />
        <p className="text-md mb-2 text-[#d9af00]">HOME / BLOG</p>
        <h1 className="text-xl font-bold text-[#d9af00] lg:text-5xl">{blog.title}</h1>
      </section>

      <section className="bg-white px-4 lg:px-14">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-4 py-14 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <Link
              href="/blog-kamna"
              className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#21502c]"
            >
              <ArrowLeft size={16} />
              Back to all blogs
            </Link>

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar size={16} /> {formatDate(blog.createdAt)}
              </span>
              <span className="flex items-center gap-2">
                <User size={16} /> Written by {blog.author}
              </span>
              <span className="rounded-full bg-[#d9af00]/10 px-3 py-1 text-[#d9af00]">{blog.category}</span>
              <span className="text-gray-400">• {blog.readTime} min read</span>
            </div>

            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">{blog.title}</h2>

            <p className="mb-6 text-lg text-gray-600 italic">{blog.excerpt}</p>

            {blog.image && (
              <div className="relative mb-8 h-96 w-full overflow-hidden rounded-xl">
                <Image src={blog.image} alt={blog.title} fill className="object-cover" priority />
              </div>
            )}

            <div
              className="prose prose-lg max-w-none leading-8 text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                #{blog.category}
              </span>
            </div>
          </article>

          <aside className="space-y-8">
            <div className="rounded-xl bg-gray-50 p-6">
              <h3 className="mb-3 font-semibold">About Author</h3>
              <p className="mb-2 text-lg font-medium text-gray-900">{blog.author}</p>
              <p className="text-sm text-gray-600">
                Content creator specializing in {blog.category.toLowerCase()} and digital transformation.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-6">
              <h3 className="mb-4 font-semibold">Post Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Published:</span>
                  <span className="font-medium">{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{blog.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Read Time:</span>
                  <span className="font-medium">{blog.readTime} minutes</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
}
