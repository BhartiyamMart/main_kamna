import { AppSidebar } from '@/components/admin/app-sidebar';
import ProtectedAdmin from '@/components/auth/protected';
import Navbar from '@/components/admin/navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectedAdmin>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    </ProtectedAdmin>
  );
};

export default AdminLayout;
