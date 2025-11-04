import { ProfessionalEntity } from "../entities/professionalProfile.entity";



export abstract class ProfessionalDataSource {

    abstract getAll(): Promise<ProfessionalEntity[] | null>;
  
}