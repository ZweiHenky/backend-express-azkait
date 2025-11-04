import { Prisma } from "@prisma/client"
import { bcryptAdapter } from "../../config/bcrypt"
import { JwtAdapter } from "../../config/jwt.adapter"
import { SendGrid } from "../../config/sendGrid"
import { prisma } from "../../data/postgres/db"
import { AuthEntity, CustomError } from "../../domain"
import { AuthDatasource } from "../../domain/dataSources/auth.datasource"
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto"
import { RegisterCompanyDto } from "../../domain/dtos/auth/register-company.dto"
import { CreateCompanyDto } from "../../domain/dtos/company/createCompany.dto"
import { AuthRepository } from "../../domain/repositories/auth.repository"
import { CompanyRespository } from "../../domain/repositories/company.repository"
import { CreateDealResponse } from "../../infrastructure/responses/clientify/deal/createDeal.response"
import { createCompany } from "../../services/actions/clientify/company/createCompany.action"
import { createContact } from "../../services/actions/clientify/contact/createContact.action"
import { createDeal } from "../../services/actions/clientify/deal/createDeal.action"
import { contentHtmlRegister } from "../../utils/contentHtmlRegister"

export class AuthCompanyService {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly companyRepository: CompanyRespository
    ){}

    registerCompany = async(companyDto:RegisterCompanyDto) =>{


        let {company:companyData, ...userData} = companyDto

        const existsUser = await this.authRepository.findByEmail(userData.email);

        if (existsUser) throw CustomError.badRequest("Email already exists");

        const existsPhone = await this.authRepository.findByPhone(userData.phone);

        if (existsPhone) throw CustomError.badRequest("Phone already exists");

        try {




            const resCreateCompany = await createCompany(companyData, userData.phone)

            if ('error' in resCreateCompany) throw CustomError.badRequest(resCreateCompany.error)
            
            const contactData = {
                first_name: userData.name,
                last_name: userData.lastName,
                company: companyData.name,
                phone: userData.phone,
                email:userData.email
            }

            const resCreateContact = await createContact(contactData)

            if ('error' in resCreateContact) throw CustomError.badRequest(resCreateContact.error)

            const dealData = {
                name: companyData.name + ' deal',
                company: resCreateCompany.url,
                contact: resCreateContact.url,
                amount: '1000',
                pipeline_desc:"Azkait_Plataforma"
            }

            const resCreateDeal = await createDeal(dealData)

            if ('error' in resCreateDeal) throw CustomError.badRequest(resCreateDeal.error)

            userData.password = await bcryptAdapter.hash(userData.password);

            const {user, company} = await prisma.$transaction(async (tx:Prisma.TransactionClient) => {

                const user = await this.authRepository.create(userData, tx)

                if (!user) throw CustomError.badRequest("Error al crear el usuario")

                const updateCompanyData ={
                    userId_fk: Number(user.id),
                    ...companyData
                }

                const [error, companyDto] = CreateCompanyDto.create(updateCompanyData)

                if (error) {
                    throw CustomError.badRequest(error)
                }

                const company = await this.companyRepository.create(companyDto!, tx)

                if (!company) {
                    throw CustomError.badRequest("Ocurrio un error al intentar crear el registro en company")
                }

                return {
                    user,
                    company
                }

            });

            const {password, ...rest} = user;
            
            const token  = await JwtAdapter.generateToken({id: company.id, email: user.email, email_validate:user.email_validate, rol:user.rolId_fk});
            
            if (!token) throw CustomError.internalServerError("Error generating token");

            const tokenRefresh = await JwtAdapter.generateRefreshToken({type: 'refresh', id:user.id}, '30d');

            if (!tokenRefresh) throw CustomError.internalServerError("Error generating refresh token");

            await this.sendEmailValidationLink(user.email)

            return {user:rest, token, tokenRefresh};

        } catch (error:any) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError("Error creating user ");
        }
    }

    public async loginCompany(loginUserDto: LoginUserDto) {

        try {
            const userExist = await this.authRepository.findByEmail(loginUserDto.email);

            if (!userExist) throw CustomError.badRequest("Email or password is incorrect");

            const company = await this.companyRepository.getByIdUser(Number(userExist.id))

            if (!company) throw CustomError.badRequest("The user not found");

            const isValidPassword = await bcryptAdapter.compare(loginUserDto.password, userExist.password);

            if (!isValidPassword) throw CustomError.badRequest("Email or password is incorrect");

            const {password, ...rest} = AuthEntity.fromObject(userExist);

            const token  = await JwtAdapter.generateToken({id: userExist.id, email: userExist.email, email_validate:userExist.email_validate, rol:userExist.rolId_fk, company_id:company.id});
            
            if (!token) throw CustomError.internalServerError("Error generating token");

            const tokenRefresh = await JwtAdapter.generateRefreshToken({type: 'refresh', id:userExist.id, company_id:company.id}, '30d');

            if (!tokenRefresh) throw CustomError.internalServerError("Error generating refresh token");

            return {user:rest, token:token, tokenRefresh};
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError("Error logging in user");
        }

    }

    public async sendEmailValidationLink( email: string) {

        const token = await JwtAdapter.generateToken({email: email, rol:2}, '1h');

        if (!token) throw CustomError.internalServerError("Error generating token");

        const url = `${process.env.WEBSERVICE_URL}/auth/validate-email/${token}`;

        const htmlBody = contentHtmlRegister(url)
    
        const sent:boolean = await SendGrid.sendEmail(
            email, 
            "Email de verificacion de Azka-It",
            htmlBody
        ) 

        if (!sent) throw CustomError.badGateway("Error sending email from sendGrid");

        return true;

    }

}