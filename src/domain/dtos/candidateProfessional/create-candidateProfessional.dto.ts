

export class CandidateProfessionalDto {
    private constructor(
        public readonly id_candidate_fk: number,
        public readonly id_professionalProfile_fk: [],
    ) {}
    
    static create( object: { [key:string] : any } ): [string?, CandidateProfessionalDto?] {
        
        let { id_candidate_fk, id_professionalProfile_fk, } = object;

        if (!id_candidate_fk){
            return ["id_candidate_fk is required", undefined];
        }

        if (id_professionalProfile_fk.length === 0) {
            return ["id_professionalProfile_fk is required", undefined];
        }

        return [undefined, new CandidateProfessionalDto(id_candidate_fk, id_professionalProfile_fk)];
    }
}