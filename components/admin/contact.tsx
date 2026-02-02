'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Eye, MoreHorizontal, Trash2, Mail, MailOpen, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { getContacts, markAsRead, markAsUnread, deleteContact, getContactById } from '@/lib/actions/contact.server';
import { ContactViewModal } from './viewmodal';

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

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const pageSize = 10;

  const fetchContacts = async (page: number) => {
    setLoading(true);
    const result = await getContacts(page, pageSize);
    if (result.success) {
      setContacts(result.contacts as Contact[]);
      setTotalPages(result.pagination.totalPages);
    } else {
      toast.error('Failed to fetch contacts');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage]);

  const handleView = async (id: string) => {
    const result = await getContactById(id);
    if (result.success && result.contact) {
      setSelectedContact(result.contact as Contact);
      setIsViewModalOpen(true);
      // Mark as read when viewing
      await markAsRead(id);
      fetchContacts(currentPage);
    } else {
      toast.error('Failed to load contact details');
    }
  };

  const handleMarkAsRead = async (id: string) => {
    const result = await markAsRead(id);
    if (result.success) {
      toast.success('Marked as read');
      fetchContacts(currentPage);
    } else {
      toast.error('Failed to update');
    }
  };

  const handleMarkAsUnread = async (id: string) => {
    const result = await markAsUnread(id);
    if (result.success) {
      toast.success('Marked as unread');
      fetchContacts(currentPage);
    } else {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    const result = await deleteContact(id);
    if (result.success) {
      toast.success('Contact deleted successfully');
      fetchContacts(currentPage);
    } else {
      toast.error('Failed to delete contact');
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(searchLower) ||
      contact.lastName.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower) ||
      contact.subject.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-slate-900">Contact Messages</h1>
        <p className="mt-2 text-slate-600">Manage and respond to customer inquiries</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-slate-400" />
          <Input
            placeholder="Search by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center">
                  <div className="flex justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-slate-900"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredContacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-slate-500">
                  No contacts found
                </TableCell>
              </TableRow>
            ) : (
              filteredContacts.map((contact) => (
                <TableRow key={contact.id} className={!contact.isRead ? 'bg-blue-50/50' : ''}>
                  <TableCell>
                    <Badge variant={contact.isRead ? 'secondary' : 'default'}>
                      {contact.isRead ? <MailOpen className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {contact.firstName} {contact.lastName}
                  </TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phoneNumber}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{contact.subject}</TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {format(new Date(contact.createdAt), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleView(contact.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = `mailto:${contact.email}?subject=Re: ${contact.subject}`)
                          }
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Reply via Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {contact.isRead ? (
                          <DropdownMenuItem onClick={() => handleMarkAsUnread(contact.id)}>
                            <Mail className="mr-2 h-4 w-4" />
                            Mark as Unread
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleMarkAsRead(contact.id)}>
                            <MailOpen className="mr-2 h-4 w-4" />
                            Mark as Read
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(contact.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* View Modal */}
      <ContactViewModal contact={selectedContact} isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} />
    </div>
  );
}
