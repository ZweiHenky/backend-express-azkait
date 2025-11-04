export interface GetAllCandidaturesByJobIDInterface {
    data: Data[];
    meta: Meta;
}

export interface Data{
    id:             string;
    status:         string;
    is_applied:     boolean;
    current_stage:  CurrentStage;
    job_id:         string;
    candidate_id:   string;
    title : string;
    full_name : string;
    years : number;
    created_at:     Date;
    created_by_id?: string;
    updated_at:     Date;
    source_params:  any[] | SourceParamsClass;
}

export interface CurrentStage {
    id:            string;
    name:          string;
    stage_type_id: string;
}



export interface SourceParamsClass {
    utm_source:   string;
    utm_medium:   string;
    utm_campaign: string;
}


export interface Meta {
    page:        number;
    page_size:   number;
    total:       number;
    total_pages: number;
    has_more:    boolean;
}
