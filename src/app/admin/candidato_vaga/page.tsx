'use client'
import { Suspense, useEffect, useState } from 'react'
import './page.scss'
import { getAllProcessos, ProcessosProps } from '@/api/processos/api'
import { getAllVagas, VagasProps } from '@/api/vagas/api'
import { CandidatosProps, EmpresaProps, getAllUsers, UserProps } from '@/api/users/api'
import Button from '@/components/button/component'
import { useModal } from '@/components/modal/context'
import { useSearchParams } from 'next/navigation'
import Main from '@/layouts/headhunter/layout'


export default function RenderCandidatoVaga () {

    return(
        <Suspense fallback={<div>Loading...</div>}>
            <CandidatoVaga/>
        </Suspense>
    )
}

 function CandidatoVaga() {
    const [processos, setProcessos] = useState<ProcessosProps[]>([])
    const [vagas, setVagas] = useState<VagasProps[]>([]) // Dados das Vagas criadas pelo headhunter
    const [candidatos, setCandidatos] = useState<CandidatosProps[]>([]) // Dados dos Candidatos
    const [users, setUsers] = useState<UserProps[]>([]) // Dados gerais de todos os usuarios
    const [empresa, setEmpresa] = useState<EmpresaProps[]>([]) // Dados da Empresa
    const { showModal, hideModal } = useModal()
    const searchParams = useSearchParams();
    const idString = searchParams.get('id');
    const id = parseInt(idString || '0');

    useEffect(() => {

        const fetchUsers = async () => {
            const response = await getAllUsers()
            if (response) {
                setUsers(response.data.users)
                setEmpresa(response.data.empresas)
                setCandidatos(response.data.candidatos)
            }
        }

        fetchUsers()
        const fetchProcessos = async () => {
            const response = await getAllProcessos()
            if (response) {
                setProcessos(response.data)
            }
        }
        fetchProcessos()

        const FetchVagas = async () => {
            const response = await getAllVagas()
            if (response) {
                setVagas(response.data)
            }
        }

        FetchVagas()
    }, [])

    

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
                                <p><strong>Curriculo :</strong> <a href={`${process.env.NEXT_PUBLIC_API_URL}/storage/${candidato?.cv}`} >Baixar Curriculo</a></p>
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
                                </div>


                            </div>
                        )
                    })}
                </div>
            </div>
        </Main>
    )
}