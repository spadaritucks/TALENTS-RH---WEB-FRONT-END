
export async function sendEmail(formdata: FormData) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/sendEmail`, {
            method: 'POST',
            body: formdata
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}