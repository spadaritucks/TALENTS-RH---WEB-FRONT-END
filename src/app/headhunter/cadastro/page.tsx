'use client'

import './page.scss'
import Image from "next/image"
import logo from '@/../public/logo.png'
import Input from "@/components/input/component"
import useNumericInput from "@/hooks/NumericInput"
import Select from "@/components/select/component"
import Button from "@/components/button/component"
import { useState } from 'react'
import TextArea from '@/components/textarea/component'


export default function Cadastro() {

    const [search, setSearch] = useState('')




    return (
        <section className='cadastro-area'>
            <div className='cadastro-content'>

                <Image width={160} height={160} src={logo} alt='Logo Talents RH'></Image>
                <h2>Cadastro do Headhunter</h2>

                <form>
                    <Input label="Nome" placeholder='Nome' type="text" name="nome" />
                    <Input label="Sobrenome" placeholder='Sobrenome' type="text" name="sobrenome" />
                    <Input label="Cidade" placeholder='Cidade' type="text" name="cidade" />
                    <Input label="Estado" placeholder='Estado' type="text" name="estado" />
                    <Input label="Email" placeholder='exemplo@dominio.com' type="email" name="email" />
                    <Input label="Celular Principal" placeholder='(11) 99999-9999' type="text" name="celular_1" onInput={useNumericInput} />
                    <div className="checkboxes-content">
                        <h2>Como nos conheceu?</h2>
                        <div className='checkboxes'>
                            <Input label="Internet" value="internet" type="checkbox" name="como_conheceu[]" />
                            <Input label="Sites de emprego" value="sites_de_emprego" type="checkbox" name="como_conheceu[]" />
                            <Input label="Instagram" value="instagram" type="checkbox" name="como_conheceu[]" />
                            <Input label="WhatsApp" value="whatsapp" type="checkbox" name="como_conheceu[]" />
                            <Input label="Nosso Site" value="nosso_site" type="checkbox" name="como_conheceu[]" />
                            <Input label="Facebook" value="facebook" type="checkbox" name="como_conheceu[]" />
                            <Input label="Linkedin" value="linkedin" type="checkbox" name="como_conheceu[]" />
                            <Input label="Outros" value="outros" type="checkbox" name="como_conheceu[]" />
                        </div>
                    </div>
                    <div className="checkboxes-content">
                        <h2>Qual é a sua Situação?</h2>
                        <div className='checkboxes'>
                            <Input label="Não estou trabalhando" value="nao_trabalhando" type="checkbox" name="situacao[]" />
                            <Input label="Tenho a minha própria empresa" value="minha_propria_empresa" type="checkbox" name="situacao[]" />
                            <Input label="Instagram" value="instagram" type="checkbox" name="situacao[]" />
                            <Input label="WhatsApp" value="whatsapp" type="checkbox" name="situacao[]" />
                            <Input label="Nosso Site" value="nosso_site" type="checkbox" name="situacao[]" />
                            <Input label="Facebook" value="facebook" type="checkbox" name="situacao[]" />
                            <Input label="Linkedin" value="linkedin" type="checkbox" name="situacao[]" />
                            <Input label="Outros" type="checkbox" name="situacao[]" />
                        </div>
                    </div>

                    <div className='textarea-content'>
                        <TextArea label='Descreva 03 habilidades comportamentais do seu perfil' rows={5} cols={30} name='comportamento_description' />
                    </div>
                    <div className="checkboxes-content">
                        <h2>Há quantos anos você trabalha com R&S? </h2>
                        <div className='checkboxes'>
                            <Input label="01 à  03 anos" type="checkbox" value="01_03" name="anos_trabalho[]" />
                            <Input label="04 à  06 anos" type="checkbox" value="04_06" name="anos_trabalho[]" />
                            <Input label="07 à  10 anos" type="checkbox" value="07_10" name="anos_trabalho[]" />
                            <Input label="mais de 10 anos" type="checkbox" value="mais_10" name="anos_trabalho[]" />
                        </div>
                    </div>
                    <div className="checkboxes-content">
                        <h2>Com base em sua experiência, quantas vagas você acredita conseguir trabalhar ao mesmo tempo ? </h2>
                        <div className='checkboxes'>
                            <Input label="01" type="checkbox" value="01" name="quantia_vagas[]" />
                            <Input label="entre 02 e 04" type="checkbox" value="02_04" name="quantia_vagas[]" />
                            <Input label="entre 05 e 10" type="checkbox" value="05_10" name="quantia_vagas[]" />
                            <Input label="mais de 10" type="checkbox" value="mais_10" name="quantia_vagas[]" />

                        </div>
                    </div>
                    <div className="checkboxes-content">
                        <h2>Quantas horas diárias você pode dedicar ao processo de R&S ? </h2>
                        <div className='checkboxes'>
                            <Input label="Até 2 horas" type="checkbox" value="ate_2" name="horas_diarias[]" />
                            <Input label="Até 4 horas" type="checkbox" value="ate_4" name="horas_diarias[]" />
                            <Input label="Meio Periodo" type="checkbox" value="meio_periodo" name="horas_diarias[]" />
                            <Input label="Dia inteiro" type="checkbox" value="dia_inteiro" name="horas_diarias[]" />

                        </div>
                    </div>
                    <div className="checkboxes-content">
                        <h2>Quantos dias da semana você pode dedicar para a Talents RH? </h2>
                        <div className='checkboxes'>
                            <Input label="01 dia" type="checkbox" value="01" name="dias_semanais[]" />
                            <Input label="03 dias" type="checkbox" value="03" name="dias_semanais[]" />
                            <Input label="05 dias" type="checkbox" value="05" name="dias_semanais[]" />
                            <Input label="07 dias" type="checkbox" value="07" name="dias_semanais[]" />
                            <Input label="Apenas Finais de Semana" type="checkbox" value="finais_semana" name="dias_semanais[]" />

                        </div>
                    </div>
                    <div className="checkboxes-content">
                        <h2>Tem experiência em vagas de qual nível de senioridade? </h2>
                        <div className='checkboxes'>
                            <Input label="Níveis Operacionais" type="checkbox" value="niveis_operacionais" name="nivel_senioridade[]" />
                            <Input label="Especialistas (Assistentes, Analistas, outros)" type="checkbox" value="especialistas" name="nivel_senioridade[]" />
                            <Input label="Média Gestão" type="checkbox" value="media_gestao" name="nivel_senioridade[]" />
                            <Input label="Gerência e Diretoria" type="checkbox" value="ger_diretoria" name="nivel_senioridade[]" />
                            <Input label="Todos os níveis" type="checkbox" value="todos_niveis" name="nivel_senioridade[]" />
                        </div>
                    </div>
                    <div className="checkboxes-content">
                        <h2>É especialista em algum segmento específico para triagem e recrutamento? </h2>
                        <div className='checkboxes'>
                            <Input label="Agronegócios / Agricultura / Pecuária / Veterinária" value="agronegocios" type="checkbox" name="segmento[]" />
                            <Input label="Bancos e Financeiro" value="bancos_financeiro" type="checkbox" name="segmento[]" />
                            <Input label="Educação" value="educacao" type="checkbox" name="segmento[]" />
                            <Input label="Engenharia" value="engenharia" type="checkbox" name="segmento[]" />
                            <Input label="Jurídica" value="juridica" type="checkbox" name="segmento[]" />
                            <Input label="Arquitetura / Decoração e Urbanismo" value="arquitetura" type="checkbox" name="segmento[]" />
                            <Input label="Indústria / Manufatura e Produção" value="industria" type="checkbox" name="segmento[]" />
                            <Input label="Transporte / Logística e Distribuição" value="transporte" type="checkbox" name="segmento[]" />
                            <Input label="Saúde / Química e Farmacêutica" value="saude" type="checkbox" name="segmento[]" />
                            <Input label="Estética / Moda e Beleza" value="estetica" type="checkbox" name="segmento[]" />
                            <Input label="TI" value="ti" type="checkbox" name="segmento[]" />
                            <Input label="Outros" value="outros" type="checkbox" name="segmento[]" />
                        </div>
                    </div>

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