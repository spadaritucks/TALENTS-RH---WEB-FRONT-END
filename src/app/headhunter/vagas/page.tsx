
import Main from "@/layouts/headhunter/layout"
import './page.scss'
import Button from "@/components/button/component"
import VagasList from "./VagasList"
import { cookies } from "next/headers"
import { getHeadhuntersAction } from "@/server actions/headhunters.action"
import { Usuarios } from "@/models/usuarios"
import { Headhunters } from "@/models/headhunter"
import { getEmpresasAction } from "@/server actions/empresas.action"
import { Empresas } from "@/models/empresas"
import { getCandidatosAction } from "@/server actions/candidato.action"
import { Candidatos } from "@/models/candidatos"
import { Processos } from "@/models/processos"
import { getProcessosAction } from "@/server actions/processos.action"
import { getVagasAction } from "@/server actions/vagas.action"
import { Vagas } from "@/models/vagas"
import Link from "next/link"
import getEstadoAction from "@/server actions/estado.action"
import { Estados } from "@/models/estados"
import { getAdminsAction } from "@/server actions/admins.action"
import { Admins } from "@/models/admins"
export const dynamic = "force-dynamic";


export default async function PainelVagas() {
    const headhuntersAction = await getHeadhuntersAction();
    const usersHeadhunters: Usuarios[] = headhuntersAction.users
    const headhunters: Headhunters[] = headhuntersAction.headhunters

    const empresasAction = await getEmpresasAction();
    const usersEmpresas: Usuarios[] = empresasAction.users
    const empresas: Empresas[] = empresasAction.empresas

    const adminAction = await getAdminsAction()
    const admins : Admins[] = adminAction.admins
    const userAdmins : Usuarios[] = adminAction.users

    const processos: Processos[] = await getProcessosAction();
    const estados : Estados[] = await getEstadoAction()


    const vagas: Vagas[] = await getVagasAction();


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

            <section className="vagas-area">
                <h1>Vagas de Emprego</h1>
                <Link href='/headhunter/vagas/criar_vaga'><Button ButtonName="Criar Vaga" type="button" variant="primary" /></Link>
                <VagasList
                    vagas={vagas}
                    headhunters={headhunters}
                    empresas={empresas}
                    processos={processos}
                    usersEmpresas={usersEmpresas}
                    usersHeadhunters={usersHeadhunters}
                    admins={admins}
                    userAdmins={userAdmins}
                    estados={estados}
                    userLogged={userLogged}
                />
            </section>

        </Main>

    )
}

