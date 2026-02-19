import { CreateJobButton } from '@/components/admin/job/CreateJobButton';
import { JobsList } from '@/components/admin/job/JobList';
import { Suspense } from 'react';

export default function AdminJobsPage() {
  return (
    <div className="container mx-auto px-4 py-18 h-full bg-gray-50">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-md md:text-3xl font-bold text-slate-900">Job Management</h1>
          <CreateJobButton />
        </div>
        <p className="text-sm md:text-lg mt-1 text-slate-600">Manage job postings and applications</p>
      </div>

      <Suspense fallback={<JobsListSkeleton />}>
        <JobsList />
      </Suspense>
    </div>
  );
}

function JobsListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 animate-pulse rounded-lg bg-slate-200" />
      ))}
    </div>
  );
}
