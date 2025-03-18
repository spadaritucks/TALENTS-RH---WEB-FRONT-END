'use client'
import Button from "@/components/button/component";
import Input from "@/components/input/component";
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
import { Chamados, ChamadoStatus } from "@/models/chamados";
import { Empresas } from "@/models/empresas";
import { Headhunters } from "@/models/headhunter";
import { Usuarios } from "@/models/usuarios";
import { updateChamadosAction } from "@/server actions/chamados.action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";



interface ChamadoTableProps {
    chamados: Chamados[]
    empresas: Empresas[]
    profissoes: Cargos[]
    userLogged: Usuarios
    headhunters : Headhunters[]
}

export default function ChamadoTable({ chamados, empresas, profissoes, userLogged, headhunters }: ChamadoTableProps) {
    const { showModal, hideModal } = useModal();
    const router = useRouter()
    const [data, HandleStatusChamado, isPending] = useActionState(updateChamadosAction, null)


    //Filtragem de Chamados Atribuidos
    const headhunter = headhunters.find(headhunter => headhunter.user_id == userLogged.id)
    const chamadosAtribuidos = chamados.filter(chamado => chamado.headhunter_id == headhunter?.id)


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
                    {chamadosAtribuidos && chamadosAtribuidos.length > 0 ? chamadosAtribuidos.map((chamado) => {
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
                                        {chamado.status == ChamadoStatus.Aguardando ?
                                            <form action={HandleStatusChamado}>
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
                                                    window.location.href = `/headhunter/chamados?id=${chamado.id}`
                                                }} />
                                            <Button
                                                ButtonName='Atualizar Chamado'
                                                type='button'
                                                variant='primary'
                                                disabled={chamado.status == ChamadoStatus.Aguardando}
                                                onClick={() => {
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