import { Request, Response } from 'express';
import { LocationService } from '../../services/location.service';


export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  getLocationById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const location = await this.locationService.getLocationById(id);
      res.status(200).json(location);
    } catch (error: any) {
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        ...(error.detail && { detail: error.detail }),
      });
    }
  };
}
