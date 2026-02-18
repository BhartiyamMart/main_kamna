'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { updateJob } from '@/lib/actions/job-actions';
import { JobType } from '@prisma/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface EditJobDialogProps {
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
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditJobDialog({ job, isOpen, onClose, onSuccess }: EditJobDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    jobType: 'FULL_TIME' as JobType,
    experience: 0,
    description: '',
    responsibilities: '',
    requirements: '',
    salaryStartRange: 0,
    salaryEndRange: 0,
    positions: 1,
    isActive: true,
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        department: job.department,
        location: job.location,
        jobType: job.jobType as JobType,
        experience: job.experience,
        description: '',
        responsibilities: '',
        requirements: '',
        salaryStartRange: job.salaryStartRange,
        salaryEndRange: job.salaryEndRange,
        positions: job.positions,
        isActive: job.isActive,
      });
    }
  }, [job]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('adminToken') || '';

      // Only send fields that have been changed
      const updateData: any = {};
      if (formData.title !== job.title) updateData.title = formData.title;
      if (formData.department !== job.department) updateData.department = formData.department;
      if (formData.location !== job.location) updateData.location = formData.location;
      if (formData.jobType !== job.jobType) updateData.jobType = formData.jobType;
      if (formData.experience !== job.experience) updateData.experience = formData.experience;
      if (formData.salaryStartRange !== job.salaryStartRange) updateData.salaryStartRange = formData.salaryStartRange;
      if (formData.salaryEndRange !== job.salaryEndRange) updateData.salaryEndRange = formData.salaryEndRange;
      if (formData.positions !== job.positions) updateData.positions = formData.positions;
      if (formData.isActive !== job.isActive) updateData.isActive = formData.isActive;
      if (formData.description) updateData.description = formData.description;
      if (formData.responsibilities) updateData.responsibilities = formData.responsibilities;
      if (formData.requirements) updateData.requirements = formData.requirements;

      const result = await updateJob(token, job.id, updateData);

      if (result.status) {
        toast.success('Job updated successfully');
        onSuccess();
        onClose();
      } else {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            toast.error(`${field}: ${errors?.join(', ')}`);
          });
        } else {
          toast.error(result.message || 'Failed to update job');
        }
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-title">
                Job Title<span className="text-red-500"> *</span>
              </Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Senior Full Stack Developer"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-department">
                Department<span className="text-red-500"> *</span>
              </Label>
              <Input
                id="edit-department"
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                placeholder="e.g., Engineering"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-location">
                Location<span className="text-red-500"> *</span>
              </Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g., Bangalore, India"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-jobType">
                Job Type<span className="text-red-500"> *</span>
              </Label>
              <Select value={formData.jobType} onValueChange={(value) => handleChange('jobType', value as JobType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full_Time">Full Time</SelectItem>
                  <SelectItem value="Part_Time">Part Time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="edit-experience">
                Experience (years)<span className="text-red-500"> *</span>
              </Label>
              <Input
                id="edit-experience"
                type="number"
                min="0"
                value={formData.experience}
                onChange={(e) => handleChange('experience', parseInt(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-salaryStart">
                Salary Start (LPA)<span className="text-red-500"> *</span>
              </Label>
              <Input
                id="edit-salaryStart"
                type="number"
                min="0"
                step="0.1"
                value={formData.salaryStartRange}
                onChange={(e) => handleChange('salaryStartRange', parseFloat(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-salaryEnd">
                Salary End (LPA)<span className="text-red-500"> *</span>
              </Label>
              <Input
                id="edit-salaryEnd"
                type="number"
                min="0"
                step="0.1"
                value={formData.salaryEndRange}
                onChange={(e) => handleChange('salaryEndRange', parseFloat(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-positions">
              Number of Positions<span className="text-red-500"> *</span>
            </Label>
            <Input
              id="edit-positions"
              type="number"
              min="1"
              value={formData.positions}
              onChange={(e) => handleChange('positions', parseInt(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Job Description (Optional)</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Update job description..."
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-responsibilities">Key Responsibilities (Optional)</Label>
            <Textarea
              id="edit-responsibilities"
              value={formData.responsibilities}
              onChange={(e) => handleChange('responsibilities', e.target.value)}
              placeholder="Update responsibilities..."
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-requirements">Requirements (Optional)</Label>
            <Textarea
              id="edit-requirements"
              value={formData.requirements}
              onChange={(e) => handleChange('requirements', e.target.value)}
              placeholder="Update requirements..."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="edit-isActive"
              checked={formData.isActive}
              onChange={(e) => handleChange('isActive', e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            <Label htmlFor="edit-isActive" className="cursor-pointer">
              Active Job Posting
            </Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#21502c] hover:bg-[#3b864c]">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Job'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
