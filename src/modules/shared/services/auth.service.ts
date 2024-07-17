// import  {API_ENDPOINT}  from "../config"
import ENDPOINTS from "../configApi.json";
import axios from 'axios';
export const authService = {
    login: async (credentials: { username: string, password: string }) => {
        const url = ENDPOINTS.API_ENDPOINT + ENDPOINTS.auth.login;
        const response = await axios.post(url, credentials);
        return response.data;
    },
    register: async (user: { username: string, password: string }) => {
        const url = ENDPOINTS.API_ENDPOINT + "/Auth/Register";
        const response = await axios.post(url, user);
        return response.data;
    }
}