import { CreateContactResponse } from "../../../../infrastructure/responses/clientify/contact/createContact.response"
import { apiClientify } from "../../../api/apiClientify"

export interface contact{
    first_name:string
    last_name:string
    phone:string
    email:string
    company:string
}

export const createContact = async(contact: contact) : Promise <CreateContactResponse | {error:string} > =>{

    const res = await apiClientify.post("/contacts/",{
        first_name:contact.first_name,
        last_name:contact.last_name,
        company:contact.company,
        phones: [
            {
                type:1,
                phone:contact.phone
            }
        ],
        emails:[
            {
                type:4,
                email:contact.email
            }
        ]
    })

    console.log(res.data);
    

    if (res.status !== 201) {
      // Esto es útil si la respuesta no lanza error pero no fue exitosa
      console.error("Error al crear el trato:", res.statusText);
      return { error: `Error: ${res.statusText}` };
    }

    return res.data

}