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
import { createAtualizacoesAction } from "@/server actions/chamados.action"
import { useActionState, useEffect, useState } from "react"

interface AtualizacaoFormProps {
    empresas: Empresas[]
    chamados: Chamados[]
    profissoes: Cargos[]
    userLogged: Usuarios
}

export default function AtualizacaoForm({ empresas, chamados, profissoes, userLogged }: AtualizacaoFormProps) {


    const [mensagemPadrão, setMensagemPadrão] = useState<boolean>(false)
    const [id, setId] = useState<number | null>(null)
    const { showModal, hideModal } = useModal()
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario

    const [data, handleCriarAtualizacao, isPending] = useActionState(createAtualizacoesAction, null)

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

    const chamadoDados = chamados.find(chamado => chamado.id === id)
    const chamadoEmpresa = empresas.find(empresa => empresa.id == chamadoDados?.empresa_id)
    const chamadoCargo = profissoes.find(cargo => cargo.id === chamadoDados?.profissao_id)
   

    return (
        <>
            <div className='chamado-dados'>
                <p><strong>id: </strong> {chamadoDados?.id}</p>
                <p><strong>Empresa : </strong> {chamadoEmpresa?.nome_fantasia}</p>
                <p><strong>Profissional Requerido: </strong> {chamadoCargo?.nome}</p>
            </div>
            <form className='chamado-form' action={handleCriarAtualizacao}>
                <div>
                    {id ? <Input type="hidden" name="chamados_id" value={id.toString()} /> : null}
                    <Input type="hidden" name="user_id" value={userLogged.id.toString()} />
                </div>
                <div>
                    <Input label='Titulo' type='text' name='titulo' />
                    {formErrors ? formErrors.titulo?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
                </div>
                <div>
                    <Input label='Anexo' type='file' name='anexo' />
                    {formErrors ? formErrors.anexo?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
                </div>
                <div>
                    <Select label='Deseja utilizar descrição/mensagens padrão?' defaultValue='selecione' onChange={(e) => handleMensagemPadrão(e)}>
                        <option value='selecione'>Selecione</option>
                        <option value='sim'>Sim</option>
                        <option value='nao'>Não</option>
                    </Select>
                </div>
                {!mensagemPadrão ? <div>
                    <TextArea disabled={mensagemPadrão} label='Descrição' name='atualizacoes' cols={40} rows={10} />
                    {formErrors ? formErrors.atualizacoes?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
                </div> : ''}
                {mensagemPadrão ? <div>
                    <Select disabled={!mensagemPadrão} label='Descrição/Mensagem Padrão' name='atualizacoes' defaultValue='selecione'>
                        <option value='selecione'>Selecione</option>
                        {mensagensAutomaticas.map((mensagem) => (
                            <option title={mensagem.mensagem} key={mensagem.id} value={mensagem.mensagem}>{mensagem.nome}</option>
                        ))}
                    </Select>
                    {formErrors ? formErrors.atualizacoes?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
                </div> : ''}
                <div>
                    <Button ButtonName='Enviar' type='submit' variant='primary' />
                    {isPending ? <Spinner size="lg" className="bg-black dark:bg-white" /> : null}
                </div>

            </form>



        </>
    )

}