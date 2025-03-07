import { getConsultoresAction } from "@/server actions/consultores.action";
import EditarConsultorForm from "./EditarConsultorForm";
import { Consultores } from "@/models/consultores";
import { Usuarios } from "@/models/usuarios";
import Main from "@/layouts/admin/layout";




export default async function EditarConsultorPage() {

    const consultoresAction = await getConsultoresAction()
    const consultores: Consultores[] = consultoresAction.consultores
    const userConsultores: Usuarios[] = consultoresAction.users

    return (
        <Main>
            <section className="formConsultor">
                <h1>Editar Consultor</h1>
                <EditarConsultorForm consultores={consultores} userConsultores={userConsultores} />

            </section>
        </Main>
    )
}