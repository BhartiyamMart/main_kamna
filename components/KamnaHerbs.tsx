import Header from './home/header';
import Footer from './home/footer';
import { Award, ChefHat, Coffee } from 'lucide-react';
import Image from 'next/image';
import { ContactSection } from './home/ContactSection';

const KamnaHerbs = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto mt-18 flex h-[60vh] flex-col items-center justify-center bg-[url('/img/kamna-herbs.jpg')] bg-cover bg-center px-4 lg:px-22">
        <img src="/img/herbs-img.gif" alt="Kamna Cafe Logo" className="mb-6 h-auto w-40 lg:w-44" />
        <p className="text-md mb-2 text-[#d9af00]">HOME / OUR BUSINESS</p>
        <h1 className="text-2xl font-bold text-[#d9af00] lg:text-6xl">Kamna Herbs</h1>
      </section>

      <div className="px-4 py-8 sm:py-16 md:py-20 lg:px-20">
        <div className="container mx-auto">
          <div className="items-top grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Content */}
            <div className="col-span-12 lg:col-span-7">
              <h2 className="mb-2 text-xl font-bold text-black sm:mb-2 sm:text-4xl md:text-3xl">Kamna Herbs</h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 sm:text-base">
                <p>
                  Kamna Herbs blends ancient herbal wisdom with modern wellness science to deliver safe, authentic, and
                  nature-powered health and beauty solutions. The brand focuses on herbal, organic, and sustainable
                  products that support holistic well-being.
                </p>
                <h2 className="mt-4 text-xl font-bold text-black sm:mt-20 sm:text-4xl md:text-3xl">
                  Herbal Way to Personal Care
                </h2>
                <p>
                  The personal-care range includes soaps, shampoos, hair oils, body lotions, herbal bath powders,
                  wellness blends, oral-care solutions, and more, crafted using traditional herbs and natural
                  ingredients.
                </p>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative col-span-12 lg:col-span-5">
              <div>
                <Image
                  src="/img/herbs_03.jpg"
                  alt="Food"
                  width={600}
                  height={500}
                  className="h-96 w-full rounded-3xl object-cover"
                />
              </div>
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

export default KamnaHerbs;
