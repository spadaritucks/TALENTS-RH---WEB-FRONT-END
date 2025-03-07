
export const Login = async (formdata: FormData) => {
    try {
        const response = await fetch(`${process.env.API_URL}/api/login`, {
            method: 'POST',
            body: formdata
            
        });

        const data = await response.json();
        
        return data;

    } catch (error:any) {
        return { success: false, message: error.message };
    }
};
