
import Main from "@/layouts/headhunter/layout"
import './page.scss'
import { cookies } from "next/headers"
import { getHeadhuntersAction } from "@/server actions/headhunters.action"
import { Usuarios } from "@/models/usuarios"
import { Headhunters } from "@/models/headhunter"
import { getEmpresasAction } from "@/server actions/empresas.action"
import { Empresas } from "@/models/empresas"
import { getCandidatosAction } from "@/server actions/candidato.action"
import { Candidatos } from "@/models/candidatos"
import CandidatoTable from "./CandidatosTable"
import { Cargos } from "@/models/cargos"
import { getProfissoesAction } from "@/server actions/profissoes.action"
import ChamadoTable from "./ChamadosTable"
import { getChamadosAction } from "@/server actions/chamados.action"
import { Chamados } from "@/models/chamados"
import getEstadoAction from "@/server actions/estado.action"
import { Estados } from "@/models/estados"
export const dynamic = "force-dynamic";





export default async function Painel() {


    const empresasAction = await getEmpresasAction();
    const empresas: Empresas[] = empresasAction.empresas

    const candidatosAction = await getCandidatosAction();
    const usersCandidatos: Usuarios[] = candidatosAction.users
    const candidatos: Candidatos[] = candidatosAction.candidatos

    const profissoes: Cargos[] = await getProfissoesAction()
    const chamados: Chamados[] = await getChamadosAction()

    const estados : Estados[] = await getEstadoAction()


    //Consultar dados do usuario logado
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

            <section className="headhunter-area" id="headhunter-area">
                <h1>Painel do Headhunter</h1>
                <ChamadoTable profissoes={profissoes} chamados={chamados} empresas={empresas} />


            </section>
            
            <section className="candidado-search-area" id="candidado-search-area">
                <h1>Gerenciamento de Candidatos</h1>
                <CandidatoTable candidatos={candidatos} usersCandidatos={usersCandidatos} estados={estados} />
            </section>
        </Main>
    )



}



