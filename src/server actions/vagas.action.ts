'use server'

// Importando as funções da API
import { createVagas, updateVagas, deleteVagas, getVagas, getVagaById, getVagaByQueryString } from "@/api/vagas/api"


// Função para obter todas as vagas
export async function getVagasAction() {
    const data = await getVagas();
    return data.vagas; // Retorna as vagas
}

export async function getVagaByQueryStringAction(_: unknown, formData: FormData) {
    const filtros: Record<string, string> = {};
    
    formData.forEach((value, key) => {
        if (key.startsWith("$ACTION")) return;
        if (typeof value === "string" && value.trim() !== "") {
            filtros[key] = value;
        }
    });

    const data = await getVagaByQueryString(filtros);

    return data.vagas; // Retorna as vagas
}


export async function getVagaByIdAction(id: number) {
    const data = await getVagaById(id);
    return data.vaga; // Retorna os chamados
}

// Função para criar uma nova vaga
export async function createVagasAction(_: unknown, formData: FormData) {


    const data = await createVagas(formData);

    if (!data.success) {
        return { error: data.message };
    }
    
    return data; // Retorna o resultado da criação
}

// Função para atualizar uma vaga existente
export async function updateVagasAction(id: number, formData: FormData) {
    const data = await updateVagas(id, formData);
    return data; // Retorna o resultado da atualização
}

// Função para deletar uma vaga
export async function deleteVagasAction(id: number) {
    const data = await deleteVagas(id);
    return data; // Retorna o resultado da deleção
}
