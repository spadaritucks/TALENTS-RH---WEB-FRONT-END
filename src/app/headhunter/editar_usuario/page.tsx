import './page.scss'
import Image from "next/image"
import logo from '@/../public/logo-not-background.png'
import { Cargos } from '@/models/cargos'
import { getProfissoesAction } from '@/server actions/profissoes.action'
import { CadastroForm } from './CadastroForm'
import { getHeadhuntersAction } from '@/server actions/headhunters.action'
import { Headhunters } from '@/models/headhunter'
import { Usuarios } from '@/models/usuarios'
import Main from '@/layouts/headhunter/layout'
export const dynamic = "force-dynamic";

export default async function EditarUsuarioPage() {

  const cargos: Cargos[] = await getProfissoesAction()
  const headhuntersAction = await getHeadhuntersAction()
  const headhunters: Headhunters[] = headhuntersAction.headhunters
  const userHeadhunters: Usuarios[] = headhuntersAction.users


  return (
    <Main>
      <section className='cadastro-area'>
        <div className='cadastro-content'>
          <Image width={160} height={160} src={logo} alt='Logo Talents RH'></Image>
          <h2>Dados Pessoais</h2>
          <CadastroForm cargos={cargos} headhunters={headhunters} userHeadhunters={userHeadhunters} />
        </div>
      </section>
    </Main>
  )
}