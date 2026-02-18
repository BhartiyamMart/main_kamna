'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { deleteJob, toggleJobStatus } from '@/lib/actions/job-actions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Clock, IndianRupee, Users, Edit, Trash2, Power, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditJobDialog } from './EditJobDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    department: string;
    location: string;
    jobType: string;
    experience: number;
    salaryStartRange: number;
    salaryEndRange: number;
    positions: number;
    isActive: boolean;
    createdAt: Date;
    _count: {
      applications: number;
    };
  };
  onUpdate: () => void;
}

export function JobCard({ job, onUpdate }: JobCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleStatus = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('adminToken') || '';
      const result = await toggleJobStatus(token, job.id);

      if (result.status) {
        toast.success(result.message);
        onUpdate();
      } else {
        toast.error(result.message || 'Failed to update job status');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('adminToken') || '';
      const result = await deleteJob(token, job.id, false);

      if (result.status) {
        toast.success(result.message);
        onUpdate();
        setIsDeleteOpen(false);
      } else {
        toast.error(result.message || 'Failed to delete job');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const formatJobType = (type: string) => type.replace('_', ' ');

  return (
    <>
      <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-6 transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex flex-nowrap items-center gap-2 md:gap-3">
              <h3 className="truncate text-sm sm:text-md md:text-lg font-bold text-slate-900 flex-1">{job.title}</h3>
              <Badge variant={job.isActive ? 'default' : 'secondary'} className="shrink-0">{job.isActive ? 'Active' : 'Inactive'}</Badge>
              <div className="shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={isLoading}>
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleToggleStatus}>
                      <Power className="mr-2 h-4 w-4" />
                      {job.isActive ? 'Deactivate' : 'Activate'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDeleteOpen(true)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-600">{job.department}</p>

            <div className="mt-4 grid grid-cols-1 gap-2 text-slate-600 
                sm:grid-cols-2 
                lg:grid-cols-4">

              {/* Location */}
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="text-sm truncate">{job.location}</span>
              </div>

              {/* Job Type */}
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 shrink-0" />
                <span className="text-sm truncate">
                  {formatJobType(job.jobType)}
                </span>
              </div>

              {/* Experience */}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 shrink-0" />
                <span className="text-sm truncate">
                  {job.experience} years
                </span>
              </div>

              {/* Salary */}
              <div className="flex items-center gap-1">
                <IndianRupee className="h-4 w-4 shrink-0" />
                <span className="text-sm truncate">
                  {job.salaryStartRange}-{job.salaryEndRange} LPA
                </span>
              </div>
            </div>


            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {job.positions} position{job.positions !== 1 ? 's' : ''}
                </span>
              </div>
              <div>
                <span className="text-xs md:text-sm">{job._count.applications}</span> applications
              </div>
              <div className="text-xs md:text-sm text-slate-500">Created {new Date(job.createdAt).toLocaleDateString()}</div>
            </div>
          </div>

        </div>
      </div>

      <EditJobDialog job={job} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} onSuccess={onUpdate} />

      <DeleteConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Job"
        description="Are you sure you want to delete this job? This action cannot be undone."
        isLoading={isLoading}
      />
    </>
  );
}
