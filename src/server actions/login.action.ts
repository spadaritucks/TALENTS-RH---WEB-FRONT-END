'use server'

import { Login } from "@/api/login/api"
import { Usuarios } from "@/models/usuarios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getAllUsers } from "@/api/users/api"


export async function LoginAction(_: unknown, formdata: FormData) {

    const UsuariosJSON = await getAllUsers()
    const usuarios: Usuarios[] = await UsuariosJSON?.users
    
    const email = formdata.get('email')
    const usuario = usuarios.find(user => user.email === email)


    const data = await Login(formdata)


    if (!data.success) {
        return { error: data.message }; // Retorna erro para o frontend
    }

    const cookiesStore = await cookies()
    cookiesStore.set('token', data.token)
    cookiesStore.set('user', JSON.stringify(data.user))

    redirect(`/${usuario?.tipo_usuario}/painel`)


}

export async function LogoutAction(){
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("user");
    redirect("/");
}

