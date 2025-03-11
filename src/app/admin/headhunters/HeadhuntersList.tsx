'use client'
import Button from "@/components/button/component";
import { useModal } from "@/components/modal/context";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Headhunters } from "@/models/headhunter";
import { Usuarios } from "@/models/usuarios";
import { Link } from "lucide-react";

interface HeadhuntersListProps {
    headhunters: Headhunters[]
    userHeadhunters: Usuarios[]

}

export default function HeadhuntersList({
    headhunters,
    userHeadhunters
} : HeadhuntersListProps) {

    const { showModal, hideModal } = useModal();
    return (
        <div className="headhunter-painel">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='table-head'>Id</TableHead>
                        <TableHead className='table-head'>Nome</TableHead>
                        <TableHead className='table-head'>Telefone</TableHead>
                        <TableHead className='table-head'>Curriculo</TableHead>
                        <TableHead className='table-head'>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { headhunters && headhunters.length > 0 ? headhunters.map((headhunter) => {
                        const user = userHeadhunters.find(user => user.id === headhunter.user_id)
                        return (
                            <TableRow key={headhunter.id}>
                                <TableCell>{headhunter.id}</TableCell>
                                <TableCell>{user?.nome} {user?.sobrenome}</TableCell>
                                <TableCell><Link href={`https://wa.me/${user?.celular_1} `}><Button ButtonName="Telefone" type="button" variant="primary" /></Link></TableCell>
                                <TableCell><Link href={`${process.env.API_URL}/storage/${headhunter.cv}`} >Baixar o Curriculo</Link></TableCell>
                                <TableCell className="table-cell"><div className="table-actions">
                                    <Button ButtonName="Dados Pessoais" type="button" variant="primary" onClick={() => {
                                        showModal('Dados Pessoais', <div className="modal_dados">
                                            <p> Nome : {user?.nome}</p>
                                            <p> Sobrenome: {user?.sobrenome}</p>
                                            <p> Email : {user?.email}</p>
                                            <p> Cidade : {user?.cidade}</p>
                                            <p> Estado : {user?.estado}</p>
                                            <p> Celular 1: {user?.celular_1}</p>
                                            <p> Celular 2: {user?.celular_2}</p>
                                            <p> Data de Nascimento: {user?.data_nascimento ? new Date(user.data_nascimento).toLocaleDateString() : 'Não informado'}</p>
                                            <p> Linkedin : {user?.linkedin}</p>
                                        </div>)
                                    }} />
                                    <Button ButtonName="Informações" type="button" variant="secondary" onClick={() => {
                                        showModal('Informações do Headhunter', <div className="modal_dados">
                                            <p> Como Conheceu: {headhunter.como_conheceu}</p>
                                            <p> Situação: {headhunter.situacao}</p>
                                            <p> Descrição do Comportamento: {headhunter.comportamento_description}</p>
                                            <p> Anos de Trabalho: {headhunter.anos_trabalho}</p>
                                            <p> Quantia de Vagas: {headhunter.quantia_vagas}</p>
                                            <p> Horas Diárias: {headhunter.horas_diarias}</p>
                                            <p> Dias Semanais: {headhunter.dias_semanais}</p>
                                            <p> Nível de Senioridade: {headhunter.nivel_senioridade}</p>
                                            <p> Segmento: {headhunter.segmento}</p>
                                            <p> Currículo: <Link href={`${process.env.NEXT_PUBLIC_API_URL}/storage/${headhunter.cv}`} >Baixar o Curriculo</Link></p>
                                        </div>)

                                    }} />
                                </div></TableCell>

                            </TableRow>
                        )
                    }) : <TableRow><TableCell className="text-sm text-center" colSpan={7}>Nenhum dado encontrado </TableCell></TableRow>}
                </TableBody>
            </Table>
        </div>
    )
}