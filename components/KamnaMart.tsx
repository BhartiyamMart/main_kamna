
import Header from './home/header';
import Footer from './home/footer';
import { Award, ChefHat, Coffee } from 'lucide-react';
import Image from 'next/image';
import { ContactSection } from './home/ContactSection';

const KamnaMart = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto mt-18 flex h-[60vh] flex-col items-center justify-center bg-[url('/img/kamna-mart.jpg')] bg-cover bg-center px-4 lg:px-22">
        <img src="/img/store-mart.gif" alt="Kamna Cafe Logo" className="mb-6 h-auto w-40 lg:w-44" />
        <p className="mb-2 text-md text-[#d9af00]">HOME / OUR BUSINESS</p>
        <h1 className="text-2xl lg:text-5xl font-bold text-[#d9af00]">Kamna Mart </h1>
      </section>

       <div className="py-8 px-4 sm:py-14 md:py-20 lg:px-20">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-top">
              {/* Left Content */}
              <div className='col-span-12 lg:col-span-7'>
                <h2 className="text-xl sm:text-4xl md:text-3xl font-bold text-black mb-4 sm:mb-6">   
                 About kamna Mart
                </h2>
                <div className="space-y-4 text-base sm:text-base text-gray-700 leading-relaxed">
                  <p>
                    Kamna Mart, part of the Kamna Group of Companies, is a fast-growing FMCG retail and B2B supply enterprise built on convenience, 
                    trust, accessibility, and value. It blends hyper-local delivery, a full-scale marketplace, and a professional distribution 
                    network to serve multiple business segments
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                  <a target='-blank'
                    href="https://www.kamnatechno.com/"
                    className="rounded-xl bg-[#3ea8b6] px-6 py-3 font-medium text-white transition hover:bg-[#3194a1]"
                  >
                    Shop Online
                  </a>
                </div>
                  
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative col-span-12 lg:col-span-5">  
                <div>
                  <Image
                    src="/img/mart_04.jpg"
                    alt="Food"
                    width={1000}
                    height={1000}
                    className="object-cover w-full rounded-md h-96"
                  />
                </div>


                {/* Floating badge */}

              </div>
            </div>
          </div>
        </div>

       

      <div className="bg-gray-50">
        <ContactSection />
      </div>

      <Footer />
    </>
  );
};

export default KamnaMart;
