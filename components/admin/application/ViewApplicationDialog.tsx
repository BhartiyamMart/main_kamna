'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Briefcase, Calendar, DollarSign, Download, FileText } from 'lucide-react';

interface ViewApplicationDialogProps {
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
    coverLetter?: string;
    startDate?: string;
    endDate?: string;
    currentWorking?: boolean;
    createdAt: Date;
    job: {
      title: string;
      department: string;
    };
  };
  isOpen: boolean;
  onClose: () => void;
}

export function ViewApplicationDialog({ application, isOpen, onClose }: ViewApplicationDialogProps) {
  const formatStatus = (status: string) => status.replace(/_/g, ' ');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Application Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {application.firstName} {application.lastName}
            </h2>
            <p className="mt-1 text-slate-600">
              Applied for <span className="font-medium">{application.job.title}</span> • {application.job.department}
            </p>
            <div className="mt-2">
              <Badge>{formatStatus(application.status)}</Badge>
            </div>
          </div>

          {/* Contact Information */}
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-3 font-semibold text-slate-900">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-slate-500" />
                <a href={`mailto:${application.email}`} className="text-[#21502c] hover:underline">
                  {application.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-slate-500" />
                <a href={`tel:${application.phoneNumber}`} className="text-[#21502c] hover:underline">
                  {application.phoneNumber}
                </a>
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-3 font-semibold text-slate-900">Professional Details</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {application.experience !== undefined && (
                <div>
                  <p className="text-xs text-slate-500">Experience</p>
                  <p className="text-sm font-medium">{application.experience} years</p>
                </div>
              )}
              <div>
                <p className="text-xs text-slate-500">Current CTC</p>
                <p className="text-sm font-medium">₹{application.currentCTC} LPA</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Expected CTC</p>
                <p className="text-sm font-medium">₹{application.expectedCTC} LPA</p>
              </div>
              {application.noticePeriod && (
                <div>
                  <p className="text-xs text-slate-500">Notice Period</p>
                  <p className="text-sm font-medium">{application.noticePeriod}</p>
                </div>
              )}
              {application.startDate && (
                <div>
                  <p className="text-xs text-slate-500">Previous Company Start Date</p>
                  <p className="text-sm font-medium">{application.startDate}</p>
                </div>
              )}
              {application.endDate && (
                <div>
                  <p className="text-xs text-slate-500">Previous Company End Date</p>
                  <p className="text-sm font-medium">
                    {application.currentWorking ? 'Currently Working' : application.endDate}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Cover Letter */}
          {application.coverLetter && (
            <div className="rounded-lg border border-slate-200 p-4">
              <h3 className="mb-2 font-semibold text-slate-900">Cover Letter</h3>
              <p className="text-sm whitespace-pre-wrap text-slate-600">{application.coverLetter}</p>
            </div>
          )}

          {/* Resume */}
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-3 font-semibold text-slate-900">Resume</h3>
            <Button asChild className="w-full bg-[#21502c] hover:bg-[#3b864c]">
              <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* Application Date */}
          <div className="text-center text-xs text-slate-500">
            Applied on {new Date(application.createdAt).toLocaleString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
