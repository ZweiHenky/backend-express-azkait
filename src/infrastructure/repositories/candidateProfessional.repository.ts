import { Prisma } from "@prisma/client";
import { CandidateProfessionalDataSource } from "../../domain/dataSources/candidateProfessional.datasource";
import { CandidateProfessionalDto } from "../../domain/dtos/candidateProfessional/create-candidateProfessional.dto";
import { CandidateProfessionalRepository } from "../../domain/repositories/candidateProfessional.repository";

export class CandidateProfessionalRepositoryImp implements CandidateProfessionalRepository {

    constructor(
        private readonly candidateProfessionalDatasource: CandidateProfessionalDataSource
    ) {}

    public async create(candidate_ProfessionalProfile: CandidateProfessionalDto, prismaCliente: Prisma.TransactionClient): Promise<boolean> {
        return this.candidateProfessionalDatasource.create(candidate_ProfessionalProfile, prismaCliente);
    }

    // Add other methods as needed
}