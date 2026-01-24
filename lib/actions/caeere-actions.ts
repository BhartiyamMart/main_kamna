'use server';
import {prisma} from '@/lib/prisma';
import { Career, JobType, ApplicationStatus } from '@prisma/client';

/* CREATE Career */
export async function createCareer(data: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  position: string;
  department?: string;
  jobType: JobType;
  location?: string;
  experience?: number;
  currentCTC?: string;
  expectedCTC?: string;
  noticePeriod?: string;
  resumeUrl: string;
  coverLetter?: string;
}) {
  const career = await prisma.career.create({
    data: { ...data },
  });
  return career;
}

/* GET ALL Careers */
export async function getCareers() {
  return await prisma.career.findMany({ orderBy: { createdAt: 'desc' } });
}

/* GET Career BY ID */
export async function getCareerById(id: string) {
  return await prisma.career.findUnique({ where: { id } });
}

/* UPDATE Career */
export async function updateCareer(
  id: string,
  data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    position: string;
    department?: string;
    jobType?: JobType;
    location?: string;
    experience?: number;
    currentCTC?: string;
    expectedCTC?: string;
    noticePeriod?: string;
    resumeUrl?: string;
    coverLetter?: string;
    status?: ApplicationStatus;
  }>
) {
  return await prisma.career.update({
    where: { id },
    data,
  });
}

/* DELETE Career */
export async function deleteCareer(id: string) {
  return await prisma.career.delete({ where: { id } });
}
