import React from 'react';
import Header from './home/header';
import { FounderNote } from './home/FounderNote';
import Footer from './home/footer';
import Image from 'next/image';
import { ContactSection } from './home/ContactSection';



const AboutPage = () => {
  return (
    <>
      <Header />

      <section className="container mx-auto mt-18 flex h-[60vh] flex-col items-center justify-center bg-[url('/img/work_img.jpg')] bg-cover bg-top px-4 lg:px-22">
        <img src="/img/career-img.gif" alt="Kamna Cafe Logo" className="mb-6 h-auto w-48 lg:w-52" />
        <p className="text-md mb-2 text-[#d9af00]">HOME / ABOUT US</p>
        <h1 className="text-2xl font-bold text-[#d9af00] lg:text-5xl">About Us</h1>
      </section>


       <section className="relative bg-gray-50 py-16 sm:py-20">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">

          {/* Left Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              About Us
            </h2>

            <div className="mt-4 h-1 w-16 rounded bg-[#3ea8b6]" />

            <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-base">
              Kamna Group is a diversified business group built to serve everyday needs while enabling future growth.
               The Group blends innovation, ethics, and execution to build reliable businesses. Kamna Mart 
               serves communities with convenient, hyper-local retail solutions and daily essentials, 
               while Kamna Café offers welcoming spaces for premium food and beverages. Kamna Techno and Kamna Digital deliver 
               advanced IT solutions, digital transformation, branding, and growth-focused strategies for businesses of all sizes. 
               Complementing this ecosystem, Kamna Herbs 
              focuses on nature-powered herbal cosmetics and wellness products designed for modern lifestyles
            </p>

            <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-base">
              Together, these verticals reflect the Group’s commitment to customer-centricity, ethical practices, 
              and sustainable growth. By blending tradition with technology and creativity with commerce, 
              it continues to build a future-ready ecosystem that empowers communities, supports businesses, 
              and creates meaningful value across every touchpoint.
            </p>

            
          </div>

          {/* Right Image */}
          <div className="relative h-64 sm:h-80 lg:h-[420px] overflow-hidden rounded-md shadow-lg">
            <div className="absolute inset-0 bg-[url('/img/part_img.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/10" />
          </div>

        </div>
      </div>
    </section>

      <section className="container mx-auto flex  items-center justify-center px-4 lg:px-22">
        <FounderNote />
      </section>

      <section className="py-16 px-6 md:py-24 md:px-12 lg:px-20">
      <div className="container mx-auto">
        {/* Grid Layout: Image left, Content right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-top">
          {/* Left: Team Image */}
          <div className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/img/team_img.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right: Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Heading */}
            <div>
              <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Leadership & Team
              </h2>

              {/* Description Text */}
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Kamna Group is led by experienced professionals with a strong focus on ethics, innovation, and long-term growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="bg-gray-50">
        <ContactSection/>
        </div>

      <Footer />
    </>
  );
};

export default AboutPage;
