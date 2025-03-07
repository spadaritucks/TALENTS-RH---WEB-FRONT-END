export async function getChamados() {
    try {
        const response = await fetch(`${process.env.API_URL}/api/chamados`, {
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

export async function getChamadoById(id:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/chamados/${id}`, {
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


export async function createChamados(formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/chamados`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateChamados(id: number, formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/chamados/${id}?_method=POST`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteChamados(id: number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/chamados/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function getAtualizacoes() {
    try {
        const response = await fetch(`${process.env.API_URL}/api/atualizacoes`, {
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

export async function getAtualizacaoById(id:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/chamados/${id}`, {
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

export async function createAtualizacoes(formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/atualizacoes`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateAtualizacoes(id: number, formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/atualizacoes/${id}`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteAtualizacoes(id: number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/atualizacoes/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function getChamadosByQueryString(filtros: Record<string, string>) {
    try {
        const queryString = new URLSearchParams(filtros).toString();
        const response = await fetch(`${process.env.API_URL}/api/chamados?${queryString}`, {
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

