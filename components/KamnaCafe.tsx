import React from 'react'
import Header from './home/header'
import Footer from './home/footer'

const KamnaCafe = () => {
  return (
    <>
        <Header/>
        <section className="container mx-auto mt-18 flex h-50 flex-col items-center justify-center bg-gray-50 px-4 lg:px-22">
            <p className="mb-2 text-sm text-gray-500">HOME / OUR BUSINESS</p>
            <h1 className="text-4xl font-bold text-black">Kamna Cafe</h1>
        </section>

        <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/img/about-img.jpg"
            alt="About Kamna Group"
            className="rounded-xl shadow-lg"
          />

          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kamna Group of Companies is a diversified organization committed
              to delivering excellence across multiple industries including
              digital solutions, food & beverages, retail, and wellness.
            </p>
            <p className="text-gray-600 leading-relaxed"> 
              Our focus is on innovation, customer satisfaction, and sustainable
              growth driven by strong values and a visionary leadership team.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision */} 
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To deliver quality-driven solutions that create long-term value
              for our customers, partners, and communities.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To become a trusted multi-industry brand recognized for
              innovation, integrity, and impact.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-4xl font-bold text-primary">10+</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-primary">5+</h3>
            <p className="text-gray-600">Business Verticals</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-primary">100+</h3>
            <p className="text-gray-600">Team Members</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-primary">1000+</h3>
            <p className="text-gray-600">Happy Clients</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Let’s Build the Future Together
        </h2>
        <p className="mb-6 text-gray-300">
          Connect with us to explore partnerships and opportunities.
        </p>
        <a
          href="/contact"
          className="inline-block bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition"
        >
          Contact Us
        </a>
      </section>

        <Footer/>

    
        </>
  )
}

export default KamnaCafe