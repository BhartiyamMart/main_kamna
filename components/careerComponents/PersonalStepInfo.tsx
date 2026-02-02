'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react';
import { FormData } from '@/hooks/useCareerForm';
import { RefObject } from 'react';

interface PersonalInfoStepProps {
  formData: FormData;
  resumeFile: File | null;
  fileInputRef: RefObject<HTMLInputElement | null>; // ✅ Allow null
  onInputChange: (field: keyof FormData, value: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PersonalInfoStep({
  formData,
  resumeFile,
  fileInputRef,
  onInputChange,
  onFileChange,
  onNext,
  onBack,
}: PersonalInfoStepProps) {
  return (
    <div className="space-y-4 lg:space-y-6">
      <h3 className="text-xl font-bold text-slate-900 lg:text-2xl">Personal Information</h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-900" htmlFor="first-name">
            First Name<span className="text-red-500"> *</span>
          </label>
          <Input
            id="first-name"
            value={formData.firstName}
            onChange={(e) => onInputChange('firstName', e.target.value)}
            placeholder="First Name"
            className="border-transparent bg-slate-50 focus:bg-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-900" htmlFor="last-name">
            Last Name<span className="text-red-500"> *</span>
          </label>
          <Input
            id="last-name"
            value={formData.lastName}
            onChange={(e) => onInputChange('lastName', e.target.value)}
            placeholder="Last Name"
            className="border-transparent bg-slate-50 focus:bg-white"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-900" htmlFor="email">
            Email<span className="text-red-500"> *</span>
          </label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
            className="border-transparent bg-slate-50 focus:bg-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-900" htmlFor="mobile">
            Mobile<span className="text-red-500"> *</span>
          </label>
          <Input
            id="mobile"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => onInputChange('phoneNumber', e.target.value)}
            placeholder="+91 9876543210"
            className="border-transparent bg-slate-50 focus:bg-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-900" htmlFor="resume">
          Upload Resume<span className="text-red-500"> *</span> (PDF or Word, Max 5MB)
        </label>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Input
            ref={fileInputRef}
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={onFileChange}
            className="flex-1 border-transparent bg-slate-50 focus:bg-white"
          />
          {resumeFile && <Upload className="h-5 w-5 flex-shrink-0 text-green-600" />}
        </div>
        {resumeFile && <p className="text-sm text-green-600">✓ {resumeFile.name}</p>}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" onClick={onBack} variant="outline" className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="button" onClick={onNext} className="flex-1 bg-[#21502c] hover:bg-[#3b864c]">
          Next Step <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
