'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import { Spinner } from "@/components/ui/spinner"
import { Admins } from "@/models/admins"
import { Usuarios } from "@/models/usuarios"
import { deleteAdminAction } from "@/server actions/admins.action"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from "react"

interface AdminsListProps {
    admins : Admins[]
    userAdmins: Usuarios[]
}

export default function AdminsList({
    admins,
    userAdmins
}: AdminsListProps) {

    
    const { showModal, hideModal } = useModal()
    const router = useRouter()

    const [dataDelete, handleDeleteAdmins, isPendingDelete] = useActionState(deleteAdminAction, null)

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
                <Link href='/admin/administradores/criar_administrador'><Button ButtonName='Cadastrar' type='button' variant='primary' /></Link>
            </div>
            <div className="list">
                <h2>Lista de Administradores</h2>
                <div className="container">
                    {
                       admins && admins.length > 0 ?  admins.map((admin) => {
                            const userAdmin = userAdmins.find(user => user.id === admin.user_id)
                            return (
                                <div className="div-line" key={admin.id}>
                                    <p key={admin.id} >{userAdmin?.nome} {userAdmin?.sobrenome}</p>
                                    <form action={handleDeleteAdmins}>
                                        <Input type="hidden" name="id" value={userAdmin?.id.toString()} />
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