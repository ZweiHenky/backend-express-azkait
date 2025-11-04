import { Request, Response } from "express";
import { CandidateService } from "../../services/candidate.service";
import { CreateCandidateDto } from "../../../domain/dtos/candidate/create-candidate";
import { globals } from "../../../utils/globals.";
import { CandidateRepository } from "../../../domain/repositories/candidate.repository";
import { CustomError } from "../../../domain";
import { CandidateProfessionalDto } from "../../../domain/dtos/candidateProfessional/create-candidateProfessional.dto";
import { CandidateProfessionalRepository } from "../../../domain/repositories/candidateProfessional.repository";
import { log } from "console";
import { prisma } from "../../../data/postgres/db";
import { AuthRepository } from "../../../domain/repositories/auth.repository";
import { AuthService } from "../../services/auth.service";
import { CreateCandidateWebhook } from "../../../infrastructure/responses/candidates/createCandidateWebhook.response";
import { WebhookViterbitService } from "../../services/webhookViterbit.service";
import { CompanyRespository } from "../../../domain/repositories/company.repository";
import { Prisma } from "@prisma/client";

const TEN_MINUTES = 10 * 60 * 1000;

export class WebhookCandidateController {

    constructor(
        private readonly candidateService: CandidateService, // Replace with actual type
        private readonly candidateRepository: CandidateRepository, // Assuming candidateService has a candidateRepository property
        private readonly candidateProfessionalRepository: CandidateProfessionalRepository, // Assuming candidateService has a candidateProfessionalRepository property
        private readonly authRepository: AuthRepository, // Replace with actual type if needed
        private readonly authService: AuthService,
        private readonly companyRepository: CompanyRespository,
        private readonly webhookViterbitService: WebhookViterbitService
        

    ) {}

    public  webhookCandidateController = async(req: Request, res: Response) => {

        const event = req.body.event;

        log(event)

        switch (event) {
            case 'recruitment_candidate_was_created':{

                const data:CreateCandidateWebhook = req.body;
                
                const payload = data.payload
                let user = null

                log(globals)
                log(payload)

                const matched = globals.pendingUsers.find(pending => pending.source == payload.source);

                if (!matched) {
                    log("Webhook ignorado: no hay coincidencia con ningún pendingUser");
                    return;
                }

                // Continuar con la lógica usando `matched`
                const { userId_fk, url_linkedin, id_professionalProfile_fk } = matched;

                const id_candidate = payload.id;
                log(`Processing candidate with ID: ${id_candidate}`);

                if (!userId_fk) {
                    return
                }

                if (!("created_by_id" in data.payload)) return
                    
                if (String(data.payload.created_by_id) !== '6525800daf3964262506a004') return


                try {

                    user = await this.authRepository.findById(userId_fk);

                    if (!user) throw new Error("the user not found")

                   
                    const cv_url = await this.candidateService.fetchCandidateCV(id_candidate);

                    if (!cv_url) throw new Error("the url cv not found")


                    const [error, candidateDto] = CreateCandidateDto.create({
                        cv_url: cv_url.data.curriculum.cv_url,
                        id_viterbit: id_candidate,
                        userId_fk: userId_fk,
                        url_linkedin: url_linkedin || null
                    });

                    if (error) throw new Error(error)

                    await prisma.$transaction(async (tx:Prisma.TransactionClient) => {
                        const candidateCreated = await this.candidateRepository.createCandidate(candidateDto!, tx);
                        
                        if (!candidateCreated) throw CustomError.badRequest("Error creating candidate");

                        if (id_professionalProfile_fk && id_professionalProfile_fk.length >= 1) {
                            const candidateProfessional = CandidateProfessionalDto.create({
                                id_candidate_fk: candidateCreated.id,  
                                id_professionalProfile_fk:id_professionalProfile_fk
                            });

                            const [error, candidateProfessionalDto] = candidateProfessional;

                            if (error) throw CustomError.badRequest(error);

                            const candidateProfessionalCreated = await this.candidateProfessionalRepository.create(candidateProfessionalDto!, tx);

                            if (!candidateProfessionalCreated) throw CustomError.badRequest("Error creating candidate professional");
                        }
                    });

                    log("Se agrego el candidato")

                    await this.authService.sendEmailValidationLink(user.email)

                    globals.pendingUsers = globals.pendingUsers.filter(p => p.userId_fk !== user!.id);

                    log(globals)

                } catch (error) {

                    log("Error in transaction:", error);

                    if(!user) return

                    await this.authRepository.delete(Number(user.id!))

                    globals.pendingUsers = globals.pendingUsers.filter(p => p.userId_fk !== user!.id);

                } finally{
                    if (globals.pendingUsers.length < 1) return

                    globals.pendingUsers = globals.pendingUsers.filter(p => {
                        return Date.now() - p.timestamp < TEN_MINUTES;
                    });
                }   

                break;
            }
            case 'recruitment_job_status_was_updated':
                const data = req.body;

                this.webhookViterbitService.createJob(data, this.authRepository, this.companyRepository)
                break;
            default:
                break;
        }
        
        
        res.status(200).json({
            message: 'Webhook candidate controller is working',
            data: req.body
        });
    }

}