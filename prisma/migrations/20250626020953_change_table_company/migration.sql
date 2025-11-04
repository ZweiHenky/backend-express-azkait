/*
  Warnings:

  - You are about to drop the column `location` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "location",
DROP COLUMN "position";
