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
import { Cargos } from "@/models/cargos";
import { Chamados } from "@/models/chamados";
import { Empresas } from "@/models/empresas";


interface ChamadoTableProps {
    chamados: Chamados[]
    empresas: Empresas[]
    profissoes : Cargos[]
}

export default function ChamadoTable({chamados, empresas, profissoes} : ChamadoTableProps) {
    const { showModal, hideModal } = useModal();
    return (
        <div className='chamado-area'>
            <h2>Lista de Chamados</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='table-head'>Id</TableHead>
                        <TableHead className='table-head' >Empresa</TableHead>
                        <TableHead className='table-head'>Profissional Desejado</TableHead>
                        <TableHead className='table-head'>Numero de Vagas</TableHead>
                        <TableHead className='table-head'>Data de Abertura</TableHead>
                        <TableHead className='table-head'>Status</TableHead>
                        <TableHead className='table-head'>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {chamados && chamados.length > 0 ? chamados.map((chamado) => {
                        const empresaSelecionada = empresas.find(empresa => empresa.id == chamado.empresa_id)
                        console.log(empresaSelecionada)
                        const profissao = profissoes.find(profissao => profissao.id === chamado.profissao_id)

                        return (
                            <TableRow key={chamado.id}>
                                <TableCell>{chamado.id}</TableCell>
                                <TableCell>{empresaSelecionada?.nome_fantasia}</TableCell>
                                <TableCell>{profissao?.nome}</TableCell>
                                <TableCell>{chamado.numero_vagas}</TableCell>
                                <TableCell>{new Date(chamado.created_at).toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell>{chamado.status}</TableCell>
                                <TableCell>
                                    <div className='table-buttons'>
                                        <Button ButtonName='Acompanhamento' type='button' variant='primary' onClick={() => {
                                            window.location.href = `/headhunter/chamados?id=${chamado.id}`
                                        }} />
                                        <Button ButtonName='Atualizar Chamado' type='button' variant='primary' onClick={() => {
                                            window.location.href = `/headhunter/atualizar_chamado?id=${chamado.id}`
                                        }} />


                                    </div>
                                </TableCell>


                            </TableRow>
                        )
                    }) : <TableRow><TableCell className="text-sm text-center" colSpan={7}>Nenhum dado encontrado </TableCell></TableRow>}
                </TableBody>
            </Table>

        </div>
    )
}