import { date } from 'zod';
import { log } from "console";
import { apiGetDepartmentById, apiGetJobById, apiGetLocationById, apiGetProfiles, apiSearchCandidaturesByJobId } from "../../../services/api/apiViterbit";
import { DataJobInterface } from "../../interfaces/jobs/job.interface";
import { GetAllJobsInterface, Data } from "../../interfaces/jobs/jobs.interfaces";
import { GetAllJobsReponse } from "../../responses/Jobs/getAllJobs.response";
import { DataJobResponse, Responsejob } from "../../responses/Jobs/job.response";

import { JobsInterfaceStatus } from "../../interfaces/jobs/jobsStatus.interface";
import { CandidatureService } from "../../../presentation/services/candidature.service";
import { JobCompany } from '../../../domain/entities/jobCompany.entity';



export class JobsMapper {


    static async getAllSearch(jobs: GetAllJobsReponse): Promise<Data[]> {
        const updatedJobs: Data[] = await Promise.all(jobs.data.map(async job => {
            const location = await apiGetLocationById(job.location_id);
            const department = await apiGetDepartmentById(job.department_id);

            const { status, published_at, created_by_id,
                owners_ids,
                hiring_plan_requisition_id,
                archived_at,
                department_profile_id, external_id, contract_type_id,
                applies_until, ...rest } = job

            return {
                ...rest,
                location_id: location.data.data.name,
                slug: location.data.data.slug,
                department_id: department.data.data.name,

            };
        }));

        return updatedJobs;

    }

    static async getJob(job: Responsejob): Promise<DataJobInterface> {


        const location = await apiGetLocationById(job.data.location_id);
        const department = await apiGetDepartmentById(job.data.department_id);



        const { status, created_by_id,
            owners_ids,
            department_profile_id, external_id, contract_type_id,
            applies_until, ...rest } = job.data


        return {
            ...rest,
            location_id: location.data.data.name,
            slug: location.data.data.slug,
            department_id: department.data.data.name,

        };


    }


    static async getJobsByCompanyId(jobs: JobCompany[]): Promise<JobsInterfaceStatus> {
        const jobsData = await Promise.all(jobs.map(async job => {

            try {

                const jobById = await apiGetJobById(job.id_job);
                const location = await apiGetLocationById(jobById.data.location_id);
                const department = await apiGetDepartmentById(jobById.data.department_id);
                const candidates = await apiSearchCandidaturesByJobId(job.id_job, 1, 10);

               


                let departmentProfile: any;
                if (jobById.data.department_profile_id) {
                    departmentProfile = await apiGetProfiles(department.data.data.id, jobById.data.department_profile_id);
                }
                else {
                    departmentProfile = { data: { name: "Tecnologia" } };
                }

                return {
                    id: jobById.data.id,
                    title: jobById.data.title,
                    department_name: department.data.data.name || "no está especificado",
                    department_profile: departmentProfile.data.name || "no está especificado",
                    created_at: jobById.data.created_at,
                    description: jobById.data.description,
                    updated_at: jobById.data.updated_at,
                    published_at: jobById.data.published_at,
                    archived_at: jobById.data.archived_at,
                    applies_until: jobById.data.applies_until || "no está especificado",
                    status: jobById.data.status,
                    salary_min: jobById.data.salary_min,
                    salary_max: jobById.data.salary_max,
                    slots: jobById.data.slots || 0,
                    candidates: candidates.meta.total,
                    location : {
                        country :  jobById.data.address.country,
                        state : jobById.data.address.state
                        //address : jobById.data.address.address

                    }
                };

            } catch (error: any) {
       
                return {
                    id: job.id_job,
                    title: "Unknown",
                    department_name: "Unknown",
                    department_profile: "Unknown",
                    created_at: new Date(),
                    description: "Error fetching job details",
                    updated_at: new Date(),
                    published_at: undefined,
                    archived_at: undefined,
                    status: "error",
                    salary_min: { amount: 0, currency: "EUR" }, // Adjust according to SalaryM definition
                    applies_until: new Date(),
                    salary_max: { amount: 0, currency: "EUR" }, // Adjust according to SalaryM definition
                    slots: 0,
                    candidates: 0,
                    location: { country: "Unknown", state: "Unknown" }
                };

            }
        }));

        return { data: jobsData };

    }




