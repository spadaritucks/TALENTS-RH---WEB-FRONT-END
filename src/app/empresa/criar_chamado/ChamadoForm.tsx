'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import TextArea from "@/components/textarea/component"
import { Spinner } from "@/components/ui/spinner"
import useNumericInput from "@/hooks/NumericInput"
import { Cargos } from "@/models/cargos"
import { Chamados, ChamadoStatus } from "@/models/chamados"
import { Empresas } from "@/models/empresas"
import { Usuarios } from "@/models/usuarios"
import { createAtualizacoesAction, createChamadosAction } from "@/server actions/chamados.action"
import { useActionState, useEffect, useState } from "react"

interface AtualizacaoFormProps {
    empresas: Empresas[]
    chamados: Chamados[]
    profissoes: Cargos[]
    userLogged: Usuarios
}

export default function ChamadoForm({ empresas, chamados, profissoes, userLogged }: AtualizacaoFormProps) {



    const { showModal, hideModal } = useModal()
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario

    const [data, handleCriarChamado, isPending] = useActionState(createChamadosAction, null)



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

    const empresaLogged = empresas.find(empresa => empresa.user_id == userLogged.id)


    return (
        <>

            <form className='chamado-form' action={handleCriarChamado}>
                <div>
                    {empresaLogged ? <Input type="hidden" name="empresa_id" value={empresaLogged.id.toString()} /> : null}
                    <Input type="hidden" name="status" value={ChamadoStatus.Aguardando} />
                </div>
                <div>
                    <Select label="Profissional Desejado" defaultValue="selecione" name="profissao_id" >
                        <option value='selecione'>Selecione</option>
                        {
                            profissoes.map(profissao => (
                                <option key={profissao.id} value={profissao.id}>{profissao.nome}</option>
                            ))
                        }
                    </Select>
                    {formErrors ? formErrors.profissao_id?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
                </div>
                <div>
                    <Input label="Numero de Vagas" type="text" onInput={useNumericInput} name="numero_vagas" />
                    {formErrors ? formErrors.numero_vagas?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
                </div>
                <div>
                    <Input label='Anexo' type='file' name='anexo' />
                    {formErrors ? formErrors.anexo?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
                </div>
                <div>
                    <TextArea label="Descrição do Chamado" name="descricao" />
                    {formErrors ? formErrors.descricao?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
                </div>
                <div>
                    <Button ButtonName='Enviar' type='submit' variant='primary' />
                    {isPending ? <Spinner size="lg" className="bg-black dark:bg-white" /> : null}
                </div>

            </form>



        </>
    )

}