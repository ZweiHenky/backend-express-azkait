export class CreateJobDto {

  
  private constructor(
    public readonly general_info: {
      basic_info: {
        title: string,
        description: string,
        experience_years: number,
        slots: number,
        skills: string[],
        requirements: string,
        department_id: string,
        education_type_id: string,
        department_profile_id: string
      },
      location: {
        work_modality: string,
        address: {
          country: string,
          city: string,
          state: string,
          postal_code: string,
          address: string
        },
        location_id: string
      },
      contract_info: {
        occupation: string,
        salary_periodicity: string,
        salary_min: { amount: number, currency: string },
        salary_max: { amount: number, currency: string },
        contract_type_id: string
      },
      management: { external_id: string },
      custom_fields: any[]
    },
    public readonly apply_form: {
      preferences: {
        email_visibility: 'required',
        linkedin_url_visibility: 'required',
        phone_visibility: 'required',
        cover_letter_visibility: 'required',
        cv_visibility: 'required',
        picture_visibility: 'required',
        location_visibility: 'optional',
        gender_visibility: 'hidden',
        birthday_visibility: 'hidden'
      },
      killer_questions?: {
        questions: [],
        killer_question_templates_id: string[]
      },
      config: {
        display_on_careers: false,
        show_location: true,
        show_salary: true,
        show_contract_type: false,
        show_sharing_bar: false,
        show_minimum_education: true
      },
      applies_until: string
    }
  ) { }

  static create(obj: { [key: string]: any }): [string?, CreateJobDto?] {
    const generalInfo = obj.general_info || {};
    const basicInfo = generalInfo.basic_info || {};
    const location = generalInfo.location || {};
    const contractInfo = generalInfo.contract_info || {};
    const management = generalInfo.management || {};
    const applyForm = obj.apply_form || {};
    const preferences = applyForm.preferences || {};
    const killerQuestions = applyForm.killer_questions || { questions: [], killer_question_templates_id: [] };
    const config = applyForm.config || {};

    // Extraer campos
    const title = basicInfo.title;
    const description = basicInfo.description;
    const experience_years = basicInfo.experience_years;
    const slots = basicInfo.slots;
    const skills = basicInfo.skills;
    const requirements = basicInfo.requirements;
    const department_id = basicInfo.department_id;
    const education_type_id = basicInfo.education_type_id;
    const department_profile_id = basicInfo.department_profile_id;

    const work_modality = location.work_modality;
    const address = location.address;
    const location_id = location.location_id;

    const occupation = contractInfo.occupation;
    const salary_periodicity = contractInfo.salary_periodicity;
    const salary_min = contractInfo.salary_min;
    const salary_max = contractInfo.salary_max;
    const contract_type_id = contractInfo.contract_type_id;

    const external_id = management.external_id;

    const custom_fields = generalInfo.custom_fields;

    const killer_question_templates_id = killerQuestions.killer_question_templates_id;

    const applies_until = applyForm.applies_until;

    // Validaciones
    if (!title) return ['title is required'];
    if (!description) return ['description is required'];
    if (typeof experience_years !== 'number') return ['experience_years must be a number'];
    if (typeof slots !== 'number') return ['slots must be a number'];
    if (!Array.isArray(skills)) return ['skills must be an array'];
    if (!requirements) return ['requirements is required'];
    if (!department_id) return ['department_id is required'];
    if (!education_type_id) return ['education_type_id is required'];
    if (!department_profile_id) return ['department_profile_id is required'];
    if (!work_modality) return ['work_modality is required'];
    if (!address) return ['address is required'];
    if (!location_id) return ['location_id is required'];
    if (!occupation) return ['occupation is required'];
    if (!salary_periodicity) return ['salary_periodicity is required'];
    if (!salary_min) return ['salary_min is required'];
    if (!salary_max) return ['salary_max is required'];
    if (!contract_type_id) return ['contract_type_id is required'];
    if (!external_id) return ['external_id is required'];
    if (!Array.isArray(custom_fields)) return ['custom_fields must be an array'];
    if (!Array.isArray(killer_question_templates_id)) return ['killer_question_templates_id must be an array'];
    if (!applies_until) return ['applies_until is required'];

    

    return [
      undefined,
      new CreateJobDto(
        {
          basic_info: {
            title,
            description,
            experience_years,
            slots,
            skills,
            requirements,
            department_id,
            education_type_id,
            department_profile_id
          },
          location: {
            work_modality,
            address,
            location_id
          },
          contract_info: {
            occupation,
            salary_periodicity,
            salary_min,
            salary_max,
            contract_type_id
          },
          management: { external_id },
          custom_fields
        },
        {
          preferences: {
            email_visibility: 'required',
            linkedin_url_visibility: 'required',
            phone_visibility: 'required',
            cover_letter_visibility: 'required',
            cv_visibility: 'required',
            picture_visibility: 'required',
            location_visibility: 'optional',
            gender_visibility: 'hidden',
            birthday_visibility: 'hidden'
          },
          killer_questions : killerQuestions,
          config: {
            display_on_careers: false,
            show_location: true,
            show_salary: true,
            show_contract_type: false,
            show_sharing_bar: false,
            show_minimum_education: true
          },
          applies_until
        }
      )
    ];
  }
}
