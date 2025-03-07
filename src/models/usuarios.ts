export type Usuarios = {
    id: number;
    tipo_usuario: string;
    nome: string;
    sobrenome: string;
    email: string;
    cidade: string;
    bairro : string;
    estado: string;
    celular_1: string;
    celular_2?: string; // Opcional
    data_nascimento: Date; // Pode ser ajustado para Date se necessário
    linkedin?: string; // Opcional
    created_at: string;
}