import { SectorDataSource } from "../../domain/dataSources/sector.datasource";
import { SectorEntity } from "../../domain/entities/sector.entity";
import { SectorRepository } from "../../domain/repositories/sector.repository";

export class SectorRepositoryImpl implements SectorRepository {

    constructor(
        private readonly dataSource: SectorDataSource
    ) {}

    async getAll(): Promise<SectorEntity[]> {
        return this.dataSource.getAll();
    }

}
