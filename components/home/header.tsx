'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Our Business', href: '/our-business' },
  { name: 'Work With Us', href: '/work-with-us' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/blog-kamna' },
  { name: 'Contact', href: '/contact-us' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0  z-50 w-full transition-all duration-300
        ${isHome && !scrolled ? 'bg-transparent' : 'bg-white shadow-custom'}
      `}
    >
      <div
        className={`container mx-auto flex items-center justify-between px-4 lg:px-14 transition-all duration-300
          ${scrolled ? 'h-14 lg:h-16' : 'h-20 lg:h-24'}
        `}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/img/Kamna_Mart.png"
            alt="Logo"
            width={120}
            height={60}
            className={`w-auto object-contain transition-all duration-300
              ${scrolled ? 'h-6 lg:h-14' : 'h-10 lg:h-20'}
            `}
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-md">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative transition-colors
                  ${
                    isHome && !scrolled
                      ? isActive
                        ? 'text-[#ffd112] font-bold'
                        : 'text-white hover:text-[#ffd112]'
                      : isActive
                      ? 'text-[#ffd112] font-bold'
                      : 'text-black hover:text-[#ffd112]'
                  }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#ffd112]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${isHome && !scrolled ? 'text-white' : 'text-black'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-t border-white/10">
          <nav className="flex flex-col space-y-4 px-6 py-6">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${
                    isActive
                      ? 'text-[#ffd112] font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
