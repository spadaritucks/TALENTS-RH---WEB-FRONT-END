import Main from "@/layouts/candidato/layout";
import { Candidatos } from "@/models/candidatos";
import { Empresas } from "@/models/empresas";
import { Headhunters } from "@/models/headhunter";
import { Processos } from "@/models/processos";
import { Usuarios } from "@/models/usuarios";
import { Vagas } from "@/models/vagas";
import { getCandidatosAction } from "@/server actions/candidato.action";
import { getEmpresasAction } from "@/server actions/empresas.action";
import { getHeadhuntersAction } from "@/server actions/headhunters.action";
import { getProcessosAction } from "@/server actions/processos.action";
import { getVagasAction } from "@/server actions/vagas.action";
import { cookies } from "next/headers";
import MinhasVagasList from "./MinhasVagas";
import './page.scss'
import { getAdminsAction } from "@/server actions/admins.action";
import { Admins } from "@/models/admins";



export default async function MinhasVagasPage() {

    const headhuntersAction = await getHeadhuntersAction();
    const usersHeadhunters: Usuarios[] = headhuntersAction.users
    const headhunters: Headhunters[] = headhuntersAction.headhunters

    const empresasAction = await getEmpresasAction();
    const usersEmpresas: Usuarios[] = empresasAction.users
    const empresas: Empresas[] = empresasAction.empresas

    const candidatosAction = await getCandidatosAction();
    const usersCandidatos: Usuarios[] = candidatosAction.users
    const candidatos: Candidatos[] = candidatosAction.candidatos

    const adminAction = await getAdminsAction()
    const admins : Admins[] = adminAction.admins
    const userAdmins : Usuarios[] = adminAction.users

    const processos: Processos[] = await getProcessosAction();


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
                <h1>Minhas Vagas</h1>
                <MinhasVagasList
                    vagas={vagas}
                    headhunters={headhunters}
                    empresas={empresas}
                    processos={processos}
                    candidatos={candidatos}
                    usersCandidatos={usersCandidatos}
                    usersEmpresas={usersEmpresas}
                    usersHeadhunters={usersHeadhunters}
                    userLogged={userLogged}
                    admins={admins}
                    userAdmins={userAdmins}
                />
            </section>
        </Main>
    )
}