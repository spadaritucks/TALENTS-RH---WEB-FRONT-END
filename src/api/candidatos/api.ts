'use server'
export async function getCandidatos() {
    try {
        const response = await fetch(`${process.env.API_URL}/api/candidatos`, {
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

export async function getCandidatosById(id:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/candidatos/${id}`, {
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

export async function getCandidatosByQueryString(filtros: Record<string, string>) {
    try {
        const queryString = new URLSearchParams(filtros).toString();
        const response = await fetch(`${process.env.API_URL}/api/candidatos?${queryString}`, {
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

export async function createCandidatos(formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/candidatos`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateCandidatos(id: number, formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/candidatos/${id}?_method=PATCH`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteCandidatos(id: number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/candidatos/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}
