import { CustomError } from "../errors/custom.error"

export class CompanyEntity{

    constructor (
        public readonly id:number,
        public readonly name:string,
        public readonly website:string,
        public readonly sector_id:number, 
        public readonly userId_fk:number
    ){}

    static fromObject = (object:{ [key:string] : any }) : CompanyEntity => {

        const {id, name, website, sector_id ,userId_fk} = object

        if (!id) {
            throw CustomError.badRequest("El id no se encontro en la entidad de empresa")
        }

        if (!name) {
            throw CustomError.badRequest("El nombre no se encontro en la entidad de empresa")
        }

        if (!website) {
            throw CustomError.badRequest("La url no se encontro en la entidad de empresa")
        }

        if (!sector_id) {
            throw CustomError.badRequest("El sector no se encontro en la entidad de empresa")
        }

        if (!userId_fk) {
            throw CustomError.badRequest("El id user no se encontro en la entidad de empresa")
        }

        return new CompanyEntity(id, name, website, sector_id, userId_fk)
    }

}