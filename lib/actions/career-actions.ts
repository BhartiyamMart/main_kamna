'use server';

import { sendCareerApplicationEmail } from '@/lib/mail';
import { prisma } from '@/lib/prisma';

// ============================================
// APPLICATION ACTIONS
// ============================================

interface CareerApplicationData {
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  startDate?: string;
  endDate?: string;
  currentWorking: boolean;
  experience?: number;
  currentCTC: number;
  expectedCTC: number;
  noticePeriod?: string;
  resumeUrl: string;
  coverLetter?: string;
}

export async function submitCareerApplication(data: CareerApplicationData) {
  try {
    console.log('Starting career application submission...');

    // Get job details
    const job = await prisma.job.findUnique({
      where: { id: data.jobId },
    });

    if (!job) {
      return {
        success: false,
        message: 'Job not found',
      };
    }

    if (!job.isActive) {
      return {
        success: false,
        message: 'This job posting is no longer active',
      };
    }

    // Store in database
    const application = await prisma.application.create({
      data: {
        jobId: data.jobId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        startDate: data.startDate,
        endDate: data.endDate,
        currentWorking: data.currentWorking,
        experience: data.experience,
        currentCTC: data.currentCTC,
        expectedCTC: data.expectedCTC,
        noticePeriod: data.noticePeriod,
        resumeUrl: data.resumeUrl,
        coverLetter: data.coverLetter,
        status: 'APPLIED',
        isRead: false,
      },
    });

    console.log('Application saved to database:', application.id);

    // Send email notification
    console.log('Attempting to send email...');
    const emailResult = await sendCareerApplicationEmail({
      ...data,
      jobTitle: job.title,
      department: job.department,
    });

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
    } else {
      console.log('Email sent successfully');
    }

    return {
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id,
    };
  } catch (error) {
    console.error('Error submitting application:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit application',
    };
  }
}

export async function getApplications(page: number = 1, pageSize: number = 10) {
  try {
    const skip = (page - 1) * pageSize;

    const [applications, totalCount] = await Promise.all([
      prisma.application.findMany({
        skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          job: {
            select: {
              title: true,
              department: true,
            },
          },
        },
      }),
      prisma.application.count(),
    ]);

    return {
      success: true,
      applications,
      pagination: {
        total: totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching applications:', error);
    return {
      success: false,
      error: 'Failed to fetch applications',
      applications: [],
      pagination: { total: 0, page: 1, pageSize: 10, totalPages: 0 },
    };
  }
}

export async function getApplicationById(id: string) {
  try {
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: true,
      },
    });

    if (!application) {
      return {
        success: false,
        error: 'Application not found',
      };
    }

    return {
      success: true,
      application,
    };
  } catch (error) {
    console.error('Error fetching application:', error);
    return {
      success: false,
      error: 'Failed to fetch application',
    };
  }
}

export async function getApplicationsByJobId(jobId: string, page: number = 1, pageSize: number = 10) {
  try {
    const skip = (page - 1) * pageSize;

    const [applications, totalCount] = await Promise.all([
      prisma.application.findMany({
        where: { jobId },
        skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          job: {
            select: {
              title: true,
              department: true,
            },
          },
        },
      }),
      prisma.application.count({
        where: { jobId },
      }),
    ]);

    return {
      success: true,
      applications,
      pagination: {
        total: totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching applications:', error);
    return {
      success: false,
      error: 'Failed to fetch applications',
      applications: [],
      pagination: { total: 0, page: 1, pageSize: 10, totalPages: 0 },
    };
  }
}

export async function updateApplicationStatus(
  id: string,
  status: 'APPLIED' | 'SHORTLISTED' | 'INTERVIEW_SCHEDULED' | 'REJECTED' | 'HIRED'
) {
  try {
    const application = await prisma.application.update({
      where: { id },
      data: { status },
    });

    return {
      success: true,
      application,
      message: 'Application status updated successfully',
    };
  } catch (error) {
    console.error('Error updating application status:', error);
    return {
      success: false,
      error: 'Failed to update application',
    };
  }
}

export async function markApplicationAsRead(id: string) {
  try {
    const application = await prisma.application.update({
      where: { id },
      data: { isRead: true },
    });

    return {
      success: true,
      application,
    };
  } catch (error) {
    console.error('Error marking application as read:', error);
    return {
      success: false,
      error: 'Failed to update application',
    };
  }
}

export async function markApplicationAsUnread(id: string) {
  try {
    const application = await prisma.application.update({
      where: { id },
      data: { isRead: false },
    });

    return {
      success: true,
      application,
    };
  } catch (error) {
    console.error('Error marking application as unread:', error);
    return {
      success: false,
      error: 'Failed to update application',
    };
  }
}

export async function deleteApplication(id: string) {
  try {
    await prisma.application.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Application deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting application:', error);
    return {
      success: false,
      error: 'Failed to delete application',
    };
  }
}

// ============================================
// STATISTICS ACTIONS
// ============================================

export async function getJobStatistics() {
  try {
    const [totalJobs, activeJobs, totalApplications] = await Promise.all([
      prisma.job.count(),
      prisma.job.count({ where: { isActive: true } }),
      prisma.application.count(),
    ]);

    const applicationsByStatus = await prisma.application.groupBy({
      by: ['status'],
      _count: true,
    });

    return {
      success: true,
      statistics: {
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
    console.error('Error fetching statistics:', error);
    return {
      success: false,
      error: 'Failed to fetch statistics',
    };
  }
}

export async function getApplicationStatisticsByJob(jobId: string) {
  try {
    const [totalApplications, applicationsByStatus] = await Promise.all([
      prisma.application.count({ where: { jobId } }),
      prisma.application.groupBy({
        by: ['status'],
        where: { jobId },
        _count: true,
      }),
    ]);

    return {
      success: true,
      statistics: {
        totalApplications,
        applicationsByStatus: applicationsByStatus.map((item) => ({
          status: item.status,
          count: item._count,
        })),
      },
    };
  } catch (error) {
    console.error('Error fetching application statistics:', error);
    return {
      success: false,
      error: 'Failed to fetch statistics',
    };
  }
}
