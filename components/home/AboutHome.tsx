import Image from 'next/image';
import React from 'react';

const AboutHome = () => {
  return (
    <>
    <section>
      <div className="bg-gray-50">
        <div className="relative container mx-auto bg-gray-50 px-4 py-10 lg:px-20">
          <div className="mx-auto w-full container p-0">
            <div className="grid grid-cols-12 gap-0 lg:gap-10">
              <div className="col-span-12 lg:col-span-5">
                <Image className="rounded-md" src="/img/ab_home4.jpg" alt="About Kamna Group" width={1000} height={1000} />
              </div>
              <div className="col-span-12 mt-6 lg:col-span-7 lg:mt-0">
                <h1 className="mb-3 text-lg lg:text-3xl">Kamna Group – Building Businesses That Serve Everyday India</h1>
                <p className="leading-7">
                  Kamna Group of Companies is a forward-thinking, multi-diversified enterprise committed to enhancing everyday life through 
                  innovation, convenience, and quality. With a strong presence across technology, retail, food & beverage, wellness, 
                  and digital services, the Group builds businesses 
                  that are practical, scalable, and people-focused.
                </p>
                

                <div className="mt-10 lg:mt-16">
                  <div className="mx-auto max-w-6xl px-4 lg:px-0">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      {/* Card 1 */}
                      <div className="rounded-md border border-white/10 bg-gradient-to-br from-[#00737a] to-[#00737a] p-8 shadow-lg">
                        <h3 className="mb-3 text-xl leading-tight font-semibold text-white">Our vision</h3>
                        <p className="mb-6 leading-relaxed text-gray-50">
                          To build a trusted, future-ready business group that enhances everyday life.
                        </p>
                        <a
                          href="/about"
                          className="inline-flex items-center gap-2 font-medium text-cyan-300 transition-all hover:gap-3"
                        >
                          Learn More <span>→</span>
                        </a>
                      </div>

                      {/* Card 2 */}
                      <div className="rounded-md border border-white/10 bg-gradient-to-br from-[#00737a] to-[#00737a] p-8 shadow-lg">
                        <h3 className="mb-3 text-xl leading-tight font-semibold text-white">Our mission</h3>
                        <p className="mb-6 leading-relaxed text-gray-50">
                          To deliver quality products and services through technology, creativity, and ethical practices.
                        </p>
                        <a
                          href="/about"
                          className="inline-flex items-center gap-2 font-medium text-cyan-300 transition-all hover:gap-3"
                        >
                          Learn More <span>→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section className="relative py-16 sm:py-20">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">

          {/* Left Image */}
          <div className="relative h-64 sm:h-80 lg:h-[470px] overflow-hidden rounded-md shadow-lg">
            <div
              className="absolute inset-0 bg-[url('/img/why_img.jpg')] bg-cover bg-center"
            />
            {/* Optional overlay */}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Why Kamna Group
            </h2>

            <div className="mt-4 h-1 w-16 rounded bg-[#3ea8b6]" />

            <p className="mt-6 text-base  leading-7 text-gray-700">
              Kamna Group of Companies brings together innovation, trust, and everyday value through well-integrated verticals. 
              Kamna Techno delivers advanced IT and digital solutions, Kamna Mart simplifies daily living with hyper-local retail 
              and essential products, while Kamna Digital empowers brands through strategic branding and digital transformation. 
              Kamna Café offers a premium space for quality food and beverages, and Kamna Herbs provides 
              nature-powered health and skincare solutions focused on holistic well-being.
            </p>

            <p className="mt-4 text-base  leading-7 text-gray-700">
              Together, these ventures reflect the Group’s commitment to quality, innovation, and customer-centric growth, 
              making it a trusted choice for businesses and 
              individuals alike while catering to modern lifestyles.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/about"
                className="rounded-xl bg-[#3ea8b6] px-6 py-3 text-white font-medium transition hover:bg-[#3194a1]"
              >
                Explore About Us
              </a>
              
            </div>
          </div>

        </div>
      </div>
    </section>

    <section className="relative bg-gray-50 py-16 sm:py-20">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">

          {/* Left Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Work With Us
            </h2>

            <div className="mt-4 h-1 w-16 rounded bg-[#3ea8b6]" />

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-700">
              At Kamna Group, we believe in building meaningful partnerships and
              careers that drive innovation and long-term growth. Whether you
              are a professional looking to grow your career, a business seeking
              collaboration, or a brand aiming to scale, we welcome you to work
              with us.
            </p>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
              Join us in creating impactful solutions, delivering value, and
              shaping the future across technology, retail, digital services,
              hospitality, and wellness.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/careers"
                className="rounded-xl bg-[#3ea8b6] px-6 py-3 text-white font-medium transition hover:bg-[#3194a1]"
              >
                Explore Careers
              </a>
              <a
                href="/work-with-us"
                className="rounded-xl border border-[#3ea8b6] px-6 py-3 text-[#3ea8b6] font-medium transition hover:bg-[#3ea8b6] hover:text-white"
              >
                Partner With Us
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-64 sm:h-80 lg:h-[420px] overflow-hidden rounded-md shadow-lg">
            <div className="absolute inset-0 bg-[url('/img/part_img.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/10" />
          </div>

        </div>
      </div>
    </section>



    </>
  );
};

export default AboutHome;
