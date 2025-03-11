'use client'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { ChamadosAtualizacoes } from "@/models/chamados";
import { Usuarios } from "@/models/usuarios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"


interface AtualizacoesProps {
    usuarios: Usuarios[]
    atualizacoes: ChamadosAtualizacoes[]
 
}


export default function Atualizacoes({ usuarios, atualizacoes }: AtualizacoesProps) {

    
    const [id, setId] = useState<number | null>(null)
   

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

    return (
        <>
            {paginatedAtualizacoes.length > 0 ? paginatedAtualizacoes.map(atualizacao => {

                const userChamado = usuarios.find(user => user.id === atualizacao.user_id);

                return (
                    <div className="registro" key={atualizacao.id}>
                        <h1>{atualizacao.titulo}</h1>
                        <p>Data: {new Date(atualizacao.created_at).toLocaleDateString('pt-BR')}</p>
                        <p>Responsavel: {userChamado?.nome}</p>
                        <p>Descrição: {atualizacao.atualizacoes} </p>
                        {atualizacao.anexo ? <img src={`${process.env.API_URL}/storage/${atualizacao.anexo}`} width={400} height={200} alt="" className="chamado-anexo" /> : ''}
                        {atualizacao.anexo ? <Link href={`${process.env.API_URL}/storage/${atualizacao.anexo}`}>Clique para ver a Imagem</Link> : ''}
                    
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
                <PaginationNext onClick={() => handlePageChange(currentPage + 1)}  />
            </Pagination>











        </>
    )
}