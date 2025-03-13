
import './page.scss'
import Image from "next/image"
import logo from '@/../public/logo-not-background.png'
import { CadastroForm } from './CadastroForm'
import { Usuarios } from '@/models/usuarios'
import Main from '@/layouts/admin/layout'
import { getAdminsAction } from '@/server actions/admins.action'
export const dynamic = "force-dynamic";


export default async function EditarUsuarioPage() {


  const adminsAction = await getAdminsAction()
  const userAdmins: Usuarios[] = adminsAction.users


  return (
    <Main>
      <section className='cadastro-area'>
        <div className='cadastro-content'>
          <Image width={160} height={160} src={logo} alt='Logo Talents RH'></Image>
          <h2>Endereços e Localização</h2>
          <CadastroForm  userAdmins={userAdmins} />
        </div>
      </section>
    </Main>
  )
}