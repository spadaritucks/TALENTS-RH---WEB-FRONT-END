import './page.scss'
import { getChamadosAction } from '@/server actions/chamados.action'
import { Cargos } from '@/models/cargos'
import { getProfissoesAction } from '@/server actions/profissoes.action'
import { getEmpresasAction } from '@/server actions/empresas.action'
import { Empresas } from '@/models/empresas'
import { Chamados } from '@/models/chamados'
import Main from '@/layouts/headhunter/layout'
import AtualizacaoForm from './AtualizacaoForm'
import { cookies } from 'next/headers'

export default async function AtualizarChamado() {
  

    const chamados : Chamados[] = await getChamadosAction()
    const profissoes : Cargos[] = await getProfissoesAction()
    const empresasAction = await getEmpresasAction();
    const empresas: Empresas[] = empresasAction.empresas

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
            <section className='atualizar-chamado-menu'>
                <h1>Atualizar Chamado</h1>
                <AtualizacaoForm chamados={chamados} empresas={empresas} profissoes={profissoes} userLogged={userLogged} />
            </section>
        </Main>
    )
}