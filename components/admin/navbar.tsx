'use client';

import React from 'react';

import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import Image from 'next/image';


const Navbar = () => {
  const { open, isMobile } = useSidebar();
  const showLogo = !open || isMobile;
  return (
    <nav
      className={`h-14 border-b fixed  w-full z-50 flex bg-white items-center px-3 ${showLogo ? 'justify-between' : 'justify-end'}`}
    >
      {showLogo && (
        <div className="flex items-center">
       
        </div>
      )}
      <div className="flex w-fit items-center gap-5">
        <SidebarTrigger className="rounded-xs cursor-pointer bg-background" />
        
      </div>
    </nav>
  );
};

export default Navbar;
