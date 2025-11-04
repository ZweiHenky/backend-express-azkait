import { Prisma } from "@prisma/client";
import { CandidateProfessionalDto } from "../dtos/candidateProfessional/create-candidateProfessional.dto";



export abstract class CandidateProfessionalDataSource {

    abstract create(data: CandidateProfessionalDto, prismaCliente:Prisma.TransactionClient): Promise<boolean>;

   

}