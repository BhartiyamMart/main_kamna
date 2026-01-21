import React from 'react';
import Footer from './home/footer';
import Image from 'next/image';
import Header from './home/header';
import { ContactSection } from './home/ContactSection';

const ContactUs = () => {
  return (
    <>
      <Header />

      <section className="container mx-auto mt-18 flex h-[60vh] flex-col items-center justify-center bg-[url('/img/contact_img.jpg')] bg-cover bg-top px-4 lg:px-22">
        <img src="/img/career-img.gif" alt="Kamna Cafe Logo" className="mb-6 h-auto w-48 lg:w-52" />
        <p className="text-md mb-2 text-[#d9af00]">HOME / CONTACT US</p>
        <h1 className="text-2xl font-bold text-[#d9af00] lg:text-5xl">Contact Us</h1>
      </section>

      <section className="relative bg-white">
        <div className="container mx-auto px-4">
          <ContactSection />
        </div>
      </section>

      

      

      <Footer />
    </>
  );
};

export default ContactUs;
