// lib/actions/auth-actions.ts
'use server';

import { cookies } from 'next/headers';

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const role = cookieStore.get('role')?.value;
  console.log('type of cookies', typeof cookieStore);
  return {
    token,
    role,
  };
}

export async function Logout() {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cook) => {
    cookieStore.delete(cook);
  });

  console.log('INNER log');
}
