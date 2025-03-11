'use server'

import { createCandidatos, updateCandidatos, deleteCandidatos, getCandidatos, getCandidatosById, getCandidatosByQueryString } from "@/api/candidatos/api"

// Função para obter todos os candidatos
export async function getCandidatosAction() {
    const data = await getCandidatos();
    return {
        users: data.users,
        candidatos: data.candidatos
    } // Retorna os candidatos
}

export async function getCandidatosByIdAction(id: number) {
    const data = await getCandidatosById(id);
    return {
        user: data.user,
        candidato: data.candidato
    }  // Retorna os chamados
}

export async function getCandidatosByQueryStringAction(_: unknown, formData: FormData) {
    const filtros: Record<string, string> = {};
    formData.delete('estado')
    formData.forEach((value, key) => {
        if (key.startsWith("$ACTION")) return;
        if (typeof value === "string" && value.trim() !== "") {
            filtros[key] = value;
        }
    });
    const data = await getCandidatosByQueryString(filtros);
    return {
        users: data.users,
        candidatos: data.candidatos
    }  // Retorna os chamados
}

// Função para criar um novo candidato
export async function createCandidatoAction(_: unknown, formData: FormData) {

    if (formData.get('password') != formData.get('password_confirm')) {
        const data = { error: "As senhas não conferem" }
        return data
    }
    formData.delete('password_confirm')
    console.log(formData)
    const data = await createCandidatos(formData);


    if (!data.success) {
        return { error: data.message };
    }

    return data; // Retorna o resultado da criação
}

// Função para atualizar um candidato existente
export async function updateCandidatoAction(_: unknown, formData: FormData) {
    const idString = formData.get('id')?.toString()
    const id = parseInt(idString || '')
    formData.append('_method', 'PATCH');
    const data = await updateCandidatos(id, formData);
    return data; // Retorna o resultado da atualização
}

// Função para deletar um candidato
export async function deleteCandidatoAction(_: unknown, formData: FormData) {
    const idString = formData.get('id')?.toString()
    const id = parseInt(idString || '')
    const data = await deleteCandidatos(id);
    return data; // Retorna o resultado da deleção
}


