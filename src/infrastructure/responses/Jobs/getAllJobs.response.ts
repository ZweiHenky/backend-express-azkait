export interface GetAllJobsReponse {
    data: Data[];
    meta: Meta;
}

export interface Data{
    id:                          string;
    reference:                   string;
    status:                      string;
    title:                       string;
    slug:                        string;
    slots:                       number;
    work_modality:               string;
    created_at:                  Date;
    description:                 string;
    requirements:                string;
    updated_at:                  Date;
    created_by_id:               string;
    published_at?:               Date;
    department_id:               string;
    location_id:                 string;
    salary_periodicity:          string;
    salary_min:                  SalaryM;
    salary_max:                  SalaryM;
    skills:                      string[];
    experience_years:            number;
    owners_ids:                  string[];
    hiring_plan_requisition_id?: string;
    contract_type_id:            string;
    occupation:                  string;
    external_id:                 string;
    department_profile_id?:      string;
    applies_until?:              Date;
    archived_at?:                Date;
}




export interface SalaryM {
    amount:   number;
    currency: string;
}



export interface Meta {
    page:        number;
    page_size:   number;
    total:       number;
    total_pages: number;
    has_more:    boolean;
}
