
import './page.scss'
import Main from '@/layouts/admin/layout'
import { getEmpresasAction } from '@/server actions/empresas.action'
import { Empresas } from '@/models/empresas'
import { Usuarios } from '@/models/usuarios'
import { getCandidatosAction } from '@/server actions/candidato.action'
import { Candidatos } from '@/models/candidatos'
import { Processos } from '@/models/processos'
import { getProcessosAction } from '@/server actions/processos.action'
import { Vagas } from '@/models/vagas'
import { getVagasAction } from '@/server actions/vagas.action'
import CandidatoVaga from './CandidatoVaga'


export default async function CandidatoVagaPage() {


    const empresasAction = await getEmpresasAction()
    const empresas: Empresas[] = empresasAction.empresas
    const userEmpresas: Usuarios[] = empresasAction.users

    const candidatosAction = await getCandidatosAction()
    const candidatos: Candidatos[] = candidatosAction.candidatos
    const userCandidatos: Usuarios[] = candidatosAction.users

    const processos: Processos[] = await getProcessosAction()
    const vagas: Vagas[] = await getVagasAction()




    return (
        <Main>
            <div className='candidados-vaga'>
                <CandidatoVaga
                    candidatos={candidatos}
                    empresas={empresas}
                    processos={processos}
                    userCandidatos={userCandidatos}
                    userEmpresas={userEmpresas}
                    vagas={vagas}
                />
            </div>
        </Main>
    )
}