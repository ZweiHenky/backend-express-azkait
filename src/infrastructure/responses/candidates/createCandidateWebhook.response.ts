export interface CreateCandidateWebhook {
    id:        string;
    timestamp: number;
    createdAt: Date;
    event:     string;
    payload:   Payload;
}

export interface Payload {
    address:                    Address;
    curriculum:                 Curriculum;
    custom_fields:              CustomField[];
    questionnaires:             Questionnaire[];
    evaluations:                Evaluation[];
    id:                         CreatedByID;
    reference:                  CreatedByID;
    full_name:                  CreatedByID;
    phone:                      CreatedByID;
    email:                      CreatedByID;
    gender:                     CreatedByID;
    birthday:                   Date;
    picture_url:                CreatedByID;
    source:                     CreatedByID;
    source_params:              SocialProfile[];
    social_profiles:            SocialProfile[];
    is_applied:                 boolean;
    talent_community_signed_at: Date;
    created_at:                 Date;
    updated_at:                 Date;
    created_by_id:              CreatedByID;
}

export interface Address {
    country:     string;
    state:       string;
    city:        string;
    postal_code: string;
    address:     string;
}

export enum CreatedByID {
    String = "string",
    URLToFile = "url_to_file",
}

export interface Curriculum {
    title:            CreatedByID;
    summary:          CreatedByID;
    experience_years: number;
    skills:           CreatedByID[];
    soft_skills:      CreatedByID[];
    cv_url:           CreatedByID;
    experiences:      Experience[];
    educations:       Education[];
    languages:        SocialProfile[];
}

export interface Education {
    title:       CreatedByID;
    school:      CreatedByID;
    description: CreatedByID;
    start_at:    Date;
    end_at:      Date;
}

export interface Experience {
    title:       CreatedByID;
    company:     CreatedByID;
    description: CreatedByID;
    address:     Address;
    skills:      CreatedByID[];
    start_at:    Date;
    end_at:      Date;
}

export interface SocialProfile {
    key:   CreatedByID;
    value: CreatedByID;
}

export interface CustomField {
    type:         string;
    value:        CreatedByID[] | boolean | Date | CreatedByID | number;
    mime_type?:   CreatedByID;
    size?:        number;
    title:        CreatedByID;
    reference_id: CreatedByID;
    status?:      string;
    score?:       number;
    max_score?:   number;
}

export interface Evaluation {
    id:          CreatedByID;
    job_id:      CreatedByID;
    comment:     CreatedByID;
    answers:     CustomField[];
    template:    Template;
    punctuation: number;
    score:       number;
    max_score:   number;
}

export interface Template {
    id:          CreatedByID;
    title:       CreatedByID;
    description: CreatedByID;
    questions:   Question[];
    created_at:  Date;
}

export interface Question {
    id:          CreatedByID;
    type:        string;
    title:       CreatedByID;
    description: CreatedByID;
    slug:        CreatedByID;
    choices:     CreatedByID[];
    punctuation: Punctuation[];
}

export interface Punctuation {
    option: CreatedByID;
    value:  number;
}

export interface Questionnaire {
    id:        CreatedByID;
    answers:   CustomField[];
    template:  Template;
    score:     number;
    max_score: number;
}
