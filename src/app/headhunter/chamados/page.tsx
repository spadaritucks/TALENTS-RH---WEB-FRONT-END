'use client'

import Button from "@/components/button/component";
import Main from "@/layouts/empresa/layout"
import Image from "next/image";
import Link from "next/link";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useEffect, useRef, useState } from "react";
import { AtualizacoesProps, deleteAtualizacoes, getAtualizacoes, updateAtualizacoes } from "@/api/chamados/api";
import { getAllUsers, UserProps } from "@/api/users/api";
import './page.scss'
import { useSearchParams } from 'next/navigation';
import Input from "@/components/input/component";
import { useModal } from "@/components/modal/context";


export default function Chamados() {
   
    const [id, setId] = useState<number | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') { // Garante que só executa no cliente
            const searchParams = new URLSearchParams(window.location.search)
            const idString = searchParams.get('id')
            setId(idString ? parseInt(idString) : null)
        }
    }, [])


    const [atualizacoes, setAtualizacoes] = useState<AtualizacoesProps[]>([])
    const [user, setUser] = useState<UserProps>() //Dados do Usuario Logado
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState<UserProps[]>([]) //Dados de todos os usuarios
    const itemsPerPage = 1;
    const formRef = useRef<HTMLFormElement>(null)
    const { showModal, hideModal } = useModal()
    //Consultar dados do usuario logado
    useEffect(() => {

        const userDados = sessionStorage.getItem('user')
        if (userDados) {
            setUser(JSON.parse(userDados))
        }


    }, []);

    useEffect(() => {
        const fetchAtualizacoes = async () => {
            const response = await getAtualizacoes()
            if (response) {

                setAtualizacoes(response.data.atualizacoes)
            }
        }

        fetchAtualizacoes()

        const fetchUsers = async () => {
            const response = await getAllUsers()
            if (response) {
                setUsers(response.data.users)
            }
        }
        fetchUsers()
    }, [])

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleUpdateAtualizacaoChamado = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            formData.append('user_id', id.toString() || '')
            formData.append('_method, ', 'PUT')
            const response = await updateAtualizacoes(id, formData);
            console.log(formData)
            if (response) {
                if (response.status === false) {
                    alert('Erro' + response?.data.message)
                } else {
                    alert('Atualização realizada com sucesso')
                }
            }
        }
    }

    const handleExcluirAtualizacaoChamado = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        showModal('Tem certeza que deseja excluir essa atualização?',
            <div className="div-excluir-atualizacao">
                <Button ButtonName="Sim" type="button" variant="primary" onClick={async () => {
                    const response = await deleteAtualizacoes(id);
                    if (response) {
                        if (response.status === false) {
                            alert('Erro' + response?.data.message)
                        } else {
                            alert('Atualização excluida com sucesso')
                        }
                    }
                }} />
                <Button ButtonName="Não" type="button" variant="secondary" onClick={hideModal} />
            </div>
        )
    }

    const atualizacaoChamado = atualizacoes.filter(atualizacao => atualizacao.chamados_id === id)
    const paginatedAtualizacoes = atualizacaoChamado.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    //Nome do Usuario Logado
    const userLogado = users.find(userLogado => userLogado.id === user?.id);



    return (
        <Main>
            <section className="acompamhamento-div">
                {paginatedAtualizacoes.map(atualizacao => {

                    const userChamado = users.find(user => user.id === atualizacao.user_id);

                    return (
                        <div className="registro" key={atualizacao.id}>
                            <h1>{atualizacao.titulo}</h1>
                            <p>Data: {new Date(atualizacao.created_at).toLocaleDateString('pt-BR')}</p>
                            <p>Responsavel: {userChamado?.nome}</p>
                            <p>Descrição: {atualizacao.atualizacoes} </p>
                            {atualizacao.anexo ? <Image src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${atualizacao.anexo}`} width={400} height={200} alt="" className="chamado-anexo" /> : ''}
                            {atualizacao.anexo ? <Link href={`${process.env.NEXT_PUBLIC_API_URL}/storage/${atualizacao.anexo}`}>Clique para ver a Imagem</Link> : ''}
                            <div className="acompanhamento-buttons">
                                <Button ButtonName="Editar" type="button" variant="primary" onClick={() => {
                                    {
                                        showModal('Editar Atualização',
                                            <form className='chamado-form' ref={formRef} onSubmit={(e) => handleUpdateAtualizacaoChamado(e, atualizacao.id)}>
                                                <Input label='Titulo' type='text' name='titulo' />
                                                <Input label='Descrição' type='text' name='atualizacoes' />
                                                <Input label='Anexo' type='file' name='anexo' />
                                                <Button ButtonName='Enviar' type='submit' variant='primary' />
                                            </form>)
                                    }
                                }} />
                                <Button ButtonName="Excluir" type="button" variant="secondary" onClick={(e) => { handleExcluirAtualizacaoChamado(e, atualizacao.id) }} />
                            </div>
                        </div>
                    )
                })}
                <Pagination>
                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
                        </PaginationItem>
                        <PaginationEllipsis />
                        <PaginationItem>
                            <PaginationLink onClick={() => handlePageChange(Math.ceil(atualizacaoChamado.length / itemsPerPage))}>{Math.ceil(atualizacaoChamado.length / itemsPerPage)}</PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                </Pagination>
            </section>
        </Main>
    )
}