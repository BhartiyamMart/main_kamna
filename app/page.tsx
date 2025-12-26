import AboutHome from '@/components/home/AboutHome';
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
      {/* <FeaturesSection /> */}
      <Footer />
    </>
  );
};

export default page;
