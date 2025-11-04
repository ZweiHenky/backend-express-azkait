import { Prisma } from "@prisma/client";
import { prisma } from "../../data/postgres/db";
import { CustomError } from "../../domain";
import { CandidateProfessionalDataSource } from "../../domain/dataSources/candidateProfessional.datasource";
import { CandidateProfessionalDto } from "../../domain/dtos/candidateProfessional/create-candidateProfessional.dto";


export class CandidateProfessionalDatasourceImp implements CandidateProfessionalDataSource {

    public async create(candidateProfessionalDto: CandidateProfessionalDto, prismaCliente:Prisma.TransactionClient = prisma): Promise<boolean> {

        for (const id_professionalProfile_fk of candidateProfessionalDto!.id_professionalProfile_fk) {

            const candidateProfessionalCreated = await prismaCliente.candidate_ProfessionalProfile.create({
                data: {
                    id_candidate_fk: candidateProfessionalDto!.id_candidate_fk,
                    id_professionalProfile_fk: id_professionalProfile_fk
                }
            });

            if (!candidateProfessionalCreated) throw CustomError.badRequest("Error creating candidate professional");
        }
        
        return true
    }
}