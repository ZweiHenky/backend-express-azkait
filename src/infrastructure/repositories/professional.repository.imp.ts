import { ProfessionalDataSource } from "../../domain/dataSources/professional.datasource";
import { ProfessionalEntity } from "../../domain/entities/professionalProfile.entity";
import { ProfessionalRepository } from "../../domain/repositories/professional.reporitory";


export class ProfessionalRepositoryImp implements ProfessionalRepository {
    constructor(private readonly professionalDataSource: ProfessionalDataSource) {
       
    }

    public getAll(): Promise<ProfessionalEntity[] | null> {
       return this.professionalDataSource.getAll()
    }
}