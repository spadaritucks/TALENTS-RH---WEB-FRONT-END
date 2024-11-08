
import { api } from "@/api/axios"

export async function getAllUsers() {

    try {
        const response = await api.get('/users')
        return {
            status: true,
            data: response.data
        }
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            return {
                status: false,
                message: error.response.data.message
            }
        }
    }
}

export async function createUser(formData: FormData) {
    try {
        const response = await api.post('/users', formData)
        return {
            status: true,
            data: response.data
        }
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            return {
                status: false,
                message: error.response.data.message
            }
        }
    }
}

export async function updateUser(id: string, formData: FormData) {
    try {
        const response = await api.put(`/users/${id}`, formData)
        return {
            status: true,
            data: response.data
        }
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            return {
                status: false,
                message: error.response.data.message
            }
        }
    }
}

export async function deleteUser(id: string) {
    try {
        const response = await api.delete(`/users/${id}`)
        return {
            status: true,
            data: response.data
        }
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            return {
                status: false,
                message: error.response.data.message
            }
        }
    }
}


