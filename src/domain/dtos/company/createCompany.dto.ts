export class CreateCompanyDto{
    constructor(
        public readonly name:string,
        public readonly website:string,
        public readonly sector_id:number,
        public readonly userId_fk:number
    ){}

    static create(object: {[key:string]:any}):[string?, CreateCompanyDto?]{

        const {name, website, sector_id, userId_fk} = object

        if (!name) {
            return ["name is required", undefined]
        }
        if (!website) {
            return ["website is required", undefined]
        }
        if (!sector_id) {
            return ["sector is required", undefined]
        }
        if (!userId_fk) {
            return ["userId_fk is required", undefined]
        }

        return [undefined, new CreateCompanyDto(name,website,sector_id,userId_fk)]
    }
}