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
    const [consultores, setConsultores] = useState<ConsultorAndAdminProps[]>([]) // Dados dos Consultores
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
                setConsultores(response.data.consultores)

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






    const handleConsutoresSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (formRef.current) {
            const formdata = new FormData(formRef.current)
            formdata.append('tipo_usuario', 'consultor')

            const data = await createUser(formdata)

            if (data) {
                if (data.status === false) {
                    if(typeof data.message === 'object' ){
                        setFormErrors(data.message)
                        showModal("Erro ", <p>Preencha os Campos Necessarios</p> )
                    }else{
                        showModal("Erro ", <p>{data.message}</p> )
                    }
                } else {
                    showModal("Sucesso ", <p>Consultor cadastrado com sucesso</p> )

                }
            }
        }

    }

    const handleUpdateConsultoresSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (formRef.current) {
            const formdata = new FormData(formRef.current)
            const id = formdata.get('user_id')?.toString();

            if (id) {
                const data = await updateUser(parseInt(id), formdata)

                if (data) {
                    if (data.status === false) {
                        if(typeof data.message === 'object' ){
                            setFormErrors(data.message)
                            showModal("Erro ", <p>Preencha os Campos Necessarios</p> )
                        }else{
                            showModal("Erro ", <p>{data.message}</p> )
                        }
                    } else {
                        showModal("Sucesso ", <p>Consultor atualizado com sucesso</p> )
    
                    }
                }
            }



        }

    }

    const handleDeleteConsultoresSubmit = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        showModal('Tem certeza que deseja excluir esse Consultor?',
            <div className="div-excluir">
                <Button ButtonName="Sim" type="button" variant="primary" onClick={async () => {
                    const response = await deleteUser(id);
                    if (response) {
                        if (response.status === false) {
                            showModal("Erro ", <p>{response?.data.message}</p> )
                            
                        } else {
                            showModal("Sucesso ", <p>Consultor excluido com sucesso</p> )
                        }
                    }
                }} />
                <Button ButtonName="Não" type="button" variant="secondary" onClick={hideModal} />
            </div>
        )
    }

    const handleAtualizarChamados = async (e: React.FormEvent<HTMLFormElement>, idChamado: number, idUsuario: number | undefined) => {
        e.preventDefault()

        if (formRef.current) {
            const formdata = new FormData(formRef.current)
            formdata.append('user_id', idUsuario?.toString() || '')
            formdata.append('chamados_id', idChamado.toString());
            if (idChamado && idUsuario) {
                const data = await createAtualizacoes(formdata)

                if (data) {
                    if (data.status === false) {
                        if(typeof data.message === 'object' ){
                            setFormErrors(data.message)
                            showModal("Erro ", <p>Preencha os Campos Necessarios</p> )
                        }else{
                            showModal("Erro ", <p>{data.message}</p> )
                        }
                    } else {
                        showModal("Sucesso ", <p>Chamado Atualizado com Sucesso</p> )
    
                    }
                }
            }

        }
    }


    //Filtrar consultores
    const consultoresFiltrados = users.filter(user => user.tipo_usuario === 'consultor')

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
                            })}
                        </TableBody>
                    </Table>

                </div>

                <div className='operations-area'>
   
                    <div className='profissoes-area'>
                        <h2>Consultores</h2>
                        <div className='profissoes-buttons'>
                            <Button ButtonName='Cadastrar' type='button' variant='primary' onClick={() => {
                                showModal('Cadastro do Consultor',
                                    <form className='consultor-form' ref={formRef} onSubmit={handleConsutoresSubmit}>
                                        <Input label="Nome" placeholder='Nome' type="text" name="nome" />
                                        <Input label="Sobrenome" placeholder='Sobrenome' type="text" name="sobrenome" />
                                        <Input label="Cidade" placeholder='Cidade' type="text" name="cidade" />
                                        <Input label="Estado" placeholder='Estado' type="text" name="estado" />
                                        <Input label="Email" placeholder='exemplo@dominio.com' type="email" name="email" />
                                        <Input label="Celular Principal" placeholder='(11) 99999-9999' type="text" name="celular_1" onInput={useNumericInput} />
                                        <Input label="Celular Alternativo" placeholder='(11) 99999-9999' type="text" name="celular_2" onInput={useNumericInput} />
                                        <Input label="Data de Nascimento" type="date" name="data_nascimento" />
                                        <Input label="Linkedin" placeholder='linkedin.com/in/usuario' type="text" name="linkedin" />
                                        <Input label="Cargo" type="text" name=" cargo" />
                                        <Input label='Atividades' type='text' name='atividades' />
                                        <Input label="Curriculo" type="file" name="cv" />
                                        <div className='button-submit-grid' style={{ gridColumn: '1 /-1' }}>
                                            <Button ButtonName='Enviar' variant='primary' type='submit' />
                                        </div>
                                    </form>)
                            }} />
                            <Button ButtonName='Editar' type='button' variant='secondary' onClick={() => {
                                showModal('Editar Consultor',
                                    <form className='profissao-form' ref={formRef} onSubmit={handleUpdateConsultoresSubmit}>
                                        <Select label='Selecione as Consultor' name='user_id' defaultValue='selecione'>
                                            <option value='selecione'>Selecione</option>

                                        </Select>
                                        <Input label="Nome" placeholder='Nome' type="text" name="nome" />
                                        <Input label="Sobrenome" placeholder='Sobrenome' type="text" name="sobrenome" />
                                        <Input label="Cidade" placeholder='Cidade' type="text" name="cidade" />
                                        <Input label="Estado" placeholder='Estado' type="text" name="estado" />
                                        <Input label="Email" placeholder='exemplo@dominio.com' type="email" name="email" />
                                        <Input label="Celular Principal" placeholder='(11) 99999-9999' type="text" name="celular_1" onInput={useNumericInput} />
                                        <Input label="Celular Alternativo" placeholder='(11) 99999-9999' type="text" name="celular_2" onInput={useNumericInput} />
                                        <Input label="Data de Nascimento" type="date" name="data_nascimento" />
                                        <Input label="Linkedin" placeholder='linkedin.com/in/usuario' type="text" name="linkedin" />
                                        <Input label="cargo" type="text" name=" cargo" />
                                        <Input label="Curriculo" type="file" name="cv" />

                                        <Button ButtonName='Enviar' variant='primary' type='submit' />
                                    </form>)
                            }} />
                        </div>
                        <div className='profissoes-list'>
                            {consultoresFiltrados.map((consultor) => (
                                <div className='div-line' key={consultor.id}>
                                    <p>{consultor.nome} {consultor.sobrenome}</p>
                                    <Button ButtonName='Excluir' type='button' variant='primary' onClick={(e) => handleDeleteConsultoresSubmit(e, consultor.id)} />
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </Main>
    )
}