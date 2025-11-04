/*
  Warnings:

  - A unique constraint covering the columns `[id_viterbit]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "CompanyJobs" (
    "id" SERIAL NOT NULL,
    "id_job" TEXT NOT NULL,
    "id_company_fk" INTEGER NOT NULL,

    CONSTRAINT "CompanyJobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_id_viterbit_key" ON "Candidate"("id_viterbit");

-- AddForeignKey
ALTER TABLE "CompanyJobs" ADD CONSTRAINT "CompanyJobs_id_company_fk_fkey" FOREIGN KEY ("id_company_fk") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
