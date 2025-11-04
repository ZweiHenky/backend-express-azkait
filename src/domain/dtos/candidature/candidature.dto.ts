import { CustomError } from "../../errors/custom.error";

export class CandidatureDto{
    private constructor(
        public readonly id : string,
        public readonly status : string,
        public readonly is_applied : boolean,
        public readonly score : number,
        public readonly current_stage : {},
        public readonly id_stage : string,
        public readonly name_stage : string,
        public readonly stage_type_id : string, 
        public readonly job_id : string,
        public readonly candidate_id : string,
        public readonly created_at : string,
        public readonly updated_at : string,
        public readonly source_params : {},
        public readonly utm_source : string,
        public readonly utm_medium : string,
        public readonly utm_campaign : string,

    ){}

    static create(object : { [key : string ] : any}): CandidatureDto {
            let {
                id,         
                status,
                is_applied,
                score,
                current_stage,
                id_stage,
                name_stage,
                stage_type_id,
                job_id,
                candidate_id,
                created_at,
                updated_at,
                source_params,
                utm_source,
                utm_medium,
                utm_campaign
            } = object;
    
            if(!id){
                throw CustomError.badRequest("id is required")
            }
    
            if(!status){
                throw CustomError.badRequest("is required")
            }
    
            return new CandidatureDto(
                id,
                status,
                is_applied,
                score,
                current_stage,
                id_stage,
                name_stage,
                stage_type_id,
                job_id,
                candidate_id,
                created_at,
                updated_at,
                source_params,
                utm_source,
                utm_medium,
                utm_campaign
            );
        }
}