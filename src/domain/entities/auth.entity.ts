import { CustomError } from "../errors/custom.error";


export class AuthEntity {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly name: string,
        public readonly lastName: string,
        public readonly email_validate: boolean,
        public readonly createdAt: Date,
        public readonly location: string | null,
        public readonly phone: string,
        public readonly question_reference_id: number,
        public readonly rolId_fk: number
    ) {}

    static fromObject(object:{ [key:string] : any }): AuthEntity {
        const { id, email, password, name, lastName, email_validate, createdAt, location, phone, question_reference_id, rolId_fk } = object;

        if (!id){
            throw CustomError.badRequest("id is required");
        }

        if (!email){
            throw CustomError.badRequest("email is required");
        }

        if (!password){
            throw CustomError.badRequest("password is required");
        }

        if (!name){
            throw CustomError.badRequest("name is required");
        }

        if (!lastName){
            throw CustomError.badRequest("lastname is required");
        }

        if (email_validate === undefined){
            throw CustomError.badRequest("isVerified is required");
        }

        if (!createdAt){
            throw CustomError.badRequest("createdAt is required");
        }

        if (!phone){
            throw CustomError.badRequest("phone is required");
        }

        if (!question_reference_id){
            throw CustomError.badRequest("pregunta_referencia is required");
        }

        if (!rolId_fk){
            throw CustomError.badRequest("rolId_fk is required");
        }


        return new AuthEntity(
            id,
            email,
            password,
            name,
            lastName,
            email_validate,
            createdAt,
            location,
            phone,
            question_reference_id,
            rolId_fk
        );
    }
}