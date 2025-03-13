import './page.scss'
import Image from "next/image"
import logo from '@/../public/logo-not-background.png'
import { Cargos } from '@/models/cargos'
import { getProfissoesAction } from '@/server actions/profissoes.action'
import { CadastroForm } from './CadastroForm'
import { getCandidatosAction } from '@/server actions/candidato.action'
import { Headhunters } from '@/models/headhunter'
import { Usuarios } from '@/models/usuarios'
import Main from '@/layouts/headhunter/layout'
import { getHeadhuntersAction } from '@/server actions/headhunters.action'
export const dynamic = "force-dynamic";

export default async function EditarUsuarioPage() {


  const headhuntersAction = await getHeadhuntersAction()
  const headhunters: Headhunters[] = headhuntersAction.headhunters



  return (
    <Main>
      <section className='cadastro-area'>
        <div className='cadastro-content'>
          <Image width={160} height={160} src={logo} alt='Logo Talents RH'></Image>
          <h2>Curriculo</h2>
          <CadastroForm headhunters={headhunters} />
        </div>
      </section>
    </Main>
  )
}