import { api } from "@/api/axios"
import { revalidateTag } from "next/cache";
export interface ProfissoesProps {
    id: number;
    nome: string;
}

export async function getProfissoes() {

    try {
        const response = await api.get('/api/profissoes', {
            headers: {
                'Cache-Control': 'no-store'
            },
        })
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

export async function createProfissoes(formData: FormData) {
    try {
        const response = await api.post('/api/profissoes', formData)


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

export async function updateProfissoes(id: number, formData: FormData) {
    try {
        const response = await api.put(`/api/profissoes/${id}`, formData)
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

export async function deleteProfissoes(id: number) {
    try {
        const response = await api.delete(`/api/profissoes/${id}`)
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
