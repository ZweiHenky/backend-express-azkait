

export class CandidateProfessionalEntity {
    constructor(
        public readonly id_candidate_fk: number,
        public readonly id_professionalProfile_fk: number,
    ) {}
    
    static fromObject( object: { [key:string] : any } ): [string?, CandidateProfessionalEntity?] {
        
        let { id_candidate_fk, id_professionalProfile_fk, url_linkedin, cv_url } = object;

        if (!id_candidate_fk){
            return ["id_candidate_fk is required", undefined];
        }

        if (!id_professionalProfile_fk){
            return ["id_professionalProfile_fk is required", undefined];
        }

        return [undefined, new CandidateProfessionalEntity(id_candidate_fk, id_professionalProfile_fk)];
    }
}   