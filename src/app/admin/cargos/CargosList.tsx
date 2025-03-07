'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import { Spinner } from "@/components/ui/spinner"
import { Cargos } from "@/models/cargos"
import { createProfissoesAction, deleteProfissoesAction, updateProfissoesAction } from "@/server actions/profissoes.action"
import { useRouter } from "next/navigation"
import { useActionState, useEffect, useRef, useState } from "react"

interface CargosListProps{
    profissoes: Cargos[]
}

export default function CargosList({profissoes} : CargosListProps) {
 

    const { showModal, hideModal } = useModal()
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({})
    const router = useRouter()

    const [dataCreate, handleCriarProfissao, isPendingCreate] = useActionState(createProfissoesAction, null)
    const [dataEdit, handleEditarProfissao, isPendingEdit] = useActionState(updateProfissoesAction, null)
    const [dataDelete, handleDeletarProfissao, isPendingDelete] = useActionState(deleteProfissoesAction, null)

     // Atualiza os erros quando há resposta da API
    useEffect(() => {
        if (dataCreate) {
            if(dataCreate.error){
                if (typeof dataCreate.error === "object") {
                    setFormErrors(dataCreate.error);
                    return
                } else {
                     showModal("Erro", dataCreate.error)
                     dataCreate.error = null
                     return
                }
                
            }
            showModal("Sucesso", dataCreate.message)
            router.refresh()
        }
    }, [dataCreate]); 

         // Atualiza os erros quando há resposta da API
         useEffect(() => {
            if (dataEdit) {
                if(dataEdit.error){
                    if (typeof dataEdit.error === "object") {
                        setFormErrors(dataEdit.error);
                        return
                    } else {
                         showModal("Erro", dataEdit.error)
                         dataEdit.error = null
                         return
                    }
                }
                showModal("Sucesso", dataEdit.message)
                router.refresh()
            }
            
        }, [dataEdit]); 

        
             // Atualiza os erros quando há resposta da API
    useEffect(() => {
        if (dataDelete) {
            if(dataDelete.error){
                if (typeof dataDelete.error === "object") {
                    setFormErrors(dataDelete.error);
                    return
                } else {
                     showModal("Erro", dataDelete.error)
                     dataDelete.error = null
                     return
                }
            }
            showModal("Sucesso", dataDelete.message)
            router.refresh()
        }
    }, [dataDelete]); 




    return (
        <section className="cargos-area">
            <h1>Gerenciamento de Cargos</h1>
            <div className="operations">
                <div className="actions">
                    <Button ButtonName='Cadastrar' type='button' variant='primary' onClick={() => {
                        showModal('Criar Profissão',
                            <form className='form' action={handleCriarProfissao}>
                                <Input label='Digite o nome da profissão' type='text' name='nome' placeholder='Analista de Redes' />
                                <Button ButtonName='Enviar' variant='primary' type='submit' />
                                {isPendingCreate && <Spinner size="lg" className="bg-black dark:bg-white" />}
                            </form>)
                    }} />
                    <Button ButtonName='Editar' type='button' variant='secondary' onClick={() => {
                        showModal('Editar Profissão',
                            <form className='form' action={handleEditarProfissao}>
                                <Select label='Selecione as Profissão' name='id' defaultValue='selecione'>
                                    <option value='selecione'>Selecione</option>
                                    {profissoes.map((profissao) => (
                                        <option key={profissao.id} value={profissao.id}>{profissao.nome}</option>
                                    ))}
                                </Select>
                                <Input label='Digite o nome da profissão' type='text' name='nome' placeholder='Analista de Redes' />
                                <Button ButtonName='Enviar' variant='primary' type='submit' />
                                {isPendingEdit && <Spinner size="lg" className="bg-black dark:bg-white" />}
                            </form>)
                    }} />
                </div>
                <div className="list">
                    <h2>Lista de Cargos</h2>
                    <div className="container">
                        {profissoes.map((profissão) => (
                            <div className='div-line' key={profissão.id}>
                                <p>{profissão.nome}</p>
                                <form action={handleDeletarProfissao} key={profissão.id}>
                                    <Input type="hidden" name="id" value={profissão.id.toString()}  />
                                    <Button ButtonName='Excluir' type='submit' variant='primary' disabled={isPendingDelete} />
                                    
                                </form>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}