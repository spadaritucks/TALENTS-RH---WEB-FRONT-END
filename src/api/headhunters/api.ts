export async function getHeadhunters() {
    try {
        const response = await fetch(`${process.env.API_URL}/api/headhunters`, {
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

export async function getHeadhuntersById(id:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/headhunters/${id}`, {
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

export async function getHeadhuntersByQueryString(filtros: Record<string, string>) {
    try {
        const queryString = new URLSearchParams(filtros).toString();
        const response = await fetch(`${process.env.API_URL}/api/headhunters?${queryString}`, {
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


export async function createHeadhunters(formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/headhunters`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        
        return data
        
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateHeadhunters(id: number, formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/headhunters/${id}?_method=PATCH`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteHeadhunters(id: number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/headhunters/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}


