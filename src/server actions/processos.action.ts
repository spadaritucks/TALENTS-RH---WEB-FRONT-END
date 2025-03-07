'use server'

// Importando as funções da API
import { createProcesso, updateProcesso, deleteProcesso, getProcessos, getProcessoById, getProcessosByQueryString } from "@/api/processos/api"

// Função para obter todos os processos
export async function getProcessosAction() {
    const data = await getProcessos();
    return data.processos; // Retorna os processos
}

export async function getProcessoByIdAction(id: number) {
    const data = await getProcessoById(id);
    return data.processo // Retorna os processos
}

// Função para criar um novo processo
export async function createProcessoAction(_: unknown, formData: FormData) {
    const data = await createProcesso(formData);

    return data; // Retorna o resultado da criação


}

// Função para atualizar um processo existente
export async function updateProcessoAction(id: number, formData: FormData) {
    const data = await updateProcesso(id, formData);
    return data; // Retorna o resultado da atualização
}

// Função para deletar um processo
export async function deleteProcessoAction(id: number) {
    const data = await deleteProcesso(id);
    return data; // Retorna o resultado da deleção
}

export async function getProcessosByQueryStringAction(_: unknown, formData: FormData) {
    const filtros: Record<string, string> = {};
    formData.forEach((value, key) => {
        if (key.startsWith("$ACTION")) return;
        if (typeof value === "string" && value.trim() !== "") {
            filtros[key] = value;
        }
    });
    const data = await getProcessosByQueryString(filtros);
    return data.processos; // Retorna os processos filtrados
}
