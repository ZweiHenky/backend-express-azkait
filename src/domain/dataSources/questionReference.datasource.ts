import { QuestionReferencesEntity } from "../entities/questionReference.entity";

export abstract class QuestionReferenceDataSource {
    abstract getQuestionReferences(): Promise<QuestionReferencesEntity[]>;
}