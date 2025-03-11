'use server'

import { createAdmins, updateAdmins, deleteAdmins,  getAdmins, getAdminsById, getAdminsByQueryString } from "@/api/admins/api"

// Função para obter todos os admins
export async function getAdminsAction() {
    const data = await getAdmins();
    return {
        users: data.users,
        admins : data.admins
    }  // Retorna os admins
}

export async function getAdminByIdAction(id : number) {
    const data = await getAdminsById(id);
    return data.admin; // Retorna os chamados
}

export async function getAdminsByQueryStringAction(_: unknown, formData: FormData) {
    const filtros: Record<string, string> = {};
    formData.forEach((value, key) => {
        if (key.startsWith("$ACTION")) return;
        if (typeof value === "string" && value.trim() !== "") {
            filtros[key] = value;
        }
    });
    const data = await getAdminsByQueryString(filtros);
    return data.admins; // Retorna os admins filtrados
}

// Função para criar um novo admin
export async function createAdminAction(_:unknown,formData: FormData) {

   if(formData.get('password') != formData.get('password_confirm')){
        const data = {error: "As senhas não conferem"}
        return data
    }
    formData.delete('password_confirm')
    console.log(formData)
    const data = await createAdmins(formData);

    if (!data.success) {
        return { error: data.message };
    }

    return data; // Retorna o resultado da criação
}

// Função para atualizar um admin existente
export async function updateAdminAction(_: unknown, formData: FormData) {

    const idString = formData.get('id')?.toString()
    const id = parseInt(idString || '')
    formData.append('_method', 'PATCH');
   
    const data = await updateAdmins(id, formData);

    if (!data.success) {
        return { error: data.message };
    }
    
    return data; // Retorna o resultado da atualização
}

// Função para deletar um admin
export async function deleteAdminAction(_: unknown, formData: FormData) {
    const idString = formData.get('id')?.toString()
    const id = parseInt(idString || '')
    const data = await deleteAdmins(id);

    if (!data.success) {
        return { error: data.message };
    }
    
    return data; // Retorna o resultado da deleção
}
