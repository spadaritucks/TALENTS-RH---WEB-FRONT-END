'use client'

import { useEffect, useState } from 'react'
import './page.scss'
import { getAllProcessos, ProcessosProps } from '@/api/processos/api'
import { getAllVagas, VagasProps } from '@/api/vagas/api'
import { CandidatosProps, EmpresaProps, getAllUsers, UserProps } from '@/api/users/api'
import Button from '@/components/button/component'
import { useModal } from '@/components/modal/context'
import Main from '@/layouts/admin/layout'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'


export default function CandidatoVaga() {
    const [processos, setProcessos] = useState<ProcessosProps[]>([])
    const [vagas, setVagas] = useState<VagasProps[]>([])
    const [candidatos, setCandidatos] = useState<CandidatosProps[]>([])
    const [users, setUsers] = useState<UserProps[]>([])
    const [empresa, setEmpresa] = useState<EmpresaProps[]>([])
    const { showModal } = useModal()

    // 🔥 Pega o ID da URL manualmente para evitar erro no SSR
    const [id, setId] = useState<number | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') { // Garante que só executa no cliente
            const searchParams = new URLSearchParams(window.location.search)
            const idString = searchParams.get('id')
            setId(idString ? parseInt(idString) : null)
        }
    }, [])

    useEffect(() => {
        fetchUsers()
        fetchProcessos()
        fetchVagas()
    }, [])

    const fetchUsers = async () => {
        const response = await getAllUsers()
        if (response) {
            setUsers(response.data.users)
            setEmpresa(response.data.empresas)
            setCandidatos(response.data.candidatos)
        }
    }

    const fetchProcessos = async () => {
        const response = await getAllProcessos()
        if (response) {
            setProcessos(response.data)
        }
    }

    const fetchVagas = async () => {
        const response = await getAllVagas()
        if (response) {
            setVagas(response.data)
        }
    }

    if (id === null) return <div>Carregando...</div> // 🔥 Evita renderização antes do ID ser definido

    const candidatosProcessos = processos.filter(processo => processo.vaga_id === id)
    const vagasDados = vagas.find(vaga => vaga.id === id)

    return (
        <Main>
            <div className='candidados-vaga'>
                <h1>Candidatos para a Vaga de {vagasDados?.titulo}</h1>
                <div className="candidatos-container">
                    {candidatosProcessos.map((processo) => {
                        const candidato = candidatos.find(candidato => candidato.id === processo.candidato_id)
                        const candidatoDados = users.find(user => user.id === candidato?.user_id)

                        return (
                            <div className="candidato" key={processo.id}>
                                <h2>{candidatoDados?.nome} {candidatoDados?.sobrenome}</h2>
                                <p><strong>Currículo :</strong> <a href={`${process.env.NEXT_PUBLIC_API_URL}/storage/${candidato?.cv}`} >Baixar Currículo</a></p>
                                <p><strong>Link Telefone: </strong><a href={`https://wa.me/${candidatoDados?.celular_1}`}>{candidatoDados?.celular_1}</a></p>
                                <p><strong>Pretensão Salarial(CLT): </strong>R$ {candidato?.pretensao_salarial_clt}</p>
                                <p><strong>Pretensão Salarial(PJ): </strong>R$ {candidato?.pretensao_salarial_pj}</p>
                                <div className='candidato-vaga-buttons'>
                                    <Button ButtonName="Dados" type="button" variant="primary" onClick={() => {
                                        showModal('Dados Pessoais', <div className="modal_dados">
                                            <p> Nome : {candidatoDados?.nome}</p>
                                            <p> Sobrenome: {candidatoDados?.sobrenome}</p>
                                            <p> Email : {candidatoDados?.email}</p>
                                            <p> Cidade : {candidatoDados?.cidade}</p>
                                            <p> Estado : {candidatoDados?.estado}</p>
                                            <p> Celular 1: {candidatoDados?.celular_1}</p>
                                            <p> Celular 2: {candidatoDados?.celular_2}</p>
                                            <p> Data de Nascimento: {candidatoDados?.data_nascimento}</p>
                                            <p> Linkedin : {candidatoDados?.linkedin}</p>
                                        </div>)
                                    }} />
                                    <Button ButtonName="Informações" type="button" variant="secondary" onClick={() => {
                                        showModal('Informações do Candidato', <div className="modal_dados">
                                            <p> Ultimo Cargo: {candidato?.ultimo_cargo}</p>
                                            <p> Ultimo Salario:  R$ {candidato?.ultimo_salario}</p>
                                            <p> Pretensao Salarial (CLT) :  R$ {candidato?.pretensao_salarial_clt}</p>
                                            <p> Pretensão Salarial (PJ) : R$ {candidato?.pretensao_salarial_pj}</p>
                                            <p> Posição Desejada  :{candidato?.posicao_desejada}</p>
                                            <p> Escolaridade : {candidato?.escolaridade}</p>
                                            <p> Graduação Principal : {candidato?.graduacao_principal}</p>
                                            <p> Como Conheceu: {candidato?.como_conheceu}</p>
                                            <p> Consultor da Talents: {candidato?.consultor_talents}</p>
                                            <p> Qualificações Tecnicas : {candidato?.qualificacoes_tecnicas}</p>
                                            <p> Cerficacações : {candidato?.certificacoes}</p>
                                        </div>)
                                    }} />
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className='border border-[#fd8409] cursor-pointer outline-none'>Ações</DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem><Link href = {`/admin/sendEmail?id=${candidatoDados?.id}`}>Enviar Email Personalizado</Link></DropdownMenuItem>
                                            <DropdownMenuItem>Enviar Email de Reprovação</DropdownMenuItem>
                                            
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Main>
    )
}
