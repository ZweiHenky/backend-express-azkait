
import { GetAllCandidaturesByJobID } from "../../infrastructure/responses/candidatures/getAllByJobID.response";
import { CandidatureDatasource } from "../dataSources/candidature.datasource";
import { ChangeCandidatureStatusDto } from "../dtos/candidature/change-candidatureStatus.dto";
import { CandidadtureEntity } from "../entities/candidature.entity";
import { JobEntity } from "../entities/job.entity";




export abstract class CandidatureRepository implements CandidatureDatasource{

     abstract getCandidature( id : string) : Promise<CandidadtureEntity | null>;
    
     abstract getList( idCandidate : string) : Promise <CandidadtureEntity[] | null>;

     abstract createCandidature(idCandidate : string , idJob : string) : Promise <any> | null;

     abstract getAllByJobID (idJob : string, page : number, pageSize : number) : Promise<GetAllCandidaturesByJobID>;

     abstract changeStatus(changeStatus: ChangeCandidatureStatusDto): Promise<string>;


     
    
}