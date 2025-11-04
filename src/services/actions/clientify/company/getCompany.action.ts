import { apiClientify } from "../../../api/apiClientify"


export const getCompany = async (companyName: string) => {

    const res = await apiClientify.get(`/companies/?query=${companyName}`)

    if (!res || !res.data || res.data.results.length === 0) {
        console.log("No se encontró la empresa");
        return null;
    }

    return res.data.results[0];

}