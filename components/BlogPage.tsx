import Image from 'next/image';
import React from 'react';
import Footer from './home/footer';
import Header from './home/header';
import { BlogSection } from './home/BlogSection';

const BlogPage = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto mt-18 flex h-[70vh] flex-col items-center justify-center bg-[url('/img/work_img.jpg')] bg-cover bg-center px-4 lg:px-22">
        <img src="/img/career-img.gif" alt="Kamna Cafe Logo" className="mb-6 h-auto w-40 lg:w-44" />
        <p className="text-md mb-2 text-teal-600">HOME / BLOG</p>
        <h1 className="text-xl font-bold text-teal-600 lg:text-5xl">Blog</h1>
      </section>

      <BlogSection />

      <Footer />
    </>
  );
};

export default BlogPage;
