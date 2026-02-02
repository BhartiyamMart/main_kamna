'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface JobFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [status, setStatus] = useState<string>('all');
  const [jobType, setJobType] = useState<string>('all');

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onFilterChange({
      isActive: value === 'all' ? undefined : value === 'active',
    });
  };

  const handleJobTypeChange = (value: string) => {
    setJobType(value);
    onFilterChange({
      jobType: value === 'all' ? undefined : value,
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
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Job Type</Label>
          <Select value={jobType} onValueChange={handleJobTypeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="FULL_TIME">Full Time</SelectItem>
              <SelectItem value="PART_TIME">Part Time</SelectItem>
              <SelectItem value="CONTRACT">Contract</SelectItem>
              <SelectItem value="INTERNSHIP">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
