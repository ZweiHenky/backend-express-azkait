import { Prisma } from "@prisma/client";
import { CompanyDatasource } from "../../domain/dataSources/Company.dataSource";
import { CreateCompanyDto } from "../../domain/dtos/company/createCompany.dto";
import { CompanyEntity } from "../../domain/entities/company.entity";
import { CompanyDatasourceImp } from "../dataSources/company.datasource.imp";


export class CompanyRespositoryImp implements CompanyDatasourceImp{

    constructor(
        private readonly authCompanyDatasource: CompanyDatasource
    ){}

    create(companyDto:CreateCompanyDto, prismaCliente:Prisma.TransactionClient): Promise<CompanyEntity | null>{
        return this.authCompanyDatasource.create(companyDto, prismaCliente)
    }

    getByIdUser(id:number): Promise<CompanyEntity | null>{
        return this.authCompanyDatasource.getByIdUser(id)
    }

    counterViews(id: number): Promise<Number | null> {
        return this.authCompanyDatasource.counterViews(id);
    }

    getCounter(id: number): Promise<Number | null> {
        return this.authCompanyDatasource.getCounter(id);
    }


    getViewsProfiles(id:number):Promise<String>{
        return this.authCompanyDatasource.getViewsProfiles(id)
    }

    addViewsProfiles(idCompany: number, profiles: string): Promise<string> {
        return this.authCompanyDatasource.addViewsProfiles(idCompany, profiles)
    }

    
}