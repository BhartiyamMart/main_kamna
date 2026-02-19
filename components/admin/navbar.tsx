'use client';

import React from 'react';

import { SidebarTrigger, useSidebar } from '../ui/sidebar';

const Navbar = () => {
  const { open, isMobile } = useSidebar();
  const showLogo = !open || isMobile;
  return (
    <nav className="fixed z-50 flex h-14 w-full items-center gap-5 border-b bg-white px-3">
      <SidebarTrigger className="bg-background cursor-pointer rounded-xs" />
      {showLogo && <div className="flex items-center"></div>}
    </nav>
  );
};

export default Navbar;
