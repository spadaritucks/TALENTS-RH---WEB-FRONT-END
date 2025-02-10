'use client'

import Main from "@/layouts/headhunter/layout"
import './page.scss'
import Link from "next/link"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useEffect, useRef, useState } from "react"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import TextArea from "@/components/textarea/component"
import useNumericInput from "@/hooks/NumericInput"
import { CandidatosProps, EmpresaProps, getAllUsers, HeadHunterProps, UserProps } from "@/api/users/api"
import { createVagas, deleteVagas, getAllVagas, updateVagas, VagasProps } from "@/api/vagas/api"
import { getProfissoes, ProfissoesProps } from "@/api/profissoes/api"
import { ChamadoProps, createAtualizacoes, getChamados } from "@/api/chamados/api"
import TagsInput from "@/components/tagsinput/component"
import { getAllProcessos, ProcessosProps } from "@/api/processos/api"





export default function Painel() {

    const { showModal, hideModal } = useModal();
    const formRef = useRef<HTMLFormElement>(null) //Buscar os dados do formulario
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario
    const [user, setUser] = useState<UserProps>() //Dados do Usuario Logado
    const [users, setUsers] = useState<UserProps[]>([]) // Dados gerais de todos os usuarios
    const [headhunters, setHeadHunters] = useState<HeadHunterProps[]>([]); // Dados dos Head Hunters
    const [candidatos, setCandidatos] = useState<CandidatosProps[]>([]) // Dados dos Candidatos
    const [vagas, setVagas] = useState<VagasProps[]>([]) // Dados das Vagas criadas pelo headhunter
    const [chamados, setChamados] = useState<ChamadoProps[]>([]);
    const [empresa, setEmpresa] = useState<EmpresaProps[]>([]) // Dados da Empresa
    const [profissoes, setProfissoes] = useState<ProfissoesProps[]>([])
    const [processos, setProcessos] = useState<ProcessosProps[]>([])

    //Requisição para os dados dos Usuarios
    const fetchUsers = async () => {
        const response = await getAllUsers()
        if (response) {
            setUsers(response.data.users)
            setHeadHunters(response.data.headhunters)
            setCandidatos(response.data.candidatos)
            setEmpresa(response.data.empresas)
        }
    }

    const fetchProfissoes = async () => {
        const response = await getProfissoes()
        if (response) {
            setProfissoes(response.data.profissoes)
        }
    }

    const FetchVagas = async () => {
        const response = await getAllVagas()
        if (response) {
            setVagas(response.data)
        }
    }

    const fetchChamados = async () => {
        const response = await getChamados()
        if (response) {
            setChamados(response.data.chamados)
        }
    }

    const fetchProcessos = async () => {
        const response = await getAllProcessos()
        if (response) {
            setProcessos(response.data.processos)
        }
    }
    useEffect(() => {
        fetchUsers()
        fetchProfissoes()
        FetchVagas()
        fetchChamados()
        fetchProcessos()
    }, [])


    //Consultar dados do usuario logado
    useEffect(() => {
        const userDados = sessionStorage.getItem('user')
        if (userDados) {
            setUser(JSON.parse(userDados))
        }


    }, []);





    return (
        <Main>

            <section className="headhunter-area" id="headhunter-area">
                <h1>Painel do Headhunter</h1>

                <div className='chamado-area'>
                    <h2>Lista de Chamados</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='table-head'>Id</TableHead>
                                <TableHead className='table-head' >Empresa</TableHead>
                                <TableHead className='table-head'>Profissional Desejado</TableHead>
                                <TableHead className='table-head'>Numero de Vagas</TableHead>
                                <TableHead className='table-head'>Data de Abertura</TableHead>
                                <TableHead className='table-head'>Status</TableHead>
                                <TableHead className='table-head'>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {chamados.map((chamado) => {
                                const empresaSelecionada = empresa.find(empresas => empresas.id == chamado.empresa_id)

                                const profissao = profissoes.find(profissao => profissao.id === chamado.profissao_id)

                                return (
                                    <TableRow key={chamado.id}>
                                        <TableCell>{chamado.id}</TableCell>
                                        <TableCell>{empresaSelecionada?.nome_fantasia}</TableCell>
                                        <TableCell>{profissao?.nome}</TableCell>
                                        <TableCell>{chamado.numero_vagas}</TableCell>
                                        <TableCell>{new Date(chamado.created_at).toLocaleDateString('pt-BR')}</TableCell>
                                        <TableCell>{chamado.status}</TableCell>
                                        <TableCell>
                                            <div className='table-buttons'>
                                                <Button ButtonName='Acompanhamento' type='button' variant='primary' onClick={() => {
                                                    window.location.href = `/headhunter/chamados?id=${chamado.id}`
                                                }} />
                                                <Button ButtonName='Atualizar Chamado' type='button' variant='primary' onClick={() => {
                                                    window.location.href = `/headhunter/atualizar_chamado?id=${chamado.id}`
                                                }} />


                                            </div>
                                        </TableCell>


                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>

                </div>


                <section className="candidado-search-area" id="candidado-search-area">
                    <h1>Gerenciamento de Candidatos</h1>
                    <div className="painel-candidatos">
                        <div className="painel-candidato-search">
                            <Input label="Pesquisar Pesquisar Candidato" type="text" />
                            <Select label="Filtrar por" name="filtros" defaultValue='selecione' >
                                <option value="selecione">Selecione</option>
                            </Select>
                            <Button ButtonName="Buscar Candidatos" variant="primary" type="button" />
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="table-head">Id</TableHead>
                                    <TableHead className="table-head">Nome</TableHead>
                                    <TableHead className="table-head">Telefone</TableHead>
                                    <TableHead className="table-head">Cargo Alvo</TableHead>
                                    <TableHead className="table-head">Pretensão Salarial (CLT)</TableHead>
                                    <TableHead className="table-head">Curriculo</TableHead>
                                    <TableHead className="table-head">Ações</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>


                                </TableRow>

                                {users.map((user) => {

                                    const candidato = candidatos.filter(candidato => candidato.user_id === user.id);
                                    return (
                                        candidato.map((candidato) => (
                                            <TableRow key={candidato.id}>
                                                <TableCell className="table-cell">{candidato.id}</TableCell>
                                                <TableCell className="table-cell">{user.nome}</TableCell>
                                                <TableCell className="table-cell"><Link href={`https://wa.me/${user.celular_1}`}><Button ButtonName="Telefone" type="button" variant="primary" /></Link></TableCell>
                                                <TableCell className="table-cell">{candidato.posicao_desejada}</TableCell>
                                                <TableCell> R$ {candidato.pretensao_salarial_clt}</TableCell>
                                                <TableCell><Link href={`${process.env.NEXT_PUBLIC_API_URL}/storage/${candidato.cv}`} target="blank">Baixar Curriculo</Link></TableCell>
                                                <TableCell className="table-cell">
                                                    <div className="table-actions">
                                                        <Button ButtonName="Dados Pessoais" type="button" variant="secondary" onClick={() => {
                                                            showModal('Dados Pessoais', <div className="modal_dados">
                                                                <p> Nome : {user.nome}</p>
                                                                <p> Sobrenome: {user.sobrenome}</p>
                                                                <p> Email : {user.email}</p>
                                                                <p> Cidade : {user.cidade}</p>
                                                                <p> Estado : {user.estado}</p>
                                                                <p> Celular 1: {user.celular_1}</p>
                                                                <p> Celular 2: {user.celular_2}</p>
                                                                <p> Data de Nascimento: {user.data_nascimento}</p>
                                                                <p> Linkedin : {user.linkedin}</p>
                                                            </div>)
                                                        }} />
                                                        <Button ButtonName="Informações" type="button" variant="secondary" onClick={() => {
                                                            showModal('Informações do Candidato', <div className="modal_dados">

                                                                <p> Ultimo Cargo: {candidato.ultimo_cargo}</p>
                                                                <p> Ultimo Salario:  R$ {candidato.ultimo_salario}</p>
                                                                <p> Pretensao Salarial (CLT) :  R$ {candidato.pretensao_salarial_clt}</p>
                                                                <p> Pretensão Salarial (PJ) : R$ {candidato.pretensao_salarial_pj}</p>
                                                                <p> Posição Desejada  :{candidato.posicao_desejada}</p>
                                                                <p> Escolaridade : {candidato.escolaridade}</p>
                                                                <p> Graduação Principal : {candidato.graduacao_principal}</p>
                                                                <p> Como Conheceu: {candidato.como_conheceu}</p>
                                                                <p> Consultor da Talents: {candidato.consultor_talents}</p>
                                                                <p> Qualificações Tecnicas : {candidato.qualificacoes_tecnicas}</p>
                                                                <p> Cerficacações : {candidato.certificacoes}</p>
                                                            </div>)
                                                        }} />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </section>
            </section>
        </Main>
    )



}



