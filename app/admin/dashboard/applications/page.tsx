import { ApplicationsList } from '@/components/admin/application/ApplicationsList';
import { Suspense } from 'react';

export default function AdminApplicationsPage() {
  return (
    <div className="container h-full mx-auto px-4 py-18 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Job Applications</h1>
        <p className="mt-2 text-slate-600">Manage and review job applications</p>
      </div>

      <Suspense fallback={<ApplicationsListSkeleton />}>
        <ApplicationsList />
      </Suspense>
    </div>
  );
}

function ApplicationsListSkeleton() {
  return (
    <div className="">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-40 animate-pulse rounded-lg bg-slate-200" />
      ))}
    </div>
  );
}
