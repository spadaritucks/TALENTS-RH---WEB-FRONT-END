'use client'
import Image from 'next/image'
import './page.scss'
import logo from '@/../public/logo-not-background.png'
import Input from '@/components/input/component'
import Button from '@/components/button/component'
import Link from 'next/link'


export default function Home() {

  return (
    <section className='main-menu-area'>
      <Image width={160} height={160} src={logo} alt='Logo Talents RH'></Image>
      <h1>Escolha o seu Perfil</h1>
      <div className='main-menu-content'>
        <div className='type-profile-content'>
          <h2>Canditado</h2>
          <Link href= '/candidato/login'>Clique aqui</Link>
        </div>
        <div className='type-profile-content'>
          <h2>Empresa</h2>
          <Link href= '/empresa/login'>Clique aqui</Link>
        </div>
        <div className='type-profile-content'>
          <h2>Headhunter</h2>
          <Link href= '/headhunter/login'>Clique aqui</Link>
        </div>
        <div className='type-profile-content'>
          <h2>Administrador</h2>
          <Link href= '/admin/login'>Clique aqui</Link>
        </div>
      </div>
    </section>
  )


}