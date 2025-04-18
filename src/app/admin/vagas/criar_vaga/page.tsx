import { Cargos } from "@/models/cargos";
import { Empresas } from "@/models/empresas";
import { getEmpresasAction } from "@/server actions/empresas.action";
import { getProfissoesAction } from "@/server actions/profissoes.action";
import CriarVagaForm from "./FormVaga";
import './page.scss'
import Main from "@/layouts/admin/layout";
import { getHeadhuntersAction } from "@/server actions/headhunters.action";
import { Headhunters } from "@/models/headhunter";
import { cookies } from "next/headers";
import { getAdminsAction } from "@/server actions/admins.action";
import { Admins } from "@/models/admins";
export const dynamic = "force-dynamic";

export default async function CriarVagas() {
    const profissoes: Cargos[] = await getProfissoesAction();
    const empresasAction = await getEmpresasAction();
    const empresas: Empresas[] = empresasAction.empresas

    const adminAction = await getAdminsAction()
    const admins : Admins[] = adminAction.admins
    

    const cookiesStore = await cookies();
    const requestCookie = cookiesStore.get('user')?.value
    let userLogged = null;

    try {
        if (requestCookie) {
            userLogged = JSON.parse(requestCookie);
        }
    } catch (error) {
        console.error("Erro ao parsear cookie 'user':", error);
    }

    return (
        <Main>
            <section className="vagas-section">
                <h1>Criar Vagas</h1>
                <CriarVagaForm empresas={empresas} profissoes={profissoes} admins={admins} userLogged={userLogged} />
            </section>
        </Main>
    )
}