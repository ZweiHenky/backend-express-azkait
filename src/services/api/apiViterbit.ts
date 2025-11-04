import axios from "axios"
import { log } from "console";
import { JobDataSource } from "../../domain/dataSources/job.datasource";
import { CreateJobDto } from "../../domain/dtos/job/create-job";
import { number } from "zod";
import { ChangeCandidatureStatusDto } from "../../domain/dtos/candidature/change-candidatureStatus.dto";
import { EditCandidateDto } from "../../domain/dtos/candidate/edit-candidate.dto";
import { RecommendationCandidateDto } from "../../domain/dtos/candidate/recommendation-candidate";
import { response } from "express";

const API_URL = process.env.API_URL_VITERBIT
const API_KEY = process.env.API_KEY_VITERBIT

export const apiViterbit = axios.create({
    baseURL: API_URL,
    headers: {
        'x-api-key': API_KEY
    }
})

export const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-Key': process.env.API_KEY_VITERBIT
    };


export const apiSearchCandidateByPhone = (phone: string) => axios.post(
    'https://api.viterbit.com/v1/candidates/search',
    {search: phone},
    { headers }
)


export const apiBulk = (bulk_import_id: string) => axios.post(
    'https://api.viterbit.com/v1/candidates/search',
    {
        filters: {
            operator: 'or',
            groups: [
                {
                    operator: 'or',
                    filters: [
                        {
                            field: 'bulk_import_id',
                            value: bulk_import_id,
                            operator: 'equals',
                        },
                    ],
                },
            ],
        },
    },
    { headers }
);

export const apiCandidate = (candidateId: string) => axios.get(
    `https://api.viterbit.com/v1/candidates/${candidateId}?includes[]=curriculum&includes[]=curriculum_blind&includes[]=address&includes[]=custom_fields&includes[]=questionnaires&includes[]=evaluations&includes[]=comments`,
    { headers }
);



export const apiCreateCandidateByCV = (fileBase64: string, source:string) => {
  const tags = [
    "Plataforma Azkait"
  ]
  const payload = { 
    file: fileBase64, 
    source, 
    tags
  };

  return axios.post('https://api.viterbit.com/v1/candidates/from-cv-file', payload, { headers });
};


export const apiGetJobs = (page: number = 1, page_size: number = 10) => {
  const url = `https://api.viterbit.com/v1/jobs?status[]=published&page=${page}&page_size=${page_size}`;
  return axios.get(url, { headers });
};

export const apiGetJobById = async (jobId: string)  => {
  const url = `https://api.viterbit.com/v1/jobs/${jobId}?includes[]=address&includes[]=contract_type&includes[]=education_type&includes[]=files&includes[]=requirements_html`
  try {
    const res = await axios.get(url, { headers })
      return res.data;
  } catch (error) {
    log(error)
    
  }

};




export const searchJobs = async (
  page: number,
  pageSize: number,
  search: string
) => {
  const response = await axios.post(
    'https://api.viterbit.com/v1/jobs/search',
    {
      page,
      page_size: pageSize,
      search,
      filters: {
        groups: [
          {
            filters: [
              {
                field: 'status',
                value: 'published',
                operator: 'contains',
              },
            ],
            operator: 'and',
          },
        ],
      },
    },
    { headers }
  );
  return response.data;
};

////////////////////////////////////////////

export const apiGetLocationById = (id: string) =>
  axios.get(`https://api.viterbit.com/v1/locations/${id}`, { headers });


