-- AlterTable
ALTER TABLE "CompanyJobs" ADD COLUMN     "currencyId" INTEGER,
ADD COLUMN     "periodicityId" INTEGER,
ADD COLUMN     "salaryMin" DECIMAL(65,30),
ADD COLUMN     "salaryalaryMax" DECIMAL(65,30),
ADD COLUMN     "workScheduleId" INTEGER;

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalaryPeriodicity" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalaryPeriodicity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkSchedule" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "SalaryPeriodicity_code_key" ON "SalaryPeriodicity"("code");

-- CreateIndex
CREATE UNIQUE INDEX "WorkSchedule_code_key" ON "WorkSchedule"("code");

-- CreateIndex
CREATE INDEX "CompanyJobs_currencyId_idx" ON "CompanyJobs"("currencyId");

-- CreateIndex
CREATE INDEX "CompanyJobs_periodicityId_idx" ON "CompanyJobs"("periodicityId");

-- CreateIndex
CREATE INDEX "CompanyJobs_workScheduleId_idx" ON "CompanyJobs"("workScheduleId");

-- AddForeignKey
ALTER TABLE "CompanyJobs" ADD CONSTRAINT "CompanyJobs_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyJobs" ADD CONSTRAINT "CompanyJobs_periodicityId_fkey" FOREIGN KEY ("periodicityId") REFERENCES "SalaryPeriodicity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyJobs" ADD CONSTRAINT "CompanyJobs_workScheduleId_fkey" FOREIGN KEY ("workScheduleId") REFERENCES "WorkSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
