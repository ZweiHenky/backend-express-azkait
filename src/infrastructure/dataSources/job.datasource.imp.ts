import { setDefaultHighWaterMark } from "stream";
import { apiCreateJob, apiGetJobById, apiGetJobs, searchJobs } from "../../services/api/apiViterbit";
import { JobDataSource } from "../../domain/dataSources/job.datasource";
import { JobEntity } from "../../domain/entities/job.entity";
import { Responsejob } from "../responses/Jobs/job.response";
import { GetAllJobsReponse } from "../responses/Jobs/getAllJobs.response";
import { log } from "console";
import { CreateJobDto } from "../../domain/dtos/job/create-job";
import { prisma } from "../../data/postgres/db";
import { JobCompany } from "../../domain/entities/jobCompany.entity";


export class CreateJobDataSourceImp implements JobDataSource {

    //Crear un trabajo con el insert a la DB
    async createJob(job: CreateJobDto, id: number): Promise<JobCompany | null> {
       
    
        const companyExists = await prisma.company.findUnique({
            where: { userId_fk: id },
        });

        if (!companyExists) {
            throw new Error(`No existe una empresa con id = ${id}`);
        }
        
        const response = await apiCreateJob(job);
        console.log("Creating job with id: ", id);
        console.log(response);
        

        const jobCreated = await prisma.companyJobs.create({
            data: {
                id_job: response.id,
                id_company_fk: Number(companyExists.id)
            },
        })

        console.log(jobCreated);
        console.log("pasas");
        
        
        if (!jobCreated) {
            return null
        }
        return JobCompany.fromObject(jobCreated);

    }


    async getAll(page: number, pageSize: number): Promise<GetAllJobsReponse> {

        const response = await apiGetJobs(page, pageSize);
        const jobs: GetAllJobsReponse = {
            data: response.data.data,
            meta: response.data.meta
        };

        return jobs;
    }

    async getById(id: string): Promise<Responsejob | null> {

        const job: Responsejob = await apiGetJobById(id); // Fetch the job by ID

        return job;
    }

    async getAllSearch(page: number, pageSize: number, search: string): Promise<GetAllJobsReponse> {

        console.log(search);
        
        const jobs: GetAllJobsReponse = await searchJobs(page, pageSize, search);
        console.log(jobs);
        

        return jobs;
    }

    async getName(id: string): Promise<Responsejob | null> {

        const jobResponse = await apiGetJobById(id); // Fetch the job by ID
        const jobName = jobResponse.data.title; // Access the actual job data

        return jobName;

    }

    async getJobsByCompanyId(idCompany: number): Promise<JobCompany[]> {

        
        const jobs : JobCompany[] = await prisma.companyJobs.findMany({
            where: {
                id_company_fk: idCompany
            },
            
        });

        if (!jobs) {
            return [];
        }

        return jobs.map(job => JobCompany.fromObject(job));
    }


    async getCounterJobsByCompanyId(idCompany: number): Promise<number> {

        const count : number = await prisma.companyJobs.count({
            where: {
                id_company_fk: idCompany
            }
        });

        return count;
    }



}
