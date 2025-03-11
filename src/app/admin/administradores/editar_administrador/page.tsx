
import { Usuarios } from "@/models/usuarios";
import Main from "@/layouts/admin/layout";
import { getAdminsAction } from "@/server actions/admins.action";
import { Admins } from "@/models/admins";
import EditarAdministradorForm from "./EditarAdministradorForm";
export const dynamic = "force-dynamic";



export default async function EditarAdministradorPage() {

    const adminsAction = await getAdminsAction()
    const admins : Admins[] = adminsAction.admins
    const userAdmins : Usuarios[] = adminsAction.users

    return (
        <Main>
            <section className="formAdmin">
                <h1>Editar Administrador</h1>
                <EditarAdministradorForm admins={admins} userAdmins={userAdmins} />

            </section>
        </Main>
    )
}