
import Main from "@/layouts/admin/layout"
import './page.scss'
import { getAdminsAction } from "@/server actions/admins.action";
import { Admins } from "@/models/admins";
import { Usuarios } from "@/models/usuarios";
import AdminsList from "./AdministradoresList";

export const dynamic = "force-dynamic";

export default async function AdministradoresPage() {
    const adminsAction = await getAdminsAction()
    const admins : Admins[] = adminsAction.admins
    const userAdmins : Usuarios[] = adminsAction.users

    return (
        <Main>
            <section className="admin-area">
                <h1>Administradores</h1>
               <AdminsList admins={admins} userAdmins={userAdmins} />
            </section>
        </Main>
    )
}