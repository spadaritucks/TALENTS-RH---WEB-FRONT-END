'use client'

import { useModal } from "@/components/modal/context"
import { Candidatos } from "@/models/candidatos"
import { Empresas } from "@/models/empresas"
import { Processos } from "@/models/processos"
import { Usuarios } from "@/models/usuarios"
import { Vagas } from "@/models/vagas"
import { useEffect, useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Button from "@/components/button/component"
import Link from "next/link"

interface CandidatoVagaProps {
    empresas: Empresas[]
    userEmpresas: Usuarios[]
    candidatos: Candidatos[]
    userCandidatos: Usuarios[]
    processos: Processos[]
    vagas: Vagas[]
}

export default function CandidatoVaga({
    empresas,
    userEmpresas,
    candidatos,
    userCandidatos,
    processos,
    vagas
}: CandidatoVagaProps) {

    const [id, setId] = useState<number | null>(null)
    const { showModal } = useModal()
    const candidatosProcessos = processos.filter(processo => processo.vaga_id === id)
    const vagasDados = vagas.find(vaga => vaga.id === id)

    useEffect(() => {
        if (typeof window !== 'undefined') { // Garante que só executa no cliente
            const searchParams = new URLSearchParams(window.location.search)
            const idString = searchParams.get('id')
            setId(idString ? parseInt(idString) : null)
        }
    }, [])

    return (
        <>
            <h1>Candidatos para a Vaga de {vagasDados?.titulo}</h1>
            <div className="candidatos-container">
                {candidatosProcessos.map((processo) => {
                    const candidato = candidatos.find(candidato => candidato.id === processo.candidato_id)
                    const candidatoDados = userCandidatos.find(user => user.id === candidato?.user_id)

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
                                        {candidatoDados && (
                                            <>
                                                <p> Celular 1: {candidatoDados.celular_1}</p>
                                                <p> Celular 2: {candidatoDados.celular_2}</p>
                                                <p> Data de Nascimento: {new Date(candidatoDados.data_nascimento).toLocaleDateString()}</p>
                                                <p> Linkedin : {candidatoDados.linkedin}</p>
                                            </>
                                        )}
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
                                        <DropdownMenuItem><Link href={`/headhunter/sendEmail?id=${candidatoDados?.id}`}>Enviar Email Personalizado</Link></DropdownMenuItem>
                                        <DropdownMenuItem>Enviar Email de Reprovação</DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>
                        </div>
                    )
                })}
            </div>


        </>
    )

}