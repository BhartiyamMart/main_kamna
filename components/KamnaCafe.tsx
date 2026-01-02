
import Header from './home/header';
import Footer from './home/footer';

const KamnaCafe = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto mt-18 flex h-90 flex-col items-center justify-center bg-[url('/img/banner_bg.jpg')] bg-cover bg-center px-4 lg:px-22">
        <p className="mb-2 text-sm text-gray-900">HOME / OUR BUSINESS</p>
        <h1 className="text-4xl font-bold text-black">Kamna Cafe</h1>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="col-span-12 md:col-span-4">
            <img src="/img/modern-office-innovation.jpg" alt="About Kamna Group" className="rounded-xl shadow-lg" />
          </div>

          <div className="col-span-12 md:col-span-8">
            <h2 className="mb-4 text-3xl font-semibold">Who We Are</h2>
            <p className="mb-4 leading-relaxed text-gray-600">
              Kamna Group of Companies is a diversified organization committed to delivering excellence across multiple
              industries including digital solutions, food & beverages, retail, and wellness.
            </p>
            <p className="leading-relaxed text-gray-600">
              Our focus is on innovation, customer satisfaction, and sustainable growth driven by strong values and a
              visionary leadership team.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto grid gap-8 px-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-8 shadow">
            <h3 className="mb-3 text-xl font-semibold">Our Mission</h3>
            <p className="text-gray-600">
              To deliver quality-driven solutions that create long-term value for our customers, partners, and
              communities.
            </p>
          </div>

          <div className="rounded-lg bg-white p-8 shadow">
            <h3 className="mb-3 text-xl font-semibold">Our Vision</h3>
            <p className="text-gray-600">
              To become a trusted multi-industry brand recognized for innovation, integrity, and impact.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="container mx-auto grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          <div>
            <h3 className="text-primary text-4xl font-bold">10+</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div>
            <h3 className="text-primary text-4xl font-bold">5+</h3>
            <p className="text-gray-600">Business Verticals</p>
          </div>
          <div>
            <h3 className="text-primary text-4xl font-bold">100+</h3>
            <p className="text-gray-600">Team Members</p>
          </div>
          <div>
            <h3 className="text-primary text-4xl font-bold">1000+</h3>
            <p className="text-gray-600">Happy Clients</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-16 text-center text-white">
        <h2 className="mb-4 text-3xl font-semibold">Let’s Build the Future Together</h2>
        <p className="mb-6 text-gray-300">Connect with us to explore partnerships and opportunities.</p>
        <a
          href="/contact"
          className="inline-block rounded-md bg-white px-8 py-3 font-medium text-black transition hover:bg-gray-200"
        >
          Contact Us
        </a>
      </section>

      <Footer />
    </>
  );
};

export default KamnaCafe;
