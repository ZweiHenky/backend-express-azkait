export interface ChangeStageResponse {
    id:        string;
    timestamp: number;
    createdAt: Date;
    event:     string;
    payload:   Payload;
}

export interface Payload {
    stages_history:    StagesHistory[];
    id:                string;
    status:            string;
    is_applied:        boolean;
    score:             number;
    current_stage:     CurrentStage;
    disqualified_info: DisqualifiedInfo;
    hired_info:        HiredInfo;
    job_id:            string;
    candidate_id:      string;
    created_at:        Date;
    created_by_id:     string;
    updated_at:        Date;
}

export interface CurrentStage {
    id:            string;
    name:          string;
    stage_type_id: string;
}

export interface DisqualifiedInfo {
    disqualified_at:    Date;
    disqualified_by_id: string;
    reason:             string;
}

export interface HiredInfo {
    hired_at:           Date;
    hired_by_id:        string;
    start_at:           Date;
    salary:             number;
    currency:           string;
    salary_periodicity: string;
}

export interface StagesHistory {
    stage_name:    string;
    stage_type_id: string;
    start_at:      Date;
    ends_at:       Date;
    created_by_id: string;
}
