import  {API_ENDPOINT}  from "../config"
// import API_ENDPOIND from "../configApi.json"
import axiosService from "./axios.service";

export const bookService = {
    list: async () => {
        const url = API_ENDPOINT + "/kitap";
        const response = await axiosService.get(url);
        return response.data;
    },
    addBook: async (book: { name: string, description: string, category: string }) => {
        const url = API_ENDPOINT + "/kitap/create";
        const response = await axiosService.post(url, book);
        return response.data;
    },
    updateBook: async (book: { id: number, name: string, description: string, category: string }) => {
        const url = API_ENDPOINT + "/kitap/update";
        const response = await axiosService.post(url, book);
        return response.data;
    },
    getBook: async (id: number) => {
        const url = API_ENDPOINT + "/kitap/ "+ id;
        const response = await axiosService.get(url);
        return response.data;
    },
    deleteBook: async (id: number) => {
        const url = API_ENDPOINT + "/kitap/delete/ "+ id;
        const response = await axiosService.post(url);
        return response.data;
    }
}