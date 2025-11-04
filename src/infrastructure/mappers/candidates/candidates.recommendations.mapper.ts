
import { log } from "console";
import { apiGetCandidateWithCurriculum } from "../../../services/api/apiViterbit";
import { RecommendationsDatumInterface } from "../../interfaces/candidates/recommendations.candidadates.interface";
import { GetRecommendationsResponse } from "../../responses/candidates/getRecommendations.response";

export class CandidatesRecommendationsMapper {

    static async toRecommendationsCandidatesInterface(recommendations: GetRecommendationsResponse): Promise<RecommendationsDatumInterface[]> {
        const recommendationsData: RecommendationsDatumInterface[] = await Promise.all(recommendations.data.map(async (recommendation) => {
            try {
                const candidateInfo = await apiGetCandidateWithCurriculum(recommendation.id);
                const years = candidateInfo.data.curriculum?.experience_years ?? null;
                const skills = candidateInfo.data.curriculum?.skills ?? [];
                const title = candidateInfo.data.curriculum?.title ?? null;
                const summary = candidateInfo.data.curriculum?.summary ?? null;
                const country = candidateInfo.data.address.country ?? null;
                const state = candidateInfo.data.address.state ?? null;


                


                return {
                    id: recommendation.id,
                    full_name: recommendation.full_name,
                    title: title,
                    summary: summary,
                    country: country,
                    state: state,
                    email: recommendation.email,
                    picture_url: recommendation.picture_url,
                    years_experience: years,
                    skills: skills,
                    created_at: recommendation.created_at,
                    updated_at: recommendation.updated_at,
                };

            } catch (error: any) {
                console.error(
                    `Error fetching data for candidate ${recommendation.id}:`,
                    error.message
                );

                return {
                    ...recommendation,
                    years_experience: 0,
                    skills: []
                };
            }
        }));
        return recommendationsData;
    }


}