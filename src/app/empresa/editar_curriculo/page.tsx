import './page.scss'
import Image from "next/image"
import logo from '@/../public/logo-not-background.png'
import { Cargos } from '@/models/cargos'
import { getProfissoesAction } from '@/server actions/profissoes.action'
import { CadastroForm } from './CadastroForm'
import { getEmpresasAction } from '@/server actions/empresas.action'
import { Empresas } from '@/models/empresas'
import { Usuarios } from '@/models/usuarios'
import Main from '@/layouts/empresa/layout'
export const dynamic = "force-dynamic";

export default async function EditarUsuarioPage() {


  const empresaAction = await getEmpresasAction()
  const empresas: Empresas[] = empresaAction.empresas
  


  return (
    <Main>
      <section className='cadastro-area'>
        <div className='cadastro-content'>
          <Image width={160} height={160} src={logo} alt='Logo Talents RH'></Image>
          <h2>Curriculo</h2>
          <CadastroForm empresas={empresas} />
        </div>
      </section>
    </Main>
  )
}