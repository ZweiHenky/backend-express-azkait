import { Router } from "express";
import { AuthCompanyController } from "../controllers/authCompany.controller";
import { AuthCompanyService } from "../../services/authCompany.service";
import { AuthDatasourceImp } from "../../../infrastructure/dataSources/auth.datasource.imp";
import { AuthRepositoryImp } from "../../../infrastructure/repositories/auth.repository.imp";
import { CompanyRespositoryImp } from "../../../infrastructure/repositories/company.repository.imp";
import { CompanyDatasourceImp } from "../../../infrastructure/dataSources/company.datasource.imp";

export class AuthCompanyRoutes{
    static get routes(): Router{

        const router = Router()

        const authDatasourceImp = new AuthDatasourceImp()

        const authRepositoryImp = new AuthRepositoryImp(authDatasourceImp)

        const companyDatasourceImp = new CompanyDatasourceImp()
        const companyRepositoryImp = new CompanyRespositoryImp(companyDatasourceImp)

        const authCompanyService = new AuthCompanyService (authRepositoryImp, companyRepositoryImp)

        const authCompanyController = new AuthCompanyController(authCompanyService)

         /**
         * @swagger
         * /api/v1/auth/registerCompany:
         *   post:
         *     summary: Registrar nueva compañia
         *     description: Registra una nueva compañia en el sistema.
         *     tags: [AuthCompany]
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
         *                  example: Facebook
         *                  description: Pregunta de referencia del usuario
         *               rolId_fk:
         *                  type: number
         *                  example: 1   
         *                  description: ID del rol del usuario   
         *               company:
         *                 type: object
         *                 required:
         *                   - name
         *                   - website
         *                   - sector_id
         *                 properties:
         *                  name:
         *                   type: string
         *                   example: "Empresa XYZ"
         *                   description: Nombre de la empresa
         *                  website: 
         *                   type: string
         *                   example: "https://www.empresa.com"
         *                   description: Sitio web de la empresa
         *                  sector_id:   
         *                   type: number
         *                   example: 1
         *                   description: ID del sector al que pertenece la empresa
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
         *                  rolId_fk: 1
         *                  id: 1
         *                  location: "Madrid"
         *                  createdAt: "2025-07-11T17:49:55.537Z"
         *                  sector_id: 1
         *                 token: "abc123"
         *       400:
         *        description: Error en la solicitud
         *       500:
         *        description: Error interno del servidor
         */
        router.post("/registerCompany", authCompanyController.register)

        
        /**
         * @swagger
         * /api/v1/auth/loginCompany:
         *   post:
         *     summary: Iniciar sesión
         *     description: Permite a un usuario iniciar sesión en la aplicación.
         *     tags: [AuthCompany]
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
        router.post('/loginCompany', authCompanyController.login)

        return router
    }
}