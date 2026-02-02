'use server';

import { prisma } from '@/lib/prisma';
import { sendContactFormEmail } from '@/lib/mail';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    console.log('Starting contact form submission...');

    // Store in database
    const contact = await prisma.contact.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        subject: data.subject,
        message: data.message,
        isRead: false,
      },
    });
    console.log('Contact saved to database:', contact.id);

    // Send email notification
    console.log('Attempting to send email...');
    const emailResult = await sendContactFormEmail(data);

    console.log('Email result:', emailResult);

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
    } else {
      console.log('Email sent successfully. Message ID:', emailResult.messageId);
    }

    return {
      success: true,
      message: 'Contact form submitted successfully',
      contactId: contact.id,
    };
  } catch (error) {
    console.error(' Error submitting contact form:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit',
    };
  }
}

export async function getContacts(page: number = 1, pageSize: number = 10) {
  try {
    const skip = (page - 1) * pageSize;

    const [contacts, totalCount] = await Promise.all([
      prisma.contact.findMany({
        skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.contact.count(),
    ]);

    return {
      success: true,
      contacts,
      pagination: {
        total: totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch contacts',
      contacts: [],
      pagination: { total: 0, page: 1, pageSize: 10, totalPages: 0 },
    };
  }
}

export async function getContactById(id: string) {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      return {
        success: false,
        error: 'Contact not found',
      };
    }

    return {
      success: true,
      contact,
    };
  } catch (error) {
    console.error('Error fetching contact:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch contact',
    };
  }
}

export async function markAsRead(id: string) {
  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: { isRead: true },
    });

    return {
      success: true,
      contact,
    };
  } catch (error) {
    console.error('Error marking contact as read:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update contact',
    };
  }
}

export async function markAsUnread(id: string) {
  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: { isRead: false },
    });

    return {
      success: true,
      contact,
    };
  } catch (error) {
    console.error('Error marking contact as unread:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update contact',
    };
  }
}

export async function deleteContact(id: string) {
  try {
    await prisma.contact.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Contact deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting contact:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete contact',
    };
  }
}
