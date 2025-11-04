import { Router } from "express";
import { CompanyDatasourceImp } from "../../../infrastructure/dataSources/company.datasource.imp";
import { CompanyRespositoryImp } from "../../../infrastructure/repositories/company.repository.imp";
import { CompanyService } from "../../services/company.service";
import { CompanyController } from "../controllers/company.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Endpoints para gestionar empresas
 */

export class CompanyRoutes {

    static get routes(): Router {
        const router = Router();

        const companyDatasourceImp = new CompanyDatasourceImp();
        const companyRepositoryImp = new CompanyRespositoryImp(companyDatasourceImp);
        const companyService = new CompanyService(companyRepositoryImp);
        const companyController = new CompanyController(companyService);


/**
 * @swagger
 * /api/v1/company/views/{companyId}:
 *   get:
 *     summary: Incrementar vistas de una empresa
 *     description: Incrementa en 1 el contador de vistas de la empresa especificada y devuelve el total actualizado.
 *     tags:
 *       - Company
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Contador de vistas actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 13
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error interno del servidor
 */
        router.get('/views/:companyId', AuthMiddleware.validateCompanyJWT, companyController.incrementViews);

/**
 * @swagger
 * /api/v1/company/counter/{companyId}:
 *   get:
 *     summary: Obtener contador general de una empresa
 *     description: Retorna un número representando un contador relacionado con la empresa (por ejemplo, número de vacantes, vistas u otros).
 *     tags:
 *       - Company
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Contador obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 14
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error interno del servidor
 */
        router.get('/counter/:companyId', AuthMiddleware.validateCompanyJWT,  companyController.getCounter);

        router.get('/jobs', AuthMiddleware.validateCompanyJWT,  companyController.getAllCompanyJobs);

        router.get('/viewsProfile/:companyId', AuthMiddleware.validateCompanyJWT, companyController.getViewsProfiles)

        router.post('/viewsProfile', AuthMiddleware.validateCompanyJWT, companyController.addViewsProfiles)

        return router;

    }


}