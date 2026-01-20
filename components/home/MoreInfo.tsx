import Link from 'next/link';

export const MoreInfo = () => {
  return (
    <section>
      <div className="relative container mx-auto h-[500] bg-gray-50 px-10 lg:h-44">
        <div className="absolute -top-20 right-0 left-0 mx-auto w-full rounded-lg bg-gray-50 p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {/* Card 1 */}
            <Link
              href="our-business/kamna-techno"
              className="group relative flex h-28 items-center justify-center overflow-hidden bg-[#3ea8b6] sm:h-44"
            >
              <div className="absolute inset-0 bg-[url('/img/a6.jpg')] bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
                <h2 className="text-2xl font-semibold transition-colors duration-500 sm:text-3xl">Kamna Techno</h2>
                <p className="mt-1 text-sm sm:text-base">IT & Digital Solutions</p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link
              href="our-business/kamna-mart"
              className="group relative flex h-28 items-center justify-center overflow-hidden bg-white text-black hover:text-white sm:h-44"
            >
              <div className="absolute inset-0 bg-[url('/img/mart_04.jpg')] bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-semibold transition-colors duration-500 sm:text-3xl">Kamna Mart</h2>
                <p className="mt-1 text-sm sm:text-base">Retail & B2B Supply</p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link
              href="our-business/kamna-cafe"
              className="group relative flex h-28 items-center justify-center overflow-hidden bg-[#3ea8b6] sm:h-44"
            >
              <div className="absolute inset-0 bg-[url('/img/a1.jpeg')] bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
                <h2 className="text-2xl font-semibold transition-colors duration-500 sm:text-3xl">Kamna Café </h2>
                <p className="mt-1 text-sm sm:text-base">Food & Hospitality</p>
              </div>
            </Link>
            {/* Card 2 */}
            <Link
              href="our-business/kamna-herbs"
              className="group relative flex h-28 items-center justify-center overflow-hidden bg-white text-black hover:text-white sm:h-44"
            >
              <div className="absolute inset-0 bg-[url('/img/a2.jpg')] bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col items-center justify-center text-center  ">
                <h2 className="text-2xl font-semibold transition-colors duration-500 sm:text-3xl">Kamna Herbs </h2>
                <p className="mt-1 text-sm sm:text-base">Herbal Wellness</p>
              </div>
            </Link>
            {/* Card 2 */}
            <Link
              href="our-business/kamna-digital"
              className="group relative flex h-28 items-center justify-center overflow-hidden bg-[#3ea8b6] sm:h-44"
            >
              <div className="absolute inset-0 bg-[url('/img/a3.jpg')] bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
                <h2 className="text-2xl font-semibold transition-colors duration-500 sm:text-3xl">Kamna Digital  </h2>
                <p className="mt-1 text-sm sm:text-base">Electronics & Digital Solutions</p>
              </div>
            </Link>
            

          </div>
        </div>
      </div>
    </section>
  );
};
