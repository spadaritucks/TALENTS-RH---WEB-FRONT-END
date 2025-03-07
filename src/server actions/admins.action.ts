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
export async function createAdminController(_:unknown,formData: FormData) {

   if(formData.get('password') != formData.get('password_confirm')){
        const data = {error: "As senhas não conferem"}
        return data
    }
    formData.delete('password_confirm')
    console.log(formData)
    const data = await createAdmins(formData);

    return data; // Retorna o resultado da criação
}

// Função para atualizar um admin existente
export async function updateAdminController(id: number, formData: FormData) {
    const data = await updateAdmins(id, formData);
    return data; // Retorna o resultado da atualização
}

// Função para deletar um admin
export async function deleteAdminController(id: number) {
    const data = await deleteAdmins(id);
    return data; // Retorna o resultado da deleção
}
