export interface ProcessosProps{
    id:number;
    candidato_id:number;
    vaga_id:number;
    status:string;
    created_at:string
}


export async function getProcessos() {
    try {
        const response = await fetch(`${process.env.API_URL}/api/processos`, {
            headers: {
                'Cache-Control': 'no-store'
            },
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function getProcessoById(id:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/processos/${id}`, {
            headers: {
                'Cache-Control': 'no-store'
            },
        });
        const data = await response.json();
        
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function getProcessosByQueryString(filtros: Record<string, string>) {
    try {
        const queryString = new URLSearchParams(filtros).toString();
        const response = await fetch(`${process.env.API_URL}/api/processos?${queryString}`, {
            headers: {
                'Cache-Control': 'no-store'
            },
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}



export async function createProcesso(formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/processos`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateProcesso(id: number, formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/processos/${id}?_method=POST`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteProcesso(id: number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/processos/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}



