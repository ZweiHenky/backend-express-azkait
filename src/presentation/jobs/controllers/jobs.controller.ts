import { Request, Response } from "express";
import { JobsService } from "../../services/jobs.services";
import { CustomError } from "../../../domain";
import { error, log } from "console";
import { CreateJobDto } from "../../../domain/dtos/job/create-job";


export class JobsController {

    constructor(
        private readonly jobsService: JobsService,
    ) { }

    private handleError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
            return
        }
        console.log(error);
        res.status(500).json({ error: "Internal server error" });

    }
    // Endpoint para obtener todos los trabajos con la arqitectura
    getAllJobs = (req: Request, res: Response) => {
        const jobs = this.jobsService.getAllJobs(req.query).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            this.handleError(error, res);
        }
        );
    }

    getJobById = (req: Request, res: Response) => {
        const jobs = this.jobsService.getJobB(req.params.id).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            this.handleError(error, res);
        }
        );
    }

    // Endpoint para buscar trabajos por nombre
    searchJobs = (req: Request, res: Response) => {
        const { page = 1, pageSize = 10, search = "" } = req.body;
        this.jobsService.searchJobs(Number(page), Number(pageSize), search).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            this.handleError(error, res);
        }
        );
    }


    createJob = (req: Request, res: Response) => {
        
       const id_company = req.body.id

        //console.log(id_company)

        //Recibe el Objeto y lo manda a DTO para comprobar que este completo 
        const [error, jobDto] = CreateJobDto.create(req.body);

        //log(jobDto)

        //Si hay un campo vacio envia el JSON el campo requerido
        if (error || !jobDto) {
            res.status(400).json(error);
            return;
        }

        const jobId = this.jobsService.createJob(jobDto, id_company).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            this.handleError(error, res)
        })

    }

    getJobsByCompanyId = (req: Request, res: Response) => {
        const idCompany = Number(req.params.idCompany);
        const status = req.query.status as string || "published"; // Default to 'published' if not provided
    
       
        this.jobsService.getJobsByCompanyId(idCompany, status).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            this.handleError(error, res);
        });
    }


    getCounterJobsByCompanyId = (req: Request, res: Response) => {
        const idCompany = Number(req.params.idCompany);
    
        this.jobsService.getCounterJobsByCompanyId(idCompany).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            this.handleError(error, res);
        });
    }





}