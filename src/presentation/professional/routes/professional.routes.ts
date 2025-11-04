import { Router } from "express";
import { ProfessionalController } from "../controllers/professional.controller";
import { ProfessionalService } from "../../services/professional.service";
import { ProfessionalRepositoryImp } from "../../../infrastructure/repositories/professional.repository.imp";
import { ProfessionalDataSourceImp } from "../../../infrastructure/dataSources/professional.datasource.imp";

export class ProfessionalRoutes {
    static get routes( ): Router {

        const router = Router();
        const professionalDataSource = new ProfessionalDataSourceImp();
        const professionalRepositoryImp = new ProfessionalRepositoryImp(professionalDataSource);
        const professionalService = new ProfessionalService(professionalRepositoryImp);
        const professionalController = new ProfessionalController(professionalService);
       
        /**
         * @swagger
         * /api/v1/professional:
         *   get:
         *     summary: Obtener todos los profesionales
         *     description: Retorna una lista de todos los profesionales registrados.
         *     tags: [Professional]
         *     responses:
         *       '200':
         *         description: Lista de profesionales obtenida correctamente
         *         content:
         *           application/json:
         *             examples:
         *               ejemplo1:
         *                 summary: Solo dos profesionales
         *                 value:
         *                   professionals:
         *                     - id: 1
         *                       name: "Backend"
         *                     - id: 2
         *                       name: "Frontend"
         *       '500':
         *         description: Error interno del servidor
         */
        router.get('/', professionalController.getAll);

        return router;



}
  
}