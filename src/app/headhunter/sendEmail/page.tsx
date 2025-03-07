
import Main from "@/layouts/headhunter/layout"
import './page.scss'
import SendEmailForm from "./SendEmail"
import { Usuarios } from "@/models/usuarios"
import { getUsersAction } from "@/server actions/users.action"


export default async function enviarEmail() {

    const usuarios : Usuarios[] = await getUsersAction()
    return (
        <Main>
            <section className="enviar-email-menu">
                <h1>Enviar Email para Candidato</h1>
               <SendEmailForm usuarios={usuarios} />
            </section>
        </Main>
    )
}