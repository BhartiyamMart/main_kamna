'use client';

import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getActiveJobs } from '@/lib/actions/job-actions';

interface ApplicationFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function ApplicationFilters({ onFilterChange }: ApplicationFiltersProps) {
  const [status, setStatus] = useState<string>('all');
  const [readStatus, setReadStatus] = useState<string>('all');
  const [jobId, setJobId] = useState<string>('all');
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const result = await getActiveJobs();
    if (result.status && result.data) {
      setJobs(Array.isArray(result.data) ? result.data : []);
    }
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onFilterChange({
      status: value === 'all' ? undefined : value,
      isRead: readStatus === 'all' ? undefined : readStatus === 'read',
      jobId: jobId === 'all' ? undefined : jobId,
    });
  };

  const handleReadStatusChange = (value: string) => {
    setReadStatus(value);
    onFilterChange({
      status: status === 'all' ? undefined : status,
      isRead: value === 'all' ? undefined : value === 'read',
      jobId: jobId === 'all' ? undefined : jobId,
    });
  };

  const handleJobChange = (value: string) => {
    setJobId(value);
    onFilterChange({
      status: status === 'all' ? undefined : status,
      isRead: readStatus === 'all' ? undefined : readStatus === 'read',
      jobId: value === 'all' ? undefined : value,
    });
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="APPLIED">Applied</SelectItem>
              <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
              <SelectItem value="INTERVIEW_SCHEDULED">Interview Scheduled</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="HIRED">Hired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Read Status</Label>
          <Select value={readStatus} onValueChange={handleReadStatusChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Job Position</Label>
          <Select value={jobId} onValueChange={handleJobChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              {jobs.map((job: any) => (
                <SelectItem key={job.id} value={job.id}>
                  {job.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
