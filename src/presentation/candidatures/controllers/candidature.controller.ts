import { Request, Response } from 'express';
import { CandidatureService } from '../../services/candidature.service';
import { CustomError } from '../../../domain';
import { error, log } from 'console';
import { resourceLimits } from 'worker_threads';
import { number } from 'zod';
import { ChangeCandidatureStage } from '@api/viterbit/schemas';
import { ChangeCandidatureStatusDto } from '../../../domain/dtos/candidature/change-candidatureStatus.dto';

export class CandidatureController {
  constructor(
    private readonly candidatureService: CandidatureService,


  ) { }

  private handleError = (error: unknown, res: Response) => {

    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
      return
    }
    console.log(error);
    res.status(500).json({ error: "Internal server error" });

  }

  search = (req: Request, res: Response) => {
    const idCandidate = req.body.candidate__id;
    const candidatures = this.candidatureService.searchCandidatures(idCandidate).then((result) => {
      res.status(200).json(result);
    }).catch((error) => {
      this.handleError(error, res)
    })
  }

  getCandidature = (req: Request, res: Response) => {
    const idCandidature = req.params.id as string;
    this.candidatureService.getCandidature(idCandidature).then((result) => {
      res.status(200).json(result);
    }).catch((error) => {
      this.handleError(error, res);
    });

  }

  createCandidature = (req: Request, res: Response) => {
    this.candidatureService.createCandidature(req.body.candidate_id, req.body.job_id)
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((error: any) => {
        this.handleError(error, res)
      });
  }

  getAllByJobID = (req: Request, res: Response) => {
    const { page = 1, pageSize = 10 } = req.body;

    this.candidatureService.getAllCandidaturesByJobID(req.body.jobId, page, pageSize).then((result) => {
      res.status(200).json(result);
    }).catch((error) => {
      this.handleError(error, res)
    })
  }

  changeStatus = (req: Request, res: Response) => {
    const [error, changeCandidatureStatusDto] = ChangeCandidatureStatusDto.create(req.body);
   
    if (error || !changeCandidatureStatusDto) {
      res.status(400).json(error);
      return;
    }

    const newStatus = this.candidatureService.changeStatus(changeCandidatureStatusDto).then((result) => {
      res.status(200).json(result);
    }).catch((error) => {
      this.handleError(error, res)
    })
  }



}