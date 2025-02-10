'use client'

import { createProfissoes, deleteProfissoes, getProfissoes, ProfissoesProps, updateProfissoes } from "@/api/profissoes/api"
import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import Main from "@/layouts/admin/layout"
import { useEffect, useRef, useState } from "react"
import './page.scss'
import { useRouter } from "next/navigation"


export default function Cargos() {

    const [profissoes, setProfissoes] = useState<ProfissoesProps[]>([])
    const formRef = useRef<HTMLFormElement>(null)
    const { showModal, hideModal } = useModal()
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario
    

    //Consultar Dados de Profissoes
    const fetchProfissoes = async () => {
        const response = await getProfissoes()

        if (response) {
            setProfissoes(response.data.profissoes)
        }
    }

    useEffect(() => {
        fetchProfissoes()
    }, [])


    //Função de submeter o formulario de profissões

    const handleProfissoesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (formRef.current) {
            const formdata = new FormData(formRef.current)

            const data = await createProfissoes(formdata)

            if (data) {
                console.log(data)
                if (data.status === false) {
                    if (typeof data.message === 'object') {
                        setFormErrors(data.message)
                        showModal("Erro ", <p>Preencha os Campos Necessarios</p>)
                    } else {
                        showModal("Erro ", <p>{data.message}</p>)
                    }

                } else {
                    showModal("Sucesso ", <p>Cargo Criado com sucesso</p>)
                    fetchProfissoes()


                }
            }
        }

    }

    const handleUpdateProfissoesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (formRef.current) {
            const formdata = new FormData(formRef.current)
            const id = formdata.get('profissao_id')?.toString();

            if (id) {
                const data = await updateProfissoes(parseInt(id), formdata)

                if (data) {
                    console.log(data)
                    if (data.status === false) {
                        if (typeof data.message === 'object') {
                            setFormErrors(data.message)
                            showModal("Erro ", <p>Preencha os Campos Necessarios</p>)
                        } else {
                            showModal("Erro ", <p>{data.message}</p>)
                        }
    
                    } else {
                        showModal("Sucesso ", <p>Cargo Atualizado com sucesso</p>)
                        fetchProfissoes()
    
    
                    }
                }
            }



        }

    }

    const handleDeleteProfissoesSubmit = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        showModal('Tem certeza que deseja excluir esse Cargo?',
            <div className="div-excluir">
                <Button ButtonName="Sim" type="button" variant="primary" onClick={async () => {
                    const response = await deleteProfissoes(id);
                    if (response) {
                        if (response.status === false) {
                            showModal("Erro ", <p>{response.message}</p>)
                        } else {
                            showModal("Erro ", <p>Cargo excluido com sucesso</p>)
                            fetchProfissoes()
                        }
                    }
                }} />
                <Button ButtonName="Não" type="button" variant="secondary" onClick={hideModal} />
            </div>
        )
    }


    return (
        <Main>
            <section className="cargos-area">
                <h1>Gerenciamento de Cargos</h1>
                <div className="operations">
                    <div className="actions">
                        <Button ButtonName='Cadastrar' type='button' variant='primary' onClick={() => {
                            showModal('Criar Profissão',
                                <form className='form' ref={formRef} onSubmit={handleProfissoesSubmit}>
                                    <Input label='Digite o nome da profissão' type='text' name='nome' placeholder='Analista de Redes' />
                                    <Button ButtonName='Enviar' variant='primary' type='submit' />
                                </form>)
                        }} />
                        <Button ButtonName='Editar' type='button' variant='secondary' onClick={() => {
                            showModal('Editar Profissão',
                                <form className='form' ref={formRef} onSubmit={handleUpdateProfissoesSubmit}>
                                    <Select label='Selecione as Profissão' name='profissao_id' defaultValue='selecione'>
                                        <option value='selecione'>Selecione</option>
                                        {
                                            profissoes.map((profissao) => (
                                                <option key={profissao.id} value={profissao.id}>{profissao.nome}</option>
                                            ))

                                        }
                                    </Select>
                                    <Input label='Digite o nome da profissão' type='text' name='nome' placeholder='Analista de Redes' />
                                    <Button ButtonName='Enviar' variant='primary' type='submit' />
                                </form>)
                        }} />
                    </div>
                    <div className="list">
                        <h2>Lista de Cargos</h2>
                        <div className="container">
                            {profissoes.map((profissão) => (
                                <div className='div-line' key={profissão.id}>
                                    <p >{profissão.nome}</p>
                                    <Button ButtonName='Excluir' type='button' variant='primary' onClick={(e) => { handleDeleteProfissoesSubmit(e, profissão.id) }} />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>


            </section>
        </Main>
    )
}