'use client';

import React from 'react';

import { SidebarTrigger, useSidebar } from '../ui/sidebar';


const Navbar = () => {
  const { open, isMobile } = useSidebar();
  const showLogo = !open || isMobile;
  return (
    <nav
      className={`h-14 border-b fixed  w-full z-50 flex items-center bg-green-950 px-3 ${showLogo ? 'justify-between' : 'justify-end'}`}
    >
      {showLogo && (
        <div className="flex items-center">
          {/* <LogoFull /> */}
        </div>
      )}
      <div className="flex w-fit items-center gap-5">
        <SidebarTrigger className="rounded-xs cursor-pointer bg-background" />
        
      </div>
    </nav>
  );
};

export default Navbar;
