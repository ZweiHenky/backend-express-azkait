import { SectorEntity } from "../entities/sector.entity";


export abstract class SectorDataSource {

    abstract getAll(): Promise<SectorEntity[]>;

}
