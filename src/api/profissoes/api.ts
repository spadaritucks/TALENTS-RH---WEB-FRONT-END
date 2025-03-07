export async function getProfissoes() {
    try {
        const response = await fetch(`${process.env.API_URL}/api/profissoes`, {
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

export async function getProfissoesById(id:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/profissoes/${id}`, {
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

export async function getProfissoesByQueryString(filtros: Record<string, string>) {
    try {
        const queryString = new URLSearchParams(filtros).toString();
        const response = await fetch(`${process.env.API_URL}/api/profissoes?${queryString}`, {
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


export async function createProfissoes(formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/profissoes`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateProfissoes(id: number, formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/profissoes/${id}?_method=PATCH`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
        
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteProfissoes(id: number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/profissoes/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}
