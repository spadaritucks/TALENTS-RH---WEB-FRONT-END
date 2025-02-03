'use client'

import './page.scss'
import Image from "next/image"
import logo from '@/../public/logo-not-background.png'
import Input from "@/components/input/component"
import useNumericInput from "@/hooks/NumericInput"
import Select from "@/components/select/component"
import Button from "@/components/button/component"
import { profissoes } from '@/json/profissoes'
import { useRef, useState } from 'react'
import { consultores } from '@/json/consultores'
import { createUser } from '@/api/users/api'


export default function Cadastro() {

  const [search, setSearch] = useState('')
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({})
  const filteredProfissoes = profissoes.filter((profissao) => profissao.toLowerCase().includes(search.toLowerCase()))
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const tipoUsuario = 'empresa'
      formData.append('tipo_usuario', tipoUsuario)


      if (formData.get('password') === formData.get('password_confirm')) {
        formData.delete('password_confirm')
        console.log(formData)
        const data = await createUser(formData)

        if (data) {
          console.log(data)
          if (data.status === false) {
            if (typeof data.message === 'object') {
              setFormErrors(data.message)
            } else {
              alert(data.message)
            }
          } else {
            alert('Cadastro realizado com sucesso!')
            window.location.href = '/empresa/login'
          }
        }
      } else {
        alert('As senhas não correspondem!')
      }
    }
  }


  return (
    <section className='cadastro-area'>
      <div className='cadastro-content'>

        <Image width={160} height={160} src={logo} alt='Logo Talents RH'></Image>
        <h2>Cadastro da Empresa</h2>

        <form ref={formRef} onSubmit={handleSubmit}>
          <Input label="Nome" placeholder='Nome' type="text" name="nome" />
          <Input label="Sobrenome" placeholder='Sobrenome' type="text" name="sobrenome" />
          <Input label="Cidade" placeholder='Cidade' type="text" name="cidade" />
          <Input label="Estado" placeholder='Estado' type="text" name="estado" />
          <Input label="Email" placeholder='exemplo@dominio.com' type="email" name="email" />
          <Input label="Celular Principal" placeholder='(11) 99999-9999' type="text" name="celular_1" onInput={useNumericInput} />
          <Input label="Celular Alternativo" placeholder='(11) 99999-9999' type="text" name="celular_2" onInput={useNumericInput} />
          <Input label="Data de Nascimento" type="date" name="data_nascimento" />
          <Input label="Linkedin" placeholder='linkedin.com/in/usuario' type="text" name="linkedin" />
          <Input label='Insira o seu CNPJ' type='text' name='cnpj' placeholder='00-000-000/0001-00' onInput={useNumericInput} />
          <Input label='Razão Social' type='text' name='razao_social' placeholder='Razão Social da Empresa' />
          <Input label='Nome Fantasia' type='text' name='nome_fantasia' placeholder='Nome Fantasia da Empresa' />
          <Input label='Segmento' type='text' name='segmento' placeholder='Segmento da Empresa' />
          <Input label='Número de Funcionários' type='text' name='numero_funcionarios' placeholder='Número de Funcionários' />
          <Input label="Senha para Acesso ao Painel" type='password' name='password' />
          <Input label="Confirme sua Senha" type='password' name='password_confirm' />
          <div className="submit-grid-btn" style={{ gridColumn: '1/-1' }}>
            <Button ButtonName="Enviar" type="submit" variant="primary" />
          </div>
        </form>
      </div>
    </section>
  )
}