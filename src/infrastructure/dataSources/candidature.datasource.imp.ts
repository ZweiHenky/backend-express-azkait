import { apiCreateCandidature, apiGetCandidature, apiSearchCandidatures, apiSearchCandidaturesByJobId, apiUpdateCandidateStage } from "../../services/api/apiViterbit";
import { CandidatureDatasource } from "../../domain/dataSources/candidature.datasource";
import { ChangeCandidatureStatusDto } from "../../domain/dtos/candidature/change-candidatureStatus.dto";
import { CandidadtureEntity } from "../../domain/entities/candidature.entity";
import { GetAllCandidaturesByJobID } from "../responses/candidatures/getAllByJobID.response";


export class CandidatureDatasourceImp implements CandidatureDatasource {
    

   async createCandidature(idCandidate: string, idJob: string): Promise<any> {
        const createCandidature = await apiCreateCandidature(idCandidate, idJob);
        return createCandidature
    }
    async getCandidature(id: string): Promise<CandidadtureEntity | null> {
        const candidature = await apiGetCandidature(id);
        return candidature.data
    }

    async getList(idCandidate: string): Promise<CandidadtureEntity[] | null> {
        const listCandidaturas = await apiSearchCandidatures( idCandidate);

        const farmatedCandidatures : CandidadtureEntity[] = listCandidaturas.data.map((candidature : any) => 
        ({
            id : candidature.id,
            status : candidature.status,
            is_applied : candidature.is_applied,
            current_stage : {
                name_stage :  candidature.current_stage.name,
            },
            job_id : candidature.job_id,
            created_at : candidature.created_at,
            updated_at : candidature.updated_at

        }))
        return farmatedCandidatures
    }


    async  getAllByJobID(idJob: string, page : number, pageSize: number): Promise<GetAllCandidaturesByJobID> {
        
        const listCandidaturasByID = await apiSearchCandidaturesByJobId(idJob, page, pageSize);

        return listCandidaturasByID;
    }

    async changeStatus(changeStatus: ChangeCandidatureStatusDto): Promise<string> {
        const newStatus = await apiUpdateCandidateStage(changeStatus);
        
        return newStatus;
    }

     



}



/* {
	"id": "68388ea6e0b0e24cb300880b",
	"status": "active",
	"is_applied": false,
	"current_stage": {
		"id": "65395f3857bd20b5b10027a9",
		"name": "Entrevista Cliente",
		"stage_type_id": "654543158304e20eef0c4074"
	},
	"job_id": "6837a1edbaf8826136096245",
	"candidate_id": "6833c521beaf0bafb4087992",
	"created_at": "2025-05-29T16:43:18+00:00",
	"created_by_id": "6525800daf3964262506a004",
	"updated_at": "2025-05-29T18:44:13+00:00",
	"source_params": [],
	"title": "Tester PlataformaAzkait"
} */