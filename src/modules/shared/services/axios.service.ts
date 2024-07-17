import axios from 'axios';

const axiosService = axios;
axiosService.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    request.headers.Authorization = `Bearer ` + token;
    return request;
});

export default axiosService;