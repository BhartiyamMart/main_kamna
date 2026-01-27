'use server';
import {prisma} from '@/lib/prisma';

/* CREATE Contact */
export async function createContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}) {
  return await prisma.contact.create({ data });
}

/* GET ALL Contacts */
export async function getContacts() {
  return await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
}

/* GET Contact BY ID */
export async function getContactById(id: string) {
  return await prisma.contact.findUnique({ where: { id } });
}

/* MARK AS READ */
export async function markContactAsRead(id: string) {
  return await prisma.contact.update({
    where: { id },
    data: { isRead: true },
  });
}

/* DELETE Contact */
export async function deleteContact(id: string) {
  return await prisma.contact.delete({ where: { id } });
}
