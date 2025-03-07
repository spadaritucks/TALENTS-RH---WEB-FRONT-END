'use server'

export async function getConsultores() {
    try {
        const response = await fetch(`${process.env.API_URL}/api/consultores`, {
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

export async function getConsultoresById(id:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/consultores/${id}`, {
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

export async function getConsultoresByQueryString(filtros: Record<string, string>) {
    try {
        const queryString = new URLSearchParams(filtros).toString();
        const response = await fetch(`${process.env.API_URL}/api/consultores?${queryString}`, {
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


export async function createConsultores(formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/consultores`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateConsultores(id: number, formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/consultores/${id}?_method=PATCH`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteConsultores(id: number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/consultores/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}


