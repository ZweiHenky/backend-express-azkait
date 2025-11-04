import { prisma } from "../../data/postgres/db";
import { SectorDataSource } from "../../domain/dataSources/sector.datasource";
import { SectorEntity } from "../../domain/entities/sector.entity";

export class SectorDataSourceImpl implements SectorDataSource {

    async getAll(): Promise<SectorEntity[]> {

        const sectors = await prisma.sector.findMany();

        if (!sectors) {
            return [];
        }

        return sectors.map((sector:SectorEntity) =>
            SectorEntity.fromObject(sector)
        );
        
    }

}
