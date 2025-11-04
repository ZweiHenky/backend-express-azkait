import { error, log } from 'console';
import { apiCreateCandidature, apiSearchCandidatures } from '../../services/api/apiViterbit';
import { CandidadtureEntity } from '../../domain/entities/candidature.entity';
import { CandidatureRepository } from '../../domain/repositories/candidature.repository';
import { CustomError } from '../../domain';
import { JobRepository } from '../../domain/repositories/job.repository';
import { GetAllCandidaturesByJobID } from '../../infrastructure/responses/candidatures/getAllByJobID.response';
import { GetAllCandidaturesByJobIDInterface } from '../../infrastructure/interfaces/candidatures/candidatures.interface';
import { CandidaturesMapper } from '../../infrastructure/mappers/candidatures/allCandidaturesByJobId.mapper';
import { ChangeCandidatureStatusDto } from '../../domain/dtos/candidature/change-candidatureStatus.dto';

export class CandidatureService {
  static getAllCandidaturesByJobID(idJob: any, string: any, page: any, number: any, pageSize: any, number1: any) {
      throw new Error("Method not implemented.");
  }

  constructor(
    private readonly candidatureRepository: CandidatureRepository,
    private readonly jobRepository : JobRepository,
  ) { }

  /*  public async execute(candidate_id: string, job_id: string): Promise<any> {
     if (!candidate_id || !job_id) {
       throw new Error('candidate_id y job_id son requeridos');
     }
 
     log('candidate_id', candidate_id);
     log('job_id', job_id);
 
     try {
       const result = await apiCreateCandidature(candidate_id, job_id);
       return result;
     } catch (error) {
       const message = error instanceof Error ? error.message : 'Error desconocido';
       throw new Error('Error al crear candidatura: ' + message);
     }
   } */


  //Listar candidaturas por id ususario (postulaciones)
  public async searchCandidatures(candidateId: string): Promise<CandidadtureEntity[]> {

    if (!candidateId) {
      throw CustomError.badRequest("Error the id must be correct")
    }
    try {
      const candidatures = await this.candidatureRepository.getList(candidateId);

      const updateCandidature = await Promise.all((candidatures ?? []).map(async candidature => {
        const jobName = await this.jobRepository.getName(candidature.job_id); 
        return {
          ...candidature,
          title : jobName
        }
      }));

      return updateCandidature ?? []
    } catch (error: any) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError("Error fetching the candidatures ")

    }

  }

  //Detalle candidatura (postulacion)
  public async getCandidature( idCandidature : string) : Promise<CandidadtureEntity>{
    if(!idCandidature){
      throw CustomError.badRequest("Error, id_candidature not valid ")
    }
    try {
      const candidature = await this.candidatureRepository.getCandidature(idCandidature);
      if (!candidature) {
        throw CustomError.notFound("Candidature not found with id: " + idCandidature);
      }
      //console.log(candidature.job_id)
      const jobName = await this.jobRepository.getName(candidature.job_id);

      //console.log(jobName)

      const updateCandidature = {
        ...candidature,
        title : jobName
      }


      return updateCandidature
      
    } catch (error : any) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError("Error fetching candidature");
    }
  }

  public async createCandidature( idCandidate : string, idJob : string) : Promise<any> {
    if(!idCandidate || !idJob){
      throw CustomError.badRequest("Error, id_candidate or id_job missing ");
    }
    log(idCandidate, idJob)
    try {
      const createCandidature = await this.candidatureRepository.createCandidature(idCandidate, idJob)
      if(!createCandidature){
        throw CustomError.notFound("Candidature did not create: " + createCandidature);
      }
      return createCandidature
      
    } catch (error : any) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError("Error creating candidature ");
    }
  }

  public async getAllCandidaturesByJobID(idJob: string, page: number, pageSize: number): Promise<GetAllCandidaturesByJobIDInterface> {
   

    const isValidInteger = (n: any) =>
      typeof n === 'number' && Number.isInteger(n) && n > 0;
    

    if (!isValidInteger(page) || !isValidInteger(pageSize)) {
      throw CustomError.badRequest("Error page or pageSize must be a positive integer without decimals");
    }

    try {
      const candidatures : GetAllCandidaturesByJobID = await this.candidatureRepository.getAllByJobID(idJob, page, pageSize);

      if(!Array.isArray(candidatures?.data) || candidatures.data.length === 0){
        return { data: [], meta: candidatures?.meta ?? {} } as GetAllCandidaturesByJobIDInterface;
      }

      
     const res : GetAllCandidaturesByJobIDInterface = { data : await CandidaturesMapper.getAllCandidaturesByJobId(candidatures), meta : candidatures.meta}
      return res
    } catch (error : any) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError("Error feathcing the candidatures");
    }


  }

  public async changeStatus(changeCandidatureStatusDto : ChangeCandidatureStatusDto): Promise<string>{
    try{
      const newStatus = await this.candidatureRepository.changeStatus(changeCandidatureStatusDto);
      log("Cambio de estado======================================", newStatus)
      return newStatus;
    }catch(error : any){
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError('Error updating the status ');
    }
  }

  
}