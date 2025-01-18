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
    const [descricaoVaga, setDescricaoVaga] = useState<boolean>(false);
    const [criarVaga, setCriarVaga] = useState<boolean>(false);
    const { showModal, hideModal } = useModal();
    const formRef = useRef<HTMLFormElement>(null) //Buscar os dados do formulario
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario
    const modalOpened = descricaoVaga || criarVaga
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
    useEffect(() => {

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

        const fetchProfissoes = async () => {
            const response = await getProfissoes()
            if (response) {
                setProfissoes(response.data.profissoes)
            }
        }
        fetchProfissoes()

        const FetchVagas = async () => {
            const response = await getAllVagas()
            if (response) {
                setVagas(response.data)
            }
        }

        FetchVagas()

        const fetchChamados = async () => {
            const response = await getChamados()
            if (response) {
                setChamados(response.data.chamados)
            }
        }
        fetchChamados()

        const fetchProcessos = async () => {
            const response = await getAllProcessos()
            if (response) {
                setProcessos(response.data.processos)
            }
        }
        fetchProcessos()


    }, [])


    //Consultar dados do usuario logado
    useEffect(() => {
        const userDados = sessionStorage.getItem('user')
        if (userDados) {
            setUser(JSON.parse(userDados))
        }


    }, []);





    const handleAtualizarChamados = async (e: React.FormEvent<HTMLFormElement>, idChamado: number, idUsuario:number | undefined) => {
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



    const handleDeleteVagasSubmit = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        showModal('Tem certeza que deseja excluir essa Vaga?',
            <div className="div-excluir">
                <Button ButtonName="Sim" type="button" variant="primary" onClick={async () => {
                    const response = await deleteVagas(id);
                    if (response) {
                        if (response.status === false) {
                            alert('Erro' + response?.data.message)
                        } else {
                            alert('Vaga excluida com sucesso')
                        }
                    }
                }} />
                <Button ButtonName="Não" type="button" variant="secondary" onClick={hideModal} />
            </div>
        )
    }


    //Exibição da Janela Modal de Criar Vaga de Emprego
    const handleCriarVaga = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCriarVaga(!criarVaga);
        showModal('Criar Vaga de Emprego', <CriarVagaForm />);
    }


    //Filtração das Vagas de acordo com o recrutador logado
    const headhunter = headhunters.find(headhunter => headhunter.user_id === user?.id);
    const headhunterVagas = vagas.filter(vaga => vaga.headhunter_id === headhunter?.id)

    


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
                                const profissao = profissoes.find(profissao => profissao.id === chamado.profissao_id )

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

                <div className="vagas-area">
                    <h1>Minhas Vagas</h1>
                    <div className="search-vagas">
                        <div className="busca-localizacao-div">
                            <Input label="Buscar" type="text" name="buscar" />
                            <Input label="Localização" type="text" name="localização" />
                            <Button ButtonName="Buscar " variant="primary" type="button" />
                        </div>
                        <div className="filtracao-div">
                            <Select label="Salario" defaultValue="selecione" name="salario">
                                <option value="selecione">Salario</option>
                            </Select>
                            <Select label="Distancia (Km)" defaultValue="selecione" name="distancia">
                                <option value="selecione">Distancia</option>
                            </Select>
                            <Select label="Modalidade" defaultValue="selecione" name="modalidade">
                                <option value="selecione">Modalidade</option>
                            </Select>
                            <Select label="Nivel de Senoriedade" defaultValue="selecione" name="nivel_senoriedade">
                                <option value="selecione">Nivel de Senoridade</option>
                            </Select>
                        </div>

                    </div>
                    <div className="vagas-container">
                        <Button ButtonName="Criar Vaga" variant="primary" type="button" onClick={handleCriarVaga} />
                        {headhunterVagas.map((vaga) => {

                            const headhunterId = headhunters.find(headhunter => headhunter.id === vaga.headhunter_id)
                            const headhunterUser = users.find(user => user.id === headhunterId?.user_id)

                            //Filtração para o Endereço da Empresa da vaga
                            const vagaEmpresa = empresa.find(vagaEmpresa => vagaEmpresa.id === vaga.empresa_id);
                            const userEmpresa = users.find(user => user.id == vagaEmpresa?.user_id);
                            

                            return (
                                <div key={vaga.id} className="vaga-card">
                                    <div className="vaga-informations">
                                        <h2>{vaga.titulo}</h2>
                                        <h3>{vagaEmpresa?.nome_fantasia}</h3>
                                        <p><strong>Responsavel: </strong>{headhunterUser?.nome} {headhunterUser?.sobrenome}</p>
                                        <p><strong>Região: </strong>{userEmpresa?.cidade} - {userEmpresa?.estado}</p>
                                        <p><strong>Nivel :</strong> {vaga.nivel_senioridade}</p>
                                        {vaga.tipo_salario === "valor" ? <p><strong>Salario: </strong> De R${vaga.salario_minimo} até R${vaga.salario_maximo}</p> : <p><strong>Salario: </strong>{vaga.tipo_salario}</p>}
                                        <p><strong>Publicada em:</strong> {new Date(vaga.created_at).toLocaleDateString('pt-BR')}</p>
                                        <p><strong>Requisitos: </strong>{Array.isArray(vaga.competencias) ? vaga.competencias.join(', ') : vaga.competencias}</p>
                                        <Button ButtonName="Exibir Descrição da Vaga" type="button" variant="secondary" onClick={() => {
                                            showModal("Descrição da Vaga",
                                                <p>{vaga.descricao}</p>
                                            )
                                        }} />
                                        <Button ButtonName="Ver Candidatos" type="button" variant="primary" onClick={()=>{
                                            window.location.href = `/headhunter/candidato_vaga?id=${vaga.id}`
                                        }} />
                                    </div>
                                    <div className="vaga-actions">
                                        <Button ButtonName="Editar Vaga" type="button" variant="secondary" onClick={() => {
                                            showModal('Editar Vaga', <EditarVagaForm id={vaga.id} />)
                                        }} />
                                        <Button ButtonName="Excluir Vaga" type="button" variant="primary" onClick={(e) => { handleDeleteVagasSubmit(e, vaga.id) }} />
                                    </div>



                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

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
        </Main>
    )

}



//Formulario de Criação de Vaga de Emprego
const CriarVagaForm = () => {

    const [isSalario, setIsSalario] = useState<boolean>(false);
    const [profissoes, setProfissoes] = useState<ProfissoesProps[]>([])
    const [competencias, setCompetencias] = useState<string[]>([]);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario
    const [headhunters, setHeadHunters] = useState<HeadHunterProps[]>([]); // Dados dos Head Hunters
    const [user, setUser] = useState<UserProps>() //Dados do Usuario Logado
    const formRef = useRef<HTMLFormElement>(null) //Buscar os dados do formulario
    const [empresa, setEmpresa] = useState<EmpresaProps[]>([]) // Dados da Empresa
    useEffect(() => {
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
                setHeadHunters(response.data.headhunters)
                setEmpresa(response.data.empresas)
            }    
        }

        fetchUsers()
    }, [])
  
    //Consultar dados do usuario logado
    useEffect(() => {
        const userDados = sessionStorage.getItem('user')
        if (userDados) {
            setUser(JSON.parse(userDados))
        }


    }, []);


    //Função onChange para Exibição Condicional do Input do Valor do Salario
    const handleInputSalario = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const value = e.currentTarget.value
        value === "valor" ? setIsSalario(true) : setIsSalario(false)
    }

    const handleCompetenciasChange = (tags: string[]) => {

        setCompetencias(tags);
    };


    //Função para submeter o formulario de criação de vaga
    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Buscar id do Headhunters
        const headhunter = headhunters.find(headhunter => headhunter.user_id === user?.id)
        const id = headhunter?.id
        console.log(id)
        console.log(competencias)


        if (id) {
            if (formRef.current) {
                const formdata = new FormData(formRef.current);
                formdata.append('competencias', competencias.join(','))
                formdata.append('headhunter_id', id.toString())


                formdata.get('salario') === 'valor' ? formdata.delete('salario') : ''


                const data = await createVagas(formdata);
                if (data) {

                    if (data.status === false) {
                        if (typeof data.message === 'object') {
                            setFormErrors(data.message)
                        } else {
                            alert(data.message)
                        }
                    } else {
                        alert('Vaga criada com sucesso!')

                    }
                } else {
                    alert('Erro ao submeter o formulario')
                }


            }
        }


    }



    return (
        <form className="criar-vaga-form" onSubmit={HandleSubmit} ref={formRef}>
            <Select label="Selecione a Profissão" defaultValue="selecione" name="profissao_id">
                <option value="selecione">Selecione</option>
                {
                    profissoes.map((profissao) => (
                        <option value={profissao.id}>{profissao.nome}</option>
                    ))

                }
            </Select>
            <Select label="Selecione a Profissão" defaultValue="selecione" name="empresa_id">
                <option value="selecione">Selecione</option>
                {
                    empresa.map((empresa) => (
                        <option value={empresa.id}>{empresa.nome_fantasia}</option>
                    ))

                }
            </Select>
            <Input label="Nome da Vaga" type="text" name="titulo" />
            <div className="textarea-container" style={{ gridColumn: '1/-1' }}>
                <TextArea label="Descrição da Vaga" name="descricao" rows={5} cols={30} placeholder="Requisitos, Diferenciais, Atividades" />
            </div>
            <div className="palavras-chaves" style={{ gridColumn: '1/-1' }}>
                <h2>Competencias</h2>
                <TagsInput label="Digite as Palavras Chaves" value={competencias} onChange={handleCompetenciasChange} inputProps={{ placeholder: 'Adicionar competência' }} />

            </div>

            <Select label="Salario Estipulado" defaultValue="selecione" name="tipo_salario" onChange={(e) => handleInputSalario(e)}>
                <option value="selecione">Selecione</option>
                <option value="A combinar">A combinar</option>
                <option value="valor">Estipular valor</option>
            </Select>

            <Select label="Selecione a Senioridade" defaultValue="selecione" name="nivel_senioridade">
                <option value="selecione">Selecione</option>
                <option value="estagio">Estagio</option>
                <option value="junior">Junior</option>
                <option value="pleno">Pleno</option>
                <option value="senior">Senior</option>
                <option value="lider_tecnico">Lider Tecnico</option>
            </Select>

            <div className="salario-inputs" style={{ gridColumn: '1/-1' }}>
                {isSalario ? <Input disabled={!isSalario} label="Salario Minimo" type="text" onInput={useNumericInput} name="salario_minimo" placeholder="R$ 2000,00" /> : ''}
                {isSalario ? <Input disabled={!isSalario} label="Salario Maximo" type="text" onInput={useNumericInput} name="salario_maximo" placeholder="R$ 4000,00" /> : ''}
            </div>


            <Select label="Status da Vaga" defaultValue="selecione" name="status">
                <option value="selecione">Selecione</option>
                <option value="Ativo">Ativo</option>
                <option value="Suspensa">Suspensa</option>
                <option value="Finalizada">Finalizada</option>
            </Select>
            <Input label="Data de Fechamento" type="date" name="data_final" />


            <div className="button-submit" style={{ gridColumn: '1/-1' }}>
                <Button ButtonName="Criar Vaga" type="submit" variant="primary" />
            </div>
        </form>
    )
}


