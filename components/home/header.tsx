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
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isHome && !scrolled ? 'bg-transparent' : 'shadow-custom bg-white'} `}
    >
      <div
        className={`container mx-auto flex items-center justify-between px-4 transition-all duration-300 lg:px-14 ${scrolled ? 'h-14 lg:h-16' : 'h-20 lg:h-24'} `}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/img/Kamna_Mart.png"
            alt="Logo"
            width={120}
            height={60}
            className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-6 lg:h-14' : 'h-10 lg:h-22'} `}
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="text-md hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative transition-colors ${
                  isHome && !scrolled
                    ? isActive
                      ? 'font-bold text-[#ffd112]'
                      : 'text-white hover:text-[#ffd112]'
                    : isActive
                      ? 'font-bold text-[#ffd112]'
                      : 'text-black hover:text-[#ffd112]'
                }`}
              >
                {item.name}
                {isActive && <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#ffd112]" />}
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
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <nav className="flex flex-col space-y-4 px-6 py-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${isActive ? 'font-bold text-[#ffd112]' : 'text-slate-300 hover:text-white'}`}
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
