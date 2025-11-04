import { Router } from "express";
import multer from 'multer';
//import { listCandidates, retrieveCandidate, retrieveCandidateCV, retriveCandidateBuk, uploadCandidateFromForm } from '../controllers/candidates.controller';
import { CandidateService } from '../../services/candidate.service';
import { CandidateController } from '../controllers/candidates.controller';
import { CandidateDatasourceImp } from "../../../infrastructure/dataSources/candidate.datasource.imp";
import { CandidateRepositoryImp } from "../../../infrastructure/repositories/candidate.repository.imp-";
import { AuthMiddleware } from "../../middlewares/auth.middleware";


/* const CandidateRouter = express.Router(); */
//const upload = multer(); // usa memoria, no guarda en disco
/* 
CandidateRouter.get("/list", listCandidates);
CandidateRouter.post("/retrieve", retrieveCandidate);
CandidateRouter.post('/from-cv', upload.single('file'), uploadCandidateFromForm);
CandidateRouter.post("/search-bulk",retriveCandidateBuk)
CandidateRouter.post("/retrieve-cv", retrieveCandidateCV) */





//export default CandidateRouter;

/**
 * @swagger
 * tags:
 *   name: Candidates
 *   description: Endpoints para gestionar candidaturas
 */

export class CandidateRoutes {
    static get routes() : Router {
        const router = Router();

        const candidateDatasourceImp = new CandidateDatasourceImp();
        const candidateRepositoryImp = new CandidateRepositoryImp(candidateDatasourceImp);
        const candidateService = new CandidateService(candidateRepositoryImp);
        const candidateController = new CandidateController(candidateService);
    
        
        router.post('/searchBulk', candidateController.searchByBulk);

/**
 * @swagger
 * /api/v1/candidates/candidateInfo/{candidateId}:
 *   get:
 *     summary: Obtener información detallada de un candidato por ID
 *     tags:
 *       - Candidates
 * 
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico del candidato
 *     responses:
 *       200:
 *         description: Información detallada del candidato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     full_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     gender:
 *                       type: string
 *                       enum: [male, female, other]
 *                     picture_url:
 *                       type: string
 *                       format: uri
 *                     source:
 *                       type: string
 *                     curriculum:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                         summary:
 *                           type: string
 *                         summary_blind:
 *                           type: string
 *                         experience_years:
 *                           type: integer
 *                         skills:
 *                           type: array
 *                           items:
 *                             type: string
 *                         soft_skills:
 *                           type: array
 *                           items:
 *                             type: string
 *                         cv_url:
 *                           type: string
 *                           format: uri
 *                         experiences:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               title:
 *                                 type: string
 *                               company:
 *                                 type: string
 *                               description:
 *                                 type: string
 *                               address:
 *                                 type: object
 *                                 properties:
 *                                   country:
 *                                     type: string
 *                                   city:
 *                                     type: string
 *                               start_at:
 *                                 type: string
 *                                 format: date-time
 *                               end_at:
 *                                 type: string
 *                                 format: date-time
 *                         educations:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               title:
 *                                 type: string
 *                               school:
 *                                 type: string
 *                               description:
 *                                 type: string
 *                               start_at:
 *                                 type: string
 *                                 format: date-time
 *                               end_at:
 *                                 type: string
 *                                 format: date-time
 *                         languages:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               key:
 *                                 type: string
 *                               value:
 *                                 type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *       404:
 *         description: Candidato no encontrado
 *       500:
 *         description: Error del servidor
 */
        router.get('/candidateInfo/:candidateId', AuthMiddleware.validateCandidateJWT, candidateController.getCandidate);
        router.post('/uploadCV', multer().single('file'), candidateController.uploadCandidateFromFormController);



/**
 * @swagger
 * /api/v1/candidates/recommendations:
 *   post:
 *     summary: Obtener candidatos recomendados
 *     description: Retorna una lista paginada de candidatos que cumplen con los filtros especificados, como habilidades y años de experiencia.
 *     tags:
 *       - Candidates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - filters
 *               - page
 *               - page_size
 *             properties:
 *               filters:
 *                 type: object
 *                 properties:
 *                   groups:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         operator:
 *                           type: string
 *                           example: "and"
 *                         filters:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               field:
 *                                 type: string
 *                                 example: "curriculum__skills"
 *                               operator:
 *                                 type: string
 *                                 example: "contains"
 *                               value:
 *                                 type: [string, number]
 *               page:
 *                 type: integer
 *                 example: 1
 *               page_size:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Lista de candidatos recomendados
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
 *                       full_name:
 *                         type: string
 *                       title:
 *                         type: string
 *                       summary:
 *                         type: string
 *                       country:
 *                         type: string
 *                       state:
 *                         type: string
 *                       email:
 *                         type: string
 *                       years_experience:
 *                         type: integer
 *                       skills:
 *                         type: array
 *                         items:
 *                           type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Filtros inválidos
 *       500:
 *         description: Error interno del servidor
 */
        router.post('/recommendations', AuthMiddleware.validateCompanyJWT, candidateController.recommendations);

        router.patch('/edit/:id', candidateController.editCandidate);


/**
 * @swagger
 * /api/v1/candidates/candidate/{id}:
 *   get:
 *     summary: Obtener detalle completo de un candidato por ID
 *     description: Retorna el perfil detallado del candidato, incluyendo datos personales, curriculum, experiencia, educación, idiomas y redes sociales.
 *     tags:
 *       - Candidates
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del candidato
 *     responses:
 *       200:
 *         description: Detalle del candidato obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "6871410b6f605f43400457fd"
 *                     full_name:
 *                       type: string
 *                       example: "Belén Valeria Rodriguez Aguilera"
 *                     phone:
 *                       type: string
 *                       example: "+525537350097"
 *                     email:
 *                       type: string
 *                       example: "bvaleriarodrigueza@gmail.com"
 *                     gender:
 *                       type: string
 *                       example: "female"
 *                     source:
 *                       type: string
 *                       example: "linkedin"
 *                     source_params:
 *                       type: object
 *                       properties:
 *                         utm_source:
 *                           type: string
 *                           example: "linkedin"
 *                         utm_medium:
 *                           type: string
 *                           example: "job_board"
 *                         utm_campaign:
 *                           type: string
 *                           example: "analista-de-datos-Qs616MOj8TRs"
 *                     social_profiles:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           key:
 *                             type: string
 *                             example: "linkedin"
 *                           value:
 *                             type: string
 *                             example: "https://www.linkedin.com/in/valeria-rodriguez-fisica"
 *                     is_applied:
 *                       type: boolean
 *                       example: true
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-11T16:51:24+00:00"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-11T16:51:33+00:00"
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     address:
 *                       type: object
 *                       properties:
 *                         country:
 *                           type: string
 *                           example: "MX"
 *                         state:
 *                           type: string
 *                           example: "Ciudad de México"
 *                         city:
 *                           type: string
 *                           example: "Ciudad de México"
 *                     curriculum:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           example: "ANALISTA DE DATOS"
 *                         summary:
 *                           type: string
 *                           example: "BELEN VALERIA RODRIGUEZ AGUILERA es una Analista de Datos con formación en Física por la UNAM..."
 *                         summary_blind:
 *                           type: string
 *                           example: "La candidata es una Analista de Datos con formación en Física por la UNAM..."
 *                         experiences_blind:
 *                           type: string
 *                           example: "Analista Financiero</w:t><w:br/><w:t>Ciudad de México,MX. 11/02/2024 - 11/11/2024..."
 *                         experience_years:
 *                           type: integer
 *                           example: 1
 *                         skills:
 *                           type: array
 *                           items:
 *                             type: string
 *                         soft_skills:
 *                           type: array
 *                           items:
 *                             type: string
 *                         cv_url:
 *                           type: string
 *                           format: uri
 *                         experiences:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               title:
 *                                 type: string
 *                               company:
 *                                 type: string
 *                               description:
 *                                 type: string
 *                               address:
 *                                 type: object
 *                                 properties:
 *                                   country:
 *                                     type: string
 *                                   city:
 *                                     type: string
 *                               skills:
 *                                 type: array
 *                                 items:
 *                                   type: string
 *                               start_at:
 *                                 type: string
 *                                 format: date-time
 *                               end_at:
 *                                 type: string
 *                                 format: date-time
 *                         educations:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               title:
 *                                 type: string
 *                               school:
 *                                 type: string
 *                               end_at:
 *                                 type: string
 *                                 format: date-time
 *                         languages:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               key:
 *                                 type: string
 *                               value:
 *                                 type: string
 *                     custom_fields:
 *                       type: array
 *                       items:
 *                         type: object
 *                     questionnaires:
 *                       type: array
 *                       items:
 *                         type: object
 *                     evaluations:
 *                       type: array
 *                       items:
 *                         type: object
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *       404:
 *         description: Candidato no encontrado
 *       500:
 *         description: Error interno del servidor
 */
        router.get('/candidate/:id', candidateController.getCandidateByIDViterbit)




        return router;
    }
}

