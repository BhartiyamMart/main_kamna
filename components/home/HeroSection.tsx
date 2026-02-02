'use client';
import ImageSlider from './HomeSlide';

export default function HeroSection() {
  return (
    <section id="home" className="relative h-[30rem] overflow-hidden lg:h-[42rem]">
      <ImageSlider>
        <div className="px-4 text-center text-white">
          <h1 className="text-lg font-bold sm:text-4xl md:text-5xl lg:text-6xl">Kamna Group - Building Businesses</h1>
          <h2 className="mt-6 text-xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">That Serve Everyday India</h2>
        </div>
      </ImageSlider>
    </section>
  );
}
