'use server'

import { createHeadhunters, updateHeadhunters, deleteHeadhunters,  getHeadhunters, getHeadhuntersById, getHeadhuntersByQueryString } from "@/api/headhunters/api"

// Função para obter todos os headhunters
export async function getHeadhuntersAction() {
    const data = await getHeadhunters();
    return {
        users: data.users,
        headhunters : data.headhunters
    } // Retorna os headhunters
}

export async function getHeadhuntersByIdAction(id : number) {
    const data = await getHeadhuntersById(id);
    return {
        users: data.user,
        headhunter : data.headhunter
    } // Retorna os chamados
}


// Função para criar um novo headhunter
export async function createHeadhunterAction(_:unknown,formData: FormData) {

   if(formData.get('password') != formData.get('password_confirm')){
        const data = {error: "As senhas não conferem"}
        return data
    }
    formData.delete('password_confirm')
    
    const data = await createHeadhunters(formData);

    if(!data.success){
        return { error: data.message };
    }

    return data; // Retorna o resultado da criação
}

// Função para atualizar um headhunter existente
export async function updateHeadhunterAction(id: number, formData: FormData) {
    const data = await updateHeadhunters(id, formData);
    return data; // Retorna o resultado da atualização
}

// Função para deletar um headhunter
export async function deleteHeadhunterAction(id: number) {
    const data = await deleteHeadhunters(id);
    return data; // Retorna o resultado da deleção
}

export async function getHeadhuntersByQueryStringAction(_: unknown, formData: FormData) {
    const filtros: Record<string, string> = {};
    formData.forEach((value, key) => {
        if (key.startsWith("$ACTION")) return;
        if (typeof value === "string" && value.trim() !== "") {
            filtros[key] = value;
        }
    });
    const data = await getHeadhuntersByQueryString(filtros);
    return data.headhunters; // Retorna os headhunters filtrados
}
