import { CustomError } from "../errors/custom.error";


export class CandidateEntity {
    constructor(
        public readonly id: number,
        public readonly userId_fk: number,
        public id_viterbit: string,
        public cv_url: string,
        public readonly url_linkedin: string | null,

    ) {}  

    static fromObject(object: { [key:string] : any }): CandidateEntity {

        const { id, userId_fk, id_viterbit, cv_url, url_linkedin } = object;

        if (!id){
            throw CustomError.badRequest("id is required");
        }

        if (!userId_fk){
            throw CustomError.badRequest("userId_fk is required");
        }
        if (!id_viterbit){
            throw CustomError.badRequest("id_viterbit is required");
        }

        if (!cv_url){
            throw CustomError.badRequest("cv_url is required");
        }

        return new CandidateEntity(
            id,
            userId_fk,
            id_viterbit,
            cv_url,
            url_linkedin
        );
    }  

}