import axios from "axios";

const BASE_URL = process.env.CLIENTIFY_URL
const API_KEY = process.env.CLIENTIFY_KEY

export const apiClientify = axios.create({
    baseURL: BASE_URL,
    headers:{
        "Content-Type":"application/json",
        "Authorization": "Token " + API_KEY
    },
})