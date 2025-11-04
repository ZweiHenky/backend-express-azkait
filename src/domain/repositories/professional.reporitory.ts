
import { ProfessionalDataSource } from "../dataSources/professional.datasource";
import { ProfessionalEntity } from "../entities/professionalProfile.entity";



export abstract class ProfessionalRepository implements ProfessionalDataSource {


    abstract getAll(): Promise<ProfessionalEntity[] | null>;

  
}