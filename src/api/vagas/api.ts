export async function getVagas() {
    try {
        const response = await fetch(`${process.env.API_URL}/api/vagas`, {
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

export async function getVagaByQueryString(filtros: Record<string, string>) {
    try {
        const queryString = new URLSearchParams(filtros).toString();
       
        const response = await fetch(`${process.env.API_URL}/api/vagas?${queryString}`, {
            headers: {
                'Cache-Control': 'no-store'
            },
        });
        const data = await response.json();
        console.log(data)
        return data
        
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function getVagaById(id: number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/vagas/${id}`, {
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


export async function createVagas(formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/vagas`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateVagas(id: number, formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/vagas/${id}?_method=POST`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteVagas(id: number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/vagas/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}


