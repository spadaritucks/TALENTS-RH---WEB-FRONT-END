'use client'

import Main from "@/layouts/empresa/layout"
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
import './page.scss'
import Select from "@/components/select/component"
import { useModal } from "@/components/modal/context"
import Input from "@/components/input/component"
import useNumericInput from "@/hooks/NumericInput"
import TextArea from "@/components/textarea/component"
import { useEffect, useRef, useState } from "react"
import { AtualizacoesProps, ChamadoProps, createAtualizacoes, createChamados, getAtualizacoes, getChamados } from "@/api/chamados/api"
import { CandidatosProps, EmpresaProps, getAllUsers, HeadHunterProps, UserProps } from "@/api/users/api"
import { getProfissoes, ProfissoesProps } from "@/api/profissoes/api"
import Image from "next/image"
import Link from "next/link"




export default function Painel() {

    const { showModal } = useModal()
    const [chamados, setChamados] = useState<ChamadoProps[]>([]);
    const [atualizacoes, setAtualizacoes] = useState<AtualizacoesProps[]>([])
    const [user, setUser] = useState<UserProps>() //Dados do Usuario Logado
    const [users, setUsers] = useState<UserProps[]>([]) // Dados gerais de todos os usuarios
    const [headhunters, setHeadHunters] = useState<HeadHunterProps[]>([]); // Dados dos Head Hunters
    const [candidatos, setCandidatos] = useState<CandidatosProps[]>([]) // Dados dos Candidatos
    const [empresa, setEmpresa] = useState<EmpresaProps[]>([]) // Dados da Empresa
    const [cargos, setCargos] = useState<ProfissoesProps[]>([]) // Dados dos Cargos
    const [profissoes, setProfissoes] = useState<ProfissoesProps[]>([]) // Dados das Profissoes
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;
    const formRef = useRef<HTMLFormElement>(null)



    //Consultar dados do usuario logado
    useEffect(() => {

        const userDados = sessionStorage.getItem('user')
        if (userDados) {
            setUser(JSON.parse(userDados))
        }


    }, []);

    useEffect(() => {
        const fetchChamados = async () => {
            const response = await getChamados()
            if (response) {
                setChamados(response.data.chamados)
            }
        }

        fetchChamados()

        const fetchUsers = async () => {
            const response = await getAllUsers()
            if (response) {
                setUsers(response.data.users)
                setHeadHunters(response.data.headhunters)
                setCandidatos(response.data.candidatos)
                setEmpresa(response.data.empresas)
            }
        }

        fetchUsers()

        const fetchAtualizacoes = async () => {
            const response = await getAtualizacoes()
            if (response) {
                setAtualizacoes(response.data.atualizacoes)
            }
        }

        fetchAtualizacoes()

        const fetchCargos = async () => {

            const response = await getProfissoes()
            if (response) {
                setCargos(response.data.profissoes)
            }
        }

        fetchCargos()

        //Consultar Dados de Profissoes
        const fetchProfissoes = async () => {
            const response = await getProfissoes()

            if (response) {
                setProfissoes(response.data.profissoes)
            }
        }

        fetchProfissoes()


    }, [])


    const handleChamadosSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (formRef.current) {
            const formdata = new FormData(formRef.current)
            const id = empresaSelecionada?.id
            if (id) {
                formdata.append('empresa_id', id?.toString());
            }

            const data = await createChamados(formdata)

            if (data) {
                console.log(data)
                if (data.status === false) {
                    alert(data.message)
                } else {
                    alert('Chamado Criado com sucesso!')

                }
            }
        }

    }

    const handleAtualizarChamados = async (e: React.FormEvent<HTMLFormElement>, idChamado: number, idUsuario:number | undefined ) => {
        e.preventDefault()

        if (formRef.current) {
            const formdata = new FormData(formRef.current)
            formdata.append('user_id', idUsuario?.toString() || '')
            formdata.append('chamados_id', idChamado.toString());
            if (idChamado && idUsuario) {
                const data = await createAtualizacoes(formdata)

                if (data) {
                    if (data.status === false) {
                        alert("Erro, " + data.message)
                    } else {
                        alert("Sucesso, " + data.message)
                    }
                }
            }

        }
    }

    //Filtrações dos Chamados de acordo com a empresa logada
    const empresaSelecionada = empresa.find(empresas => empresas.user_id == user?.id)
    const chamadoEmpresa = chamados.filter(chamado => chamado.empresa_id == empresaSelecionada?.id)





    return (
        <Main>
            <section className='empresa-area'>
                <h1>Painel do Cliente</h1>
                <div className='chamado-area'>
                    <h2>Lista de Chamados</h2>
                    <div className="chamados-buttons">
                        <Button ButtonName="Criar Chamado" type="button" variant="primary" onClick={() => {
                            showModal('Criar Chamado',
                                <form className="chamado-form" onSubmit={handleChamadosSubmit} ref={formRef}>
                                    <Select label="Profissional Desejado" defaultValue="selecione" name="profissao_id" >
                                        <option value='selecione'>Selecione</option>
                                        {
                                            cargos.map(cargo => (
                                                <option value={cargo.id}>{cargo.nome}</option>
                                            ))
                                        }
                                    </Select>
                                    <Input label="Numero de Vagas" type="text" onInput={useNumericInput} name="numero_vagas" />
                                    <TextArea label="Descrição do Chamado" name="descricao" />
                                    <Input label="Anexo (Opcional)" type="file" name="anexo" />
                                    <Button ButtonName="Criar Chamado" type="submit" variant="primary" />
                                </form>)
                        }} />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='table-head'>Id</TableHead>
                                <TableHead className='table-head'>Profissional Desejado</TableHead>
                                <TableHead className='table-head'>Numero de Vagas</TableHead>
                                <TableHead className='table-head'>Data de Abertura</TableHead>
                                <TableHead className='table-head'>Status</TableHead>
                                <TableHead className='table-head'>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                chamadoEmpresa.map(chamado => {

                                    const profissao = profissoes.find(profissao => profissao.id === chamado.profissao_id )
                                    return (
                                        <TableRow key={chamado.id}>
                                            <TableCell>{chamado.id}</TableCell>
                                            <TableCell>{profissao?.nome}</TableCell>
                                            <TableCell>{chamado.numero_vagas}</TableCell>
                                            <TableCell>{new Date(chamado.created_at).toLocaleDateString('pt-BR')}</TableCell>
                                            <TableCell>{chamado.status}</TableCell>
                                            <TableCell>
                                                <div className='table-buttons'>
                                                    <Button ButtonName='Acompanhamento' type='button' variant='primary' onClick={() => {
                                                        window.location.href = `/empresa/chamados?id=${chamado.id}`
                                                    }} />
                                                    <Button ButtonName='Atualizar Chamado' type='button' variant='primary' onClick={() => {
                                                        showModal('Atualizar Chamado',
                                                            <form className='chamado-form' ref={formRef} onSubmit={(e) => handleAtualizarChamados(e, chamado.id, user?.id)}>
                                                                <Input label='Titulo' type='text' name='titulo' />
                                                                <Input label='Descrição' type='text' name='atualizacoes' />
                                                                <Input label='Anexo' type='file' name='anexo' />
                                                                <Button ButtonName='Enviar' type='submit' variant='primary' />
                                                            </form>
                                                        )
                                                    }} />

                                                </div>
                                            </TableCell>


                                        </TableRow>

                                    )
                                })
                            }


                        </TableBody>
                    </Table>

                </div>

            </section>
        </Main>
    )
}
