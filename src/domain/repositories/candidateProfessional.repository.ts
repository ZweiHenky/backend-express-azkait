import { Prisma } from "@prisma/client";
import { CandidateProfessionalDataSource } from "../dataSources/candidateProfessional.datasource";
import { CandidateProfessionalDto } from "../dtos/candidateProfessional/create-candidateProfessional.dto";
import { CandidateProfessionalEntity } from "../entities/candidateProfessional.entity";


export abstract class CandidateProfessionalRepository implements CandidateProfessionalDataSource {

    abstract create(data: CandidateProfessionalDto, prismaCliente:Prisma.TransactionClient): Promise<boolean>;

}