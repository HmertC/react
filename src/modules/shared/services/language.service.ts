import ENDPOINTS from "../configApi.json";
import axiosService from "./axios.service";

export const languageservice = {
    getlanguage: async ( language:string) => {
        const url = ENDPOINTS.API_ENDPOINT + `/language?language=${language}`;
        const response = await axiosService.get(url);
        return response.data;
    }
}
