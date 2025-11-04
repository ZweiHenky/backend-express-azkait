import { apiGetCandidateWithCurriculum } from "../../../services/api/apiViterbit";
import { Data } from "../../interfaces/candidatures/candidatures.interface";

import { GetAllCandidaturesByJobID } from "../../responses/candidatures/getAllByJobID.response";



export class CandidaturesMapper {

  static async getAllCandidaturesByJobId(candidatures: GetAllCandidaturesByJobID): Promise<Data[]> {
    const updateCandidatures: Data[] = await Promise.all(candidatures.data.map(async (candidature) => {
        try {
          const candidateInfo = await apiGetCandidateWithCurriculum(candidature.candidate_id);

          const title = candidateInfo.data.curriculum?.title || null;
          const full_name = candidateInfo.data.full_name || null;
          const years = candidateInfo.data.curriculum?.experience_years ?? null;

          

          return {
            ...candidature,
            title,
            full_name,
            years,
          };
        } catch (error: any) {
          console.error(
            `Error fetching data for candidate ${candidature.candidate_id}:`,
            error.message
          );

          return {
            ...candidature,
            title: null,
            full_name: null,
            years: null,
          };
        }
      })
    );

    return updateCandidatures;
  }
}
