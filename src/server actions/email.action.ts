'use server'
import { sendEmail } from "@/api/sendEmail/api";



export async function sendEmailAction(_:unknown,  formData: FormData) {
    const data = await sendEmail(formData);

    if (!data.success) {
        return { error: data.message };
    }
    
    return data; // Retorna o resultado da criação
}