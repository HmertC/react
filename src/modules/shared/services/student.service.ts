// import  {API_ENDPOINT}  from "../config"
import ENDPOINTS from "../configApi.json";
import axiosService from "./axios.service";

export const studentService = {
    list: async (pagenum:number,pagesi:number,sortOrder?:string,sortColumn?:string) => {
        const url = ENDPOINTS.API_ENDPOINT + `/student?pagenum=${pagenum}&pagesi=${pagesi}&sortOrder=${sortOrder}&sortColumn=${sortColumn}`;
        const response = await axiosService.get(url);
        return response.data;
    },
    addStudent: async (student: { name: string, surname: string, studentNo: number,birtday:string }) => {
        const url = ENDPOINTS.API_ENDPOINT + "/student/create";
        const response = await axiosService.post(url, student);
        return response.data;
    },
    updateStudent: async (student: { id: number, name: string, surname: string, studentNo: number,birtday:string }) => {
        const url = ENDPOINTS.API_ENDPOINT + "/student/update";
        const response = await axiosService.post(url, student);
        return response.data;
    },
    getStudent: async (id: number) => {
        const url = ENDPOINTS.API_ENDPOINT + "/student/" + id;
        const response = await axiosService.get(url);
        return response.data;
    },
    deleteStudent: async (id: number) => {
        const url = ENDPOINTS.API_ENDPOINT + "/student/delete/" + id;
        const response = await axiosService.post(url);
        return response.data;
    }
    // searchlist: async (searchStr:string) => {
    //     const url = API_ENDPOINT + "student/search";
    //     const response = await axiosService.get(url);
    //     return response.data;
    // },
}