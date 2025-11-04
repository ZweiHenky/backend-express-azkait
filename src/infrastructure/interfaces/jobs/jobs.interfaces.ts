


export interface GetAllJobsInterface {
    data: Data[];
    meta: Meta;
}

export interface Data{
    id:                          string;
    reference:                   string;
    title:                       string;
    slug:                        string;
    slots:                       number;
    work_modality:               string;
    created_at:                  Date;
    description:                 string;
    requirements:                string;
    updated_at:                  Date;
    published_at?:               Date;
    location_id:                 string;
    salary_periodicity:          string;
    salary_min:                  SalaryM;
    salary_max:                  SalaryM;
    skills:                      string[];
    experience_years:            number;
    occupation:                  string;
    department_id: string;
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
