import { CustomError } from "../../errors/custom.error";


export class CreateCandidateDto {
    constructor(
        public readonly userId_fk: number,
        public id_viterbit: string,
        public cv_url: string,
        public readonly url_linkedin: string = '',
    ) {}  

    static create(object: { [key:string] : any }): [ string? , CreateCandidateDto? ] {
        const { userId_fk, id_viterbit, cv_url, url_linkedin } = object;

        if (!userId_fk){
            return ["userId_fk is required", undefined];
        }
        if (!id_viterbit){
            return ["id_viterbit is required", undefined];
        }

        if (!cv_url){
            return ["cv_url is required", undefined];
        }

        return [undefined, new CreateCandidateDto(userId_fk, id_viterbit, cv_url, url_linkedin)];
    }
}   