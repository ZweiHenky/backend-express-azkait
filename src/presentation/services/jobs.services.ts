import { apiGetDepartmentById, apiGetJobById, apiGetJobs, apiGetLocationById, apiGetProfileDepartmentById, searchJobs } from "../../services/api/apiViterbit";
import { Request } from "express";
import { JobEntity } from "../../domain/entities/job.entity";
import { JobRepository } from "../../domain/repositories/job.repository";
import { CustomError } from "../../domain";
import { log } from "console";
import { LocationService } from "./location.service";
import { Responsejob } from "../../infrastructure/responses/Jobs/job.response";
import { Data, GetAllJobsReponse } from "../../infrastructure/responses/Jobs/getAllJobs.response";
import { JobsMapper } from "../../infrastructure/mappers/jobs/allJobs.mapper";
import { GetAllJobsInterface } from "../../infrastructure/interfaces/jobs/jobs.interfaces";
import { date } from "zod";
import { GetJobInterface } from "../../infrastructure/interfaces/jobs/job.interface";
import { CreateJobDto } from "../../domain/dtos/job/create-job";
import { JobCompany } from "../../domain/entities/jobCompany.entity";
import { JobsInterfaceStatus, JobsInterfaceStatusData } from "../../infrastructure/interfaces/jobs/jobsStatus.interface";




export class JobsService {
  constructor(
    private readonly jobRepository: JobRepository,

  ) { }


  //Litsar todos los trabajos con paginación con la aruitectura
  public async getAllJobs(query: any): Promise<GetAllJobsInterface> {
    const rawPage = Number(query.page);
    const rawPageSize = Number(query.pageSize);

    const isValidInteger = (n: any) =>
      typeof n === 'number' && Number.isInteger(n) && n > 0;

    if (!isValidInteger(rawPage) || !isValidInteger(rawPageSize)) {
      throw CustomError.badRequest("Error page or pageSize must be a positive integer without decimals");
    }

    try {

      const jobs: GetAllJobsReponse = await this.jobRepository.getAll(rawPage, rawPageSize);

      if (!Array.isArray(jobs?.data) || jobs.data.length === 0) {
        return jobs;
      }

      const res: GetAllJobsInterface = { data: await JobsMapper.getAllSearch(jobs), meta: jobs.meta, }

      return res;
    } catch (error: any) {
      throw CustomError.internalServerError("Error feathcing the jobs: " + error!.message);
    }
  }

  public async getJobB(id: string): Promise<GetJobInterface> {


    try {
      const job = await this.jobRepository.getById(id);


      if (!job) {
        throw CustomError.badRequest("Error job not found with id: " + id);
      }

      const res: GetJobInterface = { data: await JobsMapper.getJob(job) }




      return res;
    } catch (error: any) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError("Error feathcing the job" );
    }
  }


  public async searchJobs(page: number, pageSize: number, search: string): Promise<GetAllJobsInterface> {

    const isValidInteger = (n: any) =>
      typeof n === 'number' && Number.isInteger(n) && n > 0;

    if (!isValidInteger(page) || !isValidInteger(pageSize)) {
      throw CustomError.badRequest("Error page or pageSize must be a positive integer without decimals");
    }

    try {
      const jobs: GetAllJobsReponse = await this.jobRepository.getAllSearch(page, pageSize, search);

      if (!Array.isArray(jobs?.data) || jobs.data.length === 0) {
        return jobs;
      }

      const res: GetAllJobsInterface = { data: await JobsMapper.getAllSearch(jobs), meta: jobs.meta, }


      return res;
    } catch (error: any) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError("Error feathcing the jobs ");
    }

  }


  public async createJob(job: CreateJobDto, id_company : number):Promise<JobCompany | null> {
   //log(job)
    try {
      const jobId = await this.jobRepository.createJob(job, id_company);
      return jobId;
    } catch (error: any) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError('Error creating the job' );
    }
  }

  /*  public async getJobsByCompanyId(idCompany: number): Promise<JobCompany[]> {
    try {
      const jobs = await this.jobRepository.getJobsByCompanyId(idCompany);
      return jobs;
    } catch (error: any) {
      throw CustomError.internalServerError('Error fetching jobs by company ID: ' + error?.message);
    }
  }  */


   public async getJobsByCompanyId(idCompany: number, status: string): Promise<JobsInterfaceStatus> {
    try {
      const jobs = await this.jobRepository.getJobsByCompanyId(idCompany);



      switch (status) {
        case 'published': {
          const resPublished: JobsInterfaceStatus = await JobsMapper.getJobsByCompanyIdPublished(jobs);
          return resPublished;
        }
        case 'draft': {
          const resDraft: JobsInterfaceStatus = await JobsMapper.getJobsByCompanyIdDraft(jobs);
          return resDraft;
        }
        case 'archived': {
          const resArchived: JobsInterfaceStatus = await JobsMapper.getJobsByCompanyIdArchived(jobs);
          return resArchived;
        }
        case 'internal': {
          const resInternal: JobsInterfaceStatus = await JobsMapper.getJobsByCompanyIdInternal(jobs);
          return resInternal;
        }
        case 'all': {
          const resAll: JobsInterfaceStatus = await JobsMapper.getJobsByCompanyId(jobs);
          return resAll;
        }
        default:
          throw CustomError.badRequest('Invalid status provided. Valid options are: published, draft, archived.');
      }

      
     
    } catch (error: any) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError('Error fetching jobs by company ID');
    }
  } 


  public async getCounterJobsByCompanyId(idCompany: number): Promise<number> {
    try {
      const counter = await this.jobRepository.getCounterJobsByCompanyId(idCompany);
      return counter;
    } catch (error: any) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError('Error fetching job count by company ID: ' + error?.message);
    }
  }




  
}


