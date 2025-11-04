import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors/custom.error';
import { CompanyRespository } from '../../domain/repositories/company.repository';


export class CompanyService {

    constructor(
        private readonly companyRepository: CompanyRespository
    ) {}


    incrementViews = async (companyId: number) => {
        const updatedCompany = await this.companyRepository.counterViews(companyId);
        if (!updatedCompany) throw CustomError.notFound("Company not found");
        return updatedCompany;
    }


    getCounter = async (companyId: number) => {
        const counter = await this.companyRepository.getCounter(companyId);
        if (counter === null) throw CustomError.notFound("Company not found");
        return counter;
    }

    getViewsProfiles = async(companyId:number) =>{
        const views = await this.companyRepository.getViewsProfiles(companyId)
        console.log(views);
        
        return views
    }

    addViewProfile = async(idCompany:number, profiles:string) => {

        const profilesArray: [string] = JSON.parse(profiles)
        
        
        if (profilesArray.length > 5) {
            throw CustomError.badRequest("El limite de perfiles es 5")
        }
        

        const res = await this.companyRepository.addViewsProfiles(idCompany, profiles)
        console.log(res);
        
        return res
    }
    
}