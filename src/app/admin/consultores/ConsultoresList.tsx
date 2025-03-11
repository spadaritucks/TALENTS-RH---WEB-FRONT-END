'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import { Spinner } from "@/components/ui/spinner"
import { Consultores } from "@/models/consultores"
import { Usuarios } from "@/models/usuarios"
import { deleteConsultorAction } from "@/server actions/consultores.action"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from "react"

interface ConsultoresListProps {
    consultores : Consultores[]
    userConsultores: Usuarios[]
}

export default function ConsultoresList({
    consultores,
    userConsultores
}: ConsultoresListProps) {

    
    const { showModal, hideModal } = useModal()
    const router = useRouter()

    const [dataDelete, handleDeleteConsultor, isPendingDelete] = useActionState(deleteConsultorAction, null)

    useEffect(() => {
        if (dataDelete) {
            if (dataDelete.error) {
                showModal("Erro", dataDelete.error)
                dataDelete.error = null
            }
            showModal("Sucesso", dataDelete.message)
            router.refresh()
            

        }
    }, [dataDelete]); // Dependência para executar o efeito quando 'data' mudar


    return (
        <div className="operations">
            <div className="actions">
                <Link href='/admin/consultores/criar_consultor'><Button ButtonName='Cadastrar' type='button' variant='primary' /></Link>
            </div>
            <div className="list">
                <h2>Lista de Consultores</h2>
                <div className="container">
                    {
                       consultores.length > 0 ?  consultores.map((consultor) => {
                            const userConsultor = userConsultores.find(user => user.id === consultor.user_id)
                            return (
                                <div className="div-line" key={consultor.id}>
                                    <p key={consultor.id} >{userConsultor?.nome} {userConsultor?.sobrenome}</p>
                                    <Link href={`/admin/consultores/editar_consultor?id=${userConsultor?.id}`}><Button ButtonName='Editar' type='button' variant='secondary' /></Link>
                                    <form action={handleDeleteConsultor}>
                                        <Input type="hidden" name="id" value={userConsultor?.id.toString()} />
                                        <Button ButtonName="Excluir" variant="primary" type="submit" disabled={isPendingDelete}/>
                                        {isPendingDelete ? <Spinner size="lg" className="bg-black dark:bg-white" /> : null}
                                    </form>
                                </div>
                            )
                        }

                        ) : <p className="text-center text-2xl">Nenhum dado encontrado</p>

                    }
                </div>
            </div>

        </div>
    )
}