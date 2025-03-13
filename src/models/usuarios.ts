export type Usuarios = {
    id: number;
    foto_usuario:string
    tipo_usuario: string;
    nome: string;
    sobrenome: string;
    email: string;
    cep: string;
    logradouro: string
    cidade: string;
    bairro : string;
    estado: string;
    numero : string;
    latitude: string
    longitude: string
    celular_1: string;
    celular_2?: string; // Opcional
    data_nascimento: Date; // Pode ser ajustado para Date se necessário
    linkedin?: string; // Opcional
    created_at: string;
}