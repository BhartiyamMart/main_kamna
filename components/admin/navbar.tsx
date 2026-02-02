'use client';

import React from 'react';

import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import Image from 'next/image';

const Navbar = () => {
  const { open, isMobile } = useSidebar();
  const showLogo = !open || isMobile;
  return (
    <nav
      className={`fixed z-50 flex h-14 w-full items-center border-b bg-white px-3 ${showLogo ? 'justify-between' : 'justify-end'}`}
    >
      {showLogo && <div className="flex items-center"></div>}
      <div className="flex w-fit items-center gap-5">
        <SidebarTrigger className="bg-background cursor-pointer rounded-xs" />
      </div>
    </nav>
  );
};

export default Navbar;
