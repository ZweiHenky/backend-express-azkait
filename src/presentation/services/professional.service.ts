import { ProfessionalEntity } from "../../domain/entities/professionalProfile.entity";
import { ProfessionalRepository } from "../../domain/repositories/professional.reporitory";

export class ProfessionalService {
    constructor(
        private readonly professionalRepository: ProfessionalRepository

    ) {}

    async getAllProfessionalProfiles(): Promise<ProfessionalEntity[] | null> {
        return await this.professionalRepository.getAll();
    }
} 