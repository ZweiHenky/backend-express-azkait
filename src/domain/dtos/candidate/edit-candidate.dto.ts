import { object } from "zod"

export class EditCandidateDto {

  private constructor(

    public readonly first_name: string,
    public readonly last_name: string,
    public readonly phone: string,
    public readonly gender: string,
    public readonly address: {
      country: string,
      city: string,
      state: string,
      postal_code: string,
      address: string
    },
    public readonly picture: {
      link: string,
    },
    public readonly curriculum: {
      skills: string[],
      soft_skills: string[],
    },
  ) { }

  static create(obj: {[key: string]: any }): [string?, EditCandidateDto?] {
  
    const last_name = obj.last_name;
    const first_name = obj.first_name;
    const phone = obj.phone;
    const gender = obj.gender;
    const address = obj.address;
    const picture = obj.picture;
    const curriculum = obj.curriculum;

    if (!first_name) {
      return ["first_name is required", undefined];
    }

    if (!last_name) {
      return ["last_name is required", undefined];
    }

    if (!phone) {
      return ["phone is required", undefined];
    }

    if (!gender) {
      return ["gender is required", undefined];
    }

    if (!address ||
      !address.country ||
      !address.city ||
      !address.state ||
      !address.postal_code ||
      !address.address) {
      return ["address is required and must contain country, city, state, postal_code, and address", undefined];
    }

    if (!picture || !picture.link) {
      return ["picture is required and must contain a link", undefined];
    }

    if (!curriculum ||
      !curriculum.skills ||
      !Array.isArray(curriculum.skills) ||
      !curriculum.soft_skills ||
      !Array.isArray(curriculum.soft_skills)) {
      return ["curriculum is required and must contain skills and soft_skills as arrays", undefined];
    }

    return [undefined,
      new EditCandidateDto(

        first_name,
        last_name,
        phone,
        gender,
        {
          country: address.country,
          city: address.city,
          state: address.state,
          postal_code: address.postal_code,
          address: address.address
        },
        {
          link: picture.link
        },
        {
          skills: curriculum.skills,
          soft_skills: curriculum.soft_skills
        }
      )
    ];


  }

}