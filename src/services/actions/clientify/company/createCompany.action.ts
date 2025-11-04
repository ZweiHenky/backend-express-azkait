import { companyInterface } from "../../../../infrastructure/interfaces/company/company.interface"
import { CreateDealResponse } from "../../../../infrastructure/responses/clientify/deal/createDeal.response";
import { apiClientify } from "../../../api/apiClientify"


export const createCompany = async(company: companyInterface, phone:string): Promise<CreateDealResponse | {error:string}> =>{
    const res = await apiClientify.post("/companies/",{
        name: company.name,
        company_sector: company.sector_id,
        phone: [{ phone: phone }],
        website: [{ website: company.website }] // corregido 'wwebsite'
    })

    console.log(res.data);
    

    if (res.status !== 201) {
      // Esto es útil si la respuesta no lanza error pero no fue exitosa
      console.error("Error al crear el trato:", res.statusText);
      return { error: `Error: ${res.statusText}` };
    }

    return res.data
}