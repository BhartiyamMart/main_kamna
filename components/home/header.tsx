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
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact-us' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-custom' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-14 lg:h-18 items-center justify-between px-4 lg:px-22">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={100}
            height={40}
            className="h-auto w-36 lg:w-48"
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
                className={`relative transition-colors ${
                  isHome && !scrolled
                    ? isActive
                      ? 'text-[#05cec5] font-bold'
                      : 'text-white hover:text-[#05cec5]'
                    : isActive
                    ? 'text-[#05cec5] font-bold'
                    : 'text-black hover:text-[#05cec5]'
                }`}
              >
                {item.name}

                {/* Active underline */}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#05cec5]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${
            isHome && !scrolled ? 'text-white' : 'text-black'
          }`}
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
                      ? 'text-[#05cec5] font-bold'
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
