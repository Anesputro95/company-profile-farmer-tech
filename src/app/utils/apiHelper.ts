import axios from "axios";

export const APP_ID = 'A260B694-0680-4E28-B4F4-65F1C1D7F6DA';
export const APP_KEY = 'C7021009-F160-45A1-B38F-FA1444A5C881';
export const Base_URL_API: string = "https://pivotalfire-us.backendless.app";

export const apiCall = axios.create({
    baseURL: Base_URL_API,
});

export const getAuthAPI = (userToken: string) =>
    axios.create({
        baseURL: `${Base_URL_API}/${APP_ID}/${APP_KEY}`,
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken,
        },
    });