export const apiGetLocationByIdCorrection = async (id: string) => {
  try {
    const response = await axios.get(`https://api.viterbit.com/v1/locations/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching location by ID:', error);
    throw error;
  }
};
////////////////////////
export const apiGetDepartmentById = (id: string) =>
  axios.get(`https://api.viterbit.com/v1/departments/${id}`, { headers });

export const apiGetDepartmentByIdCorrection = async (id: string) => {
  try {
    const response = await axios.get(`https://api.viterbit.com/v1/departments/${id}`, { headers });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching department by ID:', error);
    throw error;
  }
}
////////////////////////////////
export const apiGetProfileDepartmentById = (idDep: string, idProf: string) =>
  axios.get(`https://api.viterbit.com/v1/departments/${idDep}/profiles/${idProf}`, { headers });

export const apiGetProfileDepartmentByIdCorrection = async (idDep: string, idProf: string) => {
  try {
    const response = await axios.get(`https://api.viterbit.com/v1/departments/${idDep}/profiles/${idProf}`, { headers });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching department profile by ID:', error);
    throw error;
  }
}

///////////////////////


export const apiCreateCandidature = async (
  candidate_id: string,
  job_id: string
): Promise<any> => {
  const response = await axios.post(
    'https://api.viterbit.com/v1/candidatures',
    { candidate_id, job_id },
    { headers }
  );

  return response.data;
};

///Recuerda que el candidate__id tiene dos guines bajos!!!!!!!!

export const apiSearchCandidatures = async (
  candidateId: string
): Promise<any> => {
  const data = {
    filters: {
      operator: 'and',
      groups: [
        {
          filters: [
            {
              field: 'candidate__id',
              value: candidateId,
              operator: 'contains'
            }
          ],
          operator: 'or'
        }
      ]
    }
  };

  try {
    const response = await axios.post(
      'https://api.viterbit.com/v1/candidatures/search',
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error al buscar candidaturas:', error);
    throw error;
  }
};


export const apiGetCandidature = async (
  candidature_id: string
): Promise<any> => {
  const response = await axios.get(
    `https://api.viterbit.com/v1/candidatures/${candidature_id}`,
    { headers }
  );

  return response.data;
};



export const apiCreateJob = async (jobData: CreateJobDto): Promise<any> => {
  try {
    const response = await axios.post(
      'https://api.viterbit.com/v1/jobs',
      jobData,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    // Puedes loguear o lanzar un error personalizado si quieres manejarlo arriba
    console.log(error);
    
    console.error('Error calling Viterbit API:', error.message);
    throw error;
  }
};


export const apiSearchCandidaturesByJobId = async (
  jobId: string,
  page : number,
  pageSize : number
): Promise<any> => {
  const payload = {
    filters: {
      operator: 'or',
      groups: [
        {
          operator: 'or',
          filters: [
            {
              field: 'job__id',
              operator: 'contains',
              value: jobId,
            },
          ],
        },
      ],
    },
    page,
    page_size: pageSize,
  };

  try {
    const response = await axios.post(
      'https://api.viterbit.com/v1/candidatures/search',
      payload,
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'X-API-Key': API_KEY,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error calling Viterbit API:', error.message);
    throw error;
  }
};


export const apiGetCandidateWithCurriculum = async (candidateId: string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://api.viterbit.com/v1/candidates/${candidateId}?includes[]=curriculum&includes[]=address`,
      {
        headers: {
          accept: 'application/json',
          'X-API-Key': API_KEY,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error fetching candidate with curriculum:', error.message);
    throw error;
  }
};



export const apiUpdateCandidateStage = async (
  changeStatus: ChangeCandidatureStatusDto
): Promise<string> => {
  try {
    const response = await axios.post(
      `https://api.viterbit.com/v1/candidatures/${changeStatus.id}/stage`,
      { stage_id: changeStatus.stage_id },
      { headers }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error calling Viterbit API:', error.message);
    throw error;
  }
};



export const apiUpdateCandidate = async (
  candidateId: string,
  candidateData: EditCandidateDto
): Promise<string> => {
  try {
    const response = await axios.patch(
      `https://api.viterbit.com/v1/candidates/${candidateId}`,
      candidateData,
      { headers }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error calling Viterbit API (updateCandidate):', error.message);
    throw error;
  }
};


export const apiSearchCandidates = async (
  recommendation : RecommendationCandidateDto
): Promise<any> => {
  
  try {
    const response = await axios.post(
      'https://api.viterbit.com/v1/candidates/search',
      recommendation,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error calling Viterbit API (searchCandidates):', error.message);
    throw error;
  }
};



export const apiGetProfiles = async (departmentId: string, profileId: string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://api.viterbit.com/v1/departments/${departmentId}/profiles/${profileId}`,
      { headers }
    );
    return response.data; // Assuming you want the first profile
  } catch (error: any) {
    console.error('Error fetching profiles:', error.message);
    throw error;
  }
}





