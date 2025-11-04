import { Router } from "express";
import { SectorController } from "../controller/sector.controller";
import { SectorRepositoryImpl } from "../../../infrastructure/repositories/sector.repository.imp";
import { SectorDataSourceImpl } from "../../../infrastructure/dataSources/sector.datasource.imp";
import { AuthMiddleware } from "../../middlewares/auth.middleware";


export class SectorRoutes{

    constructor() {}

    static get routes(): Router {
        const router = Router();

        const sectorDataSource = new SectorDataSourceImpl();

        const sectorRepository = new SectorRepositoryImpl(sectorDataSource)

        const sectorController = new SectorController(sectorRepository);

        /**
         * @swagger
         * /api/v1/sector:
         *   get:
         *     summary: Obtener todos los sectores
         *     description: Retorna una lista de todos los sectores registrados.
         *     tags: [Sector]
         *     responses:
         *       '200':
         *         description: Lista de sectores obtenida correctamente
         *         content:
         *           application/json:
         *             examples:
         *               ejemplo1:
         *                 summary: Solo dos sectores
         *                 value:
         *                   sectors:
         *                     - id: 1
         *                       name: "Tecnología y telecomunicaciones"
         *                     - id: 2
         *                       name: "Servicios empresariales y consultoría TI"
         *       '500':
         *         description: Error interno del servidor
         */
        router.get('/', sectorController.getSectors );


        return router;
    }

}