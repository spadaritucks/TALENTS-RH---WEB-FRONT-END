'use server'

// Importando as funções da API
import { createProfissoes, updateProfissoes, deleteProfissoes, getProfissoes, getProfissoesById, getProfissoesByQueryString } from "@/api/profissoes/api"

// Função para obter todas as profissões
export async function getProfissoesAction() {
    const data = await getProfissoes();
    return data.profissoes

}

export async function getProfissaoByIdAction(id : number) {
    const data = await getProfissoesById(id);
    return data.profissao; // Retorna os chamados
}

// Função para criar uma nova profissão
export async function createProfissoesAction(_:unknown,formData: FormData) {
    const data = await createProfissoes(formData);

    if (!data.success) {
        return { error: data.message };
    }

    return data; // Retorna o resultado da criação
}

// Função para atualizar uma profissão existente
export async function updateProfissoesAction(_:unknown, formData: FormData) {
    const idString = formData.get('id')?.toString()
    const id = parseInt(idString || '')
    const data = await updateProfissoes(id, formData);

    if (!data.success) {
        return { error: data.message };
    }

    return data; // Retorna o resultado da atualização
}

// Função para deletar uma profissão
export async function deleteProfissoesAction(_:unknown, formData: FormData) {
    const idString = formData.get('id')?.toString()
    const id = parseInt(idString || '')
    const data = await deleteProfissoes(id);

    if (!data.success) {
        return { error: data.message };
    }

    return data; // Retorna o resultado da deleção
}

export async function getProfissoesByQueryStringAction(_: unknown, formData: FormData) {
    const filtros: Record<string, string> = {};
    formData.forEach((value, key) => {
        if (key.startsWith("$ACTION")) return;
        if (typeof value === "string" && value.trim() !== "") {
            filtros[key] = value;
        }
    });
    const data = await getProfissoesByQueryString(filtros);
    return data.profissoes; // Retorna as profissões filtradas
}
