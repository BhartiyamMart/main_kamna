import { CreateJobButton } from '@/components/admin/job/CreateJobButton';
import { JobsList } from '@/components/admin/job/JobList';
import { Suspense } from 'react';

export default function AdminJobsPage() {
  return (
    <div className="container mx-auto px-4 py-18">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Job Management</h1>
          <p className="mt-2 text-slate-600">Manage job postings and applications</p>
        </div>
        <CreateJobButton />
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
