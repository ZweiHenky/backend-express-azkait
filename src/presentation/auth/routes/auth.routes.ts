import { RequestHandler, Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../../services/auth.service";
import { AuthRepositoryImp } from "../../../infrastructure/repositories/auth.repository.imp";
import { AuthDatasourceImp } from "../../../infrastructure/dataSources/auth.datasource.imp";
import multer from 'multer';
import { CandidateService } from "../../services/candidate.service";
import { CandidateRepositoryImp } from "../../../infrastructure/repositories/candidate.repository.imp-";
import { CandidateDatasourceImp } from "../../../infrastructure/dataSources/candidate.datasource.imp";
import { CandidateProfessionalRepositoryImp } from "../../../infrastructure/repositories/candidateProfessional.repository";
import { CandidateProfessionalDatasourceImp } from "../../../infrastructure/dataSources/candidateProfessional.datasource.imp";

export class AuthRoutes {
    static get routes() : Router {
        const router = Router();

        const datasource = new AuthDatasourceImp();
        
        const candidateDatasource = new CandidateDatasourceImp();
        const candidateRepository = new CandidateRepositoryImp(candidateDatasource);
        const candidateService = new CandidateService(candidateRepository);

        const authRepository = new AuthRepositoryImp( datasource );

        const candidateProfessionalDatasource = new CandidateProfessionalDatasourceImp();
        const candidateProfessionalRepository = new CandidateProfessionalRepositoryImp(candidateProfessionalDatasource);

        const authService = new AuthService(authRepository, candidateService, candidateRepository, candidateProfessionalRepository);
        const authController = new AuthController(authService);

        /**
         * @swagger
         * /api/v1/auth/login:
         *   post:
         *     summary: Iniciar sesión
         *     description: Permite a un usuario iniciar sesión en la aplicación.
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *               - password
         *             properties:
         *               email:
         *                 type: string
         *                 example: example@gmail.com
         *                 description: Correo electrónico del usuario
         *               password:
         *                 type: string   
         *                 example: 123456
         *                 description: Contraseña del usuario
         *     responses:
         *       200:
         *         description: Inicio de sesión exitoso
         *         content:
         *           application/json:
         *            examples:
         *              respuesta:
         *                summary: Usuario registrado
         *                value:
         *                 user:
         *                  name: "Juan Pérez"
         *                  email: "example@gmail.com"
         *                  lastName: "Pérez"
         *                  phone: "1234567890"
         *                  pregunta_referencia: "Facebook"
         *                  location: "Madrid"
         *                  createdAt: "2025-07-11T17:49:55.537Z"
         *                  rolId_fk: 1
         *                  id: 1
         *                 token: "abc123"
         *       400:
         *         description: Error en la solicitud
         *       500:
         *         description: Error interno del servidor
         *       
         */
        router.post('/login', authController.loginUser);

        /**
         * @swagger
         * /api/v1/auth/register:
         *   post:
         *     summary: Registrar nuevo usuario
         *     description: Registra un nuevo usuario en el sistema.
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *               - password
         *               - name
         *               - lastName
         *               - phone
         *               - question_reference_id
         *               - rolId_fk
         *             properties:
         *               email:
         *                 type: string
         *                 example: ejemplo@correo.com
         *                 description: Correo electrónico del usuario
         *               password:
         *                 type: string
         *                 example: 123456
         *                 description: Contraseña del usuario
         *               name:
         *                 type: string
         *                 example: Juan Pérez
         *                 description: Nombre del usuario
         *               lastName:
         *                  type: string   
         *                  example: Perez    
         *                  description: Apellido del usuario
         *               phone:
         *                  type: string
         *                  example: 1234567890
         *                  description: Teléfono del usuario
         *               question_reference_id:
         *                  type: number
         *                  example: 1
         *                  description: Pregunta de referencia del usuario
         *               cv:
         *                  type: file
         *                  example: cv.pdf
         *                  format: binary
         *                  description: CV del usuario
         *               url_linkedin:
         *                  type: string
         *                  example: https://www.linkedin.com/in/ejemplo
         *                  description: URL de LinkedIn del usuario
         *               id_professionalProfile_fk:
         *                  type: array
         *                  example: [1, 2, 3]
         *                  description: ID del perfil profesional del usuario
         *               rolId_fk:
         *                  type: number
         *                  example: 1   
         *                  description: ID del rol del usuario    
         *     responses:
         *       201:
         *         description: Usuario creado con éxito
         *         content:
         *           application/json:
         *            examples:
         *              respuesta:
         *                summary: Usuario registrado
         *                value:
         *                 user:
         *                  name: "Juan Pérez"
         *                  email: "example@gmail.com"
         *                  lastName: "Pérez"
         *                  phone: "1234567890"
         *                  question_reference_id: 1
         *                  location: "Madrid"
         *                  createdAt: "2025-07-11T17:49:55.537Z"
         *                  rolId_fk: 1
         *                  id: 1
         *                 token: "abc123"
         *       400:
         *        description: Error en la solicitud
         *       500:
         *        description: Error interno del servidor
         */
        router.post('/register', multer().single('cv'), authController.registerUser);

        /**
         * @swagger
         * /api/v1/auth/validate-email/{token}:
         *   get:
         *     summary: Validar correo electrónico
         *     description: Valida el correo electrónico del usuario utilizando un token.
         *     tags: [Auth]
         *     parameters:
         *       - in: path
         *         name: token
         *         required: true
         *         schema:
         *           type: string
         *           example: abc123
         *     responses:
         *       200:
         *         description: Correo electrónico validado con éxito
         *       400:
         *         description: Error en la solicitud
         */
        router.get('/validate-email/:token', authController.validateEmail);

        /**
         * @swagger
         * /api/v1/auth/reset-password:
         *   post:
         *     summary: Mandar correo con url para restablecer contraseña
         *     description: Envía un correo electrónico con un enlace para restablecer la contraseña del usuario.
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *             properties:
         *               email:
         *                 type: string
         *                 example: usuario@example.com
         *                 description: Correo electrónico del usuario
         *     responses:
         *       200:
         *         description: Enlace de restablecimiento de contraseña enviado al correo electrónico
         *       400:
         *         description: Error en la solicitud
         */

        router.post('/reset-password', authController.resetPassword);


        /**
         * @swagger
         * /api/v1/auth/change-password:
         *   post:
         *     summary: Cambiar contraseña con la url enviada al correo
         *     description: Permite cambiar la contraseña del usuario utilizando la URL enviada al correo electrónico.
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *               - password
         *             properties:
         *               email:
         *                 type: string
         *                 example: usuario@example.com
         *                 description: Correo electrónico del usuario
         *               password:
         *                 type: string
         *                 example: 123456
         *                 description: Nueva contraseña del usuario
         *     responses:
         *       200:
         *         description: Contraseña cambiada con éxito
         *       400:
         *         description: Error en la solicitud
         */
        router.post('/change-password', authController.changePassword);

                /**
         * @swagger
         * /api/v1/auth/resend-verification-email:
         *   post:
         *     summary: Reenviar correo de verificación
         *     description: Permite reenviar el correo de verificación al usuario.
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *             properties:
         *               email:
         *                 type: string
         *                 example: usuario@example.com
         *                 description: Correo electrónico del usuario
         *     responses:
         *       200:
         *         description: Contraseña cambiada con éxito
         *       400:
         *         description: Error en la solicitud
         */
        router.post('/resend-verification-email', authController.resendEmailValidation as RequestHandler)

        router.post('/refresh-token', authController.generateNewToken as RequestHandler);

        return router;
    }
}