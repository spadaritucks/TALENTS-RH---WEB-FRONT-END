export type Estados =  {
    id: number;
    nome:string;
    regiao: {
        id: number;
        nome : string;
        sigla: string
    }
    sigla: string
}