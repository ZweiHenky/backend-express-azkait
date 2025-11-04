/*
  Warnings:

  - You are about to drop the column `sector` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `pregunta_referencia` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sector_id]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sector_id` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_reference_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "sector",
ADD COLUMN     "sector_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pregunta_referencia",
ADD COLUMN     "question_reference_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Sector" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionRef" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "QuestionRef_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_sector_id_key" ON "Company"("sector_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_question_reference_id_fkey" FOREIGN KEY ("question_reference_id") REFERENCES "QuestionRef"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
