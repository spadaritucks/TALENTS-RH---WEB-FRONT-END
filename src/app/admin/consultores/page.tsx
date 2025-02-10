'use client'


import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import Main from "@/layouts/admin/layout"
import { useEffect, useRef, useState } from "react"
import './page.scss'
import { ConsultorAndAdminProps, createUser, deleteUser, getAllUsers, updateUser, UserProps } from "@/api/users/api"
import useNumericInput from "@/hooks/NumericInput"


export default function Consultores() {

    const [users, setUsers] = useState<UserProps[]>([])
    const [consultores, setConsultores] = useState<ConsultorAndAdminProps[]>([])
    const formRef = useRef<HTMLFormElement>(null)
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario
    const { showModal, hideModal } = useModal()

    const fetchConsultores = async () => {
        const response = await getAllUsers()

        if (response) {
            setConsultores(response.data.consultores)
            setUsers(response.data.users)
        }
    }

    useEffect(() => {
        fetchConsultores()
    }, [])


    //Função de submeter o formulario de consultores

    const handleConsutoresSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (formRef.current) {
            const formdata = new FormData(formRef.current)
            formdata.append('tipo_usuario', 'consultor')

            const data = await createUser(formdata)

            if (data) {
                if (data.status === false) {
                    if (typeof data.message === 'object') {
                        setFormErrors(data.message)
                        showModal("Erro ", <p>Preencha os Campos Necessarios</p>)
                    } else {
                        showModal("Erro ", <p>{data.message}</p>)
                    }
                } else {
                    showModal("Sucesso ", <p>Consultor cadastrado com sucesso</p>)
                    fetchConsultores()

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
                        if (typeof data.message === 'object') {
                            setFormErrors(data.message)
                            showModal("Erro ", <p>Preencha os Campos Necessarios</p>)
                        } else {
                            showModal("Erro ", <p>{data.message}</p>)
                        }
                    } else {
                        showModal("Sucesso ", <p>Consultor atualizado com sucesso</p>)
                        fetchConsultores()

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
                            showModal("Erro ", <p>{response?.data.message}</p>)

                        } else {
                            showModal("Sucesso ", <p>Consultor excluido com sucesso</p>)
                            fetchConsultores()
                            
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
                <h1>Consultores</h1>
                <div className="operations">
                    <div className="actions">
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
                                <form className='form' ref={formRef} onSubmit={handleUpdateConsultoresSubmit}>
                                    <Select label='Selecione as Profissão' name='profissao_id' defaultValue='selecione'>
                                        <option value='selecione'>Selecione</option>
                                        {
                                            consultores.map((consultor) => {
                                                const userConsultor = users.find(user => user.id === consultor.user_id)
                                                return (
                                                    <option key={consultor.id} value={consultor.id}>{userConsultor?.nome} {userConsultor?.sobrenome}</option>
                                                )
                                            }

                                            )

                                        }
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
                    <div className="list">
                        <h2>Lista de Consultores</h2>
                        <div className="container">
                            {
                                consultores.map((consultor) => {
                                    const userConsultor = users.find(user => user.id === consultor.user_id)
                                    return (
                                        <div className="div-line" key={consultor.id}>
                                            <p key={consultor.id} >{userConsultor?.nome} {userConsultor?.sobrenome}</p>
                                            <Button ButtonName="Excluir" variant="primary" type="button" onClick={(e) => handleDeleteConsultoresSubmit(e, consultor.id)} />
                                        </div>
                                    )
                                }

                                )

                            }
                        </div>
                    </div>

                </div>


            </section>
        </Main>
    )
}