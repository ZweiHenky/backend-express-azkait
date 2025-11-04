import { CreateDealResponse } from "../../../../infrastructure/responses/clientify/deal/createDeal.response";
import { apiClientify } from "../../../api/apiClientify"

export interface deal{
    name:string
    company:string
    contact:string
    amount:string
    pipeline_desc:string
}

export const createDeal = async(deal:deal) : Promise<CreateDealResponse | { error:string } > => {
    const res = await apiClientify.post("/deals/",{
        ...deal
    })

    console.log(res.data);
    

    if (res.status !== 201) {
      // Esto es útil si la respuesta no lanza error pero no fue exitosa
      console.error("Error al crear el trato:", res.statusText);
      return { error: `Error: ${res.statusText}` };
    }

    return res.data
}