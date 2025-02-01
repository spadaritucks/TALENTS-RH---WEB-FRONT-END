'use client'
import Image from 'next/image'
import './page.scss'
import logo from '@/../public/logo-not-background.png'
import Input from '@/components/input/component'
import Button from '@/components/button/component'
import Link from 'next/link'
import useNumericInput from '@/hooks/NumericInput'
import { Login } from '@/api/login/api'
import { useEffect, useRef, useState } from 'react'
import { CandidatosProps, getAllUsers, UserProps } from '@/api/users/api'
import { useModal } from '@/components/modal/context'


export default function Home() {

  const formRef = useRef<HTMLFormElement>(null);
  const [users, setUsers] = useState<UserProps[]>([])
  const [candidatos, setCandidatos] = useState<CandidatosProps[]>([])
  const { showModal } = useModal();

  useEffect(() => {

    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response) {
        setUsers(response.data.users)
        setCandidatos(response.data.candidatos);
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
      const candidatoVerification = candidatos.find(candidatos => candidatos.user_id === userVerification?.id);

      if (!userVerification || !candidatoVerification) {
           showModal('Erro', <p>Usuário não encontrado</p>);
        return;
      }

      const data = await Login(formData)

      if (data) {
       
        if (data.status === false) {
          showModal('Erro', <p>{data.message}</p>)
        } else {
          sessionStorage.setItem('token', data.token)
          sessionStorage.setItem('user', JSON.stringify(data.user))
          window.location.href = '/candidato/painel'
         
        }
      }

    }

  }

  return (
    <section className='login-area'>
      <div className='btn-back'>
        <Button ButtonName='Voltar ' type='button' variant='secondary' onClick={
          () => {window.location.href = '/'}
        } />
      </div>
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