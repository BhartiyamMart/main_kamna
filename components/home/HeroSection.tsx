'use client';
export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#c5fdff] bg-[url('/img/home_img02.jpg')] bg-cover   bg-center pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-0 lg:pb-32">
      {/* Left edge - Cyan/Blue solid gradient orb - Responsive sizing */}
      <div
        className="animate-float absolute top-10 -left-32 h-62.5 w-62.5 rounded-full opacity-26 sm:h-[350px] sm:w-[350px] md:top-16 md:-left-40 md:h-[400px] md:w-[400px] lg:top-20 lg:-left-48 lg:h-[500px] lg:w-[500px]"
        style={{
          background: 'radial-gradient(circle at 40% 40%, #E0F7FF, #4DD0E1, #00BCD4)',
        }}
      />

      {/* Right edge - Pink/Red solid gradient orb - Responsive sizing */}
      <div
        className="animate-float-delayed absolute top-20 -right-32 h-62.5 w-62.5 rounded-full opacity-40 sm:h-[350px] sm:w-[350px] md:top-24 md:-right-40 md:h-[400px] md:w-[400px] lg:top-82 lg:-right-48 lg:h-[400px] lg:w-[400px]"
        style={{
          background: 'radial-gradient(circle at 40% 40%, #E0F7FF, #4DD0E1, #00BCD4)',
        }}
      />

      {/* Bottom right - Purple accent orb - Hidden on mobile, visible on larger screens */}
      <div
        className="animate-float-slow absolute right-10 -bottom-14 hidden h-[300px] w-[300px] rounded-full opacity-60 md:block lg:right-20 lg:-bottom-32 lg:h-[200px] lg:w-[200px]"
        style={{
          background: 'radial-gradient(circle at 40% 40%, #ffffff, #007a8c, #007a8c)',
        }}
      />

      <div className="relative container mx-auto h-auto min-h-[240px] px-4 sm:min-h-[500px] sm:px-6 lg:h-[35rem] lg:px-8">
        <div className="grid gap-8 py-12 pt-16 sm:py-16 lg:grid-cols-1 lg:gap-8 lg:pt-56">
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
            <div className="space-y-1 text-center sm:space-y-6 lg:space-y-8 lg:text-center">
              <h1 className="text-bold text-lg text-black sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                A diversified group focused on
              </h1>
              <h1 className="text-xl font-semibold text-black sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                innovation, convenience, and quality
              </h1>
              <div className="pt-4 sm:pt-6">
                {/* <Button className="bg-[#006f85] text-white hover:bg-[#005a6b] cursor-pointer text-sm sm:text-base lg:text-md px-6 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-6 transition-colors">
                  Get Started
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
