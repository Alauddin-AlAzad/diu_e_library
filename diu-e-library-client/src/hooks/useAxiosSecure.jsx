import axios from "axios";
import { useContext, useEffect } from "react";
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

 const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { signOutUser } = useContext(AuthContext)

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res
        }, async error => {
            console.log("error caught rom our very own axios sector---->", error.response)
            if (error.response.status === 401 || error.response.status === 403) {
                // log out
                await signOutUser()
                // navigate to login
                navigate('/login')
            }
           return Promise.reject(error)
        })
    }, [signOutUser,navigate])

    return axiosSecure
}

export default useAxiosSecure