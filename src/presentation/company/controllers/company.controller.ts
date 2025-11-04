import { Request, Response } from 'express';
import { CustomError } from '../../../domain';
import { CompanyService } from '../../services/company.service';
import { prisma } from '../../../data/postgres/db';



export class CompanyController {

    constructor(
        private readonly companyService: CompanyService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
            return;
        }
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }

    incrementViews = (req: Request, res: Response) => {
        const companyId = parseInt(req.params.companyId, 10);
        this.companyService.incrementViews(companyId)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                this.handleError(error, res);
            });
    }


    getCounter = (req: Request, res: Response) => {
        const companyId = parseInt(req.params.companyId, 10);
        this.companyService.getCounter(companyId)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                this.handleError(error, res);
            });
    }


    getAllCompanyJobs = async (_req: Request, res: Response) => {
        try {
            const jobs = await prisma.companyJobs.findMany();

            res.status(200).json(jobs);
        } catch (error) {
            console.error("Error al obtener los CompanyJobs:", error);
            res.status(500).json({ message: "Error al obtener los CompanyJobs" });
        }
    };

    getViewsProfiles = (req:Request, res:Response) => {

        const id = req.params.companyId
        
        this.companyService.getViewsProfiles(Number(id))
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })

    }

    addViewsProfiles = (req:Request, res:Response) => {

        const idCompany = req.body.idCompany
        const profiles = req.body.profiles

        this.companyService.addViewProfile(idCompany, profiles)
        .then(data => {
            res.json({data:data})
        })
        .catch(error => {
            this.handleError(error, res);
        })

    }

}