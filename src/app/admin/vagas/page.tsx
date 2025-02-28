'use client'

import Main from "@/layouts/admin/layout"
import './page.scss'
import Link from "next/link"
import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { ReactNode, useEffect, useRef, useState } from "react"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import TextArea from "@/components/textarea/component"
import useNumericInput from "@/hooks/NumericInput"
import { CandidatosProps, ConsultorAndAdminProps, EmpresaProps, getAllUsers, HeadHunterProps, UserProps } from "@/api/users/api"
import { createVagas, deleteVagas, getAllVagas, updateVagas, VagasProps } from "@/api/vagas/api"
import { getProfissoes, ProfissoesProps } from "@/api/profissoes/api"
import { ChamadoProps, createAtualizacoes, getChamados } from "@/api/chamados/api"
import TagsInput from "@/components/tagsinput/component"
import { getAllProcessos, ProcessosProps } from "@/api/processos/api"


export default function PainelAdmin() {
    const [descricaoVaga, setDescricaoVaga] = useState<boolean>(false);
    const [criarVaga, setCriarVaga] = useState<boolean>(false);
    const { showModal, hideModal } = useModal();
    const formRef = useRef<HTMLFormElement>(null) //Buscar os dados do formulario
    const modalOpened = descricaoVaga || criarVaga
    const [user, setUser] = useState<UserProps>() //Dados do Usuario Logado
    const [users, setUsers] = useState<UserProps[]>([]) // Dados gerais de todos os usuarios
    const [admins, setAdmins] = useState<ConsultorAndAdminProps[]>([]); // Dados dos Head Hunters
    const [candidatos, setCandidatos] = useState<CandidatosProps[]>([]) // Dados dos Candidatos
    const [headhunters, setHeadHunters] = useState<HeadHunterProps[]>([])
    const [vagas, setVagas] = useState<VagasProps[]>([]) // Dados das Vagas criadas pelo admin
    const [chamados, setChamados] = useState<ChamadoProps[]>([]);
    const [empresa, setEmpresa] = useState<EmpresaProps[]>([]) // Dados da Empresa
    const [profissoes, setProfissoes] = useState<ProfissoesProps[]>([])
    const [processos, setProcessos] = useState<ProcessosProps[]>([])


    //Requisição para os dados dos Usuarios
    const fetchUsers = async () => {
        const response = await getAllUsers()
        if (response) {
            setUsers(response.data.users)
            setAdmins(response.data.admins)
            setCandidatos(response.data.candidatos)
            setEmpresa(response.data.empresas)
            setHeadHunters(response.data.headhunters)
        }
    }

    //Requisição para os dados das Profissões
    const fetchProfissoes = async () => {
        const response = await getProfissoes()
        if (response) {
            setProfissoes(response.data.profissoes)
        }
    }

    //Requisição para os dados das Vagas
    const FetchVagas = async () => {
        const response = await getAllVagas()
        if (response) {
            setVagas(response.data)
        }
    }

    //Requisição para os dados dos Chamados
    const fetchChamados = async () => {
        const response = await getChamados()
        if (response) {
            setChamados(response.data.chamados)
        }
    }

    //Requisição para os dados dos Processos
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



    const handleDeleteVagasSubmit = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        showModal('Tem certeza que deseja excluir essa Vaga?',
            <div className="div-excluir">
                <Button ButtonName="Sim" type="button" variant="primary" onClick={async () => {
                    const response = await deleteVagas(id);
                    if (response) {
                        if (response.status === false) {
                            showModal('Erro', <p>response?.data.message</p>)
                        } else {
                            showModal('Sucesso', <p>Vaga excluida com sucesso</p>)
                            FetchVagas()
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
        showModal('Criar Vaga de Emprego', <CriarVagaForm
            empresas={empresa}
            formRef={formRef}
            admins={admins}
            profissoes={profissoes}
            user={user}
            fetchVagas={FetchVagas}
            showModal={showModal}
        />);
    }

    return (
        <Main>

            <section className="vagas-area">
                <h1>Vagas de Emprego</h1>
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
                            <option value="selecione">Nivel de Senoriedade</option>
                        </Select>
                    </div>
                </div>
                <div className="vagas-container">
                    <Button ButtonName="Criar Vaga" variant="primary" type="button" onClick={handleCriarVaga} />
                    {vagas.map((vaga) => {
                        const adminId = admins.find(admin => admin.id === vaga.admin_id)
                        const headHunterId = headhunters.find(headhunter => headhunter.id === vaga.headhunter_id)
                        const adminUser = users.find(user => user.id === adminId?.user_id)
                        const headHunterUser = users.find(user => user.id === headHunterId?.user_id)

                        //Filtração para o Endereço da Empresa da vaga
                        const vagaEmpresa = empresa.find(vagaEmpresa => vagaEmpresa.id === vaga.empresa_id);
                        const userEmpresa = users.find(user => user.id == vagaEmpresa?.user_id);

                        return (
                            <div key={vaga.id} className="vaga-card">
                                <div className="vaga-informations">
                                    <h2>{vaga.titulo}</h2>
                                    <h3>{vagaEmpresa?.nome_fantasia}</h3>
                                    <p><strong>Responsavel: </strong>{adminId ? adminUser?.nome + ' ' + adminUser?.sobrenome : headHunterUser?.nome + ' ' + headHunterUser?.sobrenome}</p>
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
                                    <Button ButtonName="Ver Candidatos" type="button" variant="primary" onClick={() => {
                                        window.location.href = `/admin/candidato_vaga?id=${vaga.id}`
                                    }} />
                                </div>
                                <div className="vaga-actions">
                                    <Button ButtonName="Editar Vaga" type="button" variant="secondary" onClick={() => {
                                        showModal('Editar Vaga', <EditarVagaForm
                                            id={vaga.id}
                                            empresas={empresa}
                                            formRef={formRef}
                                            admins={admins}
                                            profissoes={profissoes}
                                            user={user}
                                            fetchVagas={FetchVagas}
                                            showModal={showModal} />)
                                    }} />
                                    <Button ButtonName="Excluir Vaga" type="button" variant="primary" onClick={(e) => { handleDeleteVagasSubmit(e, vaga.id) }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

        </Main>

    )
}

interface CriarVagaProps {
    profissoes: ProfissoesProps[];
    admins: ConsultorAndAdminProps[];
    empresas: EmpresaProps[]
    formRef: React.RefObject<HTMLFormElement>
    user: UserProps | undefined
    fetchVagas: () => Promise<void>
    showModal: (title: string, body: ReactNode) => void
}


//Formulario de Criação de Vaga de Emprego
const CriarVagaForm = ({ profissoes, admins, empresas, formRef, user, fetchVagas, showModal }: CriarVagaProps) => {

    const [isSalario, setIsSalario] = useState<boolean>(false);
    const [competencias, setCompetencias] = useState<string[]>([]);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario

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

        //Buscar id do admins
        const Admin = admins.find(admin => admin.user_id === user?.id)
        const id = Admin?.id



        if (id) {
            if (formRef.current) {
                const formdata = new FormData(formRef.current);
                formdata.append('competencias', competencias.join(','))
                formdata.append('admin_id', id.toString())


                formdata.get('salario') === 'valor' ? formdata.delete('salario') : ''


                const data = await createVagas(formdata);
                if (data) {

                    if (data.status === false) {
                        if (typeof data.message === 'object') {
                            setFormErrors(data.message)
                            showModal('Erro', <p>Preencha os Campos Necessarios</p>)
                        } else {
                            showModal('Erro', <p>{data.message}</p>)
                        }
                    } else {
                        showModal('Sucesso', <p>Vaga criada com sucesso!</p>);
                        fetchVagas();
                    }
                } else {
                    showModal('Erro', <p>Erro ao submeter o formulario</p>)
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
                        <option key={profissao.id} value={profissao.id}>{profissao.nome}</option>
                    ))

                }
            </Select>
            <Select label="Selecione a Empresa" defaultValue="selecione" name="empresa_id">
                <option value="selecione">Selecione</option>
                {
                    empresas.map((empresa) => (
                        <option key={empresa.id} value={empresa.id}>{empresa.nome_fantasia}</option>
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
    profissoes: ProfissoesProps[];
    admins: ConsultorAndAdminProps[];
    empresas: EmpresaProps[]
    formRef: React.RefObject<HTMLFormElement>
    user: UserProps | undefined
    fetchVagas: () => Promise<void>
    showModal: (title: string, body: ReactNode) => void
}

//Formulario de Criação de Vaga de Emprego
const EditarVagaForm = ({ id, profissoes, admins, empresas, formRef, user, fetchVagas, showModal }: EditarVagaProps) => {

    const [isSalario, setIsSalario] = useState<boolean>(false);

    const [competencias, setCompetencias] = useState<string[]>([]);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario




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
                        if (typeof data.message === 'object') {
                            setFormErrors(data.message)
                            showModal('Erro', <p>Preencha os Campos Necessarios</p>)
                        } else {
                            showModal('Erro', <p>{data.message}</p>)
                        }
                    } else {
                        showModal('Sucesso', <p>Vaga criada com sucesso!</p>);
                        fetchVagas();
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
                        <option key={profissao.id} value={profissao.id}>{profissao.nome}</option>
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