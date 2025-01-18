
import { api } from "@/api/axios"

export interface VagasProps{
    id: number
    headhunter_id: number;
    profissao_id:number;
    empresa_id:number;
    titulo: string;
    competencias:string[];
    descricao: string;
    nivel_senioridade:string;
    tipo_salario:string;
    salario_minimo:string
    salario_maximo:string
    status: string;
    created_at: string;
    data_final:string;
}

export async function getAllVagas() {

    try {
        const response = await api.get('/api/vagas')
        return {
            status: true,
            data: response.data.vagas
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

export async function createVagas(formData: FormData) {
    try {
        const response = await api.post('/api/vagas', formData)
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

export async function updateVagas(id: number, formData: FormData) {
    try {
        const response = await api.put(`/api/vagas/${id}`, formData)
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

export async function deleteVagas(id: number) {
    try {
        const response = await api.delete(`/api/vagas/${id}`)
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


