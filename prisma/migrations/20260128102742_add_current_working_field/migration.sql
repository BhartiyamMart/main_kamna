/*
  Warnings:

  - You are about to drop the column `department` on the `careers` table. All the data in the column will be lost.
  - You are about to drop the column `jobType` on the `careers` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `careers` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `careers` table. All the data in the column will be lost.
  - Added the required column `currentWorking` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobId` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentCTC` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedCTC` to the `careers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "careers" DROP COLUMN "department",
DROP COLUMN "jobType",
DROP COLUMN "location",
DROP COLUMN "position",
ADD COLUMN     "currentWorking" BOOLEAN NOT NULL,
ADD COLUMN     "endDate" TEXT,
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "jobId" UUID NOT NULL,
ADD COLUMN     "startDate" TEXT,
DROP COLUMN "currentCTC",
ADD COLUMN     "currentCTC" DOUBLE PRECISION NOT NULL,
DROP COLUMN "expectedCTC",
ADD COLUMN     "expectedCTC" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "jobs" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "jobType" "JobType" NOT NULL,
    "experience" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "responsibilities" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "salaryStartRange" DOUBLE PRECISION NOT NULL,
    "salaryEndRange" DOUBLE PRECISION NOT NULL,
    "positions" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "careers" ADD CONSTRAINT "careers_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
