'use server';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from './blog-actions';
import { JobType } from '@prisma/client';
import {
  CreateJobInput,
  JobFilterInput,
  JobFilterSchema,
  JobSchema,
  UpdateJobInput,
} from '../validations/job.validation';
import { ApiResponse } from '../types/api-types';
import { isValidUUID, validatePartialSchema, validateSchema } from '../utils/validation.utils';
import { handleError } from '../utils/error-handler';
import { ApiError, BadRequestError, NotFoundError } from '../errors/api-errors';

// ============================================
// JOB CRUD OPERATIONS
// ============================================

/**
 * Create a new job posting
 * @requires Admin authentication
 */
export async function createJob(token: string, data: CreateJobInput): Promise<ApiResponse> {
  try {
    await requireAdmin(token);
    const validatedData = validateSchema(JobSchema, data);

    const job = await prisma.job.create({
      data: validatedData,
      select: {
        id: true,
        title: true,
        department: true,
        jobType: true,
        isActive: true,
        createdAt: true,
      },
    });

    return {
      status: 201,
      message: 'Job created successfully',
      data: job,
    };
  } catch (error) {
    return handleError(error, 'createJob');
  }
}

/**
 * Get all jobs with filtering and pagination
 */
export async function getAllJobs(params?: JobFilterInput): Promise<ApiResponse> {
  try {
    const validatedParams = validateSchema(JobFilterSchema, params ?? {});
    const { page, limit, ...filters } = validatedParams;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (filters.isActive !== undefined) where.isActive = filters.isActive;
    if (filters.department) where.department = filters.department;
    if (filters.jobType) where.jobType = filters.jobType;

    const [jobs, totalCount] = await Promise.all([
      prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          department: true,
          location: true,
          jobType: true,
          experience: true,
          salaryStartRange: true,
          salaryEndRange: true,
          positions: true,
          isActive: true,
          createdAt: true,
          _count: { select: { applications: true } },
        },
      }),
      prisma.job.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      status: 200,
      message: 'Jobs fetched successfully',
      data: {
        jobs,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    };
  } catch (error) {
    return handleError(error, 'getAllJobs');
  }
}

/**
 * Get active jobs (public endpoint)
 */
export async function getActiveJobs(): Promise<ApiResponse> {
  try {
    const jobs = await prisma.job.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        department: true,
        location: true,
        jobType: true,
        experience: true,
        description: true,
        responsibilities: true,
        requirements: true,
        salaryStartRange: true,
        salaryEndRange: true,
        positions: true,
        createdAt: true,
      },
    });

    return {
      status: 200,
      message: `Found ${jobs.length} active job${jobs.length !== 1 ? 's' : ''}`,
      data: jobs,
    };
  } catch (error) {
    return handleError(error, 'getActiveJobs');
  }
}

/**
 * Get job by ID
 */
export async function getJobById(jobId: string): Promise<ApiResponse> {
  try {
    if (!isValidUUID(jobId)) {
      throw new BadRequestError('Invalid job ID format');
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { _count: { select: { applications: true } } },
    });

    if (!job) throw new NotFoundError('Job');

    return {
      status: 200,
      message: 'Job fetched successfully',
      data: job,
    };
  } catch (error) {
    return handleError(error, 'getJobById');
  }
}

/**
 * Update job
 * @requires Admin authentication
 */
export async function updateJob(token: string, jobId: string, data: UpdateJobInput): Promise<ApiResponse> {
  try {
    await requireAdmin(token);

    if (!isValidUUID(jobId)) {
      throw new BadRequestError('Invalid job ID format');
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestError('No data provided for update');
    }

    // Validate partial data
    const validatedData = validatePartialSchema(JobSchema, data);

    // Manual salary range validation if both values are provided
    if (
      validatedData.salaryStartRange !== undefined &&
      validatedData.salaryStartRange !== null &&
      validatedData.salaryEndRange !== undefined &&
      validatedData.salaryEndRange !== null
    ) {
      if (validatedData.salaryEndRange < validatedData.salaryStartRange) {
        throw new BadRequestError('Salary end range must be greater than or equal to start range');
      }
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: validatedData,
      select: {
        id: true,
        title: true,
        department: true,
        isActive: true,
        updatedAt: true,
      },
    });

    return {
      status: 200,
      message: 'Job updated successfully',
      data: updatedJob,
    };
  } catch (error) {
    return handleError(error, 'updateJob');
  }
}

/**
 * Toggle job status
 * @requires Admin authentication
 */
export async function toggleJobStatus(token: string, jobId: string): Promise<ApiResponse> {
  try {
    await requireAdmin(token);

    if (!isValidUUID(jobId)) {
      throw new BadRequestError('Invalid job ID format');
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { isActive: true },
    });

    if (!job) throw new NotFoundError('Job');

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: { isActive: !job.isActive },
      select: { id: true, title: true, isActive: true },
    });

    return {
      status: 200,
      message: `Job ${updatedJob.isActive ? 'activated' : 'deactivated'} successfully`,
      data: updatedJob,
    };
  } catch (error) {
    return handleError(error, 'toggleJobStatus');
  }
}

/**
 * Delete job (soft/hard delete)
 * @requires Admin authentication
 */
export async function deleteJob(token: string, jobId: string, hardDelete: boolean = false): Promise<ApiResponse> {
  try {
    await requireAdmin(token);

    if (!isValidUUID(jobId)) {
      throw new BadRequestError('Invalid job ID format');
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { _count: { select: { applications: true } } },
    });

    if (!job) throw new NotFoundError('Job');

    if (hardDelete && job._count.applications > 0) {
      throw new ApiError(
        400,
        `Cannot delete job with ${job._count.applications} application(s). Use soft delete instead.`,
        'HAS_APPLICATIONS'
      );
    }

    if (hardDelete) {
      await prisma.job.delete({ where: { id: jobId } });
      return {
        status: 200,
        message: 'Job permanently deleted',
      };
    }

    await prisma.job.update({
      where: { id: jobId },
      data: { isActive: false },
    });

    return {
      status: 200,
      message: 'Job deactivated successfully',
    };
  } catch (error) {
    return handleError(error, 'deleteJob');
  }
}

/**
 * Get job statistics
 * @requires Admin authentication
 */
export async function getJobStatistics(token: string): Promise<ApiResponse> {
  try {
    await requireAdmin(token);

    const [totalJobs, activeJobs, totalApplications, applicationsByStatus] = await Promise.all([
      prisma.job.count(),
      prisma.job.count({ where: { isActive: true } }),
      prisma.application.count(),
      prisma.application.groupBy({ by: ['status'], _count: true }),
    ]);

    return {
      status: 200,
      message: 'Statistics fetched successfully',
      data: {
        totalJobs,
        activeJobs,
        inactiveJobs: totalJobs - activeJobs,
        totalApplications,
        applicationsByStatus: applicationsByStatus.map((item) => ({
          status: item.status,
          count: item._count,
        })),
      },
    };
  } catch (error) {
    return handleError(error, 'getJobStatistics');
  }
}
