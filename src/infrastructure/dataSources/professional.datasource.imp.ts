import { log } from "console";
import { prisma } from "../../data/postgres/db";
import { ProfessionalDataSource } from "../../domain/dataSources/professional.datasource";
import { ProfessionalEntity } from "../../domain/entities/professionalProfile.entity";


export class ProfessionalDataSourceImp implements ProfessionalDataSource {
    async getAll(): Promise<ProfessionalEntity[] | null> {

        const professionals = await prisma.professionalProfile.findMany();
 
        return professionals!.map((professional: ProfessionalEntity) =>
            ProfessionalEntity.fromObject(professional!)
        );
    }
}