'use client'
import Input from '@/components/input/component'
import './page.scss'
import Button from '@/components/button/component'
import { useEffect, useRef, useState } from 'react'
import { useModal } from '@/components/modal/context'
import { ChamadoProps, createAtualizacoes, getChamados } from '@/api/chamados/api'
import { EmpresaProps, getAllUsers, UserProps } from '@/api/users/api'
import Main from '@/layouts/admin/layout'
import TextArea from '@/components/textarea/component'
import { getProfissoes, ProfissoesProps } from '@/api/profissoes/api'
import Select from '@/components/select/component'
import { mensagensAutomaticas } from '@/json/mensagens'

export default function AtualizarChamado() {

    const formRef = useRef<HTMLFormElement>(null)
    const { showModal, hideModal } = useModal()
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario
    const [id, setId] = useState<number | null>(null)
    const [user, setUser] = useState<UserProps>() //Dados do Usuario Logado
    const [chamados, setChamados] = useState<ChamadoProps[]>([]);
    const [users, setUsers] = useState<UserProps[]>([]) // Dados gerais de todos os usuarios
    const [empresa, setEmpresa] = useState<EmpresaProps[]>([]) // Dados da Empresa
    const [profissoes, setProfissoes] = useState<ProfissoesProps[]>([])
    const [mensagemPadrão, setMensagemPadrão] = useState<boolean>(false)



    useEffect(() => {
        const fetchChamados = async () => {
            const response = await getChamados()
            if (response) {
                setChamados(response.data.chamados)
            }
        }
        fetchChamados()

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
                setEmpresa(response.data.empresas)

            }
        }

        fetchUsers()



    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') { // Garante que só executa no cliente
            const searchParams = new URLSearchParams(window.location.search)
            const idString = searchParams.get('id')
            setId(idString ? parseInt(idString) : null)
        }
    }, [])

    //Consultar dados do usuario logado
    useEffect(() => {
        const userDados = sessionStorage.getItem('user')
        if (userDados) {
            setUser(JSON.parse(userDados))
        }


    }, []);

    const handleMensagemPadrão = (e:React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()

        const value = e.currentTarget.value
        value === 'sim' ? setMensagemPadrão(true) : setMensagemPadrão(false)
    }

    const handleAtualizarChamados = async (e: React.FormEvent<HTMLFormElement>, idChamado: number | null, idUsuario: number | undefined) => {
        e.preventDefault()

        if (formRef.current) {
            const formdata = new FormData(formRef.current)
            formdata.append('user_id', idUsuario?.toString() || '')
            formdata.append('chamados_id', idChamado?.toString() || '');
            if (idChamado && idUsuario) {
                const data = await createAtualizacoes(formdata)

                if (data) {
                    if (data.status === false) {
                        if (typeof data.message === 'object') {
                            setFormErrors(data.message)
                            showModal("Erro ", <p>Preencha os Campos Necessarios</p>)
                        } else {
                            showModal("Erro ", <p>{data.message}</p>)
                        }
                    } else {
                        showModal("Sucesso ", <p>Chamado Atualizado com Sucesso</p>)

                    }
                }
            }

        }
    }

    //Filtrar chamado selecionado
    const chamadoDados = chamados.find(chamado => chamado.id === id)
    const chamadoEmpresa = empresa.find(empresa => empresa.id === chamadoDados?.empresa_id)
    const chamadoCargo = profissoes.find(cargo => cargo.id === chamadoDados?.profissao_id)

    return (
        <Main>
            <section className='atualizar-chamado-menu'>
                <h1>Atualizar Chamado</h1>
                <div className='chamado-dados'>
                    <p><strong>id: </strong> {chamadoDados?.id}</p>
                    <p><strong>Empresa : </strong> {chamadoEmpresa?.nome_fantasia}</p>
                    <p><strong>Profissional Requerido: </strong> {chamadoCargo?.nome}</p>
                </div>
                <form className='chamado-form' ref={formRef} onSubmit={(e) => handleAtualizarChamados(e, id, user?.id)}>
                    <Input label='Titulo' type='text' name='titulo' />
                    <Input label='Anexo' type='file' name='anexo' />
                    <Select label='Deseja utilizar descrição/mensagens padrão?' defaultValue='selecione' onChange={(e)=> handleMensagemPadrão(e)}>
                        <option value='selecione'>Selecione</option>
                        <option value='sim'>Sim</option>
                        <option value='nao'>Não</option>
                    </Select>
                    {!mensagemPadrão ? <TextArea disabled={mensagemPadrão} label='Descrição' name='atualizacoes' cols={40} rows={10} /> : ''}
                    {mensagemPadrão ? <Select disabled={!mensagemPadrão} label='Descrição/Mensagem Padrão' name='atualizacoes' defaultValue='selecione'>
                        <option value='selecione'>Selecione</option>
                        {mensagensAutomaticas.map((mensagem) => (
                            <option title={mensagem.mensagem} key={mensagem.id} value={mensagem.mensagem}>{mensagem.nome}</option>
                        ))}
                    </Select> : ''}
                    <Button ButtonName='Enviar' type='submit' variant='primary' />
                </form>
            </section>
        </Main>
    )
}