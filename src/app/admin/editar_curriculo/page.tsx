
import './page.scss'
import Image from "next/image"
import logo from '@/../public/logo-not-background.png'
import { Cargos } from '@/models/cargos'
import { getProfissoesAction } from '@/server actions/profissoes.action'
import { CadastroForm } from './CadastroForm'
import { getCandidatosAction } from '@/server actions/candidato.action'
import { Candidatos } from '@/models/candidatos'
import { Usuarios } from '@/models/usuarios'
import Main from '@/layouts/admin/layout'
import { getAdminsAction } from '@/server actions/admins.action'
import { Admins } from '@/models/admins'
export const dynamic = "force-dynamic";

export default async function EditarUsuarioPage() {

  
  const adminsAction = await getAdminsAction()
  const admins: Admins[] = adminsAction.admins


  return (
    <Main>
      <section className='cadastro-area'>
        <div className='cadastro-content'>
          <Image width={160} height={160} src={logo} alt='Logo Talents RH'></Image>
          <h2>Curriculo</h2>
          <CadastroForm admins={admins} />
        </div>
      </section>
    </Main>
  )
}