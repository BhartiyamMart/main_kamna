import Footer from './home/footer';
import Image from 'next/image';
import Header from './home/header';
import { ContactSection } from './home/ContactSection';

const WorkWith = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto mt-18 flex h-[60vh] flex-col items-center justify-center bg-[url('/img/work_img.jpg')] bg-cover bg-center px-4 lg:px-22">
        <img src="/img/coffe_img.gif" alt="Kamna Cafe Logo" className="mb-6 h-auto w-40 lg:w-44" />
        <p className="text-md mb-2 text-[#d9af00]">HOME / Work With Us</p>
        <h1 className="text-xl font-bold text-[#d9af00] lg:text-5xl">Work With Us</h1>
      </section>

      <div className="px-4 py-8 sm:py-16 md:py-20 lg:px-20">
        <div className="container mx-auto">
          <div className="items-top grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Content */}
            <div className="col-span-12 lg:col-span-7">
              <h1 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-4xl md:text-4xl">
                Partners / Work with us
              </h1>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 sm:text-base">
                <p>
                  Partner with Kamna Group of Companies and become part of a fast-growing, future-ready business
                  ecosystem. With a strong presence across retail marts, cafés, digital services, IT solutions, and
                  herbal cosmetics, the Group offers diversified opportunities backed by innovation, quality, and trust.
                  It welcomes passionate franchisers and business partners who aspire to grow with a brand focused on
                  customer satisfaction, ethical practices, and sustainable success. Proven business models, end-to-end
                  operational support, technology-driven systems, and strategic marketing assistance enable partners to
                  scale confidently and profitably.
                </p>
                <p>
                  Whether the goal is to operate a hyper-local retail mart, a vibrant café, or expand into digital and
                  wellness segments, the Group provides a reliable platform supported by industry expertise, continuous
                  guidance, and a collaborative growth environment.
                </p>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative col-span-12 lg:col-span-5">
              <div>
                <Image
                  src="/img/work_img02.jpg"
                  alt="Food"
                  width={600}
                  height={500}
                  className="h-96 w-full rounded-md object-cover"
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

export default WorkWith;
