import { Request, RequestHandler, response, Response } from 'express';
import { CandidateService } from '../../services/candidate.service';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { EditCandidateDto } from '../../../domain/dtos/candidate/edit-candidate.dto';
import { CustomError } from '../../../domain/errors/custom.error';
import { RecommendationCandidateDto } from '../../../domain/dtos/candidate/recommendation-candidate';
import { log } from 'console';



export class CandidateController {
  uploadCandidateFromForm(arg0: string, arg1: RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, uploadCandidateFromForm: any) {
    throw new Error("Method not implemented.");
  }
  constructor(
    private readonly candidateService: CandidateService,
  ) { }


  private handleError = (error: unknown, res: Response) => {

    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
      return
    }
    console.log(error);
    res.status(500).json({ error: "Internal server error" });

  }

  searchByBulk = async (req: Request, res: Response) => {
    try {
      const result = await this.candidateService.fetchCandidatesByBulkId(req.body.bulk_import_id);

      //Este es el ID del usuario que devuelve la busqueda atravez del Bulk ID
      console.log(result.data[0].id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({
        error: error.message,
        details: error.detail || null
      });
    }
  }

  retrieveCandidate = async (req: Request, res: Response): Promise<any> => {
    try {
      const candidateId = req.params.candidateId;
      const result = await this.candidateService.fetchCandidateCV(candidateId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({
        error: error.message,
        details: error.detail || null,
      });
    }
  };


  uploadCandidateFromFormController = async (req: Request, res: Response): Promise<any> => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({
          error: 'El archivo (file) es requerido',
          details: null
        });
      }
      const result = await this.candidateService.uploadCandidateFromForm(file, '');

      //Este es el Bulk ID que devuelve Viterbit
      console.log(result.data.id);

      res.status(result.status).json(result.data);

    } catch (error: any) {
      res.status(error.status || 500).json({
        error: error.message,
        details: error.detail || null
      });
    }
  };



  getCandidate = async (req: Request, res: Response): Promise<any> => {

    try {
      const candidateId = req.params.candidateId;
      const result = await this.candidateService.retrieveCandidateInfo(candidateId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({
        error: error.message,
        details: error.detail || null,
      });
    }
  };


  editCandidate = async (req: Request, res: Response) => {

    const id = req.params.id;

    const [error, editCandidateDto] = EditCandidateDto.create(req.body);

    if (error || !editCandidateDto) {
      res.status(400).json(error);
      return;
    }

    const editedCandidate = this.candidateService.editCandidateInfo(editCandidateDto, id).then((result) => {
      res.status(200).json(result);
    }).catch((error) => {
      this.handleError(error, res);
    })


  }

  recommendations = async (req: Request, res: Response): Promise<any> => {

    //log(req.body.filters.groups[0]);

    const [error, recommendationCandidateDto] = RecommendationCandidateDto.create(req.body);

    //log(recommendationCandidateDto);
   

    if (error || !recommendationCandidateDto) {
      res.status(400).json(error);
      return;
    }

    const recommendations = await this.candidateService.getRecommendations(recommendationCandidateDto).then((result) => {
      res.status(200).json(result);
    }).catch((error) => {
      this.handleError(error, res);
    })



  }


  
  getCandidateByIDViterbit = async (req: Request, res: Response): Promise<any> => {

    try {
      const candidateId = req.params.id;
      const result = await this.candidateService.retrieveCandidateInfoByIDVitrerbit(candidateId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({
        error: error.message,
        details: error.detail || null,
      });
    }
  };




}