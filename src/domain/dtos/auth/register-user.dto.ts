import { regularExps } from "../../../config/regular-exp";
import { validatemailMailboxLayer } from "../../../services/actions/mailboxlayer/validateEmail";

export class RegisterUserDto {

    private constructor(
        public readonly email: string,
        public password: string,
        public readonly name: string,
        public readonly lastName: string,
        public readonly phone: string,
        public readonly question_reference_id: number,
        public rolId_fk : number,
        public id_professionalProfile_fk?: number[],
        public url_linkedin?: string,
        public cv? : Express.Multer.File,
    ) {}

    static async create ( object: { [key:string] : any } ): Promise<[string?, RegisterUserDto?]>  {

        let { email, password, name, lastName, phone, question_reference_id, rolId_fk, cv, id_professionalProfile_fk, url_linkedin } = object;

        rolId_fk = parseInt(rolId_fk);

        question_reference_id = parseInt(question_reference_id);

        if (!email){
            return ["email is required", undefined];
        }

        // const dataEmail = await validatemailMailboxLayer(email)
        
        // if (!dataEmail.format_valid) {
        //     return ['El email no tiene un formato valido', undefined]
        // }

        // if (!dataEmail.disposable) {
        //     return ['El email no puede ser temporal', undefined]
        // }

        if (!password){
            return ["password is required", undefined];
        }

        if (password.length < 8){
            return ["password must be at least 8 characters", undefined];
        }

        if (!regularExps.password.test(password)) {
            return ["La contraseña tiene que contener 8 caracteres, 1 mayuscula y minuscula, 1 caracter especial y 1 numero", undefined]
        }

        if (!name){
            return ["name is required", undefined];
        }

        if (!lastName){
            return ["lastName is required", undefined];
        }

        if (!phone){
            return ["phone is required", undefined];
        }

        if (!question_reference_id){
            return ["The id question_reference_id is required", undefined];
        }

        if (!rolId_fk){
            return ["The id rolId_fk is required", undefined];
        }

        if (!cv) {
           return ["cv is required", undefined];
        }

        if (!Array.isArray(id_professionalProfile_fk)) {
            return ["id_professionalProfile_fk doesn´t array", undefined]
        }
        

        return [undefined, new RegisterUserDto(email, password, name, lastName, phone, question_reference_id, rolId_fk, id_professionalProfile_fk, url_linkedin, cv)];
    }
}