import BlogPage from '@/components/BlogPage';
import { BlogSection } from '@/components/home/BlogSection';
import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import HeroSection from '@/components/home/HeroSection';
import React from 'react';

const page = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <BlogSection />
      <Footer />
    </>
  );
};

export default page;
