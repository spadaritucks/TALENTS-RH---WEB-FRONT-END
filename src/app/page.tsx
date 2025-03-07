
import Image from 'next/image'
import './page.scss'
import logo from '@/../public/logo-not-background.png'
import { LoginForm } from './LoginForm'


export default function Home() {

  

  return (
    <section className='login-area'>
      <div className='login-content'>
        <Image width={80} height={80} src={logo} alt='Logo Talents RH'></Image>
        <h2>Login do Usuario</h2>
        <LoginForm/>
      </div>
    </section>
  )


}

