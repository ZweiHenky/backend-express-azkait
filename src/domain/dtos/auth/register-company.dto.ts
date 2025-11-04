import { log } from "console"
import { validatemailMailboxLayer } from "../../../services/actions/mailboxlayer/validateEmail"
import { regularExps } from "../../../config/regular-exp"
import { companyInterface } from "../../../infrastructure/interfaces/company/company.interface"



export class RegisterCompanyDto {

    constructor(
        public readonly email:string,
        public readonly password:string,
        public readonly name:string,
        public readonly lastName:string,
        public readonly question_reference_id:number,
        public phone:string,
        public readonly rolId_fk:number,
        public readonly company:companyInterface
    ){}

    static async create(object : {[ key:string ] : any}) : Promise<[string?, RegisterCompanyDto?]> {
        

        let { email, password ,name, lastName, question_reference_id, phone, rolId_fk, company } = object


        if (!company) {
            return ["El objeto company es requerido ( { name, website } )", undefined]
        }

        const { name:nameCompany, website, sector_id } = company

        if (!email) {
            return ["El correo es requerido", undefined]
        }

        const dataEmail = await validatemailMailboxLayer(email)
        
        if (!dataEmail.format_valid) {
            return ['El email no tiene un formato valido', undefined]
        }

        if (dataEmail.free) {
            return ['El email no es de empresa', undefined]
        }

        // if (!dataEmail.disposable) {
        //     return ['El email no puede ser temporal', undefined]
        // }

        if (!password) {
            return ["La contraseña es requerida", undefined]
        }

        if (!regularExps.password.test(password)) {
            return ["La contraseña tiene que contener 8 caracteres, 1 mayuscula y minuscula, 1 caracter especial y 1 numero", undefined]
        }

        if (!name) {
            return ["El nombre es requerido", undefined]
        }
        if (!lastName) {
            return ["El apellido es requerido", undefined]
        }
        if (!question_reference_id) {
            return ["el id de la pregunta de referido es requerido", undefined]
        }
        if (!phone) {
            return ["El telefono es requerido", undefined]
        }

        if (!rolId_fk) {
            return ["El rol es requerido", undefined]
        }
        if (!nameCompany) {
            return ["El nombre de la compañia es requerido", undefined]
        }

        if (!website) {
            return ["La url de la compañia es requerido", undefined]
        }

        if (!sector_id) {
            return ["El id del sector es requerido", undefined]
        }
        

        return [undefined, new RegisterCompanyDto(email, password, name, lastName, question_reference_id, phone, rolId_fk, {name:nameCompany, website, sector_id} )]
    }

}