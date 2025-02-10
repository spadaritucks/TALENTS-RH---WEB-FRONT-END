import { api } from "@/api/axios"



export async function sendEmail(formdata: FormData) {
    try {

        const response = await api.post('/api/sendEmail', formdata)

        return {
            status: true,
            message: response.data.message
        }

    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            return {
                status: false,
                message: error.response.data.message
            }
        }

    }
}