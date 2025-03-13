
import './page.scss'
import Image from "next/image"
import logo from '@/../public/logo-not-background.png'
import { CadastroForm } from './CadastroForm'
import Main from '@/layouts/headhunter/layout'
export const dynamic = "force-dynamic";

export default async function EditarUsuarioPage() {



  return (
    <Main>
      <section className='cadastro-area'>
        <div className='cadastro-content'>
          <Image width={160} height={160} src={logo} alt='Logo Talents RH'></Image>
          <h2>Alterar Senha</h2>
          <CadastroForm/>
        </div>
      </section>
    </Main>
  )
}