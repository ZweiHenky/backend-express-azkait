import { regularExps } from "../../../config/regular-exp";


export class LoginUserDto {
    private constructor(
        public readonly email: string,
        public readonly password: string
    ) {}
    
    static create( object: { [key:string] : any } ): [string?, LoginUserDto?] {

        const { email, password } = object;

        if (!email){
            return ["email is required", undefined];
        }

        if (!password){
            return ["password is required", undefined];
        }

        if (!regularExps.email.test(email)){
            return ["email is not valid", undefined]
        }

        if (password.length < 8){
            return ["password must be at least 8 characters", undefined];
        }

        return [undefined, new LoginUserDto(email, password)];
    }
}