import { log } from "console";
import { regularExps } from "../../config/regular-exp";
import { UpdateStatusJobResponse } from "../../infrastructure/responses/Jobs/updateSatatusWebhook.response";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { SendGrid } from "../../config/sendGrid";
import { contentHtmlValidatejob } from "../../utils/contentHtmlValidateJob";
import { contentHtmlAprovedJob } from "../../utils/contentHtmlAprovedJob";
import { contentHtmlFailedJob } from "../../utils/contentHtmlFailedJob";
import { CompanyRespository } from "../../domain/repositories/company.repository";
import { createDeal } from "../../services/actions/clientify/deal/createDeal.action";
import { getCompany } from "../../services/actions/clientify/company/getCompany.action";
import { getContactByEmail } from "../../services/actions/clientify/contact/getContactByEmail.action";

export class WebhookViterbitService{
    constructor(

    ){}

    async createJob(payload:any, authRepository:AuthRepository, companyRepository:CompanyRespository) {

        const data = payload.payload

        const validationName  = data.custom_fields.find((el:any) => el.value === "Azkait_Plataforma")

        if (!validationName) {
            console.log("no proviene de la plataforma");
            return
        }

        const {status} = data

        const {external_id} = data

        if (!external_id) {
            console.log("no hay external id");
            return
        }

        if (!regularExps.email.test(external_id)) {
            console.log("no es un correo");
            return
        }

        const user = await authRepository.findByEmail(external_id)

        if (!user) {
            console.log("no existe el usuario");
            return
        }


        switch (status) {
            case "internal":

                const htmlInternal = contentHtmlValidatejob()

                const sendInternal = SendGrid.sendEmail(external_id, "Tu vacante esta siendo validada - AzkaIt", htmlInternal)

                if (!sendInternal) {
                    console.log("Ocurrio un error al enviar el correo");
                    return
                }
                
                break;
            case "published":

                const urlPublished = `${process.env.FRONTEND_URL}/empresas/mis-vacantes`

                const htmlPublished = contentHtmlAprovedJob(urlPublished)

                const sendPublished = SendGrid.sendEmail(external_id, "Tu vacante se aprobó - AzkaIt", htmlPublished)

                if (!sendPublished) {
                    console.log("Ocurrio un error al enviar el correo");
                    return
                }
                try {
                    const company = await companyRepository.getByIdUser(Number(user!.id));

                    if (!company) {
                        console.log("No se encontro la empresa");
                        return
                    }

                    const clientifyCompany = await getCompany(company.name);

                    if (!clientifyCompany) {
                        console.log("No se encontro la empresa en Clientify");
                        return
                    }

                    const clientifyContact = await getContactByEmail(user.email);

                    if (!clientifyContact) {
                        console.log("No se encontro el contacto en Clientify");
                        return
                    }

                    const deal = {
                        name:company.name + "_" + data.address.city + "_" + clientifyContact.first_name + "_" + clientifyContact.last_name,
                        company:clientifyCompany.url,
                        contact:clientifyContact.url,
                        amount:"1",
                        pipeline_desc:"Crecimiento"
                    }

                    const dealClientify = await createDeal(deal)

                    if ("error" in dealClientify) {
                        log("Error al crear el trato en Clientify:", dealClientify.error);
                        return
                    }

                } catch (error) {
                    log("Error al obtener la empresa:", error);
                    return
                }
                
                break;
        
            case "archived":

                const htmlArchived = contentHtmlFailedJob()

                const sendArchived = SendGrid.sendEmail(external_id, "Tu vacante ha sido rechazada - AzkaIt", htmlArchived)

                if (!sendArchived) {
                    console.log("Ocurrio un error al enviar el correo");
                    return
                }
                
                break;
            default:
                break;
        }
        
    }
}