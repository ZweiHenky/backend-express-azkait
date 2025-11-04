import { CandidatureDatasource } from "../../domain/dataSources/candidature.datasource";
import { JobDataSource } from "../../domain/dataSources/job.datasource";
import { CreateCandidateDto } from "../../domain/dtos/candidate/create-candidate";
import { ChangeCandidatureStatusDto } from "../../domain/dtos/candidature/change-candidatureStatus.dto";
import { CandidateEntity } from "../../domain/entities/candidate.entity";
import { CandidadtureEntity } from "../../domain/entities/candidature.entity";
import { CandidatureRepository } from "../../domain/repositories/candidature.repository";
import { GetAllCandidaturesByJobID } from "../responses/candidatures/getAllByJobID.response";




export class CandidatureRepositoryImp implements CandidatureRepository{

    constructor(
        private readonly candidatureSource : CandidatureDatasource,
        private readonly jobSource : JobDataSource
    ){}
    
    
     public getList(idCandidate: string): Promise<CandidadtureEntity[] | null> {
        return this.candidatureSource.getList(idCandidate)
    }

    public getCandidature(id: string): Promise<CandidadtureEntity | null> {
        return this.candidatureSource.getCandidature(id)
    }

    public createCandidature(idCandidate: string, idJob: string): Promise<any> | null {
        return this.candidatureSource.createCandidature(idCandidate, idJob);
    }


    public getAllByJobID(idJob: string, page : number , pageSize : number): Promise<GetAllCandidaturesByJobID> {
        return this.candidatureSource.getAllByJobID(idJob, page, pageSize);
    }

    public changeStatus(changeStatus: ChangeCandidatureStatusDto): Promise<string> {
        return this.candidatureSource.changeStatus(changeStatus)
    }






    
   
   

    
}