
import { api } from "@/api/axios"

export interface UserProps{
    id:number;
    tipo_usuario: string;
    nome: string;
    sobrenome:string;
    email:string;
    cidade:string;
    estado:string;
    celular_1:string;
    celular_2: string;
    data_nascimento: string;
    linkedin: string
    created_at: string
}

export interface HeadHunterProps{
    id:number;
    user_id:number;
    como_conheceu: string;
    situacao: string;
    comportamento_description:string
    anos_trabalho: string;
    quantia_vagas:string;
    horas_diarias:string;
    dias_semanais:string;
    nivel_senioridade:string;
    segmento:string;
    cv:string;
    created_at: string
}

export interface CandidatosProps{
    id:number;
    user_id:number;
    ultimo_cargo:string;
    ultimo_salario:number;
    pretensao_salarial_clt:number;
    pretensao_salarial_pj:number;
    posicao_desejada:string;
    escolaridade:string;
    graduacao_principal:string;
    como_conheceu:string;
    consultor_talents:string;
    nivel_ingles:string;
    qualificacoes_tecnicas:string;
    certificacoes:string;
    cv:string;
    created_at: string
}

export interface EmpresaProps {
    id:number;
    user_id: number;
    cnpj:string;
    razao_social: string;
    nome_fantasia:string;
    segmento: string;
    numero_funcionarios:string;
    created_at: string
    
}

export interface ConsultorAndAdminProps{
    id:number;
    user_id:number;
    cargo:string;
    atividades:string;
    cv:string;
}


export async function getAllUsers() {

    try {
        const response = await api.get('/api/users')
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

export async function createUser(formData: FormData) {
    try {
        const response = await api.post('/api/users', formData)
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

export async function updateUser(id: number, formData: FormData) {
    try {
        const response = await api.post(`/api/users/${id}?_method=PUT`, formData)
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

export async function deleteUser(id: number) {
    try {
        const response = await api.delete(`/api/users/${id}`)
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


