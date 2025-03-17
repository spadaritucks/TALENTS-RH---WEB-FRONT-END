'use server'

import { createEmpresas, updateEmpresas, deleteEmpresas,  getEmpresas, getEmpresasById, getEmpresasByQueryString } from "@/api/empresas/api"

// Função para obter todas as empresas
export async function getEmpresasAction() {
    const data = await getEmpresas();
    return {
        users: data.users,
        empresas : data.empresas
    } // Retorna as empresas
}

export async function getEmpresasByIdAction(id : number) {
    const data = await getEmpresasById(id);
    return {
        user: data.user,
        empresa : data.empresa
    } // Retorna os chamados
}

export async function getEmpresasByQueryStringAction(_: unknown, formData: FormData) {
    const filtros: Record<string, string> = {};
    formData.forEach((value, key) => {
        if (key.startsWith("$ACTION")) return;
        if (typeof value === "string" && value.trim() !== "") {
            filtros[key] = value;
        }
    });
    const data = await getEmpresasByQueryString(filtros);
    return data.empresas; // Retorna as empresas filtradas
}

// Função para criar uma nova empresa
export async function createEmpresaAction(_:unknown,formData: FormData) {

   if(formData.get('password') != formData.get('password_confirm')){
        const data = {error: "As senhas não conferem"}
        return data
    }
    formData.delete('password_confirm')
   
    const data = await createEmpresas(formData);

    if(!data.success){
        return { error: data.message };
    }

    return data; // Retorna o resultado da criação
}

// Função para atualizar uma empresa existente
export async function updateEmpresaAction(_: unknown, formData: FormData) {
    const idString = formData.get('id')?.toString()
    const id = parseInt(idString || '')
    formData.append('_method', 'PATCH');
    const data = await updateEmpresas(id, formData);
    return data; // Retorna o resultado da atualização
}

// Função para deletar uma empresa
export async function deleteEmpresaAction(_: unknown, formData: FormData) {
    const idString = formData.get('id')?.toString()
    const id = parseInt(idString || '')
    const data = await deleteEmpresas(id);
    return data; // Retorna o resultado da deleção
}

