import Main from '@/layouts/admin/layout'
import './page.scss'
import { getCandidatosAction } from '@/server actions/candidato.action'
import { getEmpresasAction } from '@/server actions/empresas.action'
import { getHeadhuntersAction } from '@/server actions/headhunters.action'
import { Headhunters } from '@/models/headhunter'
import { Usuarios } from '@/models/usuarios'
import { Candidatos } from '@/models/candidatos'
import { Empresas } from '@/models/empresas'
import { Cargos } from '@/models/cargos'
import { getProfissoesAction } from '@/server actions/profissoes.action'
import { Chamados, ChamadosAtualizacoes } from '@/models/chamados'
import { getAllAtualizacoesAction, getChamadosAction } from '@/server actions/chamados.action'
import { cookies } from 'next/headers'
import Dashboard from './Dashboard'
export const dynamic = "force-dynamic";


export default async function Painel() {



    const empresasAction = await getEmpresasAction();
    const userEmpresas: Usuarios[] = empresasAction.users
    const empresas: Empresas[] = empresasAction.empresas

    const candidatosAction = await getCandidatosAction();
    const userCandidatos: Usuarios[] = candidatosAction.users
    const candidatos: Candidatos[] = candidatosAction.candidatos

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
            <section className='admin-area'>
                <h1>Painel do Admin</h1>
                <Dashboard
                    atualizacoes={atualizacoes}
                    chamados={chamados}
                    candidatos={candidatos}
                    empresas={empresas}
                    headhunters={headhunters}
                    profissoes={profissoes}
                    userCandidatos={userCandidatos}
                    userEmpresas={userEmpresas}
                    userHeadhunters={userHeadhunters}
                />

            </section>

        </Main>
    )
}