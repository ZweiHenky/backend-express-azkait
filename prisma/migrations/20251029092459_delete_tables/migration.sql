/*
  Warnings:

  - You are about to drop the column `currencyId` on the `CompanyJobs` table. All the data in the column will be lost.
  - You are about to drop the column `periodicityId` on the `CompanyJobs` table. All the data in the column will be lost.
  - You are about to drop the column `salaryMin` on the `CompanyJobs` table. All the data in the column will be lost.
  - You are about to drop the column `salaryalaryMax` on the `CompanyJobs` table. All the data in the column will be lost.
  - You are about to drop the column `workScheduleId` on the `CompanyJobs` table. All the data in the column will be lost.
  - You are about to drop the `Currency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalaryPeriodicity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkSchedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompanyJobs" DROP CONSTRAINT "CompanyJobs_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyJobs" DROP CONSTRAINT "CompanyJobs_periodicityId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyJobs" DROP CONSTRAINT "CompanyJobs_workScheduleId_fkey";

-- DropIndex
DROP INDEX "CompanyJobs_currencyId_idx";

-- DropIndex
DROP INDEX "CompanyJobs_periodicityId_idx";

-- DropIndex
DROP INDEX "CompanyJobs_workScheduleId_idx";

-- AlterTable
ALTER TABLE "CompanyJobs" DROP COLUMN "currencyId",
DROP COLUMN "periodicityId",
DROP COLUMN "salaryMin",
DROP COLUMN "salaryalaryMax",
DROP COLUMN "workScheduleId";

-- DropTable
DROP TABLE "Currency";

-- DropTable
DROP TABLE "SalaryPeriodicity";

-- DropTable
DROP TABLE "WorkSchedule";
