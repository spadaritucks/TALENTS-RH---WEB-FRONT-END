'use client'
import Image from 'next/image'
import './page.scss'
import logo from '@/../public/logo.png'
import Input from '@/components/input/component'
import Button from '@/components/button/component'
import Link from 'next/link'
import useNumericInput from '@/hooks/NumericInput'
import { Login } from '@/api/login/api'
import { useRef } from 'react'


export default function Home() {

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const data = await Login(formData)
      
      if (data) {
        console.log(data)
        if (data.status === false) {
          alert(data.message)
        } else {
          sessionStorage.setItem('token', data.token)
          sessionStorage.setItem('user', JSON.stringify(data.user))
          window.location.href = '/candidato/painel'
          console.log(data)
        }
      }

    }

  }

  return (
    <section className='login-area'>
      <div className='login-content'>
        <Image width={80} height={80} src={logo} alt='Logo Talents RH'></Image>
        <h2>Login do Candidato</h2>
        <form onSubmit={handleSubmit} ref={formRef}>
          <Input label='Email' type='email' name='email'></Input>
          <Input label='Senha' type='password' name='password'></Input>
          <div className='form-footer'>
            <Button ButtonName='Login' type='submit' variant='primary' />
            <Link href='/candidato/cadastro'>Crie sua Conta</Link>
          </div>
        </form>

      </div>
    </section>
  )


}