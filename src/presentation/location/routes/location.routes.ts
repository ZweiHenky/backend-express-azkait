import { Router } from 'express';
import { LocationService } from '../../services/location.service';
import { LocationController } from '../controllers/location.controller';


export class LocationsRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new LocationService();
    const controller = new LocationController(service);

    
    router.get('/:id', controller.getLocationById);

    return router;
  }
}
