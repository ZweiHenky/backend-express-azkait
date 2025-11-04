import axios from 'axios';
import { apiBulk, apiCandidate, apiCreateCandidateByCV, headers } from '../../services/api/apiViterbit';
import { prisma } from '../../data/postgres/db';
import { response } from 'express';
import { CustomError } from '../../domain';
import { GetAllCandidaturesByJobID } from '../../infrastructure/responses/candidatures/getAllByJobID.response';
import { CandidatureRepository } from '../../domain/repositories/candidature.repository';
import { CandidateRepository } from '../../domain/repositories/candidate.repository';
import { EditCandidateDto } from '../../domain/dtos/candidate/edit-candidate.dto';
import { RecommendationCandidateDto } from '../../domain/dtos/candidate/recommendation-candidate';
import { log } from 'console';
import { RecommendationsCandidatesInterface, RecommendationsDatumInterface } from '../../infrastructure/interfaces/candidates/recommendations.candidadates.interface';
import { CandidatesRecommendationsMapper } from '../../infrastructure/mappers/candidates/candidates.recommendations.mapper';



export class CandidateService {
  constructor(
    private readonly candidateRepository: CandidateRepository

  ) { }



  public async fetchCandidatesByBulkId(bulk_import_id: string) {
    try {
      const response = await apiBulk(bulk_import_id);
      return response.data;
    } catch (error: any) {
      throw {
        status: 500,
        message: 'Error fetching candidates by bulk ID',
        detail: (error && typeof error === 'object' && 'message' in error) ? (error as any).message : error
      };
    }
  }




  public async fetchCandidateCV(candidateId: string) {
    try {
      const response = await apiCandidate(candidateId);
      return response.data;
    } catch (error: any) {
      if (error instanceof CustomError) throw error;
      throw CustomError.badRequest("Error fetching candidates CV by ID");
    }
  }

  public async uploadCandidateFromForm(file: Express.Multer.File, source:string) {


    try {
      const fileBase64 = `data:${file.mimetype};name=${file.originalname};base64,${file.buffer.toString('base64')}`;
      const response = await apiCreateCandidateByCV(fileBase64,source);

      return {
        status: response.status,
        data: response.data
      };

    } catch (error: any) {
      throw {
        status: 500,
        message: 'Error al enviar el CV a Viterbit',
        detail: error.response?.data || error.message
      };
    }
  }


  public async retrieveCandidateInfo(candidateId: string) {

    
    

    let candidate = await prisma.candidate.findUnique({
      where: {
        userId_fk: Number(candidateId),
      },
      select: {
        id_viterbit: true,
      },
    });
    console.log(candidate?.id_viterbit);

    if (!candidate) {
      throw {
        status: 404,
        message: `No se encontró un candidato con id ${candidateId}`,
      };
    }

    try {
      const response = await apiCandidate(candidate?.id_viterbit!);

      return response.data;
    } catch (error: any) {
      throw {
        status: error.response?.status || 500,
        message: 'Error fetching candidate by ID from viterbit',
        detail: error.message || error,
      };
    }
  }


  public async editCandidateInfo(editCandidate: EditCandidateDto, candidateId: string) {

    try {
      const candidate = await this.candidateRepository.editCandidate(editCandidate, candidateId);



      return candidate;
    } catch (error: any) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError("Error editing candidate info" );
    }

  }

  public async getRecommendations(recommendationCandidateDto : RecommendationCandidateDto): Promise<RecommendationsCandidatesInterface>{

    //log(recommendationCandidateDto);

    try{
      const recommendations = await this.candidateRepository.getRecommendations(recommendationCandidateDto);

      const recommendationsData: RecommendationsCandidatesInterface = {
        data: await CandidatesRecommendationsMapper.toRecommendationsCandidatesInterface(recommendations),
        meta: recommendations.meta
      };
      return recommendationsData;
    }catch(error: any) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError("Error getting recommendations" );
    }

  }


  public async retrieveCandidateInfoByIDVitrerbit(candidateId: string) {
  
    try {
      const response = await apiCandidate(candidateId);

      return response.data;
    } catch (error: any) {
      throw {
        status: error.response?.status || 500,
        message: 'Error fetching candidate by ID from viterbit',
        detail: error.message || error,
      };
    }
  }









}


