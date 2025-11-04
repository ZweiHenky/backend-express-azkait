export interface UpdateStatusJobResponse {
    id:        string;
    reference: string;
    data:      Data;
}

export interface Data {
    description_html:           string;
    requirements_html:          string;
    careers_site_url:           string;
    stages:                     Stage[];
    custom_fields:              CustomField[];
    address:                    Address;
    comments:                   Comment[];
    files:                      File[];
    contract_type:              Type;
    education_type:             Type;
    careers_configuration:      CareersConfiguration;
    status:                     string;
    title:                      string;
    slug:                       string;
    slots:                      number;
    work_modality:              string;
    created_at:                 Date;
    description:                string;
    requirements:               string;
    updated_at:                 Date;
    created_by_id:              string;
    published_at:               Date;
    department_id:              string;
    department_profile_id:      string;
    location_id:                string;
    salary_periodicity:         string;
    salary_min:                 SalaryM;
    salary_max:                 SalaryM;
    profile:                    string;
    profile_area:               string;
    skills:                     string[];
    experience_years:           number;
    owners_ids:                 string[];
    applies_until:              Date;
    hiring_plan_requisition_id: string;
    contract_type_id:           string;
    occupation:                 string;
    external_id:                string;
}

export interface Address {
    country:     string;
    state:       string;
    city:        string;
    postal_code: string;
    address:     string;
}

export interface CareersConfiguration {
    accessible_job_page:       boolean;
    display_accurate_location: boolean;
    show_salary:               boolean;
    show_contract_type:        boolean;
    show_sharing_bar:          boolean;
}

export interface Comment {
    id:                  string;
    content:             string;
    created_at:          Date;
    updated_at:          Date;
    created_by_user_id:  string;
    updated_by_user_id:  string;
    created_by_external: string;
    external_email:      string;
}

export interface Type {
    id:   string;
    name: string;
}

export interface CustomField {
    type:         string;
    value:        string[] | boolean | number | string;
    mime_type?:   string;
    size?:        number;
    title:        string;
    reference_id: string;
    status?:      string;
    score?:       number;
    max_score?:   number;
}

export interface File {
    value:     string;
    filename:  string;
    mime_type: string;
    size:      number;
}

export interface SalaryM {
    amount:   number;
    currency: string;
}

export interface Stage {
    id:            string;
    name:          string;
    stage_type_id: string;
}
