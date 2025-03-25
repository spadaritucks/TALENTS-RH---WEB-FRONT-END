export enum VagaStatus {
    Ativa = "Ativo",
    Suspensa = "Suspensa",
    Cancelada = "Cancelada",
}

export type Vagas = {
    id: number; // Adicione o campo id se necessário
    headhunter_id: number;
    admin_id: number;
    empresa_id: number;
    profissao_id: number;
    titulo: string;
    descricao: string;
    competencias: string;
    nivel_senioridade: string;
    tipo_salario: string;
    salario_minimo: number;
    salario_maximo: number;
    data_final: string; // Pode ser ajustado para Date se necessário
    status: VagaStatus;
    created_at: string;
}