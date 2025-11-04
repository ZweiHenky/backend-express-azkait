

export class ChangeCandidatureStatusDto{
    private constructor(
        public readonly id : string,
        public readonly stage_id : string
    ){}


    static create( object : { [key : string] : any}) : [string?, ChangeCandidatureStatusDto? ]{
        const {id, stage_id} = object;

        if(!id){
            return ["id candidature is required", undefined]
        }
        if(!stage_id){
            return ["id stage is required", undefined]
        }

        return [undefined, new ChangeCandidatureStatusDto(id, stage_id)]
    }
}