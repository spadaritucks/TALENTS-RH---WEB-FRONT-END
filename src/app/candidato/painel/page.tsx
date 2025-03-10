
import Main from "@/layouts/candidato/layout";
import './page.scss'
import { Vagas } from "@/models/vagas";
import { getVagasAction } from "@/server actions/vagas.action";
import { Headhunters } from "@/models/headhunter";
import { getHeadhuntersAction } from "@/server actions/headhunters.action";
import { Empresas } from "@/models/empresas";
import { getEmpresasAction } from "@/server actions/empresas.action";
import { getProcessosAction } from "@/server actions/processos.action";
import { Processos } from "@/models/processos";
import { Candidatos } from "@/models/candidatos";
import { getCandidatosAction } from "@/server actions/candidato.action";
import VagasList from "./VagasList";
import { Usuarios } from "@/models/usuarios";
import { cookies } from "next/headers";
import getEstadoAction from "@/server actions/estado.action";
import { Estados } from "@/models/estados";
export const dynamic = "force-dynamic";



export default async function PainelVagas() {

  const headhuntersAction = await getHeadhuntersAction();
  const usersHeadhunters : Usuarios[] = headhuntersAction.users
  const headhunters : Headhunters[] = headhuntersAction.headhunters

  const empresasAction = await getEmpresasAction();
  const usersEmpresas : Usuarios[] = empresasAction.users
  const empresas : Empresas[] = empresasAction.empresas

  const candidatosAction = await getCandidatosAction();
  const usersCandidatos : Usuarios[] = candidatosAction.users
  const candidatos : Candidatos[] = candidatosAction.candidatos

  const processos : Processos[] = await getProcessosAction();
 

  const vagas : Vagas[] = await getVagasAction();
  const estados : Estados[] = await getEstadoAction()
 

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
      <section className="painel-candidato">
        <div className="vagas-area">
          <h1>Painel de Vagas</h1>
          <VagasList
            vagas={vagas}
            headhunters={headhunters}
            empresas={empresas}
            processos={processos}
            candidatos={candidatos}
            usersCandidatos={usersCandidatos}
            usersEmpresas={usersEmpresas}
            usersHeadhunters={usersHeadhunters}
            userLogged={userLogged}
            estados={estados}
          />
        </div>
      </section>
    </Main>
  )
}
