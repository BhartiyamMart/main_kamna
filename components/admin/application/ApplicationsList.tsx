'use client';

import { useEffect, useState, useCallback } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { getApplications, getApplicationsByJobId } from '@/lib/actions/career-actions';
import { ApplicationFilters } from './ApplicationFilters';
import { ApplicationCard } from './ApplicationCard';

// Match Prisma enums
enum ApplicationStatus {
  APPLIED = 'APPLIED',
  SHORTLISTED = 'SHORTLISTED',
  INTERVIEW_SCHEDULED = 'INTERVIEW_SCHEDULED',
  REJECTED = 'REJECTED',
  HIRED = 'HIRED',
}

interface Application {
  id: string;
  jobId: string;

  // Candidate Info
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  startDate?: string | null;
  endDate?: string | null;
  currentWorking: boolean;

  // Professional Info
  experience?: number | null; // Int?
  currentCTC: number;         // Float
  expectedCTC: number;        // Float
  noticePeriod?: string | null;

  // Application
  resumeUrl: string;
  coverLetter?: string | null;
  status: ApplicationStatus;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Related job (only what you use here)
  job: {
    title: string;
    department: string;
  };
}

interface Filters {
  status?: ApplicationStatus | 'all';
  jobId?: string;
  isRead?: boolean;
}

export function ApplicationsList() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<Filters>({});

  useEffect(() => {
    fetchApplications();
  }, [pagination.page, filters]);

  const fetchApplications = useCallback(async () => {
    try {
      setIsLoading(true);

      let result;
      if (filters.jobId) {
        result = await getApplicationsByJobId(filters.jobId, pagination.page, pagination.pageSize);
      } else {
        result = await getApplications(pagination.page, pagination.pageSize);
      }

      if (result.success) {
        let filteredApps = (result.applications || []) as Application[];

        // status filter
        if (filters.status && filters.status !== 'all') {
          filteredApps = filteredApps.filter(
            (app) => app.status === filters.status
          );
        }

        // read / unread filter
        if (filters.isRead !== undefined) {
          filteredApps = filteredApps.filter(
            (app) => app.isRead === filters.isRead
          );
        }

        setApplications(filteredApps);
        setPagination((prev) => ({
          ...prev,
          ...result.pagination,
        }));
      } else {
        toast.error('Failed to fetch applications');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('An error occurred while fetching applications');
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.pageSize, filters]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleUpdate = () => {
    fetchApplications();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#21502c]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ApplicationFilters onFilterChange={handleFilterChange} />

      {applications.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">No applications found</h3>
          <p className="mt-2 text-sm text-slate-600">
            {filters.status || filters.jobId
              ? 'Try adjusting your filters'
              : 'Applications will appear here when candidates apply'}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onUpdate={handleUpdate}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <Button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  variant="outline"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-700">
                    Showing{' '}
                    <span className="font-medium">
                      {(pagination.page - 1) * pagination.pageSize + 1}
                    </span>{' '}
                    to{' '}
                    <span className="font-medium">
                      {Math.min(pagination.page * pagination.pageSize, pagination.total)}
                    </span>{' '}
                    of <span className="font-medium">{pagination.total}</span> results
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4 text-sm text-slate-700">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    variant="outline"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
