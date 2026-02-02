'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar, User, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface ContactViewModalProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactViewModal({ contact, isOpen, onClose }: ContactViewModalProps) {
  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Contact Details</DialogTitle>
            <Badge variant={contact.isRead ? 'secondary' : 'default'}>{contact.isRead ? 'Read' : 'Unread'}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Personal Information */}
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <User className="mt-1 h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-500">Full Name</p>
                <p className="text-base font-semibold">
                  {contact.firstName} {contact.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-500">Email</p>
                <a href={`mailto:${contact.email}`} className="text-base font-semibold text-blue-600 hover:underline">
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-500">Phone Number</p>
                <a
                  href={`tel:${contact.phoneNumber}`}
                  className="text-base font-semibold text-blue-600 hover:underline"
                >
                  {contact.phoneNumber}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="mt-1 h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-500">Submitted On</p>
                <p className="text-base font-semibold">{format(new Date(contact.createdAt), 'PPpp')}</p>
              </div>
            </div>
          </div>

          {/* Subject */}
          <div className="border-t pt-4">
            <p className="mb-2 text-sm font-medium text-slate-500">Subject</p>
            <p className="text-base font-semibold">{contact.subject}</p>
          </div>

          {/* Message */}
          <div className="border-t pt-4">
            <div className="mb-2 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-slate-500" />
              <p className="text-sm font-medium text-slate-500">Message</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-base whitespace-pre-wrap">{contact.message}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              window.location.href = `mailto:${contact.email}?subject=Re: ${contact.subject}`;
            }}
          >
            Reply via Email
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
