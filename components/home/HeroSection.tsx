'use client'
import ImageSlider from "./HomeSlide"

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-[30rem] lg:h-[42rem] overflow-hidden"
    >
      <ImageSlider>
        <div className="text-center text-white px-4">
          <h1 className="text-lg sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Kamna Group - Building Businesses
          </h1>
          <h2 className="mt-6 text-xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
            That Serve Everyday India
          </h2>
          
        </div>
      </ImageSlider>
    </section>
  )
}
