'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 z-50 w-full ${
        scrolled ? 'shadow-custom border-b border-white/10 bg-white' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-18 items-center justify-between px-4 lg:px-22">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/img/logo.png" alt="Logo" width={100} height={40} className="h-auto w-48" />
        </Link>

        {/* Desktop Menu */}
        <nav className="text-md hidden items-center gap-8 md:flex">
          {['Home', 'About', 'Our Business', 'Careers', 'Blog', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-md text-black transition-colors hover:text-[#05cec5]"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="text-slate-200 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <nav className="flex flex-col space-y-4 px-6 py-6">
            {['Home', 'About', 'Our Business', 'Careers', 'Blog', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 transition hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
