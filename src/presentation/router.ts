import { Router } from "express";
import { AuthRoutes } from "./auth/routes/auth.routes";
import { DocsRoutes } from "./swagger/docs.routes";
import { JobsRoutes } from "./jobs/routes/jobs.routes";
import { CandidateRoutes } from "./candidates/routes/candidates.routes";
import { LocationsRoutes } from "./location/routes/location.routes";
import { DepartmentsRoutes } from "./department/routes/department.routes";
import { CandidatureRoutes } from "./candidatures/routes/candidature.routes";
import { ProfessionalRoutes } from "./professional/routes/professional.routes";
import { WebhookCandidateRoutes } from "./webhook/routes/webhooks.routes";
import { AuthCompanyRoutes } from "./auth/routes/authCompany.routes";

import { SectorRoutes } from "./sector/routes/sector.routes";
import { QuestionReferenceRoutes } from "./questionReference/routes/questionReference.routes";

import { CompanyRoutes } from "./company/routes/company.routes";

const swaggerUi = require('swagger-ui-express');

export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // router.use('/api/v1/user', UserRoutes.routes );
    router.use('/api/v1/auth', AuthRoutes.routes );
    router.use('/api/v1/auth', AuthCompanyRoutes.routes );
    router.use('/api/v1/jobs', JobsRoutes.routes );
    router.use('/api/v1/candidates', CandidateRoutes.routes );
    router.use('/api/v1/location', LocationsRoutes.routes );
    router.use('/api/v1/department', DepartmentsRoutes.routes );
    router.use('/api/v1/candidature', CandidatureRoutes.routes );
    router.use('/api/v1/professional', ProfessionalRoutes.routes );

    router.use('/api/v1/sector', SectorRoutes.routes );
    router.use('/api/v1/questionReference', QuestionReferenceRoutes.routes );

    router.use('/api/v1/company', CompanyRoutes.routes );


    // webhook
    router.use('/api/v1/webhooks', WebhookCandidateRoutes.routes );
    // router.use('', WebhookCandidateRoutes.routes );
    

    // Swagger
    router.use('/api/v1/docs', swaggerUi.serve);
    router.use('/api/v1/docs', DocsRoutes.routes );

    
    return router;

  }

}
