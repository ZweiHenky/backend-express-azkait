import { log } from "console"
import { apiMailBoxLayer } from "../../api/apiMailBoxLayer"

const API_KEY = process.env.MAILBOXLAYER_KEY

export const validatemailMailboxLayer = async(email:string) =>{
    const res = await apiMailBoxLayer.get(`/check?access_key=${API_KEY}&email=${email}&smtp=1&format=1`)

    return res.data
}