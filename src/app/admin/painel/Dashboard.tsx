'use client'
import { BarsChart } from "@/components/barchart/component"
import Button from "@/components/button/component"
import { LineCharts } from "@/components/linechart/component"
import { AreaBarChart } from "@/components/radialchart/component"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Candidatos } from "@/models/candidatos"
import { Cargos } from "@/models/cargos"
import { Chamados, ChamadosAtualizacoes } from "@/models/chamados"
import { Empresas } from "@/models/empresas"
import { Headhunters } from "@/models/headhunter"
import { Usuarios } from "@/models/usuarios"

interface DashboardProps {
    empresas: Empresas[]
    userEmpresas: Usuarios[]
    candidatos: Candidatos[]
    userCandidatos: Usuarios[]
    headhunters: Headhunters[]
    userHeadhunters: Usuarios[]
    profissoes: Cargos[]
    chamados: Chamados[]
    atualizacoes: ChamadosAtualizacoes[]

}

export default function Dashboard({
    empresas,
    userEmpresas,
    candidatos,
    userCandidatos,
    headhunters,
    userHeadhunters,
    profissoes,
    chamados,
    atualizacoes
}: DashboardProps) {

    return (
        <>
            <div className='dashboard-area'>
                <BarsChart />
                <LineCharts />
                <AreaBarChart />
            </div>
            <div className='chamado-area'>
                <h2>Lista de Chamados</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='table-head'>Id</TableHead>
                            <TableHead className='table-head'>Empresa</TableHead>
                            <TableHead className='table-head'>Profissional Desejado</TableHead>
                            <TableHead className='table-head'>Numero de Vagas</TableHead>
                            <TableHead className='table-head'>Data de Abertura</TableHead>
                            <TableHead className='table-head'>Status</TableHead>
                            <TableHead className='table-head'>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {chamados.map((chamado) => {

                            const empresaSelecionada = empresas.find(empresa => empresa.id == chamado.empresa_id)
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
                                                window.location.href = `/admin/chamados?id=${chamado.id}`
                                            }} />
                                            <Button ButtonName='Atualizar Chamado' type='button' variant='primary' onClick={() => {
                                                window.location.href = `/admin/atualizar_chamado?id=${chamado.id}`
                                            }} />

                                        </div>
                                    </TableCell>


                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

            </div>
        </>
    )

}