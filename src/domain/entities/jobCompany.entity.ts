import { CustomError } from "../errors/custom.error";


export class JobCompany {
    constructor(
        public readonly id: number,
        public readonly id_job: string,
        public readonly id_company_fk: number
    ) { }

    static fromObject(object: { [key: string]: any }): JobCompany {
        const { id, id_job, id_company_fk } = object

        if (!id) {
            throw CustomError.badRequest("id is required");
        }

        if (!id_job) {
            throw CustomError.badRequest("id job is required");
        }

        if (!id_company_fk) {
            throw CustomError.badRequest("id user company job is required");
        }

        return new JobCompany(
            id,
            id_job,
            id_company_fk
        );
    }




}
