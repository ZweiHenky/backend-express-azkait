import { Request, Response } from "express";
import { QuestionReferenceRepository } from "../../../domain/repositories/questionReference.repository";

export class QuestionReferenceController {

    constructor(
        private readonly questionReferenceRepository: QuestionReferenceRepository, // Replace 'any' with the actual service type
    ){}

    getQuestionReference = async (req:Request, res:Response) =>{
        const questionReference = await this.questionReferenceRepository.getQuestionReferences();

        res.status(200).json({questionReference});
    }

}