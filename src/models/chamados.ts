export type Chamados = {
    id: number; // Adicione o campo id se necessário
    empresa_id: number;
    profissao_id: number;
    numero_vagas: number;
    descricao: string;
    status: string;
    created_at: string;
}

export type ChamadosAtualizacoes = {
    id: number; // Adicione o campo id se necessário
    chamados_id: number;
    user_id: number;
    titulo: string;
    atualizacoes: string;
    anexo: string;
    created_at: string;
}