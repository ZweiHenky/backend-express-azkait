
import { bcryptAdapter } from "../../config/bcrypt";
import { JwtAdapter } from "../../config/jwt.adapter";
import { AuthEntity, CustomError, RegisterUserDto } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { CandidateService } from "./candidate.service";
import { CandidateRepository } from "../../domain/repositories/candidate.repository";
import { log } from "console";
import { regularExps } from "../../config/regular-exp";
import { contentHtmlRegister } from "../../utils/contentHtmlRegister";
import { SendGrid } from "../../config/sendGrid";
import { contentHtmlResetPassword } from "../../utils/contentHtmlResetPasswor";
import {apiSearchCandidateByPhone } from "../../services/api/apiViterbit";
import { prisma } from "../../data/postgres/db";
import { Prisma } from "@prisma/client";
import { CreateCandidateDto } from "../../domain/dtos/candidate/create-candidate";
import { CandidateProfessionalDto } from "../../domain/dtos/candidateProfessional/create-candidateProfessional.dto";
import { CandidateProfessionalRepository } from "../../domain/repositories/candidateProfessional.repository";
import { globals } from "../../utils/globals.";


export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly candidateService: CandidateService,
        private readonly candidateRepository: CandidateRepository,
        private readonly candidateProfessionalRepository: CandidateProfessionalRepository,
    ){}
    

    public async registerUser(registerUserDto: RegisterUserDto) {

        const existsUser = await this.authRepository.findByEmail(registerUserDto.email);

        if (existsUser) throw CustomError.badRequest("Email already exists");

        const existsPhone = await this.authRepository.findByPhone(registerUserDto.phone);

        if (existsPhone) throw CustomError.badRequest("Phone already exists");

        const candidateViterbitExist = await apiSearchCandidateByPhone(registerUserDto.phone);

        let candidateViterbit = candidateViterbitExist.data;


        if (candidateViterbit.data.length > 0) {
            try {
                candidateViterbit = candidateViterbit.data[0];

                const id_candidate = candidateViterbit.id;

                const cv_url = await this.candidateService.fetchCandidateCV(id_candidate);

                if (!cv_url) throw new Error("the url cv not found");

                const id_professionalProfile_fk = registerUserDto.id_professionalProfile_fk;
                const url_linkedin = registerUserDto.url_linkedin || null;

                delete registerUserDto.url_linkedin;
                delete registerUserDto.id_professionalProfile_fk;
                delete registerUserDto.cv;

                const { user, candidate, token, tokenRefresh } = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {

                    registerUserDto.password = await bcryptAdapter.hash(registerUserDto.password);

                    const user = await this.authRepository.create(registerUserDto, tx);
                    if (!user) throw CustomError.badRequest("Error creating user");

                    const [error, candidateDto] = CreateCandidateDto.create({
                        cv_url: cv_url.data.curriculum.cv_url,
                        id_viterbit: id_candidate,
                        userId_fk: user.id,
                        url_linkedin: url_linkedin
                    });

                if (error) throw new Error(error);

                    const candidate = await this.candidateRepository.createCandidate(candidateDto!, tx);
                    if (!candidate) throw CustomError.badRequest("Error creating candidate");

                    const token = await JwtAdapter.generateToken({
                        id: user.id,
                        email: user.email,
                        email_validate: user.email_validate,
                        rol: user.rolId_fk
                    });

                    if (!token) throw CustomError.internalServerError("Error generating token");

                    const tokenRefresh = await JwtAdapter.generateRefreshToken({type: 'refresh', id:user.id}, '30d');

                    if (!tokenRefresh) throw CustomError.internalServerError("Error generating refresh token");

                    
                    if (id_professionalProfile_fk && id_professionalProfile_fk.length >= 1) {
                        const candidateProfessional = CandidateProfessionalDto.create({
                            id_candidate_fk: candidate.id,  
                            id_professionalProfile_fk:id_professionalProfile_fk
                        });

                        const [error, candidateProfessionalDto] = candidateProfessional;

                        if (error) throw CustomError.badRequest(error);

                        const candidateProfessionalCreated = await this.candidateProfessionalRepository.create(candidateProfessionalDto!, tx);

                        if (!candidateProfessionalCreated) throw CustomError.badRequest("Error creating candidate professional");
                    }

                    return { user, candidate, token, tokenRefresh };
                });

                const { password, ...rest } = user;
                return { user: rest, token, tokenRefresh };

            } catch (err) {
                // Puedes lanzar el error, loguearlo, o devolver un mensaje personalizado
                console.error(err);
                throw CustomError.internalServerError("Error processing candidate registration");
            }
        }


        try {

            await this.candidateService.uploadCandidateFromForm(registerUserDto.cv!, registerUserDto.email);

            const timestampInSeconds = Math.floor(Date.now() / 1000);

            registerUserDto.password = await bcryptAdapter.hash(registerUserDto.password);

            const id_professionalProfile_fk = registerUserDto.id_professionalProfile_fk ;
            const url_linkedin = registerUserDto.url_linkedin || null;

            delete registerUserDto.url_linkedin;
            delete registerUserDto.id_professionalProfile_fk;
            delete registerUserDto.cv;

            const user = await this.authRepository.create(registerUserDto);

            if (!user) throw CustomError.badRequest("Error creating user");

            const {password, ...rest} = user;

            const token  = await JwtAdapter.generateToken({id: user.id, email: user.email, email_validate:user.email_validate, rol:user.rolId_fk});
            
            if (!token) throw CustomError.internalServerError("Error generating token");

            const tokenRefresh = await JwtAdapter.generateRefreshToken({type: 'refresh', id:user.id}, '30d');

            if (!tokenRefresh) throw CustomError.internalServerError("Error generating refresh token");

            const filteredUsers = globals.pendingUsers.filter(el => el.source !== user.email);

            const userDataGlobal = {
                userId_fk: Number(user.id),
                url_linkedin: url_linkedin,
                id_professionalProfile_fk: id_professionalProfile_fk,
                source: user.email,
                timestamp: timestampInSeconds
            };

            // Reemplaza el anterior si existe, o simplemente lo agrega
            globals.pendingUsers = [...filteredUsers, userDataGlobal];

            return {user:rest, token, tokenRefresh};

        } catch (error : any) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError("Error creating user" );
        }

    }

    public async loginUser(loginUserDto: LoginUserDto) {

        try {
            const userExist = await this.authRepository.findByEmail(loginUserDto.email);

            if (!userExist) throw CustomError.badRequest("Email or password is incorrect");

            const isValidPassword = await bcryptAdapter.compare(loginUserDto.password, userExist.password);

            if (!isValidPassword) throw CustomError.badRequest("Email or password is incorrect");

            const id_viterbit = await this.candidateRepository.findIdViterbitByUser(Number(userExist.id))

            if(!id_viterbit) throw CustomError.badRequest("ID viterbit doesnt exist");

            const {password, ...rest} = AuthEntity.fromObject(userExist);

            const token  = await JwtAdapter.generateToken({id: userExist.id, email: userExist.email, email_validate:userExist.email_validate, id_viterbit : id_viterbit, rol:userExist.rolId_fk});
            
            if (!token) throw CustomError.internalServerError("Error generating token");

            const tokenRefresh = await JwtAdapter.generateRefreshToken({type: 'refresh', id:userExist.id}, '30d');

            if (!tokenRefresh) throw CustomError.internalServerError("Error generating refresh token");

            return {user:rest, token:token, tokenRefresh};
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError("Error logging in user");
        }

    }

    public async sendEmailValidationLink( email: string) {

        const token = await JwtAdapter.generateToken({email: email, rol:1}, '1h');

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

    public async validateEmail(token: string) {

        const decoded = await JwtAdapter.verifyToken(token); 

        if (!decoded) throw CustomError.unauthorized("Invalid token");

        const {email, rol} = decoded as any;

        const user = await this.authRepository.findByEmail(email);

        if (!user) throw CustomError.badRequest("User not found");

        const updatedUser = await this.authRepository.update(user.email);

        if (!updatedUser) throw CustomError.badRequest("Error updating user");

        let id_viterbit = null;
        if (rol === 1) {
            id_viterbit = await this.candidateRepository.findIdViterbitByUser(Number(user.id))

            if(!id_viterbit) throw CustomError.badRequest("ID viterbit doesnt exist");
        }

        const {password, ...rest} = AuthEntity.fromObject(user);

        const tokenSesion  = await JwtAdapter.generateToken({id: user.id, email: user.email, email_validate:user.email_validate, id_viterbit : id_viterbit});

        return tokenSesion;

    }

    public async resetPassword(email: string) {

        const user = await this.authRepository.findByEmail(email);

        if (!user) throw CustomError.badRequest("User not found");

        const token = await JwtAdapter.generateToken({email: user.email}, '1h');

        if (!token) throw CustomError.internalServerError("Error generating token");

        const url = `${process.env.FRONTEND_URL}/recuperar/nueva?token=${token}`;

        const htmlBody = contentHtmlResetPassword(url)

        const sent:boolean = await SendGrid.sendEmail(
            email,
            "Solicitud para cambiar la contraseña",
            htmlBody
        ) 

        if (!sent) throw CustomError.badGateway("Error sending email from sendGrid");

        return true;

    }

    public async changePassword(token: string, newPassword: string) {
        log("Change password service called");

        const decoded = await JwtAdapter.verifyToken(token);

        if (!decoded) throw CustomError.unauthorized("Invalid token");
        const {email} = decoded as any;
        console.log(email);

        const user = await this.authRepository.findByEmail(email);
        if (!user) throw CustomError.badRequest("User not found");

        const hashedPassword = await bcryptAdapter.hash(newPassword);

        const updatedUser = await this.authRepository.updatePassword(user.email, hashedPassword);
        if (!updatedUser) throw CustomError.internalServerError("Error updating password");


        const sent:boolean = await SendGrid.sendEmail(
            email, 
            "Confirmacion de contraseña",
            "<h1>Your password has been changed successfully</h1>"
        ) 

        if (!sent) throw CustomError.badGateway("Error sending email from sendGrid");

        return true;

    }


    public async resendEmail(email:string){

        if (!regularExps.email.test(email)) throw CustomError.badRequest("Formato de correo invalido")

        const user = await this.authRepository.findByEmail(email)

        if (!user) throw CustomError.badRequest("No se encontro el usuario")

        if(user.email_validate) throw CustomError.badRequest("El usuario ya esta validado") 

        const resCandidate = this.candidateRepository.getById(Number(user.id))

        if (!resCandidate) throw CustomError.badRequest("No se encontro el candidato")


        await this.sendEmailValidationLink(user.email)

        return true

    }

}

