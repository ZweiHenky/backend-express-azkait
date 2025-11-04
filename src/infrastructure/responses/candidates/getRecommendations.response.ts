export interface GetRecommendationsResponse {
    data: RecommendationsDatum[];
    meta: Meta;
}

export interface RecommendationsDatum {
    id:              string;
    reference:       string;
    full_name:       string;
    phone:           string;
    email:           string;
    gender:          string;
    picture_url?:    string;
    source:          string;
    source_params:   any[] | SourceParamsClass;
    social_profiles: SocialProfile[];
    is_applied:      boolean;
    created_at:      Date;
    updated_at:      Date;
    tags:            any[];
}

export interface SocialProfile {
    key:    string;
    value?: string;
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
