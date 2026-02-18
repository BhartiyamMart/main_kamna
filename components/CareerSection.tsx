'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Briefcase } from 'lucide-react';
import { submitCareerApplication } from '@/lib/actions/career-actions';
import { getActiveJobs } from '@/lib/actions/job-actions';
import { useCareerForm } from '@/hooks/useCareerForm';
import { uploadResume } from '@/lib/utils/file-upload';
import { JobCard } from './careerComponents/JobCard';
import { SelectedJobBanner } from './careerComponents/SelectedJobBanner';
import { StepIndicator } from './careerComponents/StepIndicator';
import { PersonalInfoStep } from './careerComponents/PersonalStepInfo';
import { ProfessionalInfoStep } from './careerComponents/ProfessionalInfoStep';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  jobType: string;
  experience: number;
  salaryStartRange: number;
  salaryEndRange: number;
  positions: number;
  createdAt: Date;
  responsibilities: string[];
}

const STEP_KEY = 'career_current_step';
const JOB_KEY = 'career_selected_job';
const FORM_STORAGE_KEY = 'forma_data'

export function CareerSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // hydrate selectedJobId from localStorage
  const [selectedJobId, setSelectedJobId] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    try {
      return window.localStorage.getItem(JOB_KEY) || '';
    } catch {
      return '';
    }
  });

  const [jobs, setJobs] = useState<Job[]>([]);

  // hydrate currentStep from localStorage
  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const saved = window.localStorage.getItem(STEP_KEY);
      return saved ? Number(saved) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    formData,
    resumeFile,
    currentWorking,
    setCurrentWorking,
    handleInputChange,
    handleFileChange,
    validateStep1,
    resetForm,
  } = useCareerForm();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData]);
  // persist currentStep when it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STEP_KEY, String(currentStep));
    } catch {
      // ignore
    }
  }, [currentStep]);

  // persist selectedJobId when it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (selectedJobId) {
        window.localStorage.setItem(JOB_KEY, selectedJobId);
      } else {
        window.localStorage.removeItem(JOB_KEY);
      }
    } catch {
      // ignore
    }
  }, [selectedJobId]);

  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getActiveJobs();

      if (result.status && result.data) {
        const jobsList = result.data as Job[];
        setJobs(jobsList);

        // If no job selected yet and only one job exists, auto-select
        if (!selectedJobId && jobsList.length === 1) {
          setSelectedJobId(jobsList[0].id);
          setCurrentStep((prev) => (prev === 0 ? 1 : prev));
        }
      } else {
        console.error('Failed to fetch jobs:', result.message);
        setJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load job listings');
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedJobId]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleJobSelect = useCallback((jobId: string) => {
    setSelectedJobId(jobId);
    setCurrentStep(1);
  }, []);

  const handleNextStep = useCallback(() => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  }, [currentStep, validateStep1]);

  const handlePrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const currentCTC = parseFloat(formData.currentCTC);
        const expectedCTC = parseFloat(formData.expectedCTC);

        if (isNaN(currentCTC) || isNaN(expectedCTC)) {
          toast.error('Please enter valid CTC values');
          return;
        }

        if (!resumeFile) {
          toast.error('Please upload your resume');
          return;
        }

        const resumeUrl = await uploadResume(resumeFile);
        if (!resumeUrl) {
          toast.error('Failed to upload resume');
          return;
        }

        const data = {
          jobId: selectedJobId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          startDate: formData.startDate || undefined,
          endDate: currentWorking ? undefined : formData.endDate || undefined,
          currentWorking,
          experience: formData.experience ? parseInt(formData.experience) : undefined,
          currentCTC,
          expectedCTC,
          noticePeriod: formData.noticePeriod || undefined,
          resumeUrl,
          coverLetter: formData.coverLetter || undefined,
        };

        const result = await submitCareerApplication(data);

        if (result.success) {
          toast.success("Application submitted successfully! We'll review it soon.");
          resetForm();
          setSelectedJobId('');
          setCurrentStep(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          // clear persisted step & job
          if (typeof window !== 'undefined') {
            window.localStorage.removeItem(STEP_KEY);
            window.localStorage.removeItem(JOB_KEY);
          }
        } else {
          toast.error(result.message || 'Failed to submit application. Please try again.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        toast.error('An unexpected error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, resumeFile, currentWorking, selectedJobId, resetForm]
  );

  const departments = Array.from(new Set(jobs.map((job) => job.department)));

  const filteredJobs =
    selectedDepartment === 'All'
      ? jobs
      : jobs.filter((job) => job.department === selectedDepartment);

  const selectedJob = jobs?.find((job) => job.id === selectedJobId);

  return (
    <section id="careers" className="px-4 py-12 lg:px-20 lg:py-16">
      <div className="container mx-auto">
        <div className="mb-8 text-center lg:mb-12">
          <h2 className="mb-3 text-3xl font-bold text-slate-900 lg:mb-4 lg:text-4xl">
            Current Openings
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 lg:text-lg">
            Explore exciting career opportunities and join our growing team.
          </p>
        </div>

        {isLoading && (
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#21502c] border-r-transparent"></div>
            <p className="mt-4 text-slate-600">Loading job openings...</p>
          </div>
        )}

        {!isLoading && currentStep === 0 && (
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-xl font-bold text-slate-900 lg:text-2xl">
                Open Positions ({filteredJobs?.length || 0})
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Department:</span>
                <select
                  className="cursor-pointer rounded border border-slate-300 bg-white p-3 py-1 text-sm text-slate-800 focus:border-transparent focus:ring-2 focus:ring-[#21502c] focus:outline-none"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="All">All</option>
                  {departments.map((dep) => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {!jobs || jobs.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-white p-6 text-center lg:p-8">
                <Briefcase className="mx-auto mb-3 h-10 w-10 text-slate-400 lg:mb-4 lg:h-12 lg:w-12" />
                <p className="text-sm text-slate-600 lg:text-base">No open positions at the moment</p>
                <p className="mt-2 text-xs text-slate-500 lg:text-sm">
                  Check back soon for new opportunities!
                </p>
              </div>
            ) : (
              <div className="no-scrollbar h-[450px] space-y-3 overflow-y-auto pr-2 lg:space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} onSelect={handleJobSelect} />
                ))}
              </div>
            )}
          </div>
        )}

        {!isLoading && currentStep > 0 && (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 lg:p-12">
              {selectedJob && <SelectedJobBanner job={selectedJob} />}
              <StepIndicator currentStep={currentStep} />

              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                {currentStep === 1 && (
                  <PersonalInfoStep
                    formData={formData}
                    resumeFile={resumeFile}
                    fileInputRef={fileInputRef}
                    onInputChange={handleInputChange}
                    onFileChange={handleFileChange}
                    onNext={handleNextStep}
                    onBack={handlePrevStep}
                  />
                )}

                {currentStep === 2 && (
                  <ProfessionalInfoStep
                    formData={formData}
                    currentWorking={currentWorking}
                    isSubmitting={isSubmitting}
                    onInputChange={handleInputChange}
                    onCurrentWorkingChange={setCurrentWorking}
                    onBack={handlePrevStep}
                  />
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
