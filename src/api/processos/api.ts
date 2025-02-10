
import { api } from "@/api/axios"

export interface ProcessosProps{
    id:number;
    candidato_id:number;
    vaga_id:number;
    status:string;
    created_at:string
}


export async function getAllProcessos() {

    try {
        const response = await api.get('/api/processos',{
            headers: {
                'Cache-Control': 'no-store'
            },
        })
        return {
            status: true,
            data: response.data.processos
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

export async function createProcesso(formData: FormData) {
    try {
        const response = await api.post('/api/processos', formData)
        return {

            status: true,
            data: response.data
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

export async function updateProcesso(id: number, formData: FormData) {
    try {
        const response = await api.post(`/api/processos/${id}?_method=PUT`, formData)
        return {
            status: true,
            data: response.data
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

export async function deleteProcesso(id: number) {
    try {
        const response = await api.delete(`/api/processos/${id}`)
        return {
            status: true,
            data: response.data
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


