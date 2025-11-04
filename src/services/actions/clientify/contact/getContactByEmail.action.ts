import { apiClientify } from "../../../api/apiClientify";

export const getContactByEmail = async (email: string) => {

    const res = await apiClientify.get(`/contacts/?query=${email}`);

    if (!res.data || !res.data || res.data.results.length < 0) {
        return null
    }   

    return res.data.results[0];

}  