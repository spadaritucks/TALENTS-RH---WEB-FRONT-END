'use client'
import Button from "@/components/button/component";
import Input from "@/components/input/component";
import { useModal } from "@/components/modal/context";
import TextArea from "@/components/textarea/component";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Spinner } from "@/components/ui/spinner";
import { ChamadosAtualizacoes } from "@/models/chamados";
import { Usuarios } from "@/models/usuarios";
import { deleteAtualizacoesAction, updateAtualizacoesAction } from "@/server actions/chamados.action";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react"


interface AtualizacoesProps {
    usuarios: Usuarios[]
    atualizacoes: ChamadosAtualizacoes[]
    apiStorage: string
    userLogged: Usuarios

}


export default function Atualizacoes({ usuarios, atualizacoes, apiStorage, userLogged }: AtualizacoesProps) {


    const [id, setId] = useState<number | null>(null)

    const { showModal } = useModal()
    const [dataEdit, handleEditAtualizacao, isPendingEdit] = useActionState(updateAtualizacoesAction, null)
    const [dataDelete, handleDeleteAtualizacao, isPendingDelete] = useActionState(deleteAtualizacoesAction, null)
    const router = useRouter()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;
    const atualizacaoChamado = atualizacoes.filter(atualizacao => atualizacao.chamados_id === id)
    const paginatedAtualizacoes = atualizacaoChamado.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') { // Garante que só executa no cliente
            const searchParams = new URLSearchParams(window.location.search)
            const idString = searchParams.get('id')
            setId(idString ? parseInt(idString) : null)

        }
    }, [])

    useEffect(() => {
        if (dataEdit) {
            if (dataEdit.error) {
                showModal("Erro", dataEdit.error)
                dataEdit.error = null
            }
            showModal("Sucesso", dataEdit.message)
            router.refresh()


        }
    }, [dataEdit]); // Dependência para executar o efeito quando 'data' mudar


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
        <>
            {paginatedAtualizacoes && paginatedAtualizacoes.length > 0 ? paginatedAtualizacoes.map(atualizacao => {

                const userChamado = usuarios.find(user => user.id == atualizacao.user_id);






                return (
                    <div className="registro" key={atualizacao.id}>
                        <h1>{atualizacao.titulo}</h1>
                        <p><strong>Data:</strong> {new Date(atualizacao.created_at).toLocaleDateString('pt-BR')}</p>
                        <p><strong>Responsavel:</strong> {userChamado?.nome} {userChamado?.sobrenome} - ({userChamado?.tipo_usuario})</p>
                        <p><strong>Descrição:</strong> {atualizacao.atualizacoes} </p>
                        {atualizacao.anexo ? <a href={`${apiStorage}/${atualizacao.anexo}`}>
                            <img src={`${apiStorage}/${atualizacao.anexo}`} alt="" className="chamado-anexo" /></a> : ''}
                        {atualizacao.user_id == userLogged.id ? <div className="acompanhamento-buttons">
                            <Button ButtonName="Editar" type="button" variant="primary" onClick={() => {
                                {
                                    showModal('Editar Atualização',
                                        <form className='chamado-form' action={handleEditAtualizacao}>
                                            <Input type="hidden" name="id" value={atualizacao.id.toString()} />
                                            <Input label='Titulo' type='text' name='titulo' defaultValue={atualizacao.titulo} />
                                            <TextArea label='Descrição' cols={40} rows={10} name='atualizacoes' defaultValue={atualizacao.atualizacoes} />
                                            <Input label='Anexo' type='file' name='anexo' />
                                            <Button ButtonName='Enviar' type='submit' variant='primary' />
                                        </form>)
                                }
                            }} />
                            <form action={handleDeleteAtualizacao}>
                                <Input type="hidden" name="id" value={atualizacao.id.toString()} />
                                <Button ButtonName="Excluir" type="submit" variant="secondary" />
                            </form>
                            {isPendingDelete ? <Spinner size="lg" className="bg-black dark:bg-white" /> : null}

                        </div> : null}
                    </div>
                )
            }) : <p className="text-center text-2xl">Nenhum dado encontrado</p>}
            <Pagination>
                <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(1)}>{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationEllipsis />
                    <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(Math.ceil(atualizacaoChamado.length / itemsPerPage))}>{Math.ceil(atualizacaoChamado.length / itemsPerPage)}</PaginationLink>
                    </PaginationItem>
                </PaginationContent>
                <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
            </Pagination>











        </>
    )
}