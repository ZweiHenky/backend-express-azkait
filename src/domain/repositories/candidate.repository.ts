import { Prisma, PrismaClient } from "@prisma/client";
import { CandidateDatasource } from "../dataSources/candidate.datasource";
import { CreateCandidateDto } from "../dtos/candidate/create-candidate";
import { CandidateEntity } from "../entities/candidate.entity";
import { EditCandidateDto } from "../dtos/candidate/edit-candidate.dto";
import { GetRecommendationsResponse } from "../../infrastructure/responses/candidates/getRecommendations.response";
import { RecommendationCandidateDto } from "../dtos/candidate/recommendation-candidate";

export abstract class CandidateRepository implements CandidateDatasource {
   
    

    // abstract fetchCandidatesByBulkId(bulk_import_id: string): Promise<any>;
    // abstract fetchCandidateCV(candidateId: string): Promise<any>;
    // abstract uploadCandidateFromForm(file: Express.Multer.File): Promise<any>;
    abstract createCandidate(candidate: CreateCandidateDto, prismaCliente:Prisma.TransactionClient): Promise<CandidateEntity>;

    abstract findIdViterbitByUser(id: number): Promise<string | null>;

    abstract findUserByIdViterbit(id: string): Promise<CandidateEntity | null>;

    abstract editCandidate( editCandidate: EditCandidateDto, id: string): Promise<string | null>;

    abstract getRecommendations(RecommendationCandidateDto: RecommendationCandidateDto): Promise<GetRecommendationsResponse> 
    
    abstract getById(id:number): Promise<CandidateEntity | null >

}