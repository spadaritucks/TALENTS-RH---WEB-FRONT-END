'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Button from "@/components/button/component"
import './page.scss'
import Select from "@/components/select/component"
import { useModal } from "@/components/modal/context"
import Input from "@/components/input/component"
import useNumericInput from "@/hooks/NumericInput"
import TextArea from "@/components/textarea/component"
import { useEffect, useRef, useState } from "react"
import { Empresas } from "@/models/empresas"
import { Usuarios } from "@/models/usuarios"
import { Chamados, ChamadosAtualizacoes } from "@/models/chamados"
import { Cargos } from "@/models/cargos"

interface ClientPanelProps {
    empresas: Empresas[]
    userEmpresas: Usuarios[]
    profissoes: Cargos[]
    chamados: Chamados[]
    atualizacoes: ChamadosAtualizacoes[]
    userLogged: Usuarios
}

export default function ClientPanel({
    empresas,
    userEmpresas,
    profissoes,
    chamados,
    atualizacoes,
    userLogged


}: ClientPanelProps) {

    const { showModal } = useModal()

    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({})


    //Filtrações dos Chamados de acordo com a empresa logada
    const empresaSelecionada = empresas.find(empresa => empresa.user_id == userLogged?.id)
    const chamadoEmpresa = chamados.filter(chamado => chamado.empresa_id == empresaSelecionada?.id)

    return (
        <div className='chamado-area'>
            <h2>Lista de Chamados</h2>
            <div className="chamados-buttons">
                <Button ButtonName="Criar Chamado" type="button" variant="primary" onClick={() => {
                    showModal('Criar Chamado',
                        <form className="chamado-form">
                            <Select label="Profissional Desejado" defaultValue="selecione" name="profissao_id" >
                                <option value='selecione'>Selecione</option>
                                {
                                    profissoes.map(profissao => (
                                        <option value={profissao.id}>{profissao.nome}</option>
                                    ))
                                }
                            </Select>
                            <Input label="Numero de Vagas" type="text" onInput={useNumericInput} name="numero_vagas" />
                            <TextArea label="Descrição do Chamado" name="descricao" />
                            <Input label="Anexo (Opcional)" type="file" name="anexo" />
                            <Button ButtonName="Criar Chamado" type="submit" variant="primary" />
                        </form>)
                }} />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='table-head'>Id</TableHead>
                        <TableHead className='table-head'>Profissional Desejado</TableHead>
                        <TableHead className='table-head'>Numero de Vagas</TableHead>
                        <TableHead className='table-head'>Data de Abertura</TableHead>
                        <TableHead className='table-head'>Status</TableHead>
                        <TableHead className='table-head'>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                         chamadoEmpresa && chamadoEmpresa.length > 0 ? chamadoEmpresa.map(chamado => {

                            const profissao = profissoes.find(profissao => profissao.id === chamado.profissao_id)
                            return (
                                <TableRow key={chamado.id}>
                                    <TableCell>{chamado.id}</TableCell>
                                    <TableCell>{profissao?.nome}</TableCell>
                                    <TableCell>{chamado.numero_vagas}</TableCell>
                                    <TableCell>{new Date(chamado.created_at).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell>{chamado.status}</TableCell>
                                    <TableCell>
                                        <div className='table-buttons'>
                                            <Button ButtonName='Acompanhamento' type='button' variant='primary' onClick={() => {
                                                window.location.href = `/empresa/chamados?id=${chamado.id}`
                                            }} />
                                            <Button ButtonName='Atualizar Chamado' type='button' variant='primary' onClick={() => {
                                                window.location.href = `/empresa/atualizar_chamado?id=${chamado.id}`
                                            }} />

                                        </div>
                                    </TableCell>


                                </TableRow>

                            )
                        }) : <TableRow><TableCell className="text-sm text-center" colSpan={7}>Nenhum dado encontrado </TableCell></TableRow>
                    }


                </TableBody>
            </Table>

        </div>
    )
}