    static async getJobsByCompanyIdPublished(jobs:  JobCompany[]): Promise<JobsInterfaceStatus> {
        const jobsData = await Promise.all(jobs.map(async job => {

            try {

                const jobById = await apiGetJobById(job.id_job);
                const department = await apiGetDepartmentById(jobById.data.department_id);
                const candidates = await apiSearchCandidaturesByJobId(job.id_job, 1, 10);


                let departmentProfile: any;
                if (jobById.data.department_profile_id) {
                    departmentProfile = await apiGetProfiles(department.data.data.id, jobById.data.department_profile_id);
                }
                else {
                    departmentProfile = { data: { name: "Tecnologia" } };
                }

                return {
                    id: jobById.data.id,
                    title: jobById.data.title,
                    department_name: department.data.data.name || "no está especificado",
                    department_profile: departmentProfile.data.name || "no está especificado",
                    created_at: jobById.data.created_at,
                    description: jobById.data.description,
                    updated_at: jobById.data.updated_at,
                    published_at: jobById.data.published_at,
                    archived_at: jobById.data.archived_at,
                    applies_until: jobById.data.applies_until || "no está especificado",
                    status: jobById.data.status,
                    salary_min: jobById.data.salary_min,
                    salary_max: jobById.data.salary_max,
                    slots: jobById.data.slots || 0,
                    candidates: candidates.meta.total,
                    location : {
                        country :  jobById.data.address.country,
                        state : jobById.data.address.state

                    }
                };

            } catch (error: any) {

                return {
                    id: job.id_job,
                    title: "Unknown",
                    department_name: "Unknown",
                    department_profile: "Unknown",
                    created_at: new Date(),
                    description: "Error fetching job details",
                    updated_at: new Date(),
                    published_at: undefined,
                    archived_at: undefined,
                    status: "error",
                    salary_min: { amount: 0, currency: "EUR" },
                    applies_until: undefined,
                    salary_max: { amount: 0, currency: "EUR" },
                    slots: 0,
                    candidates: 0,
                    location: { country: "Unknown", state: "Unknown" }
                };

            }
        }));

        const publishedJobs = jobsData.filter(job => job.status === "published");

        return { data: publishedJobs };

    }

    static async getJobsByCompanyIdDraft(jobs:  JobCompany[]): Promise<JobsInterfaceStatus> {
        const jobsData = await Promise.all(jobs.map(async job => {

            try {

                const jobById = await apiGetJobById(job.id_job);
                const department = await apiGetDepartmentById(jobById.data.department_id);
                const candidates = await apiSearchCandidaturesByJobId(job.id_job, 1, 10);

                let departmentProfile: any;
                if (jobById.data.department_profile_id) {
                    departmentProfile = await apiGetProfiles(department.data.data.id, jobById.data.department_profile_id);
                }
                else {
                    departmentProfile = { data: { name: "Tecnologia" } };
                }

                return {
                    id: jobById.data.id,
                    title: jobById.data.title,
                    department_name: department.data.data.name || "no está especificado",
                    department_profile: departmentProfile.data.name || "no está especificado",
                    created_at: jobById.data.created_at,
                    description: jobById.data.description,
                    updated_at: jobById.data.updated_at,
                    published_at: jobById.data.published_at,
                    archived_at: jobById.data.archived_at,
                    applies_until: jobById.data.applies_until || "no está especificado",
                    status: jobById.data.status,
                    salary_min: jobById.data.salary_min,
                    salary_max: jobById.data.salary_max,
                    slots: jobById.data.slots || 0,
                    candidates: candidates.meta.total,
                    location : {
                        country :  jobById.data.address.country,
                        state : jobById.data.address.state

                    }
                };

            } catch (error: any) {
                //console.error(`Error fetching job with ID ${job.id_job}:`, error);
                return {
                    id: job.id_job,
                    title: "Unknown",
                    department_name: "Unknown",
                    department_profile: "Unknown",
                    created_at: new Date(),
                    description: "Error fetching job details",
                    updated_at: new Date(),
                    published_at: undefined,
                    archived_at: undefined,
                    status: "error",
                    salary_min: { amount: 0, currency: "EUR" },
                    applies_until: undefined,
                    salary_max: { amount: 0, currency: "EUR" },
                    slots: 0,
                    candidates: 0,
                    location: { country: "Unknown", state: "Unknown" }
                };

            }
        }));

        const publishedJobs = jobsData.filter(job => job.status === "draft");

        return { data: publishedJobs };

    }

