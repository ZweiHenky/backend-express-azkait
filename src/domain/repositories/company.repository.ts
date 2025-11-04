import { Prisma } from "@prisma/client";
import { CompanyDatasource } from "../dataSources/Company.dataSource";
import { CreateCompanyDto } from "../dtos/company/createCompany.dto";
import { CompanyEntity } from "../entities/company.entity";

export abstract class CompanyRespository implements CompanyDatasource{

    abstract create (companyDto: CreateCompanyDto, prismaCliente:Prisma.TransactionClient): Promise<CompanyEntity | null>

    abstract getByIdUser (id:number):Promise<CompanyEntity | null>

    abstract counterViews(id: number): Promise<Number | null>;

    abstract getCounter(id: number): Promise<Number | null>;

    abstract getViewsProfiles(id:number) : Promise<String>
     
    abstract addViewsProfiles(idCompany:number, profiles: string) : Promise<string>
}