interface EditarVagaProps {
    id: number
}

//Formulario de Criação de Vaga de Emprego
const EditarVagaForm = ({ id }: EditarVagaProps) => {

    const [isSalario, setIsSalario] = useState<boolean>(false);
    const [profissoes, setProfissoes] = useState<ProfissoesProps[]>([])
    const [competencias, setCompetencias] = useState<string[]>([]);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario
    const [headhunters, setHeadHunters] = useState<HeadHunterProps[]>([]); // Dados dos Head Hunters
    const [user, setUser] = useState<UserProps>() //Dados do Usuario Logado
    const formRef = useRef<HTMLFormElement>(null) //Buscar os dados do formulario

    useEffect(() => {
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
                setHeadHunters(response.data.headhunters)
            }
        }

        fetchUsers()
    }, [])

    //Consultar dados do usuario logado
    useEffect(() => {
        const userDados = sessionStorage.getItem('user')
        if (userDados) {
            setUser(JSON.parse(userDados))
        }


    }, []);


    //Função onChange para Exibição Condicional do Input do Valor do Salario
    const handleInputSalario = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const value = e.currentTarget.value
        value === "valor" ? setIsSalario(true) : setIsSalario(false)
    }

    const handleCompetenciasChange = (tags: string[]) => {

        setCompetencias(tags);
    };


    //Função para submeter o formulario de criação de vaga
    const handleUpdateVagasSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (formRef.current) {
            const formdata = new FormData(formRef.current)
            const idUser = formdata.get('user_id')?.toString();

            if (id) {
                const data = await updateVagas(id, formdata)

                if (data) {
                    console.log(data)
                    if (data.status === false) {
                        alert(data.message)
                    } else {
                        alert('Vaga Atualizada com sucesso!')

                    }
                }
            }



        }

    }



    return (
        <form className="criar-vaga-form" onSubmit={handleUpdateVagasSubmit} ref={formRef}>
            <Select label="Selecione a Profissão" defaultValue="selecione" name="profissao_id">
                <option value="selecione">Selecione</option>
                {
                    profissoes.map((profissao) => (
                        <option value={profissao.id}>{profissao.nome}</option>
                    ))

                }
            </Select>
            <Input label="Nome da Vaga" type="text" name="titulo" />
            <div className="textarea-container" style={{ gridColumn: '1/-1' }}>
                <TextArea label="Descrição da Vaga" name="descricao" rows={5} cols={30} placeholder="Requisitos, Diferenciais, Atividades" />
            </div>
            <div className="palavras-chaves" style={{ gridColumn: '1/-1' }}>
                <h2>Competencias</h2>
                <TagsInput label="Digite as Palavras Chaves" value={competencias} onChange={handleCompetenciasChange} inputProps={{ placeholder: 'Adicionar competência' }} />

            </div>

            <Select label="Salario Estipulado" defaultValue="selecione" name="tipo_salario" onChange={(e) => handleInputSalario(e)}>
                <option value="selecione">Selecione</option>
                <option value="A combinar">A combinar</option>
                <option value="valor">Estipular valor</option>
            </Select>

            <Select label="Selecione a Senioridade" defaultValue="selecione" name="nivel_senioridade">
                <option value="selecione">Selecione</option>
                <option value="estagio">Estagio</option>
                <option value="junior">Junior</option>
                <option value="pleno">Pleno</option>
                <option value="senior">Senior</option>
                <option value="lider_tecnico">Lider Tecnico</option>
            </Select>

            <div className="salario-inputs" style={{ gridColumn: '1/-1' }}>
                {isSalario ? <Input disabled={!isSalario} label="Salario Minimo" type="text" onInput={useNumericInput} name="salario_minimo" placeholder="R$ 2000,00" /> : ''}
                {isSalario ? <Input disabled={!isSalario} label="Salario Maximo" type="text" onInput={useNumericInput} name="salario_maximo" placeholder="R$ 4000,00" /> : ''}
            </div>


            <Select label="Status da Vaga" defaultValue="selecione" name="status">
                <option value="selecione">Selecione</option>
                <option value="Ativo">Ativo</option>
                <option value="Suspensa">Suspensa</option>
                <option value="Finalizada">Finalizada</option>
            </Select>
            <Input label="Data de Fechamento" type="date" name="data_final" />


            <div className="button-submit" style={{ gridColumn: '1/-1' }}>
                <Button ButtonName="Criar Vaga" type="submit" variant="primary" />
            </div>
        </form>
    )
}