import Header from './home/header';
import Footer from './home/footer';
import { Award, ChefHat, Coffee } from 'lucide-react';
import Image from 'next/image';
import { ContactSection } from './home/ContactSection';

const KamnaDigital = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto mt-18 flex h-[60vh] flex-col items-center justify-center bg-[url('/img/work_img.jpg')] bg-cover bg-center px-4 lg:px-22">
        <img src="/img/digital-im.gif" alt="Kamna Cafe Logo" className="mb-6 h-auto w-40 lg:w-44" />
        <p className="text-md mb-2 text-[#d9af00]">HOME / OUR BUSINESS</p>
        <h1 className="text-2xl font-bold text-[#d9af00] lg:text-6xl">Kamna Digital</h1>
      </section>

      <div className="px-4 py-8 sm:py-16 md:py-20 lg:px-20">
        <div className="container mx-auto">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Content */}
            <div className="col-span-12 lg:col-span-7">
              <h2 className="mb-4 text-xl font-bold text-black sm:mb-6 sm:text-4xl md:text-3xl">
                Kamna Digital – The One-Stop Shop for Electronics
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 sm:text-base">
                <p>
                  Kamna Digital is a one-stop destination for state-of-the-art gadgets and digital solutions, offering
                  mobile phones, laptops, home appliances, accessories, and smart devices under one trusted roof.
                </p>

                <h2 className="mb-4 text-xl font-bold text-black sm:mb-6 sm:text-4xl md:text-3xl">
                  Latest Mobile Phones:
                </h2>
                <p>
                  The range includes flagship smartphones, value-driven mid-range devices, and entry-level models with
                  updated specifications.
                </p>
                <h2 className="mb-4 text-xl font-bold text-black sm:mb-6 sm:text-4xl md:text-3xl">Home Appliances</h2>
                <p>
                  Energy-efficient refrigerators, washing machines, air conditioners, smart TVs, kitchen appliances, and
                  lifestyle gadgets are available, with competitive pricing and flexible EMI options.
                </p>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative col-span-12 lg:col-span-5">
              <div className="aspect-square">
                <Image
                  src="/img/digi-mart.jpg"
                  alt="Food"
                  width={600}
                  height={500}
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>

              {/* Floating badge */}
            </div>
          </div>
        </div>
      </div>

      <section className="relative bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Upgraded laptops at the best price</h2>

              <div className="mt-4 h-1 w-16 rounded bg-[#3ea8b6]" />

              <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                The laptop and computing segment caters to students, professionals, entrepreneurs, gamers, and creators
                with diverse performance requirements.Kamna Mart maintains balance between retail and B2B goods supply
              </p>

              <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                Kamna Mart, part of the Kamna Group of Companies, is a fast-growing FMCG retail and B2B supply
                enterprise built on convenience, trust, accessibility, and value. It blends hyper-local delivery, a
                full-scale marketplace, and a professional distribution network to serve multiple business segments
              </p>
            </div>

            {/* Right Image */}
            <div className="relative h-64 overflow-hidden rounded-md shadow-lg sm:h-80 lg:h-[420px]">
              <div className="absolute inset-0 bg-[url('/img/part_img.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <ContactSection />
      </div>

      <Footer />
    </>
  );
};

export default KamnaDigital;
