import AboutHome from '@/components/home/AboutHome';
import { BlogHomeSection } from '@/components/home/BlogHomeSection';

import { ContactSection } from '@/components/home/ContactSection';
import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import HeroSection from '@/components/home/HeroSection';
import { MoreInfo } from '@/components/home/MoreInfo';

const page = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <MoreInfo />
      <AboutHome />
      <BlogHomeSection />
      <div className="bg-gray-50">
        <ContactSection />
      </div>
      <Footer />
    </>
  );
};

export default page;
