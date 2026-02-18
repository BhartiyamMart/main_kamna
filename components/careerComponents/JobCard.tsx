'use client';

import { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    description?: string | string[];
    responsibilities?: string[];
  };
  onSelect: (jobId: string) => void;
}

export function JobCard({ job, onSelect }: JobCardProps) {
  const [isResponsibilitiesExpanded, setIsResponsibilitiesExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const formatJobType = (type: string) => type.replace('_', ' ');
  const formatSalaryRange = (start: number, end: number) => `₹${start} - ${end} LPA`;

  // ✅ SAFE: Key Responsibilities
  const keyResponsibilities: string[] = (() => {
    if (job.responsibilities && Array.isArray(job.responsibilities)) {
      return job.responsibilities;
    }
    if (job.responsibilities) {
      return Array.isArray(job.responsibilities) ? job.responsibilities : [job.responsibilities as string];
    }
    return [
      'Develop responsive web applications with React/Next.js',
      'Build scalable RESTful APIs with NestJS/Node.js',
      'Implement authentication & payment integrations',
      'Optimize database queries with Prisma/PostgreSQL',
      'Deploy applications using Docker & cloud services',
    ];
  })();

  // ✅ SAFE: Job Description
  const jobDescriptionArray: string[] = (() => {
    if (job.description && !Array.isArray(job.description)) {
      return [job.description as string];
    }
    if (job.description && Array.isArray(job.description)) {
      return job.description;
    }
    return [
      'Join our dynamic team to build cutting-edge web applications using modern full-stack technologies.',
      'Work on scalable projects with React frontend and NestJS backend.',
      'Collaborate with experienced developers in a fast-paced environment.',
    ];
  })();

  return (
    <div
      className="group  rounded-lg border-2 border-slate-200 bg-white p-4 transition-all hover:border-[#21502c] hover:shadow-md lg:p-6"
      
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="text-base font-bold text-slate-900 lg:text-lg">{job.title}</h4>
          <p className="mt-1 text-xs text-slate-600 lg:text-sm">{job.department}</p>
        </div>
        <span className="flex-shrink-0 rounded-full bg-[#21502c] px-2 py-1 text-[10px] text-white lg:px-3 lg:text-xs">
          {formatJobType(job.jobType)}
        </span>
      </div>

      {/* Details Grid */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 lg:mt-4 lg:gap-4 lg:text-sm">
        <div className="flex items-center gap-1.5 lg:gap-2">
          <MapPin className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5 lg:gap-2">
          <Clock className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
          <span>{job.experience} years</span>
        </div>
        <div className="col-span-2 flex items-center gap-1.5 lg:gap-2">
          
          <span>{formatSalaryRange(job.salaryStartRange, job.salaryEndRange)}</span>
        </div>
      </div>

      {/* Positions info */}
      {job.positions > 1 && (
        <div className="mt-2 text-[10px] text-slate-500 lg:mt-3 lg:text-xs">{job.positions} positions available</div>
      )}

      {/* 1️⃣ Expandable Key Responsibilities */}
      <div className="mt-4 border-t border-slate-200 pt-4">
        <button
          className="flex w-full items-center justify-between gap-2 text-left transition-all lg:text-sm"
          onClick={(e) => {
            e.stopPropagation();
            setIsResponsibilitiesExpanded(!isResponsibilitiesExpanded);
          }}
          type="button"
        >
          <span className="font-medium text-slate-900">Key Responsibilities</span>
          {isResponsibilitiesExpanded ? (
            <ChevronUp className="h-4 w-4 shrink-0 cursor-pointer text-slate-500 transition-transform" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 cursor-pointer text-slate-500 transition-transform group-hover:scale-110" />
          )}
        </button>

        <div
          className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
            isResponsibilitiesExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="space-y-1.5 text-xs text-slate-600 lg:text-sm">
            {keyResponsibilities.map((resp, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#21502c]"></span>
                <span className="leading-relaxed">{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2️⃣ NEW: Expandable Job Description */}
      <div className="mt-4 border-t border-slate-200 pt-4">
        <button
          className="flex w-full items-center justify-between gap-2 text-left transition-all lg:text-sm"
          onClick={(e) => {
            e.stopPropagation();
            setIsDescriptionExpanded(!isDescriptionExpanded);
          }}
          type="button"
        >
          <span className="font-medium text-slate-900">Job Description</span>
          {isDescriptionExpanded ? (
            <ChevronUp className="h-4 w-4 shrink-0 cursor-pointer text-slate-500 transition-transform" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 cursor-pointer text-slate-500 transition-transform group-hover:scale-110" />
          )}
        </button>

        <div
          className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
            isDescriptionExpanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="prose prose-sm max-w-none text-xs text-slate-700 lg:text-sm">
            {jobDescriptionArray.map((desc, index) => (
              <p key={index} className="mb-3 leading-relaxed last:mb-0">
                {desc}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <Button onClick={() => onSelect(job.id)} className="mt-6 w-full cursor-pointer bg-[#21502c] hover:bg-[#3b864c]">
        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
