'use client'
import Button from "@/components/button/component"
import Counter from "@/components/counter/component"
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

    const { showModal } = useModal();
    const router = useRouter()
    const [candidatoCount, setCandidatosCount] = useState<number>(0)
    const [empresasCount, setEmpresasCount] = useState<number>(0)
    const [headhunterCount, setHeadhuntersCount] = useState<number>(0)

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

    useEffect(() => {
        setCandidatosCount(candidatos.length)
        setEmpresasCount(empresas.length)
        setHeadhuntersCount(headhunters.length)
    }, [candidatos, empresas, headhunters])

    return (
        <>
            <div className='dashboard-area'>
                <Counter title="Candidatos" counter={candidatoCount} />
                <Counter title="Clientes" counter={empresasCount} />
                <Counter title="Headhunters" counter={headhunterCount} />
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
                            <TableHead className='table-head'>Atribuido para</TableHead>
                            <TableHead className='table-head'>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {chamados && chamados.length > 0 ? chamados.map((chamado) => {

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
                    </TableBody>
                </Table>

            </div>
        </>
    )

}