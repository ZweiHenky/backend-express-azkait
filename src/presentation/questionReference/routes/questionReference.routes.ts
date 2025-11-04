import { Router } from "express";
import { QuestionReferenceController } from "../controllers/questionReference.controller";
import { QuestionReferenceRepositoryImp } from "../../../infrastructure/repositories/questionReference.repository.imp";
import { QuestionReferenceDataSourceImp } from "../../../infrastructure/dataSources/questionReference.datasource.imp";


export class QuestionReferenceRoutes {

    static get routes():Router {

        const router = Router();

        const questionReferenceDataSourceImp = new QuestionReferenceDataSourceImp();

        const questionReferenceRepositoryImp = new QuestionReferenceRepositoryImp(questionReferenceDataSourceImp)

        const questionReferenceController = new QuestionReferenceController(questionReferenceRepositoryImp)

                /**
         * @swagger
         * /api/v1/questionReference:
         *   get:
         *     summary: Obtener todos las referencias
         *     description: Retorna una lista de todos las referencias registrados.
         *     tags: [References]
         *     responses:
         *       '200':
         *         description: Lista de referencias obtenida correctamente
         *         content:
         *           application/json:
         *             examples:
         *               ejemplo1:
         *                 summary: Solo dos sectores
         *                 value:
         *                   questionReference:
         *                     - id: 1
         *                       name: "Facebook"
         *                     - id: 2
         *                       name: "Instagram"
         *       '500':
         *         description: Error interno del servidor
         */
        router.get("/", questionReferenceController.getQuestionReference);

        return router;

    }

}