'use client';
import { useEffect, useState, ReactNode } from 'react';

const images = ['/img/home_img03.jpg', '/img/slide_31.jpg', '/img/slide_33.jpg'];

interface ImageSliderProps {
  children?: ReactNode;
}

export default function ImageSlider({ children }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="h-full w-full shrink-0 bg-cover bg-top"
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">{children}</div>
    </div>
  );
}
