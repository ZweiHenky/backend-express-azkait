export interface RecommendationsCandidatesInterface {
    data: RecommendationsDatumInterface[];
    meta: Meta;
}

export interface RecommendationsDatumInterface {
    id: string;
    full_name: string;
    title ?: string;
    sumary ?: string;
    country ?: string;
    state ?: string;
    email: string;
    picture_url?: string;
    years_experience: number
    skills: string[];
    created_at: Date;
    updated_at: Date;

}

export interface Meta {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
    has_more: boolean;
}
