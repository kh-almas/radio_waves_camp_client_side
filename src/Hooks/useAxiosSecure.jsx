import axios from "axios";
import { toast } from "react-toastify";
import {useEffect} from "react";


const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,

})
const useAxiosSecure = () => {


    axiosSecure.interceptors.request.use((req)=>{
        const token = localStorage.getItem("access-token");
        if(token){
            req.headers.Authorization = `Bearer ${token}`
        }
        return req;
    });

    axiosSecure.interceptors.response.use(
        response => response,
        error =>{
            if(error.response && (error?.response.status === 403 || error?.response.status === 401)){
                toast(error?.response?.data.error)
            }
        }
    )
    return axiosSecure;
};

export default useAxiosSecure;