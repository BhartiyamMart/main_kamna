'use server';
import { prisma } from '@/lib/prisma';

import { randomUUID } from 'crypto';
import { decryptKey, encryptKey } from '../bcrypt';
import { error } from 'console';
import { Logout } from './cookies';

/* ---------------------
   REGISTER USER
--------------------- */
export async function registerUser(email: string, password: string, role: 'USER' | 'ADMIN' | 'MARKETING' = 'USER') {
  // Check if user exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('User already exists');
  if (!email) throw new Error('email is required');
  if (!password) throw new Error('password is required');
  const encryptedPass = await encryptKey(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: encryptedPass, // You can hash password if you want (bcrypt)
      role,
    },
  });
  return {
    error: false,
    message: 'User created successfully',
    user,
  };
}

/* ---------------------
   LOGIN USER
--------------------- */
export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!email) throw new Error('email is required');
  if (!password) throw new Error('password is required');
  if (!user) throw new Error('User not found');
  const decryptpass = await decryptKey(user.password);

  if (password !== decryptpass) throw new Error('Invalid password');

  // Create token
  const token = randomUUID();
  const encryptedToken = await encryptKey(token);

  await prisma.token.create({
    data: {
      token: encryptedToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      userId: user.id,
    },
  });

  return {
    error: false,
    message: 'User login successfully',
    payload: {
      user: user.role,
      token: encryptedToken,
    },
  };
}

/* ---------------------
   LOGOUT USER
--------------------- */
export async function logoutUser(token: string) {
  await prisma.token.deleteMany({ where: { token } });
  await Logout;
  console.log('this logout is called');
  return { success: true };
}

/* ---------------------
   GET CURRENT USER
--------------------- */
export async function getCurrentUser(token: string) {
  // Find token
  const tokenRecord = await prisma.token.findFirst({
    where: { token, expiresAt: { gte: new Date() } },
    include: { user: true },
  });

  if (!tokenRecord) return null;

  const user = tokenRecord.user;
  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}
