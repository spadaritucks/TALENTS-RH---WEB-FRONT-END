import Image from 'next/image'
import './page.scss'
import logo from '@/../public/logo-not-background.png'
import Link from 'next/link'


export default function Home() {

  return (
    <section className='main-menu-area'>
      <Image width={160} height={160} src={logo} alt='Logo Talents RH'></Image>
      <h1>Escolha o seu Perfil</h1>
      <div className='main-menu-content'>
        <Link className='type-profile-content' href='/candidato/cadastro'><h2>Candidato</h2><br/><p>Clique aqui</p></Link>
        <Link className='type-profile-content' href='/empresa/cadastro'><h2>Empresa</h2><br/><p>Clique aqui</p></Link>
        <Link className='type-profile-content' href='/headhunter/cadastro'><h2>Headhunter</h2><br/><p>Clique aqui</p></Link>
      </div>
    </section>
  )


}