import Header from './home/header';
import Footer from './home/footer';
import { Award, ChefHat, Coffee } from 'lucide-react';
import Image from 'next/image';
import { ContactSection } from './home/ContactSection';

const KamnaTechno = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto mt-18 flex h-[70vh] flex-col items-center justify-center bg-[url('/img/kamna-digital.jpg')] bg-cover bg-center px-4 lg:px-22">
        <img src="/img/digital-im.gif" alt="Kamna Cafe Logo" className="mb-6 h-auto w-40 lg:w-44" />
        <p className="text-md mb-2 text-emerald-700">HOME / OUR BUSINESS</p>
        <h1 className="text-2xl font-bold text-emerald-700 lg:text-5xl">Kamna Techno</h1>
      </section>

      <div className="px-4 py-8 sm:py-16 md:py-20 lg:px-20">
        <div className="container mx-auto">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Content */}
            <div className="col-span-12 lg:col-span-7">
              <h2 className="mb-4 text-xl font-bold text-black sm:mb-6 sm:text-4xl md:text-3xl">
                Kamna Techno embarks on a tech savvy futuristic Journey:
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 sm:text-base">
                <p>
                  Kamna Techno (P) Ltd. envisions becoming a leading multi-vertical digital powerhouse, empowering
                  businesses through next-generation innovation. The brand focuses on shaping intelligent, creative, and
                  sustainable digital futures as technology, media, and marketing ecosystems evolve. It delivers
                  high-performance digital ecosystems combining creativity, functionality, and advanced engineering for
                  seamless user experiences.
                </p>
                <p>
                  Services include software development, web and app solutions, enterprise automation, cyber security,
                  cloud integration, social media management, performance marketing, SEO, targeted advertising, brand
                  activation, marketing automation, and AI-driven data insights.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    target="-blank"
                    href="https://www.kamnatechno.com/"
                    className="rounded-xl bg-[#3ea8b6] px-6 py-3 font-medium text-white transition hover:bg-[#3194a1]"
                  >
                    Explore Kamna Techno
                  </a>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative col-span-12 lg:col-span-5">
              <div className="aspect-square">
                <Image
                  src="/img/digi_img.jpg"
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

      <div className="bg-gray-50">
        <ContactSection />
      </div>

      <Footer />
    </>
  );
};

export default KamnaTechno;