    static async getJobsByCompanyIdArchived(jobs:  JobCompany[]): Promise<JobsInterfaceStatus> {
         const jobsData = await Promise.all(jobs.map(async job => {

            try {

                const jobById = await apiGetJobById(job.id_job);
                const department = await apiGetDepartmentById(jobById.data.department_id);
                const candidates = await apiSearchCandidaturesByJobId(job.id_job, 1, 10);

                let departmentProfile: any;
                if (jobById.data.department_profile_id) {
                    departmentProfile = await apiGetProfiles(department.data.data.id, jobById.data.department_profile_id);
                }
                else {
                    departmentProfile = { data: { name: "Tecnologia" } };
                }

                return {
                    id: jobById.data.id,
                    title: jobById.data.title,
                    department_name: department.data.data.name || "no está especificado",
                    department_profile: departmentProfile.data.name || "no está especificado",
                    created_at: jobById.data.created_at,
                    description: jobById.data.description,
                    updated_at: jobById.data.updated_at,
                    published_at: jobById.data.published_at,
                    archived_at: jobById.data.archived_at,
                    applies_until: jobById.data.applies_until || "no está especificado",
                    status: jobById.data.status,
                    salary_min: jobById.data.salary_min,
                    salary_max: jobById.data.salary_max,
                    slots: jobById.data.slots || 0,
                    candidates: candidates.meta.total,
                    location : {
                        country :  jobById.data.address.country,
                        state : jobById.data.address.state

                    }
                };

            } catch (error: any) {
                //console.error(`Error fetching job with ID ${job.id_job}:`, error);
                return {
                    id: job.id_job,
                    title: "Unknown",
                    department_name: "Unknown",
                    department_profile: "Unknown",
                    created_at: new Date(),
                    description: "Error fetching job details",
                    updated_at: new Date(),
                    published_at: undefined,
                    archived_at: undefined,
                    status: "error",
                    salary_min: { amount: 0, currency: "EUR" },
                    applies_until: undefined,
                    salary_max: { amount: 0, currency: "EUR" },
                    slots: 0,
                    candidates: 0,
                    location: { country: "Unknown", state: "Unknown" }
                    
                };

            }
        }));

        const publishedJobs = jobsData.filter(job => job.status === "archived");

        return { data: publishedJobs };

    }

    static async getJobsByCompanyIdInternal(jobs:  JobCompany[]): Promise<JobsInterfaceStatus> {
          const jobsData = await Promise.all(jobs.map(async job => {

            try {

                const jobById = await apiGetJobById(job.id_job);
                const department = await apiGetDepartmentById(jobById.data.department_id);
                const candidates = await apiSearchCandidaturesByJobId(job.id_job, 1, 10);

                let departmentProfile: any;
                if (jobById.data.department_profile_id) {
                    departmentProfile = await apiGetProfiles(department.data.data.id, jobById.data.department_profile_id);
                }
                else {
                    departmentProfile = { data: { name: "Tecnologia" } };
                }

                return {
                    id: jobById.data.id,
                    title: jobById.data.title,
                    department_name: department.data.data.name || "no está especificado",
                    department_profile: departmentProfile.data.name || "no está especificado",
                    created_at: jobById.data.created_at,
                    description: jobById.data.description,
                    updated_at: jobById.data.updated_at,
                    published_at: jobById.data.published_at,
                    archived_at: jobById.data.archived_at,
                    applies_until: jobById.data.applies_until || "no está especificado",
                    status: jobById.data.status,
                    salary_min: jobById.data.salary_min,
                    salary_max: jobById.data.salary_max,
                    slots: jobById.data.slots || 0,
                    candidates: candidates.meta.total,
                    location : {
                        country :  jobById.data.address.country,
                        state : jobById.data.address.state

                    }
                };

            } catch (error: any) {
                //console.error(`Error fetching job with ID ${job.id_job}:`, error);
                return {
                    id: job.id_job,
                    title: "Unknown",
                    department_name: "Unknown",
                    department_profile: "Unknown",
                    created_at: new Date(),
                    description: "Error fetching job details",
                    updated_at: new Date(),
                    published_at: undefined,
                    archived_at: undefined,
                    status: "error",
                    salary_min: { amount: 0, currency: "EUR" },
                    applies_until: undefined,
                    salary_max: { amount: 0, currency: "EUR" },
                    slots: 0,
                    candidates: 0,
                    location: { country: "Unknown", state: "Unknown" }
                };

            }
        }));

        const publishedJobs = jobsData.filter(job => job.status === "internal");

        return { data: publishedJobs };

    }

}

