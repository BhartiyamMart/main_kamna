import { ContactSection } from './home/ContactSection';
import Footer from './home/footer';
import Header from './home/header';
const businesses = [
  {
    title: 'Kamna Techno',
    description:
      'A next-generation IT and digital solutions company delivering software development, digital marketing, automation, cybersecurity, and AI-driven growth solutions.',
    image: '/img/a6.jpg',
    link: '/our-business/kamna-techno',
  },
  {
    title: 'Kamna Mart',
    description:
      'A fast-growing FMCG retail and B2B supply enterprise focused on accessibility, affordability, and convenience.',
    image: '/img/mart_04.jpg',
    link: '/our-business/kamna-mart',
  },
  {
    title: 'Kamna Café',
    description: 'A hospitality brand offering premium food, beverages, and warm community-focused spaces.',
    image: '/img/a1.jpeg',
    link: '/our-business/kamna-café',
  },
  {
    title: 'Kamna Herbs',
    description: 'A wellness brand delivering herbal and natural personal care products rooted in traditional wisdom.',
    image: '/img/a2.jpg',
    link: '/our-business/kamna-herbs',
  },
  {
    title: 'Kamna Digital',
    description: 'A one-stop destination for electronics, gadgets, laptops, appliances, and smart devices.',
    image: '/img/a3.jpg',
    link: '/our-business/kamna-digital',
  },
];

// Simple BusinessCard component definition
type BusinessCardProps = {
  data: {
    title: string;
    description: string;
    image: string;
    link: string;
  };
};

const BusinessCard: React.FC<BusinessCardProps> = ({ data }) => (
  <a href={data.link} className="block rounded-lg bg-white p-4 text-center shadow transition hover:shadow-lg">
    <img src={data.image} alt={data.title} className="mx-auto mb-4 h-32 w-full rounded object-cover" />
    <h2 className="mb-2 text-xl font-semibold">{data.title}</h2>
    <p className="text-gray-600">{data.description}</p>
  </a>
);

const OurBusiness = () => {
  return (
    <>
      <Header />

      <section className="container mx-auto mt-18 flex h-[60vh] flex-col items-center justify-center bg-[url('/img/work_img.jpg')] bg-cover bg-top px-4 lg:px-22">
        <img src="/img/career-img.gif" alt="Kamna Cafe Logo" className="mb-6 h-auto w-40 lg:w-44" />
        <p className="mb-2 text-sm text-[#d9af00]">HOME / OUR BUSINESS</p>
        <h1 className="text-4xl font-bold text-[#d9af00] lg:text-5xl">Our Businesses</h1>
      </section>

      <section className="container mx-auto flex items-center justify-center px-4 lg:px-20">
        <div className="container mx-auto py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((item, index) => (
              <BusinessCard key={index} data={item} />
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gray-50">
        <ContactSection />
      </div>

      <Footer />
    </>
  );
};

export default OurBusiness;
