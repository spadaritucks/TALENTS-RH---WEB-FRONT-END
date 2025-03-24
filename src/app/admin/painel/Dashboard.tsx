'use client'
import Button from "@/components/button/component"
import Counter from "@/components/counter/component"
import DashboardTable from "@/components/dashboard_table/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
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
import { Chamados, ChamadosAtualizacoes, ChamadoStatus } from "@/models/chamados"
import { Empresas } from "@/models/empresas"
import { Headhunters } from "@/models/headhunter"
import { Usuarios } from "@/models/usuarios"
import { Vagas, VagaStatus } from "@/models/vagas"
import { updateChamadosAction } from "@/server actions/chamados.action"
import { useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from "react"

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
    vagas: Vagas[]

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
    atualizacoes,
    vagas
}: DashboardProps) {

    const { showModal } = useModal();
    const router = useRouter()
    const [data, HandleUpdateChamado, isPending] = useActionState(updateChamadosAction, null)

    // Atualiza os erros quando há resposta da API
    useEffect(() => {
        if (data) {
            if (data.error) {
                showModal("Erro", data.error)
                data.error = null
            }

            showModal("Sucesso", data.message)
            router.refresh()
        }


    }, [data]); // Dependência para executar o efeito quando 'data' mudar


    return (
        <>
            <div className='dashboard-area'>
                <Counter title="Candidatos" counter={candidatos.length} />
                <Counter title="Clientes" counter={empresas.length} />
                <Counter title="Headhunters" counter={headhunters.length} />
                <DashboardTable
                    title="N° de Vagas por Headhunter"
                    tableHeads={['Vagas', 'Ativas', 'Suspensa', 'Cancelada']}
                    tableBody={headhunters.map((headhunter) => {
                        const vagasHeadhunter = vagas.filter(vaga => vaga.headhunter_id == headhunter.id)
                        const vagasAtivas = vagas.filter(vaga => vaga.status == VagaStatus.Ativa)
                        const vagasSuspensas = vagas.filter(vaga => vaga.status == VagaStatus.Suspensa)
                        const vagasCanceladas = vagas.filter(vaga => vaga.status == VagaStatus.Cancelada)
                        const userHeadhunter = userHeadhunters.find(user => user.id == headhunter.user_id)
                        return (
                            <TableRow key={headhunter.id}>
                                <TableCell>{userHeadhunter?.nome} {userHeadhunter?.sobrenome}</TableCell>
                                {vagasHeadhunter && vagasHeadhunter.length > 0 ? <TableCell>{vagasHeadhunter.length}</TableCell> : <TableCell>0</TableCell>}
                                {vagasAtivas && vagasAtivas.length > 0 ? <TableCell>{vagasAtivas.length}</TableCell> : <TableCell>0</TableCell>}
                                {vagasSuspensas && vagasSuspensas.length > 0 ? <TableCell >{vagasSuspensas.length}</TableCell> : <TableCell>0</TableCell>}
                                {vagasCanceladas && vagasCanceladas.length > 0 ? <TableCell>{vagasCanceladas.length}</TableCell> : <TableCell>0</TableCell>}
                            </TableRow>
                        )
                    })}
                />
                <DashboardTable
                    title="N° de Chamados Atribuidos por Headhunter"
                    tableHeads={['Nome', 'Chamados Atribuidos', 'Em Andamento', 'Concluídos']}
                    tableBody={headhunters.map((headhunter) => {
                        const chamadoAtribuidos = chamados.filter(chamado => chamado.headhunter_id == headhunter.id)
                        const chamadosEmAndamento = chamadoAtribuidos.filter(chamado => chamado.status == ChamadoStatus.Andamento)
                        const chamadosConcluidos = chamadoAtribuidos.filter(chamado => chamado.status == ChamadoStatus.Concluido)
                        const userHeadhunter = userHeadhunters.find(user => user.id == headhunter.user_id)
                        return (
                            <TableRow key={headhunter.id}>
                                <TableCell>{userHeadhunter?.nome} {userHeadhunter?.sobrenome}</TableCell>
                                {chamadoAtribuidos && chamadoAtribuidos.length > 0 ? <TableCell>{chamadoAtribuidos.length}</TableCell> : <TableCell>0</TableCell>}
                                {chamadosEmAndamento && chamadosEmAndamento.length > 0 ? <TableCell>{chamadosEmAndamento.length}</TableCell> : <TableCell>0</TableCell>}
                                {chamadosConcluidos && chamadosConcluidos.length > 0 ? <TableCell>{chamadosConcluidos.length}</TableCell> : <TableCell>0 </TableCell>}
                            </TableRow>
                        )
                    })}
                />

                <DashboardTable
                    title="N° de Chamados abertos por Empresa "
                    tableHeads={['Nome', 'Chamados Atribuidos', 'Em Andamento', 'Concluídos']}
                    tableBody={empresas.map((empresa) => {
                        const chamadoAbertos = chamados.filter(chamado => chamado.empresa_id == empresa.id)
                        const chamadosEmAndamento = chamadoAbertos.filter(chamado => chamado.status == ChamadoStatus.Andamento)
                        const chamadosConcluidos = chamadoAbertos.filter(chamado => chamado.status == ChamadoStatus.Concluido)
                        
                        
                        return (
                            <TableRow key={empresa.id}>
                                <TableCell>{empresa.nome_fantasia}</TableCell>
                                {chamadoAbertos && chamadoAbertos.length > 0 ? <TableCell>{chamadoAbertos.length}</TableCell> : <TableCell>0</TableCell>}
                                {chamadosEmAndamento && chamadosEmAndamento.length > 0 ? <TableCell>{chamadosEmAndamento.length}</TableCell> : <TableCell>0</TableCell>}
                                {chamadosConcluidos && chamadosConcluidos.length > 0 ? <TableCell>{chamadosConcluidos.length}</TableCell> : <TableCell>0 </TableCell>}
                            </TableRow>
                        )
                    })}
                />


            </div>
            <div className='chamado-area'>

                <DashboardTable
                    title="Lista de Chamados"
                    tableHeads={['Id', 'Empresa', 'Profissional Desejado', 'Numero de Vagas', 'Data de Abertura', 'Status', 'Atribuido para', 'Ações']}
                    tableBody={chamados && chamados.length > 0 ? chamados.map((chamado) => {

                        const empresaSelecionada = empresas.find(empresa => empresa.id == chamado.empresa_id)
                        const profissao = profissoes.find(profissao => profissao.id === chamado.profissao_id)
                        const headhunterAtribuido = headhunters.find(headhunter => headhunter.id == chamado.headhunter_id)
                        const userHeadhunterAtribuido = userHeadhunters.find(headhunter => headhunter.id === headhunterAtribuido?.user_id)

                        return (
                            <TableRow key={chamado.id}>
                                <TableCell>{chamado.id}</TableCell>
                                <TableCell>{empresaSelecionada?.nome_fantasia}</TableCell>
                                <TableCell>{profissao?.nome}</TableCell>
                                <TableCell>{chamado.numero_vagas}</TableCell>
                                <TableCell>{new Date(chamado.created_at).toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell>{chamado.status}</TableCell>
                                {headhunterAtribuido && userHeadhunterAtribuido ? <TableCell>{userHeadhunterAtribuido.nome} {userHeadhunterAtribuido.sobrenome}</TableCell> :
                                    <TableCell>
                                        <Button ButtonName="Atribuir" variant="secondary" type="button" onClick={
                                            () => showModal('Atribuir Chamado', <form action={HandleUpdateChamado} className="flex flex-col items-center justify-center gap-3">
                                                <Select label="Headhunters" name="headhunter_id" defaultValue="Selecione">
                                                    <option value="Selecione" disabled>Selecione</option>
                                                    {userHeadhunters.map((user) => {

                                                        const headhunterId = headhunters.find(headhunter => headhunter.user_id == user.id)

                                                        return <option key={user.id} value={headhunterId?.id}>{user.nome} {user.sobrenome}</option>
                                                    }

                                                    )}
                                                </Select>
                                                <Input type="hidden" name="id" value={chamado.id.toString()} />
                                                <Button ButtonName="Atribuir" type="submit" variant="primary" />
                                            </form>)
                                        } />



                                    </TableCell>
                                }

                                <TableCell>
                                    <div className='table-buttons'>
                                        {chamado.status == ChamadoStatus.Aguardando ?
                                            <form action={HandleUpdateChamado} >
                                                <Input type="hidden" name="id" value={chamado.id.toString()} />
                                                <Input type="hidden" name="status" value={ChamadoStatus.Andamento} />
                                                <Button ButtonName="Validar Chamado" type="submit" variant="secondary" />
                                            </form> : null}
                                        <Button ButtonName="Descrição" type="button" variant="secondary" onClick={() => {
                                            showModal("Descrição do Chamado", <p>
                                                {chamado.descricao}
                                            </p>)
                                        }} />
                                        <Button
                                            ButtonName='Acompanhamento'
                                            type='button'
                                            variant='primary'
                                            disabled={chamado.status == ChamadoStatus.Aguardando}
                                            onClick={() => {
                                                window.location.href = `/admin/chamados?id=${chamado.id}`
                                            }} />
                                        <Button
                                            ButtonName='Atualizar Chamado'
                                            type='button'
                                            variant='primary'
                                            disabled={chamado.status == ChamadoStatus.Aguardando}
                                            onClick={() => {
                                                window.location.href = `/admin/atualizar_chamado?id=${chamado.id}`
                                            }} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    }) : <TableRow><TableCell className="text-sm text-center" colSpan={7}>Nenhum dado encontrado </TableCell></TableRow>}
                />
            </div>
        </>
    )

}