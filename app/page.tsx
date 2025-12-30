import AboutHome from '@/components/home/AboutHome';
import { BlogSection } from '@/components/home/BlogSection';
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
       <BlogSection />
       <ContactSection/>
      {/* <FeaturesSection /> */}
      <Footer />
    </>
  );
};

export default page;
