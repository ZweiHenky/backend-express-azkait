import { Router } from 'express';
import { DepartmentsController } from '../controllers/department.controller';
import { DepartmentsService } from '../../services/department.service';

export class DepartmentsRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new DepartmentsService();
    const controller = new DepartmentsController(service);

   
    router.get('/:id', controller.getDepartmentById);

    return router;
  }
}
