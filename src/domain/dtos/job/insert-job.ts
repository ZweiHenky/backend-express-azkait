

export class InsertJobCompany {

    constructor(
        public readonly id_job: string,
        public readonly id_company_fk: number
    ) { }

    static insert(object: { [key: string]: any }): [string?, InsertJobCompany?] {

        let { id_job, id_company_fk } = object

        if (!id_job) {
            return ["id job is required", undefined];
        }

        if (!id_company_fk) {
            return ["id company is not valid", undefined]
        }



        return [undefined, new InsertJobCompany(id_job, id_company_fk)]
    }
}