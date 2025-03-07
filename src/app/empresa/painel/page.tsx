'use server'
import Main from "@/layouts/empresa/layout"
import ClientPanel from "./ClientPanel"
import { getEmpresasAction } from "@/server actions/empresas.action";
import { Usuarios } from "@/models/usuarios";
import { Empresas } from "@/models/empresas";
import { getHeadhuntersAction } from "@/server actions/headhunters.action";
import { Headhunters } from "@/models/headhunter";
import { Cargos } from "@/models/cargos";
import { Chamados, ChamadosAtualizacoes } from "@/models/chamados";
import { getProfissoesAction } from "@/server actions/profissoes.action";
import { getAllAtualizacoesAction, getChamadosAction } from "@/server actions/chamados.action";
import { cookies } from "next/headers";

export default async function Painel() {

    const empresasAction = await getEmpresasAction();
    const userEmpresas: Usuarios[] = empresasAction.users
    const empresas: Empresas[] = empresasAction.empresas

    const headhunterAction = await getHeadhuntersAction();
    const userHeadhunters: Usuarios[] = headhunterAction.users
    const headhunters: Headhunters[] = headhunterAction.headhunters

    const profissoes: Cargos[] = await getProfissoesAction()
    const chamados: Chamados[] = await getChamadosAction()
    const atualizacoes: ChamadosAtualizacoes[] = await getAllAtualizacoesAction()

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
            <section className='empresa-area'>
                <h1>Painel do Cliente</h1>
                <ClientPanel
                    atualizacoes={atualizacoes}
                    chamados={chamados}
                    empresas={empresas}
                    userEmpresas={userEmpresas}
                    userLogged={userLogged}
                    profissoes={profissoes}
                />

            </section>
        </Main>
    )
}
