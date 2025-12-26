import Image from 'next/image';
import React from 'react';

const AboutHome = () => {
  return (
    <section>
      <div className="bg-gray-50">
        <div className="relative container mx-auto bg-gray-50 px-4 py-14 lg:px-20">
          <div className="mx-auto w-full max-w-7xl p-0">
            <div className="grid grid-cols-12 gap-0 lg:gap-16">
              <div className="col-span-12 lg:col-span-5">
                <Image className="rounded-xl" src="/img/img01.jpg" alt="About Kamna Group" width={1000} height={1000} />
              </div>
              <div className="col-span-12 mt-6 lg:col-span-7 lg:mt-0">
                <h1 className="mb-3 text-lg lg:text-3xl">About Kamna Group of Companies</h1>
                <p className="leading-7">
                  Kamna Group of Companies is a forward-thinking and multi-diversified enterprise dedicated to
                  transforming daily experiences through innovation, convenience, and quality. Focused to empower modern
                  lifestyles and support community growth, the group operates across multiple sectors with a strong
                  focus on technology, retail, wellness, and digital transformation. Each business vertical under the
                  Kamna umbrella is built on the foundation of excellence, customer trust, and future-ready solutions.
                </p>

                <div className="py-10">
                  <div className="mx-auto max-w-6xl px-4 lg:px-0">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      {/* Card 1 */}
                      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#00737a] to-[#00737a] p-8 shadow-lg">
                        <h3 className="mb-3 text-xl leading-tight font-semibold text-white">Our vision</h3>

                        <p className="mb-6 leading-relaxed text-gray-50">
                          To make high-quality FMCG products and retail essentials accessible to every Indian...
                        </p>

                        <a
                          href="#"
                          className="inline-flex items-center gap-2 font-medium text-cyan-300 transition-all hover:gap-3"
                        >
                          Learn More <span>→</span>
                        </a>
                      </div>

                      {/* Card 2 */}
                      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#00737a] to-[#00737a] p-8 shadow-lg">
                        <h3 className="mb-3 text-xl leading-tight font-semibold text-white">Our mission</h3>

                        <p className="mb-6 leading-relaxed text-gray-50">
                          To become India’s most trusted and customer-centric retail brand, setting new...
                        </p>

                        <a
                          href="#"
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
  );
};

export default AboutHome;
