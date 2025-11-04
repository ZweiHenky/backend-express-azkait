import { QuestionReferenceDataSource } from "../dataSources/questionReference.datasource";
import { QuestionReferencesEntity } from "../entities/questionReference.entity";

export abstract class QuestionReferenceRepository implements QuestionReferenceDataSource {
    abstract getQuestionReferences(): Promise<QuestionReferencesEntity[]>;
}