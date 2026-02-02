import React from 'react';
import Footer from './home/footer';
import Header from './home/header';
import { CareerSection } from './CareerSection';

export default function CareersPage() {
  return (
    <>
      <Header />

      {/* Hero Banner */}
      <section className="container mx-auto mt-18 flex h-[60vh] flex-col items-center justify-center bg-[url('/img/career-img.jpg')] bg-cover bg-top px-4 lg:px-22">
        <img src="/img/career-img.gif" alt="Kamna Group Careers" className="mb-6 h-auto w-40 lg:w-44" />
        <p className="text-md mb-2 text-[#d9af00]">HOME / Careers</p>
        <h1 className="text-2xl font-bold text-[#d9af00] lg:text-6xl">Careers</h1>
      </section>

      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-[#009689] py-10 text-white lg:py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-2xl font-bold md:text-5xl">Build Your Career With Us</h1>
            <p className="mt-0 text-lg text-green-100 lg:mt-4">
              Join our team and grow with innovation, purpose, and impact.
            </p>
          </div>
        </section>

        {/* About Working with Kamna Group */}
        <section className="relative bg-white py-16 sm:py-20">
          <div className="container mx-auto px-4 lg:px-20">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
              {/* Left Content */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Careers with Kamna Group</h2>

                <div className="mt-4 h-1 w-16 rounded bg-[#3ea8b6]" />

                <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  Working with Kamna Group offers an opportunity to be part of a forward-thinking, purpose-driven
                  organisation that values innovation, integrity, and people. As a diversified group operating across
                  technology, retail, food and beverage, wellness, and digital transformation, it provides a dynamic
                  work environment where ideas are encouraged and talent is nurtured across multiple domains.
                </p>

                <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                  The work culture is transparent and supports long-term career growth, enabling individuals to
                  contribute to a shared vision of creating value, driving progress, and shaping a modern,
                  interconnected future. Team members are empowered to grow their skills, explore opportunities, and
                  build meaningful careers with purpose.
                </p>
              </div>

              {/* Right Image */}
              <div className="relative h-64 overflow-hidden rounded-md shadow-lg sm:h-80 lg:h-[480px]">
                <div className="absolute inset-0 bg-[url('/img/part_img.jpg')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
          </div>
        </section>

        <div className="bg-white">
          <CareerSection />
        </div>

        <Footer />
      </div>
    </>
  );
}
