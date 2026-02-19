'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createJob } from '@/lib/actions/job-actions';
import { JobType } from '@prisma/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { checkAdminAuth } from '@/lib/actions/cookies';
import TextEditor from '../text-editor';

interface CreateJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateJobDialog({ isOpen, onClose }: CreateJobDialogProps) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await checkAdminAuth();
      const token = response.token;
      if (!token) return;
      const result = await createJob(token, formData);

      if (result.status) {
        toast.success('Job created successfully');
        onClose();
        window.location.reload();
      } else {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            toast.error(`${field}: ${errors?.join(', ')}`);
          });
        } else {
          toast.error(result.message || 'Failed to create job');
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className='my-3'>Create New Job</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">
                Job Title<span className="text-red-500"> *</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Senior Full Stack Developer"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">
                Department<span className="text-red-500"> *</span>
              </Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                placeholder="e.g., Engineering"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">
                Location<span className="text-red-500"> *</span>
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g., Bangalore, India"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobType">
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
              <Label htmlFor="experience">
                Experience (years)<span className="text-red-500"> *</span>
              </Label>
              <Input
                id="experience"
                type="number"
                min="0"
                value={formData.experience}
                onChange={(e) => handleChange('experience', parseInt(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryStart">
                Salary Start (LPA)<span className="text-red-500"> *</span>
              </Label>
              <Input
                id="salaryStart"
                type="number"
                min="0"
                step="0.1"
                value={formData.salaryStartRange}
                onChange={(e) => handleChange('salaryStartRange', parseFloat(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryEnd">
                Salary End (LPA)<span className="text-red-500"> *</span>
              </Label>
              <Input
                id="salaryEnd"
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
            <Label htmlFor="positions">
              Number of Positions<span className="text-red-500"> *</span>
            </Label>
            <Input
              id="positions"
              type="number"
              min="1"
              value={formData.positions}
              onChange={(e) => handleChange('positions', parseInt(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Job Description<span className="text-red-500"> *</span>
            </Label>
            <TextEditor
              value={formData.description}
              onChange={(content) => handleChange('description', content)}
              height={250}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">
              Key Responsibilities<span className="text-red-500"> *</span>
            </Label>
            <TextEditor
              value={formData.responsibilities}
              onChange={(content) => handleChange('responsibilities', content)}
              height={250}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">
              Requirements<span className="text-red-500"> *</span>
            </Label>
            <TextEditor
              value={formData.requirements}
              onChange={(content) => handleChange('requirements', content)}
              height={250}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#21502c] hover:bg-[#3b864c]">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Job'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
