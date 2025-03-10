
import './page.scss'
import Image from "next/image"
import logo from '@/../public/logo-not-background.png'
import { Cargos } from '@/models/cargos'
import { getProfissoesAction } from '@/server actions/profissoes.action'
import { CadastroForm } from './CadastroForm'
export const dynamic = "force-dynamic";

export default async function Cadastro() {

  const cargos : Cargos[] = await getProfissoesAction()
  

  return (
    <section className='cadastro-area'>
      <div className='cadastro-content'>
        <Image width={160} height={160} src={logo} alt='Logo Talents RH'></Image>
        <h2>Cadastro do Candidato</h2>
        <CadastroForm cargos={cargos} />
      </div>
    </section>
  )
}