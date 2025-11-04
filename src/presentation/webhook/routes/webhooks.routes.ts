import { raw, Router } from "express";
import { CandidateService } from "../../services/candidate.service";
import { WebhookCandidateController } from "../controllers/webhooks.controller";
import { CandidateRepositoryImp } from "../../../infrastructure/repositories/candidate.repository.imp-";
import { CandidateDatasourceImp } from "../../../infrastructure/dataSources/candidate.datasource.imp";
import { CandidateProfessionalRepositoryImp } from "../../../infrastructure/repositories/candidateProfessional.repository";
import { CandidateProfessionalDatasourceImp } from "../../../infrastructure/dataSources/candidateProfessional.datasource.imp";
import { AuthRepositoryImp } from "../../../infrastructure/repositories/auth.repository.imp";
import { AuthDatasourceImp } from "../../../infrastructure/dataSources/auth.datasource.imp";
import { AuthService } from "../../services/auth.service";
import { WebhookViterbitService } from "../../services/webhookViterbit.service";
import { CompanyDatasourceImp } from "../../../infrastructure/dataSources/company.datasource.imp";
import { CompanyRespositoryImp } from "../../../infrastructure/repositories/company.repository.imp";


export class WebhookCandidateRoutes {

    public static get routes(): Router {

        const router = Router();

       

        const candidateDataSource = new CandidateDatasourceImp();
        const candidateRepository = new CandidateRepositoryImp(candidateDataSource);

        const candidateProfessionalDataSource = new CandidateProfessionalDatasourceImp();
        const candidateProfessionalRepository = new CandidateProfessionalRepositoryImp(candidateProfessionalDataSource);
        const candidateService = new CandidateService(candidateRepository);
        const authDatasource = new AuthDatasourceImp();
        const authRepository = new AuthRepositoryImp(authDatasource); // Assuming authRepository is available in candidateService

        const companyDatasourceImp = new CompanyDatasourceImp(); // Assuming you have a company datasource
        const companyRepositoryImp = new CompanyRespositoryImp(companyDatasourceImp); // Assuming you have a company repository


        const authService = new AuthService(authRepository, candidateService , candidateRepository, candidateProfessionalRepository);

        const webhookViterbitService = new WebhookViterbitService()

        const webhookCandidateController = new WebhookCandidateController(candidateService, candidateRepository, candidateProfessionalRepository, authRepository, authService, companyRepositoryImp ,webhookViterbitService)

        /**
         * @swagger
         * /api/v1/webhook:
         *  post:
         *    summary: Webhook para recibir datos de candidatos
         *    description: Este endpoint recibe datos de candidatos a través de un webhook y los procesa.
         *    tags: [Webhook]
         *    requestBody:
         *      required: true
         */
        router.post('/', webhookCandidateController.webhookCandidateController);
        // router.post('/', raw({ type: 'application/json' }), AuthenticationWebhookViterbitMiddleware.validateSignature , webhookCandidateController.webhookCandidateController);

        return router;

    }
}