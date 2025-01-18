
import { api } from "@/api/axios"

export const Login = async (formdata:FormData) => {
    try{
        const response = await api.post('/api/login', formdata)
        return {
            status: true,
            message: response.data.message,
            user: response.data.user,
            token: response.data.token
        }
    }catch(error:any){
        if(error.response && error.response.data && error.response.data.message){
            return {
                status: false,
                message: error.response.data.message
            }
        }
    }   
}