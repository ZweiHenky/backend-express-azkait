import { Request, Response } from 'express';
import { DepartmentsService } from '../../services/department.service';


export class DepartmentsController {
  constructor(private readonly service: DepartmentsService) {}

  public getDepartmentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.service.getDepartmentById(id);
      res.json(data);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message, detail: error.detail });
    }
  };
}
