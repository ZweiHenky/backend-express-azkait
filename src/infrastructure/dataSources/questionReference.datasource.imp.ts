import { prisma } from "../../data/postgres/db";
import { QuestionReferenceDataSource } from "../../domain/dataSources/questionReference.datasource";
import { QuestionReferencesEntity } from "../../domain/entities/questionReference.entity";

export class QuestionReferenceDataSourceImp implements QuestionReferenceDataSource {

    async getQuestionReferences(): Promise<QuestionReferencesEntity[]> {
        const questionReferences = await prisma.questionRef.findMany();
        
        if (!questionReferences) {
            return [];
        }

        return questionReferences.map((questionRef:QuestionReferencesEntity) =>
            QuestionReferencesEntity.fromObject(questionRef)
        );
    }

}

