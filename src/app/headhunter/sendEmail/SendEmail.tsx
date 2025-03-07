'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import TextArea from "@/components/textarea/component"
import { Spinner } from "@/components/ui/spinner"
import { mensagensAutomaticas } from "@/json/mensagens"
import { Cargos } from "@/models/cargos"
import { Chamados } from "@/models/chamados"
import { Empresas } from "@/models/empresas"
import { Usuarios } from "@/models/usuarios"
import { sendEmailAction } from "@/server actions/email.action"
import { useActionState, useEffect, useState } from "react"

interface EmailFormProps {
    usuarios: Usuarios[]
}

export default function SendEmailForm({ usuarios }: EmailFormProps) {


    const [mensagemPadrão, setMensagemPadrão] = useState<boolean>(false)
    const [id, setId] = useState<number | null>(null)
    const { showModal, hideModal } = useModal()
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario

    const [data, handleSendEmail, isPending] = useActionState(sendEmailAction, null)

    useEffect(() => {
        if (typeof window !== 'undefined') { // Garante que só executa no cliente
            const searchParams = new URLSearchParams(window.location.search)
            const idString = searchParams.get('id')
            setId(idString ? parseInt(idString) : null)
        }
    }, [])

    useEffect(() => {
        if (data) {
            if (data.error) {
                if (typeof data.error === 'object') {
                    setFormErrors(data.error)
                    return
                } else {
                    showModal("Erro", <p>data.error</p>)
                    data.error = null
                    return
                }

            }

            showModal("Sucesso", data.message)
        }
    }, [data]);

    const handleMensagemPadrão = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()

        const value = e.currentTarget.value
        value === 'sim' ? setMensagemPadrão(true) : setMensagemPadrão(false)
    }
    const candidatoDados = usuarios.find(user => user.id === id);
    return (
        <>
            <div className="usuario-dados">
                <p><strong>Id : </strong> {id}</p>
                <p><strong>Nome do Candidato : </strong>{candidatoDados?.nome}</p>
                <p><strong>Email do Candidato : </strong> {candidatoDados?.email}</p>
            </div>
            <form className="sendEmail-form" action={handleSendEmail}>
                <div>
                    {candidatoDados ?
                        <><Input type="hidden" name="nome" value={candidatoDados.nome} />
                            <Input type="hidden" name="email" value={candidatoDados.email} /></> : null}
                </div>
                <div>
                    <Input label="Assunto" type="text" name="assunto" />
                </div>
                <div>
                    <Select label='Deseja utilizar descrição/mensagens padrão?' defaultValue='selecione' onChange={(e) => handleMensagemPadrão(e)}>
                        <option value='selecione'>Selecione</option>
                        <option value='sim'>Sim</option>
                        <option value='nao'>Não</option>
                    </Select>
                </div>
                {!mensagemPadrão ? <div>
                    <TextArea disabled={mensagemPadrão} label='Mensagem' name='mensagem' cols={40} rows={10} />
                </div> : ''}
                {mensagemPadrão ? <div>
                    <Select disabled={!mensagemPadrão} label='Descrição/Mensagem Padrão' name='mensagem' defaultValue='selecione'>
                        <option value='selecione'>Selecione</option>
                        {mensagensAutomaticas.map((mensagem) => (
                            <option title={mensagem.mensagem} key={mensagem.id} value={mensagem.mensagem}>{mensagem.nome}</option>
                        ))}
                    </Select>
                </div> : ''}
                <div>
                    <Button ButtonName='Enviar' type='submit' variant='primary' />
                    {isPending ? <Spinner size="lg" className="bg-black dark:bg-white" /> : null}
                </div>
            </form>
        </>
    )
}