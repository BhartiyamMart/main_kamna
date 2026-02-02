'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { checkAdminAuth } from '@/lib/actions/cookies';

interface ProtectedAdminProps {
  children: ReactNode;
}

const ProtectedAdmin: React.FC<ProtectedAdminProps> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await checkAdminAuth();
        console.log('response', response);
        const role = response.role;
        const token = response.token;
        const user = 'ADMIN';
        if (!token || user !== role || !user) {
          router.replace('/login'); // redirect if no token
          return;
        }
        setIsAdmin(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) return <p>Checking permissions...</p>;

  if (!isAdmin) return <p>Unauthorized: Admin access required</p>;

  return <>{children}</>;
};

export default ProtectedAdmin;
