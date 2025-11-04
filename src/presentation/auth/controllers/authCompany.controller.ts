import { Request, Response } from "express";
import { RegisterCompanyDto } from "../../../domain/dtos/auth/register-company.dto";
import { CustomError } from "../../../domain";
import { AuthCompanyService } from "../../services/authCompany.service";
import { LoginUserDto } from "../../../domain/dtos/auth/login-user.dto";

export class AuthCompanyController{

    constructor(
        private readonly authCompanyService: AuthCompanyService
    ){}

    private handleError = (error: unknown, res : Response) => {
        
            if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
            return
            }

            console.log(error);
            
            res.status(500).json({ error: "Internal server error" });
            
        }

    register = async (req: Request, res: Response) => {
        const [error, companyDto] = await RegisterCompanyDto.create(req.body)

        if (error) {
           res.json({error}).status(400)
        }

        this.authCompanyService.registerCompany(companyDto!)
        .then(result =>{
            res.json(result)
        })
        .catch(error => this.handleError(error, res))
    }

    login = (req: Request, res: Response) => {

        const loginUserDto = LoginUserDto.create(req.body);

        const [error, user] = loginUserDto;
        

        if (error) {
            res.status(400).json({ error });
            return;
        }

        this.authCompanyService.loginCompany(user!)
        .then((result) => {
            res.status(201).json(result);
         })
        .catch((error) => this.handleError(error, res));
    }

}