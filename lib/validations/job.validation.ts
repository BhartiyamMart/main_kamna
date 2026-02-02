import { z } from 'zod';
import { JobType } from '@prisma/client';

// Base schema without refinements
export const BaseJobSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  department: z.string().min(2, 'Department is required').max(100),
  location: z.string().min(2, 'Location is required').max(100),
  jobType: z.nativeEnum(JobType),
  experience: z.number().min(0, 'Experience must be positive').max(50),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  responsibilities: z.string().min(50, 'Responsibilities must be at least 50 characters'),
  requirements: z.string().min(50, 'Requirements must be at least 50 characters'),
  salaryStartRange: z.number().positive('Salary start range must be positive'),
  salaryEndRange: z.number().positive('Salary end range must be positive'),
  positions: z.number().int().positive('Positions must be at least 1').default(1),
  isActive: z.boolean().default(true),
});

// Full schema with refinement for creating jobs
export const JobSchema = BaseJobSchema.refine((data) => data.salaryEndRange >= data.salaryStartRange, {
  message: 'Salary end range must be greater than or equal to start range',
  path: ['salaryEndRange'],
});

// Partial schema for updates (without refinement)
export const JobUpdateSchema = BaseJobSchema.partial();

export const JobIdSchema = z
  .string()
  .uuid('Invalid job ID format')
  .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'Invalid UUID format');

export const JobFilterSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  isActive: z.boolean().optional(),
  department: z.string().optional(),
  jobType: z.nativeEnum(JobType).optional(),
});

export type CreateJobInput = z.infer<typeof JobSchema>;
export type UpdateJobInput = z.infer<typeof JobUpdateSchema>;
export type JobFilterInput = z.infer<typeof JobFilterSchema>;
