'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Briefcase, Calendar, DollarSign, Download, Eye, Trash2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { deleteApplication, markApplicationAsRead, updateApplicationStatus } from '@/lib/actions/career-actions';
import { ViewApplicationDialog } from './ViewApplicationDialog';
import { DeleteConfirmDialog } from '../job/DeleteConfirmDialog';

interface ApplicationCardProps {
  application: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    experience?: number | null;
    currentCTC: number;
    expectedCTC: number;
    noticePeriod?: string | null;
    resumeUrl: string;
    status: string;
    isRead: boolean;
    createdAt: Date;
    job: {
      title: string;
      department: string;
    };
  };
  onUpdate: () => void;
}

const statusColors: Record<string, string> = {
  APPLIED: 'bg-blue-100 text-blue-800',
  SHORTLISTED: 'bg-yellow-100 text-yellow-800',
  INTERVIEW_SCHEDULED: 'bg-purple-100 text-purple-800',
  REJECTED: 'bg-red-100 text-red-800',
  HIRED: 'bg-green-100 text-green-800',
};

export function ApplicationCard({ application, onUpdate }: ApplicationCardProps) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    try {
      setIsLoading(true);
      const result = await updateApplicationStatus(application.id, newStatus as any);

      if (result.success) {
        toast.success('Status updated successfully');
        onUpdate();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async () => {
    try {
      const result = await markApplicationAsRead(application.id);
      if (result.success) {
        toast.success('Marked as read');
        onUpdate();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleView = () => {
    if (!application.isRead) {
      handleMarkAsRead();
    }
    setIsViewOpen(true);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const result = await deleteApplication(application.id);

      if (result.success) {
        toast.success('Application deleted successfully');
        onUpdate();
        setIsDeleteOpen(false);
      } else {
        toast.error('Failed to delete application');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ');
  };

  return (
    <>
      <div
        className={`rounded-lg border bg-white p-6 transition-shadow hover:shadow-md ${
          !application.isRead ? 'border-l-4 border-[#21502c]' : 'border-slate-200'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-slate-900">
                {application.firstName} {application.lastName}
              </h3>
              {!application.isRead && (
                <Badge variant="default" className="bg-[#21502c]">
                  New
                </Badge>
              )}
              <Badge className={statusColors[application.status] || 'bg-slate-100'}>
                {formatStatus(application.status)}
              </Badge>
            </div>

            <p className="mt-1 text-sm font-medium text-slate-600">
              {application.job.title} • {application.job.department}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-600 md:grid-cols-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="truncate">{application.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{application.phoneNumber}</span>
              </div>
              {application.experience !== undefined && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{application.experience} years exp</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(application.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Current: ₹{application.currentCTC} LPA</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Expected: ₹{application.expectedCTC} LPA</span>
              </div>
              {application.noticePeriod && <span className="text-xs">Notice: {application.noticePeriod}</span>}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Select value={application.status} onValueChange={handleStatusChange} disabled={isLoading}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="APPLIED">Applied</SelectItem>
                <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                <SelectItem value="INTERVIEW_SCHEDULED">Interview Scheduled</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
                <SelectItem value="HIRED">Hired</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isLoading}>
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleView}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsDeleteOpen(true)} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <ViewApplicationDialog application={application} isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} />

      <DeleteConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Application"
        description="Are you sure you want to delete this application? This action cannot be undone."
        isLoading={isLoading}
      />
    </>
  );
}
