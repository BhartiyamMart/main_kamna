'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Calendar } from 'lucide-react';
import { FormData } from '@/hooks/useCareerForm';

interface ProfessionalInfoStepProps {
  formData: FormData;
  currentWorking: boolean;
  isSubmitting: boolean;
  onInputChange: (field: keyof FormData, value: string) => void;
  onCurrentWorkingChange: (checked: boolean) => void;
  onBack: () => void;
}

export function ProfessionalInfoStep({
  formData,
  currentWorking,
  isSubmitting,
  onInputChange,
  onCurrentWorkingChange,
  onBack,
}: ProfessionalInfoStepProps) {
  return (
    <div className="space-y-4 lg:space-y-6">
      <h3 className="text-xl font-bold text-slate-900 lg:text-2xl">Professional Information</h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-900" htmlFor="experience">
            Total Experience (years)
          </label>
          <Input
            id="experience"
            type="number"
            min="0"
            step="1"
            value={formData.experience}
            onChange={(e) => onInputChange('experience', e.target.value)}
            placeholder="e.g., 3"
            className="border-transparent bg-slate-50 focus:bg-white"
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-900" htmlFor="notice-period">
            Notice Period
          </label>
          <Input
            id="notice-period"
            value={formData.noticePeriod}
            onChange={(e) => onInputChange('noticePeriod', e.target.value)}
            placeholder="e.g., 30 days"
            className="border-transparent bg-slate-50 focus:bg-white"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3 lg:space-y-4 lg:p-4">
        <h4 className="text-sm font-bold text-slate-900">Previous Organization</h4>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="current-working"
            checked={currentWorking}
            onCheckedChange={(checked) => onCurrentWorkingChange(checked as boolean)}
            disabled={isSubmitting}
          />
          <label
            htmlFor="current-working"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I am currently working here
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900" htmlFor="start-date">
              Start Date
            </label>
            <div className="relative">
              <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="start-date"
                type="month"
                value={formData.startDate}
                onChange={(e) => onInputChange('startDate', e.target.value)}
                className="border-transparent bg-white pl-10 focus:bg-white"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900" htmlFor="end-date">
              End Date
            </label>
            <div className="relative">
              <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="end-date"
                type="month"
                value={formData.endDate}
                onChange={(e) => onInputChange('endDate', e.target.value)}
                className="border-transparent bg-white pl-10 focus:bg-white"
                disabled={isSubmitting || currentWorking}
              />
            </div>
            {currentWorking && <p className="text-xs text-slate-500">End date disabled (currently working)</p>}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-900" htmlFor="current-ctc">
            Current CTC (LPA)<span className="text-red-500"> *</span>
          </label>
          <Input
            id="current-ctc"
            type="number"
            min="0"
            step="0.1"
            value={formData.currentCTC}
            onChange={(e) => onInputChange('currentCTC', e.target.value)}
            placeholder="e.g., 5.5"
            className="border-transparent bg-slate-50 focus:bg-white"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-900" htmlFor="expected-ctc">
            Expected CTC (LPA)<span className="text-red-500"> *</span>
          </label>
          <Input
            id="expected-ctc"
            type="number"
            min="0"
            step="0.1"
            value={formData.expectedCTC}
            onChange={(e) => onInputChange('expectedCTC', e.target.value)}
            placeholder="e.g., 7.0"
            className="border-transparent bg-slate-50 focus:bg-white"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-900" htmlFor="cover-letter">
          Cover Letter (Optional)
        </label>
        <Textarea
          id="cover-letter"
          value={formData.coverLetter}
          onChange={(e) => onInputChange('coverLetter', e.target.value)}
          placeholder="Tell us why you're a great fit for this role..."
          className="min-h-[100px] resize-none border-transparent bg-slate-50 focus:bg-white lg:min-h-[120px]"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" onClick={onBack} variant="outline" className="flex-1" disabled={isSubmitting}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-1 bg-[#21502c] hover:bg-[#3b864c]">
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit Application'
          )}
        </Button>
      </div>
    </div>
  );
}
