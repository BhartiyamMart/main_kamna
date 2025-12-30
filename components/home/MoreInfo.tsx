import React from 'react';
import Link from "next/link";

export const MoreInfo = () => {
  return (
    <section>
  <div className="relative container mx-auto h-96 bg-gray-50 px-20 lg:h-48">
    <div className="absolute -top-20 right-0 left-0 mx-auto w-full max-w-7xl rounded-lg bg-white p-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        {/* Card 1 */}
        <Link href="our-business/kamna-cafe" className="group relative flex h-28 sm:h-52 items-center justify-center overflow-hidden bg-gray-100">
          <div className="absolute inset-0 bg-[url('/img/a1.jpeg')] bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <h2 className="relative z-10 text-2xl sm:text-3xl text-black transition-colors duration-500 group-hover:text-white">
            Kamna Cafe
          </h2>
        </Link>

        {/* Card 2 */}
        <Link href="/kamna-herbs" className="group relative flex h-28 sm:h-52 items-center justify-center overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[url('/img/a2.jpg')] bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <h2 className="relative z-10 text-2xl sm:text-3xl text-black transition-colors duration-500 group-hover:text-white">
            Kamna Herbs
          </h2>
        </Link>

        {/* Card 3 */}
        <Link href="/kamna-digital" className="group relative flex h-28 sm:h-52 items-center justify-center overflow-hidden bg-gray-100">
          <div className="absolute inset-0 bg-[url('/img/a3.jpg')] bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <h2 className="relative z-10 text-2xl sm:text-3xl text-black transition-colors duration-500 group-hover:text-white">
            Kamna Digital
          </h2>
        </Link>

        {/* Card 4 */}
        <Link href="/kamna-mart" className="group relative flex h-28 sm:h-52 items-center justify-center overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[url('/img/a4.jpg')] bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <h2 className="relative z-10 text-2xl sm:text-3xl text-black transition-colors duration-500 group-hover:text-white">
            Kamna Mart
          </h2>
        </Link>

      </div>
    </div>
  </div>
</section>
  );
};
