import { GetAllJobsReponse } from "../../infrastructure/responses/Jobs/getAllJobs.response";
import { Responsejob } from "../../infrastructure/responses/Jobs/job.response";
import { CreateJobDto } from "../dtos/job/create-job";
import { JobEntity } from "../entities/job.entity";
import { JobCompany } from "../entities/jobCompany.entity";


export abstract class JobDataSource {

    abstract getAll( page : number, pageSize : number): Promise<GetAllJobsReponse>;

    abstract getById(id: string): Promise<Responsejob | null>;

    abstract getAllSearch( page: number, pageSize: number, search : string): Promise<GetAllJobsReponse>;

    abstract getName( id : string) : Promise<Responsejob | null >;

    abstract createJob(job : CreateJobDto, id : number) :Promise<JobCompany | null>;

    abstract getJobsByCompanyId(idCompany : number): Promise<JobCompany[]>;

    abstract getCounterJobsByCompanyId(idCompany: number): Promise<number>;


   

    
    

    

}