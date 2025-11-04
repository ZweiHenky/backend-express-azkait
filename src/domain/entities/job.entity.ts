import { CustomError } from "../errors/custom.error";

export class JobEntity {
    
    constructor(
        
        public readonly id: number,
        public readonly title: string,
        public readonly work_modality: string,
        public readonly created_at : String,
        public readonly updated_at : String,
        public readonly description : string,
        public readonly requirements : string,
        public readonly requirements_html : string,
        public readonly skills : [string],
        public readonly experience_years : string,
        public readonly occupation : string,
        public readonly contract_type : {},
        public readonly department : string,
        public readonly location: string,
        public readonly status: string,
        public readonly salary : {},
        public readonly published_at?: string,
        public readonly appliesUntil?: string,
        public readonly contractType?: string,
        public readonly slug?: string,
        public readonly profile? : string,  

    ) {}

    static fromObject(object: { [key: string]: any }): JobEntity {
        let {
            id,
            title,
            work_modality,
            created_at,
            updated_at,
            description,
            requirements,
            requirements_html,
            salary_periodicity,
            skills,
            salary_min,
            salary_max,
            experience_years,
            occupation,
            address,
            contract_type,
            department,
            profile,
            location, 
            modality,
            salary,
            status
        } = object;

        if (!id) {
            throw  CustomError.badRequest("id is required");
        }

        if (!title) {
            throw CustomError.badRequest("title is required");
        }

        if (!work_modality) {
            throw CustomError.badRequest("work_modality is required");
        }

        if (!created_at) {
            throw CustomError.badRequest("created_at is required");
        }

        if (!updated_at) {
            throw CustomError.badRequest("updated_at is required");
        }

        if (!description) {
            throw CustomError.badRequest("description is required");
        }

        if (!requirements) {
            throw CustomError.badRequest("requirements is required");
        }

        if (!requirements_html) {
            throw CustomError.badRequest("requirements_html is required");
        }

        if (!salary_periodicity) {
            throw CustomError.badRequest("salary_periodicity is required");
        }

        if (salary_min === undefined || salary_min === null) {
            throw CustomError.badRequest("salary_min is required");
        }
        if (salary_max === undefined || salary_max === null) {
            throw CustomError.badRequest("salary_max is required");
        }

        if (experience_years === undefined || experience_years === null) {
            throw CustomError.badRequest("experience_years is required");
        }
        if (!occupation) {
            throw CustomError.badRequest("occupation is required"); 
        }
        if (!address) {
            throw CustomError.badRequest("address is required");    
        }
        if (!contract_type) {
            throw   CustomError.badRequest("contract_type is required");    
        }
        if (!department) {
            throw CustomError.badRequest("department is required");
        }
        if (!profile) {
            throw CustomError.badRequest("profile is required");
        }
        
        

        return new JobEntity(
            id,
            title,
            work_modality,
            created_at,
            updated_at,
            description,
            requirements,
            requirements_html,
            skills || [],
            experience_years,
            occupation,
            contract_type,
            department,
            location || "",
            status || "active",
            {
                salary_min: salary_min.amount || 0,
                salary_max: salary_max.amount || 0,
                currency: salary_max.currency || salary_min.currency || "USD",
                salary_periodicity: salary_periodicity
            },
            object.published_at || "",
            object.appliesUntil || "",
            object.contractType || "",
            object.slug || "",
            profile
          
        );
    }


}