/*
  Warnings:

  - The primary key for the `Candidate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_candidate` on the `Candidate` table. All the data in the column will be lost.
  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_company` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `location_company` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `name_company` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `position_company` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `title_company` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `website_company` on the `Company` table. All the data in the column will be lost.
  - The primary key for the `ProfessionalProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_professionalProfile` on the `ProfessionalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `name_professionalProfile` on the `ProfessionalProfile` table. All the data in the column will be lost.
  - The primary key for the `Rol` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_rol` on the `Rol` table. All the data in the column will be lost.
  - You are about to drop the column `name_rol` on the `Rol` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email_validate_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `location_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pregunta_referencia_user` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ProfessionalProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Rol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pregunta_referencia` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_userId_fk_fkey";

-- DropForeignKey
ALTER TABLE "Candidate_ProfessionalProfile" DROP CONSTRAINT "Candidate_ProfessionalProfile_id_candidate_fk_fkey";

-- DropForeignKey
ALTER TABLE "Candidate_ProfessionalProfile" DROP CONSTRAINT "Candidate_ProfessionalProfile_id_professionalProfile_fk_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_userId_fk_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_rolId_fk_fkey";

-- DropIndex
DROP INDEX "User_email_user_key";

-- AlterTable
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_pkey",
DROP COLUMN "id_candidate",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
DROP COLUMN "id_company",
DROP COLUMN "location_company",
DROP COLUMN "name_company",
DROP COLUMN "position_company",
DROP COLUMN "title_company",
DROP COLUMN "website_company",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProfessionalProfile" DROP CONSTRAINT "ProfessionalProfile_pkey",
DROP COLUMN "id_professionalProfile",
DROP COLUMN "name_professionalProfile",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "ProfessionalProfile_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Rol" DROP CONSTRAINT "Rol_pkey",
DROP COLUMN "id_rol",
DROP COLUMN "name_rol",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Rol_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt_user",
DROP COLUMN "email_user",
DROP COLUMN "email_validate_user",
DROP COLUMN "id_user",
DROP COLUMN "lastName_user",
DROP COLUMN "location_user",
DROP COLUMN "name_user",
DROP COLUMN "password_user",
DROP COLUMN "phone_user",
DROP COLUMN "pregunta_referencia_user",
ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "email_validate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "pregunta_referencia" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rolId_fk_fkey" FOREIGN KEY ("rolId_fk") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_userId_fk_fkey" FOREIGN KEY ("userId_fk") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate_ProfessionalProfile" ADD CONSTRAINT "Candidate_ProfessionalProfile_id_candidate_fk_fkey" FOREIGN KEY ("id_candidate_fk") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate_ProfessionalProfile" ADD CONSTRAINT "Candidate_ProfessionalProfile_id_professionalProfile_fk_fkey" FOREIGN KEY ("id_professionalProfile_fk") REFERENCES "ProfessionalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fk_fkey" FOREIGN KEY ("userId_fk") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
