import './page.scss'
import Image from "next/image"
import logo from '@/../public/logo-not-background.png'
import { CadastroForm } from './CadastroForm'
import { getEmpresasAction } from '@/server actions/empresas.action'
import { Usuarios } from '@/models/usuarios'
import Main from '@/layouts/empresa/layout'
export const dynamic = "force-dynamic";

export default async function EditarUsuarioPage() {


  const empresasAction = await getEmpresasAction()
  const userEmpresas: Usuarios[] = empresasAction.users


  return (
    <Main>
      <section className='cadastro-area'>
        <div className='cadastro-content'>
          <Image width={160} height={160} src={logo} alt='Logo Talents RH'></Image>
          <h2>Endereços e Localização</h2>
          <CadastroForm  userEmpresas={userEmpresas} />
        </div>
      </section>
    </Main>
  )
}