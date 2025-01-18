'use client'
import Image from 'next/image'
import './page.scss'
import logo from '@/../public/logo.png'
import Input from '@/components/input/component'
import Button from '@/components/button/component'
import Link from 'next/link'
import useNumericInput from '@/hooks/NumericInput'
import { useEffect, useRef, useState } from 'react'
import { Login } from '@/api/login/api'
import { EmpresaProps, getAllUsers, UserProps } from '@/api/users/api'


export default function Home() {

  const formRef = useRef<HTMLFormElement>(null)
  const [users, setUsers] = useState<UserProps[]>([])
  const [empresas, setEmpresas] = useState<EmpresaProps[]>([])

  useEffect(() => {

    const fetchUsers = async () => {
      const response = await getAllUsers();
      if(response){
        setUsers(response.data.users) 
        setEmpresas(response.data.empresas);
      }
    }

    fetchUsers();
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const email = formData.get('email');

      const userVerification = users.find(user => user.email === email);
      const empresaVerification = empresas.find(empresa => empresa.user_id === userVerification?.id);

      if(!userVerification || !empresaVerification){
        alert('Usuário não encontrado');
        return;
      }

      const data = await Login(formData)

      if (data) {

        if (data.status === false) {
          alert(data.message)
        } else {
          sessionStorage.setItem('token', data.token)
          sessionStorage.setItem('user', JSON.stringify(data.user))
          window.location.href = '/empresa/painel'

        }
      }

    }

  }

  return (
    <section className='login-area'>
      <div className='login-content'>
        <Image width={80} height={80} src={logo} alt='Logo Talents RH'></Image>
        <h2>Login da Empresa</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <Input label='Email' type='email' name='email'></Input>
          <Input label='Senha' type='password' name='password'></Input>
          <div className='form-footer'>
            <Button ButtonName='Login' type='submit' variant='primary' />
            <Link href='/empresa/cadastro'>Crie sua Conta</Link>
          </div>
        </form>

      </div>
    </section>
  )


}