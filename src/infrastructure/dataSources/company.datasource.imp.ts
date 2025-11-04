import { Prisma } from "@prisma/client";
import { prisma } from "../../data/postgres/db";
import { CompanyDatasource } from "../../domain/dataSources/Company.dataSource";
import { CreateCompanyDto } from "../../domain/dtos/company/createCompany.dto";
import { CompanyEntity } from "../../domain/entities/company.entity";

export class CompanyDatasourceImp implements CompanyDatasource {

    async create(companyDto: CreateCompanyDto, prismaCliente: Prisma.TransactionClient): Promise<CompanyEntity | null> {

        const company = await prismaCliente.company.create(
            {
                data: companyDto!
            }
        )

        if (!company) {
            return null
        }

        return CompanyEntity.fromObject(company)
    }

    async getByIdUser(id: number): Promise<CompanyEntity | null> {
        console.log(id);

        const company = await prisma.company.findUnique(
            {
                where: {
                    userId_fk: id
                }
            }
        )

        if (!company) {
            return null
        }

        return CompanyEntity.fromObject(company)
    }

    async counterViews(id: number): Promise<Number | null> {
        try {

            await prisma.company.update({
                where: { id: id },
                data: { views: { increment: 1 } },
            })


            const company = await prisma.company.findUnique({
                where: { id: id },
                include: {
                    company_jobs: true,
                },
            })

            return company ? company.views : null
        } catch (error) {
        
            return null
        }

    }


    async getCounter(id: number): Promise<Number | null> {
        try {
            const company = await prisma.company.findUnique({
                where: { id: id },
            });

            return company ? company.views : null;
        } catch (error) {
            return null;
        }
    }

    async getViewsProfiles(id:number):Promise<String>{

        const views = await prisma.company.findUnique({
            where: {id:id},
            select:{
                views_profiles : true
            }
        })

        console.log(views?.views_profiles);
        

        return views?.views_profiles || "[]"
    }

    async addViewsProfiles(idCompany: number, profiles: string): Promise<string> {
        
        const res = await prisma.company.update({
            where: {id:idCompany},
            data:{views_profiles:profiles}
        })

        return res.views_profiles || '[]'
    }
    
}