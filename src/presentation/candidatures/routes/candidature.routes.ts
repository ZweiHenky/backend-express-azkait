import { Router } from "express";
import { CandidatureController } from "../controllers/candidature.controller";
import { CandidatureService } from "../../services/candidature.service";
import { CandidatureDatasource } from "../../../domain/dataSources/candidature.datasource";
import { CandidatureDatasourceImp } from "../../../infrastructure/dataSources/candidature.datasource.imp";
import { CandidatureRepository } from "../../../domain/repositories/candidature.repository";
import { CandidatureRepositoryImp } from "../../../infrastructure/repositories/candidature.repository.imp";
import { JobDataSource } from "../../../domain/dataSources/job.datasource";
import { CreateJobDataSourceImp } from "../../../infrastructure/dataSources/job.datasource.imp";
import { JobRepositoryImp } from "../../../infrastructure/repositories/job.repository.imp";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

/**
 * @swagger
 * tags:
 *   name: Candidatures
 *   description: Endpoints para gestionar candidaturas
 */
export class CandidatureRoutes {
  static get routes(): Router {
    const router = Router();

    const candidatureDatasourceImp = new CandidatureDatasourceImp();
    const jobDataSourceImp = new CreateJobDataSourceImp();

    const candidatureRepositoryImp = new CandidatureRepositoryImp(candidatureDatasourceImp, jobDataSourceImp);
    const jobREpositoryImp = new JobRepositoryImp(jobDataSourceImp);

    const candidatureService = new CandidatureService(candidatureRepositoryImp, jobREpositoryImp);
    const candidatureController = new CandidatureController(candidatureService);

    /**
     * @swagger
     * /api/v1/candidature/create:
     *   post:
     *     summary: Crear una postulación de un candidato a una vacante
     *     description: Registra una aplicación de un candidato a una oferta laboral. Se necesita el ID del candidato y el ID del empleo (ambos de Viterbit).
     *     tags:
     *       - Candidatures
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               candidate_id:
     *                 type: string
     *                 example: "6830cf51a277b2d1d80f6832"
     *                 description: ID del candidato en Viterbit
     *               job_id:
     *                 type: string
     *                 example: "6824e90abb1f765a8702dac4"
     *                 description: ID del trabajo en Viterbit
     *     responses:
     *       201:
     *         description: Postulación creada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   example: "6830cfd8b6f02d8548081e48"
     *       400:
     *         description: Error en la solicitud. Verifica los parámetros enviados.
     */
    router.post("/create", AuthMiddleware.validateBothJWT, candidatureController.createCandidature);

    /**
 * @swagger
 * /api/v1/candidature/search:
 *   post:
 *     summary: Buscar postulaciones de un candidato
 *     description: Devuelve una lista de todas las postulaciones realizadas por un candidato específico, incluyendo el estado actual del proceso.
 *     tags:
 *       - Candidatures
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - candidate__id
 *             properties:
 *               candidate__id:
 *                 type: string
 *                 description: ID del candidato en Viterbit
 *                 example: "6833c521beaf0bafb4087992"
 *     responses:
 *       200:
 *         description: Lista de postulaciones del candidato
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "6837baafcb598f9515036225"
 *                   status:
 *                     type: string
 *                     example: "active"
 *                   is_applied:
 *                     type: boolean
 *                     example: false
 *                   current_stage:
 *                     type: object
 *                     properties:
 *                       name_stage:
 *                         type: string
 *                         example: "sourced"
 *                   job_id:
 *                     type: string
 *                     example: "6837a133a4ef02894604aa02"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-05-29T01:38:55+00:00"
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-05-29T01:38:55+00:00"
 *                   title:
 *                     type: string
 *                     example: "Desarrollador Plataforma Azkait"
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Candidato no encontrado
 */
  router.post("/search", candidatureController.search);


  /**
 * @swagger
 * /api/v1/candidature/detail/{id}:
 *   get:
 *     summary: Obtener detalles de una candidatura
 *     tags:
 *       - Candidatures
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la candidatura
 *     responses:
 *       200:
 *         description: Detalles de la candidatura obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "6837baafcb598f9515036225"
 *                 status:
 *                   type: string
 *                   example: "active"
 *                 is_applied:
 *                   type: boolean
 *                   example: false
 *                 current_stage:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "6525804d19774e7e82062b37"
 *                     name:
 *                       type: string
 *                       example: "sourced"
 *                     stage_type_id:
 *                       type: string
 *                       example: "6525804d19774e7e82062b2d"
 *                 job_id:
 *                   type: string
 *                   example: "6837a133a4ef02894604aa02"
 *                 candidate_id:
 *                   type: string
 *                   example: "6833c521beaf0bafb4087992"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-29T01:38:55+00:00"
 *                 created_by_id:
 *                   type: string
 *                   example: "6525800daf3964262506a004"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-29T01:38:55+00:00"
 *                 source_params:
 *                   type: array
 *                   items: {}
 *                 title:
 *                   type: string
 *                   example: "Desarrollador Plataforma Azkait"
 *       404:
 *         description: Candidatura no encontrada
 *       500:
 *         description: Error interno del servidor
 */
  router.get("/detail/:id", AuthMiddleware.validateCandidateJWT, candidatureController.getCandidature)




/**
 * @swagger
 * /api/v1/candidature/jobId/:
 *   post:
 *     summary: Obtener candidaturas paginadas por Job ID
 *     tags:
 *       - Candidatures
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobId:
 *                 type: string
 *                 example: '665a8309c1c62b47f0e34b36'
 *                 description: ID del trabajo para filtrar candidaturas
 *               page:
 *                 type: integer
 *                 example: 1
 *                 description: Número de página
 *               pageSize:
 *                 type: integer
 *                 example: 10
 *                 description: Cantidad de candidaturas por página
 *     responses:
 *       200:
 *         description: Lista paginada de candidaturas para el Job ID especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 100
 *                   description: Total de candidaturas encontradas
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pageSize:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       candidature_id:
 *                         type: string
 *                         example: '665a8309c1c62b47f0e34b36'
 *                       candidate_name:
 *                         type: string
 *                         example: 'Juan Pérez'
 *                       current_stage:
 *                         type: string
 *                         example: 'Primera llamada'
 *                       title:
 *                         type: string
 *                         example: 'Desarrollador Backend'
 *                       years_of_experience:
 *                         type: number
 *                         example: 3
 *                       status:
 *                         type: string
 *                         example: 'ACTIVE'
 *     400:
 *       description: Parámetros inválidos
 *     500:
 *       description: Error interno del servidor
 */
  router.post("/jobId/", AuthMiddleware.validateCompanyJWT, candidatureController.getAllByJobID)

/**
 * @swagger
 * /api/v1/candidature/status:
 *   post:
 *     summary: Cambiar etapa de una candidatura
 *     description: Actualiza la etapa (`stage_id`) de una candidatura específica mediante su `id`, TENER CUIDADO este endponit marcara error si se manda el mismo stage_id.
 *     tags:
 *       - Candidatures
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - stage_id
 *             properties:
 *               id:
 *                 type: string
 *                 example: "685c6f9a648ffa5fe40cffbb"
 *               stage_id:
 *                 type: string
 *                 example: "6525804d19774e7e82062b32"
 *     responses:
 *       200:
 *         description: Candidatura actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "685c6f9a648ffa5fe40cffbb"
 *       400:
 *         description: Datos inválidos o incompletos
 *       404:
 *         description: Candidatura no encontrada
 *       500:
 *         description: Error interno del servidor
 */
  router.post("/status/", AuthMiddleware.validateCompanyJWT, candidatureController.changeStatus)
  




    return router;
  }
}