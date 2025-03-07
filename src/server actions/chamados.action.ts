'use server'
// Importando as funções da API
import { createChamados, updateChamados, deleteChamados, getChamados, getAtualizacoes, createAtualizacoes, updateAtualizacoes, deleteAtualizacoes, getChamadoById, getAtualizacaoById } from "@/api/chamados/api"

// Função para obter todos os chamados
export async function getChamadosAction() {
    const data = await getChamados();
    return data.chamados; // Retorna os chamados
}

export async function getChamadoByIdAction(id: number) {
    const data = await getChamadoById(id);
    return data.chamado; // Retorna os chamados
}

// Função para criar um novo chamado
export async function createChamadosAction(_: unknown, formData: FormData) {
    const data = await createChamados(formData);
    return data; // Retorna o resultado da criação
}

// Função para atualizar um chamado existente
export async function updateChamadosAction(_: unknown, formData: FormData) {
    const idString = formData.get('id')?.toString()
    const id = parseInt(idString || '')
    formData.append('_method', 'PATCH');
    const data = await updateChamados(id, formData);
    return data; // Retorna o resultado da atualização
}

// Função para deletar um chamado
export async function deleteChamadosAction(_: unknown, formData: FormData) {
    const idString = formData.get('id')?.toString()
    const id = parseInt(idString || '')
    const data = await deleteChamados(id);
    return data; // Retorna o resultado da deleção
}

// Função para obter todas as atualizações
export async function getAllAtualizacoesAction() {
    const data = await getAtualizacoes();
    return data.atualizacoes // Retorna as atualizações
}

export async function getAtualizacoesByIdAction(id: number) {
    const data = await getAtualizacaoById(id);
    return data.atualizacoes // Retorna as atualizações
}


// Função para criar uma nova atualização
export async function createAtualizacoesAction(_: unknown, formData: FormData) {
    console.log(formData)
    const data = await createAtualizacoes(formData);
   

    if (!data.success) {
        return { error: data.message };
    }
    
    return data; // Retorna o resultado da criação
}

// Função para atualizar uma atualização existente
export async function updateAtualizacoesAction(_: unknown, formData: FormData) {
    const idString = formData.get('id')?.toString()
    const id = parseInt(idString || '')
    formData.append('_method', 'PATCH');
   
    const data = await updateAtualizacoes(id, formData);
    if (!data.success) {
        return { error: data.message };
    }
    return data; // Retorna o resultado da atualização
}

// Função para deletar uma atualização
export async function deleteAtualizacoesAction(_: unknown, formData: FormData) {
    const idString = formData.get('id')?.toString()
    const id = parseInt(idString || '')
    const data = await deleteAtualizacoes(id);
    return data; // Retorna o resultado da deleção
}
