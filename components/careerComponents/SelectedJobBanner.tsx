interface SelectedJobBannerProps {
  job: {
    title: string;
    department: string;
    location: string;
    jobType: string;
  };
}

export function SelectedJobBanner({ job }: SelectedJobBannerProps) {
  const formatJobType = (type: string) => type.replace('_', ' ');

  return (
    <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <h4 className="font-bold text-slate-900">{job.title}</h4>
      <p className="mt-1 text-sm text-slate-600">
        {job.department} • {job.location} • {formatJobType(job.jobType)}
      </p>
    </div>
  );
}
