'use client'
import Image from 'next/image'
import './page.scss'
import logo from '@/../public/logo.png'
import Input from '@/components/input/component'
import Button from '@/components/button/component'
import Link from 'next/link'
import useNumericInput from '@/hooks/NumericInput'


export default function Home() {

  return (
    <section className='login-area'>
      <div className='login-content'>
        <Image width={80} height={80} src={logo} alt='Logo Talents RH'></Image>
        <h2>Login da Empresa</h2>
        <form>
          <Input label='CNPJ' type='text' name='cnpj' onInput={useNumericInput}></Input>
          <Input label='Senha' type='password' name='password'></Input>
          <div className='form-footer'>
            <Button ButtonName='Login' type='submit' variant='primary' />
            <Link href = '/empresa/cadastro'>Crie sua Conta</Link>
          </div>
        </form>

      </div>
    </section>
  )


}