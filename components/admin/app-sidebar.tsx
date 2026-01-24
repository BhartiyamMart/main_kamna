'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import DATA from '@/lib/data';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { ChevronRight, LogOut } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { logoutUser } from '@/lib/actions/user-actions';
import { checkAdminAuth , Logout, } from '@/lib/actions/cookies';


import Image from 'next/image';

// Define types for menu items
interface SubMenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface MenuItem {
  title: string;
  url?: string;
  icon: React.ComponentType<{ size?: number }>;
  children?: SubMenuItem[];
}

const LoadingSpinner = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const logout = logoutUser;

  const toggleMenu = (title: string): void => {
    const newOpenMenus = new Set(openMenus);
    if (newOpenMenus.has(title)) {
      newOpenMenus.delete(title);
    } else {
      newOpenMenus.add(title);
    }
    setOpenMenus(newOpenMenus);
  };

  const isMenuOpen = (title: string): boolean => openMenus.has(title);

  const hasActiveChild = (children: SubMenuItem[] | undefined): boolean => {
    return children?.some((child) => pathname === child.url) ?? false;
  };

  const handleLogoutClick = useCallback(() => {
    setShowLogoutConfirm(true);
  }, []);

  const handleLogoutConfirm = useCallback(async () => {
    const token = await checkAdminAuth(); // get token stored in browser
    if (!token) {
      router.push('/login');
      return;
    }

    setIsLoggingOut(true);

    try {
      const response = await checkAdminAuth();
      const role = response.role;
      const token = response.token;
      await Logout()
     
     
      if (token) {
        await logoutUser(token);
        
      }

      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  }, [logout, router]);

  const handleLogoutCancel = useCallback(() => {
    setShowLogoutConfirm(false);
  }, []);

  return (
    <Sidebar>
      <header className=" flex h-14 items-center border-b ">
        <Image
        height={55}
        width={55}
        src="/Kamna_Mart.webp"
        alt='logo'
        
      /></header>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {DATA.sidebar.map((item: MenuItem) => {
                // Simple menu item (no children)
                if (!item.children) {
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title} className="mt-2">
                      <SidebarMenuButton asChild isActive={isActive} className={isActive ? 'bg-border' : ''}>
                        <Link href={item.url!}>
                          <item.icon size={20} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                // Parent menu item (with children)
                const isOpen = isMenuOpen(item.title);
                const hasActiveSubItem = hasActiveChild(item.children);

                return (
                  <Collapsible key={item.title} open={isOpen} onOpenChange={() => toggleMenu(item.title)}>
                    <SidebarMenuItem className="mt-2">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={hasActiveSubItem}
                          className={`w-full ${hasActiveSubItem ? 'bg-border' : ''}`}
                        >
                          <item.icon size={20} />
                          <span>{item.title}</span>
                          <ChevronRight
                            className={`ml-auto h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((subItem: SubMenuItem) => {
                            const isSubActive = pathname === subItem.url;

                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isSubActive}
                                  className={isSubActive ? 'bg-border' : ''}
                                >
                                  <Link href={subItem.url}>
                                    <subItem.icon size={16} />
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <footer className=" border-t p-2">
        <button
          onClick={handleLogoutClick}
          className="hover:bg-border flex w-full cursor-pointer items-center gap-2 rounded-xs px-2 py-2 text-sm transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </footer>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div className="absolute" onClick={handleLogoutCancel} />

          {/* Modal */}
          <div className="bg-foreground relative w-full max-w-xl rounded-xs p-5 shadow-xl">
            <h3 className="text-theme-text mb-2 text-lg font-semibold md:text-xl">Confirm Logout</h3>
            <p className="text-theme-text/80 mb-8 text-sm">Are you sure you want to logout of your account?</p>
            <div className="flex justify-end gap-5">
              <button
                onClick={handleLogoutCancel} // Use isLoggingOut from store
                className="bg-border hover:bg-border/90 dark:text-theme-text cursor-pointer rounded-xs px-3 py-2 font-semibold text-gray-800 transition-all duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm} // Use isLoggingOut from store
                className="flex cursor-pointer items-center gap-2 rounded-xs bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-2 font-semibold text-white transition-all duration-200 hover:from-indigo-500/90 hover:via-purple-500/90 hover:to-pink-500/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoggingOut && <LoadingSpinner />}
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  );
}
