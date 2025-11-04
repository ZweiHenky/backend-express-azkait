import { JobDataSource } from "../../domain/dataSources/job.datasource";
import { CreateJobDto } from "../../domain/dtos/job/create-job";
import { JobEntity } from "../../domain/entities/job.entity";
import { JobCompany } from "../../domain/entities/jobCompany.entity";
import { JobRepository } from "../../domain/repositories/job.repository";
import { GetAllJobsReponse } from "../responses/Jobs/getAllJobs.response";
import { Responsejob } from "../responses/Jobs/job.response";


export class JobRepositoryImp implements JobRepository{
    constructor(private readonly jobDataSource: JobDataSource) {
}
 
public createJob(job: CreateJobDto, id : number):Promise<JobCompany | null>{
        return this.jobDataSource.createJob(job, id)
    }

public getAll(page: number, pageSize: number): Promise<GetAllJobsReponse> {
    return this.jobDataSource.getAll(page, pageSize);
}

public getById(id: string): Promise<Responsejob | null> {
    return this.jobDataSource.getById(id);
}

public getAllSearch(page: number, pageSize: number, search : string): Promise<GetAllJobsReponse> {
    return this.jobDataSource.getAllSearch(page, pageSize, search);
}

public getName(id: string): Promise<Responsejob | null> {
    return this.jobDataSource.getName(id);
    
}

public getJobsByCompanyId(idCompany: number): Promise<JobCompany[]> {
    return this.jobDataSource.getJobsByCompanyId(idCompany);


}

public getCounterJobsByCompanyId(idCompany: number): Promise<number> {
    return this.jobDataSource.getCounterJobsByCompanyId(idCompany);

}

}

