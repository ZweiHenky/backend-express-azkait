import { Prisma } from "@prisma/client";
import { prisma } from "../../data/postgres/db";
import { CandidateDatasource } from "../../domain/dataSources/candidate.datasource";
import { CreateCandidateDto } from "../../domain/dtos/candidate/create-candidate";
import { CandidateEntity } from "../../domain/entities/candidate.entity";
import { EditCandidateDto } from "../../domain/dtos/candidate/edit-candidate.dto";
import { apiSearchCandidates, apiUpdateCandidate } from "../../services/api/apiViterbit";
import { RecommendationCandidateDto } from "../../domain/dtos/candidate/recommendation-candidate";
import { GetRecommendationsResponse } from "../responses/candidates/getRecommendations.response";
import { log } from "console";
import { CustomError } from "../../domain";

export class CandidateDatasourceImp implements CandidateDatasource {
    constructor(

    ) { }

    // async fetchCandidatesByBulkId(bulk_import_id: string): Promise<any> {
    //     return this.candidateService.fetchCandidatesByBulkId(bulk_import_id);
    // }

    // async fetchCandidateCV(candidateId: string): Promise<any> {
    //     return this.candidateService.fetchCandidateCV(candidateId);
    // }

    // async uploadCandidateFromForm(file: Express.Multer.File): Promise<any> {
    //     return this.candidateService.uploadCandidateFromForm(file);
    // }

    async createCandidate(candidateDto: CreateCandidateDto, prismaCliente: Prisma.TransactionClient = prisma): Promise<CandidateEntity> {
        const candidate = await prismaCliente.candidate.create({
            data: candidateDto!
        })

        return CandidateEntity.fromObject(candidate);
    }


    async findIdViterbitByUser(id: number): Promise<string | null> {
        let candidate = await prisma.candidate.findUnique({
            where: {
                userId_fk: Number(id),
            },
            select: {
                id_viterbit: true,
            },
        });

        if (!candidate?.id_viterbit) {
            return null
            
        }

        return candidate.id_viterbit


    }

    async findUserByIdViterbit(id: string): Promise<CandidateEntity | null> {
        const candidate = await prisma.candidate.findFirst({
            where: {
                id_viterbit: id,
            },
        });

        if (!candidate) {
            return null;
        }

        return CandidateEntity.fromObject(candidate);
    }


    async editCandidate(editCandidate: EditCandidateDto, id: string): Promise<string | null> {
        const edit = await apiUpdateCandidate(id, editCandidate);

        if (!edit) {
            return null;
        }

        return edit;
    }

    async getRecommendations(recommendationCandidateDto : RecommendationCandidateDto): Promise<GetRecommendationsResponse> {
       
        const recommendation = await apiSearchCandidates(recommendationCandidateDto);

       
        return recommendation;


       
    }

    async getById(id: number): Promise<CandidateEntity | null> {

        const candidate = prisma.candidate.findUnique({
            where: {
                userId_fk:id
            }
        })   
        
        if (!candidate) return null

        return candidate
    }


}