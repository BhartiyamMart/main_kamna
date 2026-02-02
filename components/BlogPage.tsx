import Image from 'next/image';
import Footer from './home/footer';
import Header from './home/header';
import Link from 'next/link';
import { Calendar, Send, User } from 'lucide-react';

const BlogPage = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto mt-18 flex h-[60vh] flex-col items-center justify-center bg-[url('/img/work_img.jpg')] bg-cover bg-center px-4 lg:px-22">
        <img src="/img/career-img.gif" alt="Kamna Cafe Logo" className="mb-6 h-auto w-40 lg:w-44" />
        <p className="text-md mb-2 text-[#d9af00]">HOME / BLOG</p>
        <h1 className="text-xl font-bold text-[#d9af00] lg:text-5xl">Blog</h1>
      </section>

      <section className="bg-white px-4 lg:px-14">
        {/* Content */}
        <div className="container mx-auto grid grid-cols-1 gap-10 px-4 py-14 lg:grid-cols-3">
          {/* Blog Content */}
          <article className="lg:col-span-2">
            {/* Inline Meta (Optional) */}
            <div className="mb-6 flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar size={16} /> Jan 20, 2026
              </span>
              <span className="flex items-center gap-2">
                <User size={16} /> Written by Admin
              </span>
            </div>

            <h2 className="mb-4 text-2xl font-semibold">Innovation in the FMCG Sector</h2>

            <Image
              src="/img/modern-office-innovation.jpg"
              alt="Blog Inner"
              width={800}
              height={400}
              className="mb-6 h-96 rounded-xl"
            />

            <p className="leading-7 text-gray-700">
              At Kamna Group, we believe in building meaningful partnerships and careers that drive innovation and
              long-term growth. Whether you are a professional looking to grow your career, a business seeking
              collaboration, or a brand aiming to scale, we welcome you to work with us. Join us in creating impactful
              solutions, delivering value, and shaping the future across technology, retail, digital services,
              hospitality, and wellness.
            </p>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-3">
              {['E-Commerce', 'Technology', 'Digital India'].map((tag) => (
                <span key={tag} className="rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700">
                  #{tag}
                </span>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="rounded-xl bg-gray-50 p-6">
              <h3 className="mb-3 font-semibold">About Author</h3>
              <p className="text-sm text-gray-600">
                Admin is a digital strategist specializing in e-commerce, branding, and technology growth.
              </p>
            </div>
            <div
              className="relative overflow-hidden rounded-2xl text-white"
              style={{
                backgroundImage: "url('/img/about-img20.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="relative p-6">
                <h4 className="mb-2 text-sm tracking-wide uppercase">Join Us & Let’s</h4>

                <h3 className="mb-3 text-2xl font-bold">Explore Together</h3>

                <p className="mb-6 text-sm text-white/90">
                  At Kamna Group, we believe in building meaningful partnerships and careers that drive innovation and
                  long-term growth.
                </p>

                {/* Input */}
                <div className="flex items-center overflow-hidden rounded-lg bg-white/20 backdrop-blur">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-transparent px-4 py-3 text-sm placeholder-white/80 focus:outline-none"
                  />
                  <button className="flex cursor-pointer items-center justify-center bg-[#21502c] p-3 hover:bg-[#2a6638]">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogPage;
