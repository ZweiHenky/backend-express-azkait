import { SectorDataSource } from "../dataSources/sector.datasource";
import { SectorEntity } from "../entities/sector.entity";

export abstract class SectorRepository implements SectorDataSource {

    abstract getAll(): Promise<SectorEntity[]>;

}