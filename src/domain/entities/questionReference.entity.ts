

export class QuestionReferencesEntity{
    constructor(
        public id: number,
        public name: string,
    ) {}

    static fromObject(object:{ [key:string]:any } ): QuestionReferencesEntity {
        const { id, name } = object;
        if (!id) {
            throw new Error("id is required");
        }
        if (!name) {
            throw new Error("name is required");
        }
        return new QuestionReferencesEntity(id, name);

    }

}