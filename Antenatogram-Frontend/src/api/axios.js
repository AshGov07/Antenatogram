import axios from "axios";


const api = axios.create({
    baseURL : 'http://localhost:8008/',
    withCredentials: true,
});


export default api;