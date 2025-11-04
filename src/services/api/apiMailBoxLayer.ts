import axios from "axios";


const API_URL = process.env.MAILBOXLAYER_URL

export const apiMailBoxLayer = axios.create({
    baseURL: API_URL,
})