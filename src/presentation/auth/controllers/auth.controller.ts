import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../../domain";
import { AuthService } from "../../services/auth.service";
import { LoginUserDto } from "../../../domain/dtos/auth/login-user.dto";
import { log } from "console";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { CandidateRepositoryImp } from "../../../infrastructure/repositories/candidate.repository.imp-";
import { CandidateDatasourceImp } from "../../../infrastructure/dataSources/candidate.datasource.imp";
import { AuthDatasourceImp } from "../../../infrastructure/dataSources/auth.datasource.imp";
import { AuthRepositoryImp } from "../../../infrastructure/repositories/auth.repository.imp";
import { JsonWebTokenError } from "jsonwebtoken";
import { jwt } from "twilio";
import { jwtDecode } from "jwt-decode";


export class AuthController {
    constructor(
       private readonly authService: AuthService, 
    ){}

    private handleError = (error: unknown, res : Response) => {
      
         if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
            return
         }

         console.log(error);
         
         res.status(500).json({ error: "Internal server error" });
         
      }

    registerUser = async(req: Request, res: Response) => {

      const file = req.file;

      req.body.cv = file;

      req.body.id_professionalProfile_fk = JSON.parse(req.body.id_professionalProfile_fk);

      const registerUserDto = await RegisterUserDto.create(req.body);

      const [error, user] = registerUserDto;

      if (error) {
         res.status(400).json({ error });
         return;
      }
      

      this.authService.registerUser(user!)
         .then((result) => {
            res.status(201).json(result);
         })
         .catch((error) => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {

      const loginUserDto = LoginUserDto.create(req.body);

      const [error, user] = loginUserDto;
      

      if (error) {
         res.status(400).json({ error });
         return;
      }

      this.authService.loginUser(user!)
         .then((result) => {
            log(result)
            res.status(201).json(result);
         })
         .catch((error) => this.handleError(error, res));
    }

    validateEmail = (req: Request, res: Response) => {

      const { token } = req.params;

      this.authService.validateEmail(token)
         .then((token) => { 
            res.status(301).redirect(`${process.env.FRONTEND_URL}/verificado?token=${token}`);
         })
         .catch((error) => res.status(400).redirect(`${process.env.FRONTEND_URL}/verify?error=${error}`) );

    }

    resetPassword = (req: Request, res: Response) => {
      const { email } = req.body;

      if (!email) {
         res.status(400).json({ error: "Email is required" });
         return;
      }

      this.authService.resetPassword(email)
         .then((result) => {
            res.status(200).json("Password reset link sent to your email");
         })
         .catch((error) => this.handleError(error, res));
    }

    changePassword = (req: Request, res: Response) => {
        log("Change password endpoint hit");
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            throw CustomError.badRequest("Token and new password are required");
        }

        this.authService.changePassword(token, newPassword)
            .then((result) => {
                res.status(200).json("Password changed successfully");
            })
            .catch((error) => this.handleError(error, res));
    }

    resendEmailValidation = (req: Request, res: Response) => {
      const email = req.body.email

      if (!email) return res.status(400).json({message: "El email es requerido"})


      this.authService.resendEmail(email)
      .then(result =>{
         res.json({message:"Se reenvio el correo"}).status(200)
      })
      .catch((error) => this.handleError(error, res))
    }

    generateNewToken = async(req: Request, res: Response) => {
      const tokenRefresh = req.body.tokenRefresh;
      if (!tokenRefresh) {
        return res.status(400).json({ error: "Token refresh is required" });
      }

      const candidateRepository = new CandidateRepositoryImp (new CandidateDatasourceImp());
      const authRepository = new AuthRepositoryImp(new AuthDatasourceImp());

      try {
         const tokenValidated:any = await JwtAdapter.verifyRefreshToken(tokenRefresh);

         log(tokenValidated);

         if (!tokenValidated) throw CustomError.unauthorized("Invalid token refresh");

         const user = await authRepository.findById(tokenValidated.id);

         if (!user) throw CustomError.unauthorized("User not found");

         let newToken = null

         if (user.rolId_fk == 1){
            const id_viterbit = await candidateRepository.findIdViterbitByUser(Number(user.id))
            if(!id_viterbit) throw CustomError.badRequest("ID viterbit doesnt exist");
            
            newToken = await JwtAdapter.generateToken({id: user.id, email: user.email, email_validate:user.email_validate, id_viterbit : id_viterbit, rol:user.rolId_fk});
         } else{
             const tokenData:any = jwtDecode(tokenRefresh)
            newToken = await JwtAdapter.generateToken({id: user.id, email: user.email, email_validate:user.email_validate, rol:user.rolId_fk, company_id: tokenData.company_id});
         }

         

         res.status(200).json({ token: newToken, tokenRefresh: tokenRefresh });

      } catch (error) {
         log(error);
         return res.status(401).json({ error: "Invalid token refresh" });
      }


    }
}