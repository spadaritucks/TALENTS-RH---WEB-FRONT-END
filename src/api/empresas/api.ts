export async function getEmpresas() {
    try {
        const response = await fetch(`${process.env.API_URL}/api/empresas`, {
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

export async function getEmpresasById(id:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/empresas/${id}`, {
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

export async function getEmpresasByQueryString(filtros: Record<string, string>) {
    try {
        const queryString = new URLSearchParams(filtros).toString();
        const response = await fetch(`${process.env.API_URL}/api/empresas?${queryString}`, {
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

export async function createEmpresas(formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/empresas`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateEmpresas(id: number, formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/empresas/${id}?_method=PATCH`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteEmpresas(id: number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/empresas/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}



