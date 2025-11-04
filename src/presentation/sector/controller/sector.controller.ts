import { Request, Response } from "express";
import { SectorRepository } from "../../../domain/repositories/sector.repository";


export class SectorController {

  constructor(
    private readonly sectorRepository : SectorRepository
  ) {}

   getSectors = async(req: Request, res: Response) => {
    const sectors = await this.sectorRepository.getAll();

    res.status(200).json({ sectors });
  }

}