import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  experience: string;
  noticePeriod: string;
  startDate: string;
  endDate: string;
  currentCTC: string;
  expectedCTC: string;
  coverLetter: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  experience: '',
  noticePeriod: '',
  startDate: '',
  endDate: '',
  currentCTC: '',
  expectedCTC: '',
  coverLetter: '',
};

export function useCareerForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [currentWorking, setCurrentWorking] = useState(false);

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF or Word document');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should not exceed 5MB');
      return;
    }

    setResumeFile(file);
    toast.success('Resume uploaded successfully');
  }, []);

  const validateStep1 = useCallback((): boolean => {
    if (!formData.firstName.trim()) {
      toast.error('Please enter your first name');
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error('Please enter your last name');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if (!resumeFile) {
      toast.error('Please upload your resume');
      return false;
    }
    return true;
  }, [formData, resumeFile]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setResumeFile(null);
    setCurrentWorking(false);
  }, []);

  return {
    formData,
    resumeFile,
    currentWorking,
    setCurrentWorking,
    handleInputChange,
    handleFileChange,
    validateStep1,
    resetForm,
    setResumeFile,
  };
}
