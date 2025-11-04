import { CustomError } from "../errors/custom.error";


export class ProfessionalEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
    ) {}
    
    static fromObject( object: { [key:string] : any } ): ProfessionalEntity {
        
        let { id, name} = object;

        if (!id){
           throw  CustomError.badRequest("id is required");
        }

        if (!name){
             throw  CustomError.badRequest("name is required");
        }

        return  new ProfessionalEntity(id, name);
    }
}   