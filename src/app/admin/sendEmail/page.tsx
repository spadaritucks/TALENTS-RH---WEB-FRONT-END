'use client'

import { getAllUsers, UserProps } from "@/api/users/api"
import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import TextArea from "@/components/textarea/component"
import Main from "@/layouts/admin/layout"
import { useEffect, useRef, useState } from "react"
import './page.scss'
import { mensagensAutomaticas } from "@/json/mensagens"
import Select from "@/components/select/component"
import { sendEmail } from "@/api/sendEmail/api"


export default function enviarEmail() {

    const [mensagemPadrão, setMensagemPadrão] = useState<boolean>(false)
    const [users, setUsers] = useState<UserProps[]>([]) // Dados gerais de todos os usuarios
    const [id, setId] = useState<number | null>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const { showModal, hideModal } = useModal()
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario


    const handleMensagemPadrão = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()

        const value = e.currentTarget.value
        value === 'sim' ? setMensagemPadrão(true) : setMensagemPadrão(false)
    }



    const fetchUsers = async () => {
        const response = await getAllUsers()
        if (response) {
            setUsers(response.data.users)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') { // Garante que só executa no cliente
            const searchParams = new URLSearchParams(window.location.search)
            const idString = searchParams.get('id')
            setId(idString ? parseInt(idString) : null)
        }
    }, [])

    const candidatoDados = users.find(user => user.id === id);

    const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formRef.current) {
            const formdata = new FormData(formRef.current)
            const nome = candidatoDados?.nome
            const email = candidatoDados?.email
            formdata.append('nome', nome || '')
            formdata.append('email', email || '');

            const data = await sendEmail(formdata)
            if (data) {
                if (data.status === false) {
                    if (typeof data.message === 'object') {
                        setFormErrors(data.message)
                        showModal("Erro ", <p>Preencha os Campos Necessarios</p>)
                    } else {
                        showModal("Erro ", <p>{data.message}</p>)
                    }
                } else {
                    showModal("Sucesso ", <p>Email Enviado com Sucesso</p>)

                }
            }
        }

    }




    return (
        <Main>
            <section className="enviar-email-menu">
                <h1>Enviar Email para Candidato</h1>
                <div className="usuario-dados">
                    <p><strong>Id : </strong> {id}</p>
                    <p><strong>Nome do Candidato : </strong>{candidatoDados?.nome}</p>
                    <p><strong>Email do Candidato : </strong> {candidatoDados?.email}</p>
                </div>
                <form className="sendEmail-form" ref={formRef} onSubmit={handleSubmitEmail}>
                    <Input label="Assunto" type="text" name="assunto" />
                    <Select label='Deseja utilizar descrição/mensagens padrão?' defaultValue='selecione' onChange={(e) => handleMensagemPadrão(e)}>
                        <option value='selecione'>Selecione</option>
                        <option value='sim'>Sim</option>
                        <option value='nao'>Não</option>
                    </Select>
                    {!mensagemPadrão ? <TextArea disabled={mensagemPadrão} label='Mensagem' name='mensagem' cols={40} rows={10} /> : ''}
                    {mensagemPadrão ? <Select disabled={!mensagemPadrão} label='Descrição/Mensagem Padrão' name='mensagem' defaultValue='selecione'>
                        <option value='selecione'>Selecione</option>
                        {mensagensAutomaticas.map((mensagem) => (
                            <option title={mensagem.mensagem} key={mensagem.id} value={mensagem.mensagem}>{mensagem.nome}</option>
                        ))}
                    </Select> : ''}
                    <Button ButtonName="Enviar" type="submit" variant="primary" />
                </form>

            </section>
        </Main>
    )
}