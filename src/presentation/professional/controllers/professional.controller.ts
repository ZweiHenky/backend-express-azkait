import { Request, Response } from "express";
import { ProfessionalService } from "../../services/professional.service";
import { CustomError } from "../../../domain";

export class ProfessionalController {

    constructor(
        private readonly professionalService: ProfessionalService
    ) {}

    getAll  = (req: Request, res: Response) => { 
        this.professionalService.getAllProfessionalProfiles()
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error);
                CustomError.handleError(error, res);
            });
        
        
    }
        

}
