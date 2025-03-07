'use server'

import { createConsultores, updateConsultores, deleteConsultores,  getConsultores, getConsultoresById, getConsultoresByQueryString } from "@/api/consultores/api"

// Função para obter todos os consultores
export async function getConsultoresAction() {
    const data = await getConsultores();
    return {
        users: data.users,
        consultores : data.consultores
    }// Retorna os consultores
}

export async function getConsultoresByIdAction(id : number) {
    const data = await getConsultoresById(id);
    return {
        users: data.user,
        consultor : data.consultor
    }; // Retorna os consultores
}

export async function getConsultoresByQueryStringAction(_: unknown, formData: FormData) {
    const filtros: Record<string, string> = {};
    formData.forEach((value, key) => {
        if (key.startsWith("$ACTION")) return;
        if (typeof value === "string" && value.trim() !== "") {
            filtros[key] = value;
        }
    });
    const data = await getConsultoresByQueryString(filtros);
    return data.consultores; // Retorna os consultores filtrados
}

// Função para criar um novo consultor
export async function createConsultorAction(_:unknown,formData: FormData) {

   if(formData.get('password') != formData.get('password_confirm')){
        const data = {error: "As senhas não conferem"}
        return data
    }
    formData.delete('password_confirm')
    console.log(formData)
    const data = await createConsultores(formData);

    if (!data.success) {
        return { error: data.message };
    }

    return data; // Retorna o resultado da criação
}

// Função para atualizar um consultor existente
export async function updateConsultorAction(_:unknown, formData: FormData) {
    const idString = formData.get('id')?.toString()
    const id = parseInt(idString || '')
    const data = await updateConsultores(id, formData);

    if (!data.success) {
        return { error: data.message };
    }

    return data; // Retorna o resultado da atualização
}

// Função para deletar um consultor
export async function deleteConsultorAction(_:unknown, formData: FormData) {
    const idString = formData.get('id')?.toString()
    const id = parseInt(idString || '')
    const data = await deleteConsultores(id);

    if (!data.success) {
        return { error: data.message };
    }

    return data; // Retorna o resultado da deleção
}
