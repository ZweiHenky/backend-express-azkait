import { Router } from "express";

import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './swagger';

export class DocsRoutes{

    static get routes(): Router {
        const router = Router()

        router.get('/', swaggerUi.setup(swaggerSpec));

        return router
    }

}