export interface Responsejob {
    data: DataJobResponse;
}

export interface DataJobResponse {
    id:                    string;
    reference:             string;
    status:                string;
    title:                 string;
    slug:                  string;
    slots:                 number;
    work_modality:         string;
    created_at:            Date;
    description:           string;
    requirements:          string;
    updated_at:            Date;
    created_by_id:         string;
    department_id:         string;
    department_profile_id: string;
    location_id:           string;
    salary_periodicity:    string;
    salary_min:            SalaryM;
    salary_max:            SalaryM;
    skills:                string[];
    experience_years:      number;
    owners_ids:            string[];
    applies_until:         Date;
    contract_type_id:      string;
    occupation:            string;
    external_id:           string;
}

export interface SalaryM {
    amount:   number;
    currency: string;
}
