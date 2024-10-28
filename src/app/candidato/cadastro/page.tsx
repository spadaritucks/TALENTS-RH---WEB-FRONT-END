'use client'

import './page.scss'
import Image from "next/image"
import logo from '@/../public/logo.png'
import Input from "@/components/input/component"
import useNumericInput from "@/hooks/NumericInput"
import Select from "@/components/select/component"
import Button from "@/components/button/component"
import { profissoes } from '@/json/profissoes'
import { useState } from 'react'
import { consultores } from '@/json/consultores'


export default function Cadastro() {

    const [search, setSearch] = useState('')

    const filteredProfissoes = profissoes.filter((profissao) => profissao.toLowerCase().includes(search.toLowerCase()))


    return (
        <section className='cadastro-area'>
            <div className='cadastro-content'>

                <Image width={160} height={160} src={logo} alt='Logo Talents RH'></Image>
                <h2>Cadastro do Candidato</h2>

                <form>
                    <Input label="Nome" placeholder='Nome' type="text" name="nome" />
                    <Input label="Sobrenome" placeholder='Sobrenome' type="text" name="sobrenome" />
                    <Input label="Cidade" placeholder='Cidade' type="text" name="cidade" />
                    <Input label="Estado" placeholder='Estado' type="text" name="estado" />
                    <Input label="Email" placeholder='exemplo@dominio.com' type="email" name="email" />
                    <Input label="Celular Principal" placeholder='(11) 99999-9999' type="text" name="celular_1" onInput={useNumericInput} />
                    <Input label="Celular Alternativo" placeholder='(11) 99999-9999' type="text" name="celular_2" onInput={useNumericInput} />
                    <Input label="Data de Nascimento" type="date" name="data_nascimento" />
                    <Input label="Linkedin" placeholder='linkedin.com/in/usuario' type="text" name="linkedin" />
                    <Input label="Ultimo Cargo" placeholder='Ex: Desenvolvedor Front-End' type="text" name="ulitmo_cargo" />
                    <Input label="Ultimo Salario" placeholder='Ex: R$ 2000,00' type="text" name="ultimo_salario" onInput={useNumericInput} />
                    <Input label='Pretensão Salarial CLT' placeholder='Ex: R$ 2000,00' type='text' name='pretensao_salarial_clt' onInput={useNumericInput} />
                    <Input label='Pretensão Salarial PJ' placeholder='Ex: R$ 2000,00' type='text' name='pretensao_salarial_pj' onInput={useNumericInput} />
                    <Select key={filteredProfissoes.length} label="Posição Desejada" name='posicao_desejada' defaultValue="Selecione">
                        <option disabled value='Selecione'>Selecione</option>,
                        {...filteredProfissoes.map((profissao, index) => (
                            <option value={profissao} key={index}>{profissao}</option>
                        ))}
                    </Select>
                    <div className="checkboxes-content">
                        <h2>Escolaridade</h2>
                        <div className='checkboxes'>
                            <Input label="Ensino Medio" value="Ensino Medio" type="checkbox" name="escolaridade[]" />
                            <Input label="Ensino Superior" value="Ensino Superior" type="checkbox" name="escolaridade[]" />
                            <Input label="Pos-Graduação" value="Pos-Graduação" type="checkbox" name="escolaridade[]" />
                            <Input label="Outros" value="Outros" type="checkbox" name="escolaridade[]" />
                        </div>
                    </div>
                    <Input label="Graduação Principal" placeholder='Ex: Direito, Recursos Humanos' type="text" name="graduacao_principal" />
                    <Select label="Como nos conheceu?" name='como_conheceu' defaultValue="Selecione">
                        <option disabled value='Selecione'>Selecione</option>
                        <option value="Nossa consultora entrou em contato com você">Nossa consultora entrou em contato com você</option>
                        <option value="Anúncio da vaga">Anúncio da vaga</option>
                        <option value="Sites de Emprego">Sites de Emprego</option>
                        <option value="Ví a vaga no LinkedIn">Ví a vaga no LinkedIn</option>
                        <option value="Site da Talents RH">Site da Talents RH</option>
                        <option value="Consultoria Parceira">Consultoria Parceira</option>
                        <option value="Parceria Anhanguera">Parceria Anhanguera</option>
                        <option value="Parceria AMIG">Parceria AMIG</option>
                        <option value="Eventos">Eventos</option>
                        <option value="Família / Amigos">Família / Amigos</option>
                        <option value="Outros">Outros</option>
                    </Select>
                    <Select label="Nome do Consultor da Talents RH que fez Contato" name='consultor_talents' defaultValue="Selecione" >
                        <option disabled value='Selecione'>Selecione</option>
                        {consultores.map((consultor, index) => (
                            <option value={consultor} key={consultor}>{consultor}</option>
                        ))}
                    </Select>
                    <div className="checkboxes-content" >
                        <h2>Nivel de Ingles</h2>
                        <div className='checkboxes'>
                            <Input label="Basico" type="checkbox" value='Basico' name="nivel_ingles[]" />
                            <Input label="Intermediario" type="checkbox" value='Intermediario' name="nivel_ingles[]" />
                            <Input label="Avançado" type="checkbox" value='Avançado' name="nivel_ingles[]" />
                            <Input label="Fluente" type="checkbox" value='Fluente' name="nivel_ingles[]" />
                            <Input label="N/A" type="checkbox" value='N/A' name="nivel_ingles[]" />
                        </div>
                    </div>
                    <Input label='Descreva abaixo algumas palavras chaves que descrevem suas qualificações tecnicas' type='text' name='qualificacoes_tecnicas' />
                    <Input label='Descreva abaixo certificações importantes da sua area' type='text' name='certificacoes' />
                    <Input label="Anexe seu CV" type='file' name='cv' />
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