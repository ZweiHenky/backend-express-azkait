import { Prisma, PrismaClient } from "@prisma/client";
import { CandidateDatasource } from "../../domain/dataSources/candidate.datasource";
import { CreateCandidateDto } from "../../domain/dtos/candidate/create-candidate";
import { CandidateEntity } from "../../domain/entities/candidate.entity";
import { CandidateDatasourceImp } from "../dataSources/candidate.datasource.imp";
import { CandidateRepository } from "../../domain/repositories/candidate.repository";


export class CandidateRepositoryImp implements  CandidateRepository {
    constructor(
        private readonly candidateDatasource: CandidateDatasource
    ) {}
  
    
    async createCandidate(candidateDto: CreateCandidateDto, prismaCliente:Prisma.TransactionClient): Promise<CandidateEntity> {
        return this.candidateDatasource.createCandidate(candidateDto, prismaCliente);
    }

       async findIdViterbitByUser(id : number) : Promise<string | null>{
        return this.candidateDatasource.findIdViterbitByUser(id)
    }

    async findUserByIdViterbit(id: string): Promise<CandidateEntity | null> {
        return this.candidateDatasource.findUserByIdViterbit(id);
    }

    async editCandidate(editCandidate: any, id: string): Promise<string | null> {
        return this.candidateDatasource.editCandidate(editCandidate, id);
    }

    async getRecommendations(RecommendationCandidateDto: any): Promise<any> {
        return this.candidateDatasource.getRecommendations(RecommendationCandidateDto);
    }
 
    async getById(id: number): Promise<CandidateEntity | null> {
        return this.candidateDatasource.getById(id)
    }

}