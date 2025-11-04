import { Router } from "express";
import { JobsService } from "../../services/jobs.services";
import { JobsController } from "../controllers/jobs.controller";
import { JobDataSource } from "../../../domain/dataSources/job.datasource";
import { JobRepository } from "../../../domain/repositories/job.repository";
import { CreateJobDataSourceImp } from "../../../infrastructure/dataSources/job.datasource.imp";
import { JobRepositoryImp } from "../../../infrastructure/repositories/job.repository.imp";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Endpoints para gestionar vacantes
 */

export class JobsRoutes {
  static get routes(): Router {

    const router = Router();
    const jobDataSourceImp = new CreateJobDataSourceImp();
    const jobRepositoryImp = new JobRepositoryImp(jobDataSourceImp);
    const jobsService = new JobsService(jobRepositoryImp);

    const jobsController = new JobsController(jobsService);

     


   /**
 * @swagger
 * /api/v1/jobs:
 *   get:
 *     summary: Buscar trabajos publicados sin filtos 
 *     description: Obtiene una lista paginada de trabajos publicados. Se puede filtrar por término de búsqueda.
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página (entero positivo)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de resultados por página (entero positivo)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Término para filtrar la búsqueda por título o descripción
 *     responses:
 *       200:
 *         description: Lista paginada de trabajos publicados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     
 *             examples:
 *               Ejemplo:
 *                 value:
 *                   data:
 *                     - id: "6830728e035c828e8108b782"
 *                       title: "ETL/Informatica/ Datastage - Data Engineer"
 *                       status: "published"
 *                       modality: "hybrid"
 *                       location: "TCS_Guadalajara"
 *                       slug: "tcs-guadalajara-zapopan"
 *                       department: "Tecnología"
 *                       description: "AZKAIT es una empresa Mexicana que busca y conecta..."
 *                       requirements: "Requisitos:\n\n- Licenciatura en Ingeniería..."
 *                       createdAt: "2025-05-23T13:05:18.000Z"
 *                       updatedAt: "2025-05-24T04:26:26.000Z"
 *                       publishedAt: "2025-05-23T13:07:18.000Z"
 *                       appliesUntil: "2025-07-31T16:00:00.000Z"
 *                       salary:
 *                         min: 50000
 *                         max: 80000
 *                         currency: "MXN"
 *                         periodicity: "monthly"
 *                       occupation: "full_time"
 *                       contractType: "5bedf9abdea50e8da8245aaa"
 *       400:
 *         description: Parámetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: 'Los parámetros "page" y "pageSize" deben ser números enteros positivos sin decimales'
 *                 detail:
 *                   type: object
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: 'Error al obtener la lista de jobs publicados'
 */
    router.get('/', AuthMiddleware.validateCandidateJWT, jobsController.getAllJobs);

 /**
 * @swagger
 * /api/v1/jobs/{id}:
 *   get:
 *     summary: Obtener un job por ID con detalles extendidos
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del trabajo
 *     responses:
 *       200:
 *         description: Detalles del trabajo con departamento y perfil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 status:
 *                   type: string
 *                 work_modality:
 *                   type: string
 *                 location:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 department:
 *                   type: string
 *                 description:
 *                   type: string
 *                 requirements:
 *                   type: string
 *                 requirements_html:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                 published_at:
 *                   type: string
 *                   format: date-time
 *                 appliesUntil:
 *                   type: string
 *                   format: date-time
 *                 salary:
 *                   type: object
 *                   properties:
 *                     salary_minin:
 *                       type: number
 *                     salary_max:
 *                       type: number
 *                     currency:
 *                       type: string
 *                     salary_periodicity:
 *                       type: string
 *                 occupation:
 *                   type: string
 *                 contract_type:
 *                   type: string
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: array
 *                 profile:
 *                   type: string
 *                 experience_years:
 *                   type: number
 *             examples:
 *               example:
 *                 value:
 *                   id: "6830728e035c828e8108b782"
 *                   title: "ETL/Informatica/ Datastage - Data Engineer"
 *                   status: "published"
 *                   work_modality: "hybrid"
 *                   location: "TCS_Guadalajara"
 *                   slug: "tcs-guadalajara-zapopan"
 *                   department: "Tecnología"
 *                   description: "AZKAIT es una empresa Mexicana que busca y conecta el mejor talento IT con empresas Latinoamericanas y de Estados Unidos.\n\nEstamos en la búsqueda de tu talento comoETL/Informatica/ Datastage - Data Engineer"
 *                   requirements: "Requisitos:\n\n- Licenciatura en Ingeniería en Sistemas, Computación, Informática o carrera afín..."
 *                   requirements_html: "<p>Requisitos:</p><ul><li>Licenciatura...</li></ul>"
 *                   created_at: "2025-05-23T13:05:18+00:00"
 *                   updated_at: "2025-05-24T04:26:26+00:00"
 *                   published_at: "2025-05-23T13:07:18+00:00"
 *                   appliesUntil: "2025-07-31T16:00:00+00:00"
 *                   salary:
 *                     salary_minin: 50000
 *                     salary_max: 80000
 *                     currency: "MXN"
 *                     salary_periodicity: "monthly"
 *                   occupation: "full_time"
 *                   contract_type: "5bedf9abdea50e8da8245aaa"
 *                   skills: [[]]
 *                   profile: ""
 *                   experience_years: 4
 *       400:
 *         description: Parámetro ID inválido
 *       500:
 *         description: Error en el servidor
 */
    router.get('/:id', AuthMiddleware.validateBothJWT, jobsController.getJobById);

/**
 * @swagger
 * /api/v1/jobs/search:
 *   post:
 *     summary: Buscar trabajos publicados según un término de búsqueda
 *     description: Retorna una lista paginada de trabajos publicados que coinciden con el término de búsqueda.
 *     tags:
 *       - Jobs
 *     requestBody:
 *       description: Parámetros de búsqueda y paginación
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *                 example: 1
 *                 description: Número de página
 *               pageSize:
 *                 type: integer
 *                 example: 10
 *                 description: Cantidad de resultados por página
 *               search:
 *                 type: string
 *                 example: Java
 *                 description: Texto para búsqueda
 *             required:
 *               - page
 *               - pageSize
 *               - search
 *     responses:
 *       200:
 *         description: Lista paginada de trabajos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 50
 *                   description: Total de trabajos encontrados
 *                 page:
 *                   type: integer
 *                   example: 1
 *                   description: Página actual
 *                 pageSize:
 *                   type: integer
 *                   example: 10
 *                   description: Cantidad de resultados por página
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 682e69d83f2f3c861e086930
 *                       title:
 *                         type: string
 *                         example: Java Developer
 *                       status:
 *                         type: string
 *                         example: published
 *                       modality:
 *                         type: string
 *                         example: hybrid
 *                       location:
 *                         type: string
 *                         example: TCS_Guadalajara
 *                       slug:
 *                         type: string
 *                         example: tcs-guadalajara-zapopan
 *                       department:
 *                         type: string
 *                         example: Tecnología
 *                       description:
 *                         type: string
 *                         example: AZKAIT es una empresa Mexicana que busca y conecta el mejor talento IT...
 *                       requirements:
 *                         type: string
 *                         example: Licenciatura o Ingeniería en Sistemas, Informática o afín...
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-05-22T00:03:36.000Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-05-22T00:09:56.000Z
 *                       publishedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-05-22T00:09:54.000Z
 *                       appliesUntil:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-12-31T18:00:00.000Z
 *                       salary:
 *                         type: object
 *                         properties:
 *                           min:
 *                             type: number
 *                             example: 45000
 *                           max:
 *                             type: number
 *                             example: 52700
 *                           currency:
 *                             type: string
 *                             example: MXN
 *                           periodicity:
 *                             type: string
 *                             example: monthly
 *                       occupation:
 *                         type: string
 *                         example: full_time
 *                       contractType:
 *                         type: string
 *                         example: 5bedf9abdea50e8da8245aaa
 */
    router.post('/search', AuthMiddleware.validateCandidateJWT, jobsController.searchJobs);

/**
 * @swagger
 * /api/v1/jobs/create:
 *   post:
 *     summary: Crear una vacante
 *     tags:
 *       - Jobs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 2
 *               general_info:
 *                 type: object
 *                 properties:
 *                   basic_info:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: TEST enviar id_user 2
 *                       description:
 *                         type: string
 *                       experience_years:
 *                         type: integer
 *                       slots:
 *                         type: integer
 *                       skills:
 *                         type: array
 *                         items:
 *                           type: string
 *                       requirements:
 *                         type: string
 *                       department_id:
 *                         type: string
 *                       education_type_id:
 *                         type: string
 *                       department_profile_id:
 *                         type: string
 *                   location:
 *                     type: object
 *                     properties:
 *                       work_modality:
 *                         type: string
 *                       address:
 *                         type: object
 *                         properties:
 *                           country:
 *                             type: string
 *                           city:
 *                             type: string
 *                           state:
 *                             type: string
 *                           postal_code:
 *                             type: string
 *                           address:
 *                             type: string
 *                       location_id:
 *                         type: string
 *                   contract_info:
 *                     type: object
 *                     properties:
 *                       occupation:
 *                         type: string
 *                       salary_periodicity:
 *                         type: string
 *                       salary_min:
 *                         type: object
 *                         properties:
 *                           amount:
 *                             type: number
 *                           currency:
 *                             type: string
 *                       salary_max:
 *                         type: object
 *                         properties:
 *                           amount:
 *                             type: number
 *                           currency:
 *                             type: string
 *                       contract_type_id:
 *                         type: string
 *                   management:
 *                     type: object
 *                     properties:
 *                       external_id:
 *                         type: string
 *                   custom_fields:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                         value:
 *                           oneOf:
 *                             - type: string
 *                             - type: array
 *                               items:
 *                                 type: string
 *                         question_id:
 *                           type: string
 *               apply_form:
 *                 type: object
 *                 properties:
 *                   preferences:
 *                     type: object
 *                   killer_questions:
 *                     type: object
 *                   config:
 *                     type: object
 *                   applies_until:
 *                     type: string
 *                     format: date-time
 *     responses:
 *       201:
 *         description: Vacante creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 6
 *                 id_job:
 *                   type: string
 *                   example: 6849d80200c7a2d5e30b0bd7
 *                 id_company_fk:
 *                   type: integer
 *                   example: 2
 *       400:
 *         description: Error en los datos enviados
 */
    router.post('/create', AuthMiddleware.validateCompanyJWT, jobsController.createJob)

/**
 * @swagger
 * /api/v1/jobs/company/{idCompany}:
 *   get:
 *     summary: Obtener trabajos por ID de empresa
 *     description: Retorna una lista de trabajos pertenecientes a una empresa específica. Se puede filtrar por estado (`status`) escribiendo published, draft, archived o nada.
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: idCompany
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [published, draft, closed]
 *         description: Estado del trabajo (opcional)
 *     responses:
 *       200:
 *         description: Lista de trabajos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       department_name:
 *                         type: string
 *                       department_profile:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       description:
 *                         type: string
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                       applies_until:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                       salary_min:
 *                         type: object
 *                         properties:
 *                           amount:
 *                             type: number
 *                           currency:
 *                             type: string
 *                       salary_max:
 *                         type: object
 *                         properties:
 *                           amount:
 *                             type: number
 *                           currency:
 *                             type: string
 *                       slots:
 *                         type: integer
 *                       candidates:
 *                         type: integer
 *                       location:
 *                         type: object
 *                         properties:
 *                           country:
 *                             type: string
 *                           state:
 *                             type: string
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error interno del servidor
 */
    router.get('/company/:idCompany', AuthMiddleware.validateCompanyJWT, jobsController.getJobsByCompanyId);

/**
 * @swagger
 * /api/v1/jobs/company/counter/{idCompany}:
 *   get:
 *     summary: Obtener el numero de trabajos por la empresa.
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: idCompany
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Número total de trabajos por la empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 5
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error interno del servidor
 */
    router.get('/company/counter/:idCompany', AuthMiddleware.validateCompanyJWT, jobsController.getCounterJobsByCompanyId);

    return router;
  }
}
