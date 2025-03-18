
export enum ChamadoStatus {
    Aguardando = "Aguardando a confirmação da empresa",
    Andamento = "Em Andamento",
    Concluido = "Concluído",
}

export type Chamados = {
    id: number; // Adicione o campo id se necessário
    headhunter_id : number;
    empresa_id: number;
    profissao_id: number;
    numero_vagas: number;
    descricao: string;
    status: ChamadoStatus;
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