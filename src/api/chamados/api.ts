import { api } from "@/api/axios"

export interface ChamadoProps {
    id:number;
    empresa_id:number;
    profissao_id:number;
    numero_vagas: number;
    descricao:string;
    created_at: string
    status: string;
}

export interface AtualizacoesProps{
    id: number;
    chamados_id: number;
    user_id: number;
    titulo:string;
    atualizacoes: string;
    anexo:string;
    created_at: string;
}

export async function getChamados() {

    try {
        const response = await api.get('/api/chamados')
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

export async function createChamados(formData: FormData) {
    try {
        const response = await api.post('/api/chamados', formData)
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

export async function updateChamados(id: number, formData: FormData) {
    try {
        const response = await api.put(`/api/chamados/${id}`, formData)
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

export async function deleteChamados(id: number) {
    try {
        const response = await api.delete(`/api/chamados/${id}`)
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

export async function getAtualizacoes() {

    try {
        const response = await api.get('/api/atualizacoes')
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

export async function createAtualizacoes(formData: FormData) {
    try {
        const response = await api.post('/api/atualizacoes', formData)
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

export async function updateAtualizacoes(id: number, formData: FormData) {
    try {
        const response = await api.post(`/api/atualizacoes/${id}?_method=PUT`, formData)
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

export async function deleteAtualizacoes(id: number) {
    try {
        const response = await api.delete(`/api/atualizacoes/${id}`)
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

