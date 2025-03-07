
export enum StatusProcesso {
    Aguardando = "Aguardando o Retorno da Empresa",
    Reprovado = "Reprovado",
    Aprovado = "Aprovado",
}

export type Processos = {
    id: number; // Adicione o campo id se necessário
    candidato_id: number;
    vaga_id: number;
    status: StatusProcesso
    created_at: string;
}