'use client'
import Main from '@/layouts/admin/layout'
import './page.scss'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Button from '@/components/button/component'
import { useEffect, useRef, useState } from 'react'
import { createProfissoes, deleteProfissoes, getProfissoes, ProfissoesProps, updateProfissoes } from '@/api/profissoes/api'
import { useModal } from '@/components/modal/context'
import Input from '@/components/input/component'
import Select from '@/components/select/component'
import { AtualizacoesProps, ChamadoProps, createAtualizacoes, getAtualizacoes, getChamados } from '@/api/chamados/api'
import { CandidatosProps, ConsultorAndAdminProps, createUser, deleteUser, EmpresaProps, getAllUsers, HeadHunterProps, updateUser, UserProps } from '@/api/users/api'
import { BarsChart } from '@/components/barchart/component'
import { AreaBarChart } from '@/components/radialchart/component'
import { LineCharts } from '@/components/linechart/component'
import useNumericInput from '@/hooks/NumericInput'



export default function Painel() {

    
    const [chamados, setChamados] = useState<ChamadoProps[]>([]);
    const [users, setUsers] = useState<UserProps[]>([]) // Dados gerais de todos os usuarios
    const [empresa, setEmpresa] = useState<EmpresaProps[]>([]) // Dados da Empresa
    const [atualizacoes, setAtualizacoes] = useState<AtualizacoesProps[]>([])
    const [headhunters, setHeadHunters] = useState<HeadHunterProps[]>([]); // Dados dos Head Hunters
    const [candidatos, setCandidatos] = useState<CandidatosProps[]>([]) // Dados dos Candidatos
    const [user, setUser] = useState<UserProps>() //Dados do Usuario Logado
    const [profissoes, setProfissoes] = useState<ProfissoesProps[]>([])
    const formRef = useRef<HTMLFormElement>(null)
    const { showModal, hideModal } = useModal()
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario

    //Requisições de dados

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

                //Consultar Dados de Profissoes
                const fetchProfissoes = async () => {
                    const response = await getProfissoes()
        
                    if (response) {
                        setProfissoes(response.data.profissoes)
                    }
                }
        
                fetchProfissoes()

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
    }, [])


    return (
        <Main>
            <section className='admin-area'>
                <h1>Painel do Admin</h1>
                <div className='dashboard-area'>
                    <BarsChart />
                    <LineCharts />
                    <AreaBarChart />
                </div>
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
                                                    window.location.href = `/admin/chamados?id=${chamado.id}`
                                                }} />
                                                <Button ButtonName='Atualizar Chamado' type='button' variant='primary' onClick={() => {
                                                   window.location.href = `/admin/atualizar_chamado?id=${chamado.id}`
                                                }} />

                                            </div>
                                        </TableCell>


                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>

                </div>

            </section>

        </Main>
    )
}