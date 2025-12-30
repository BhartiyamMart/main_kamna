import React from 'react';
import Header from './home/header';
import { FounderNote } from './home/FounderNote';
import Footer from './home/footer';

const AboutPage = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto mt-18 flex h-[200px] flex-col items-center justify-center bg-gray-50 px-4 lg:px-22">
        <p className="mb-2 text-sm text-gray-500">HOME / ABOUT US</p>
        <h1 className="text-4xl font-bold text-black">About Kamna Group of Companies</h1>
      </section>

      <section className="container mx-auto flex  items-center justify-center px-4 lg:px-22">
        <FounderNote />
      </section>
      <section className="container mx-auto flex  items-center justify-center px-4 lg:px-22">
        
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;
