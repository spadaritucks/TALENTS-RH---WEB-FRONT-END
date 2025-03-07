export async function getAdmins() {
    try {
        const response = await fetch(`${process.env.API_URL}/api/admins`, {
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

export async function getAdminsById(id: number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/admins/${id}`, {
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

export async function getAdminsByQueryString(filtros: Record<string, string>) {
    try {
        const queryString = new URLSearchParams(filtros).toString();
        const response = await fetch(`${process.env.API_URL}/api/admins?${queryString}`, {
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


export async function createAdmins(formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/admins`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateAdmins(id: number, formData: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/admins/${id}?_method=PATCH`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteAdmins(id: number) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/admins/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}



