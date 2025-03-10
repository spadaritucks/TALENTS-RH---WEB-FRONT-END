
import Main from "@/layouts/admin/layout"
import './page.scss'
import ConsultoresList from "./ConsultoresList"
import { getConsultoresAction } from "@/server actions/consultores.action"
import { Consultores } from "@/models/consultores"
import { Usuarios } from "@/models/usuarios"
export const dynamic = "force-dynamic";

export default async function ConsultoresPage() {
    const consultoresAction = await getConsultoresAction()
    const consultores : Consultores[] = consultoresAction.consultores
    const userConsultores : Usuarios[] = consultoresAction.users

    return (
        <Main>
            <section className="cargos-area">
                <h1>Consultores</h1>
               <ConsultoresList consultores={consultores} userConsultores={userConsultores}/>
            </section>
        </Main>
    )
}