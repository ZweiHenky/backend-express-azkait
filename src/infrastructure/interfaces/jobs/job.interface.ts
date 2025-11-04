


export interface GetJobInterface {
   data: DataJobInterface;

}

export interface DataJobInterface{
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





