import axios from "axios";

export const Base_URL_API: string = "https://upbeatsuggestion-us.backendless.app";

export const apiCall = axios.create({
    baseURL: Base_URL_API,
});