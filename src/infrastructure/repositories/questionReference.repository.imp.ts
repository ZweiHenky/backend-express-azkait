import { QuestionReferenceDataSource } from "../../domain/dataSources/questionReference.datasource";
import { QuestionReferencesEntity } from "../../domain/entities/questionReference.entity";
import { QuestionReferenceRepository } from "../../domain/repositories/questionReference.repository";

export class QuestionReferenceRepositoryImp implements QuestionReferenceRepository {

    constructor(private dataSource: QuestionReferenceDataSource) {}

    getQuestionReferences(): Promise<QuestionReferencesEntity[]> {
        return this.dataSource.getQuestionReferences();
    }
}