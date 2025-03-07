'use client'
import Button from "@/components/button/component";
import Input from "@/components/input/component";
import { useModal } from "@/components/modal/context";
import Select from "@/components/select/component";
import { Spinner } from "@/components/ui/spinner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useNumericInput from "@/hooks/NumericInput";
import { Candidatos } from "@/models/candidatos";
import { Cidades } from "@/models/cidades";
import { Estados } from "@/models/estados";
import { Usuarios } from "@/models/usuarios";
import { getCandidatosByQueryStringAction } from "@/server actions/candidato.action";
import getCidadesAction from "@/server actions/cidades.action";
import Link from "next/link";
import { useActionState, useState } from "react";

interface CandidatoTableProps {
    candidatos: Candidatos[]
    usersCandidatos: Usuarios[];
    estados: Estados[]
}




export default function CandidatoTable({ candidatos, estados }: CandidatoTableProps) {
    const { showModal } = useModal();
    const [data, HandleFiltragemAction, isPending] = useActionState(getCandidatosByQueryStringAction, null)
    const [cidades, setCidades] = useState<Cidades[] | []>([]);
   
    const candidatosFiltrados: Usuarios[] | [] = data?.users 

    const handleBuscaCidades = async (uf:string) => {
        const response = await getCidadesAction(uf)
        setCidades(response)
    }

    return (
        <div className="painel-candidatos">
            <form action={HandleFiltragemAction}>
                <Input label="Competencias" type="text" name="qualificacoes_tecnicas" placeholder="Excel, Word" />
                <Select label="Estado" name="estado" defaultValue="" onChange={(e) => handleBuscaCidades(e.target.value)}>
                    <option value="">Selecione</option>
                    {estados.map((estado) => <option key={estado.id} value={estado.id}>{estado.nome}</option>)}
                </Select>
                <Select label="Cidades" name="cidade" defaultValue="" disabled={!cidades.length} >
                    <option value="">Selecione</option>
                    {cidades.map((cidade)=><option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>)}
                </Select>
                <Input label="Pretensão Salarial (CLT)" type="text" onInput={useNumericInput} name="pretensao_salarial_clt" placeholder="R$ 2000,00" />
                <Input label="Pretensão Salarial (PJ)" type="text" onInput={useNumericInput} name="pretensao_salarial_pj" placeholder="R$ 2000,00" />
                <Input label="Graduação Principal" type="text" name="graduacao_principal" placeholder="Direito" />

                <div style={{ gridColumn: '1/-1' }}>
                    <Button ButtonName="Buscar" variant="primary" type="submit" disabled={isPending} />
                    {isPending ? <Spinner size="lg" className="bg-black dark:bg-white" /> : null}
                </div>
            </form>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="table-head">Id</TableHead>
                        <TableHead className="table-head">Nome</TableHead>
                        <TableHead className="table-head">Telefone</TableHead>
                        <TableHead className="table-head">Cargo Alvo</TableHead>
                        <TableHead className="table-head">Pretensão Salarial (CLT)</TableHead>
                        <TableHead className="table-head">Curriculo</TableHead>
                        <TableHead className="table-head">Ações</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>

                    {candidatosFiltrados ? candidatosFiltrados.map((user) => {

                        const candidato = candidatos.filter(candidato => candidato.user_id === user.id);
                        return (
                            candidato.map((candidato) => (
                                <TableRow key={candidato.id}>
                                    <TableCell className="table-cell">{candidato.id}</TableCell>
                                    <TableCell className="table-cell">{user.nome}</TableCell>
                                    <TableCell className="table-cell"><Link href={`https://wa.me/${user.celular_1}`}><Button ButtonName="Telefone" type="button" variant="primary" /></Link></TableCell>
                                    <TableCell className="table-cell">{candidato.posicao_desejada}</TableCell>
                                    <TableCell> R$ {candidato.pretensao_salarial_clt}</TableCell>
                                    <TableCell><Link href={`${process.env.API_URL}/storage/${candidato.cv}`} target="blank"><Button ButtonName="Baixar Curriculo" type="button" variant="primary"/></Link></TableCell>
                                    <TableCell className="table-cell">
                                        <div className="table-actions">
                                            <Button ButtonName="Dados Pessoais" type="button" variant="secondary" onClick={() => {
                                                showModal('Dados Pessoais', <div className="modal_dados">
                                                    <p> Nome : {user.nome}</p>
                                                    <p> Sobrenome: {user.sobrenome}</p>
                                                    <p> Email : {user.email}</p>
                                                    <p> Cidade : {user.cidade}</p>
                                                    <p> Estado : {user.estado}</p>
                                                    <p> Celular 1: {user.celular_1}</p>
                                                    <p> Celular 2: {user.celular_2}</p>
                                                    <p> Data de Nascimento: {new Date(user.data_nascimento).toLocaleDateString()}</p>
                                                    <p> Linkedin : {user.linkedin}</p>
                                                </div>)
                                            }} />
                                            <Button ButtonName="Informações" type="button" variant="secondary" onClick={() => {
                                                showModal('Informações do Candidato', <div className="modal_dados">

                                                    <p> Ultimo Cargo: {candidato.ultimo_cargo}</p>
                                                    <p> Ultimo Salario:  R$ {candidato.ultimo_salario}</p>
                                                    <p> Pretensao Salarial (CLT) :  R$ {candidato.pretensao_salarial_clt}</p>
                                                    <p> Pretensão Salarial (PJ) : R$ {candidato.pretensao_salarial_pj}</p>
                                                    <p> Posição Desejada  :{candidato.posicao_desejada}</p>
                                                    <p> Escolaridade : {candidato.escolaridade}</p>
                                                    <p> Graduação Principal : {candidato.graduacao_principal}</p>
                                                    <p> Como Conheceu: {candidato.como_conheceu}</p>
                                                    <p> Consultor da Talents: {candidato.consultor_talents}</p>
                                                    <p> Qualificações Tecnicas : {candidato.qualificacoes_tecnicas}</p>
                                                    <p> Cerficacações : {candidato.certificacoes}</p>
                                                </div>)
                                            }} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }) : <TableRow><TableCell colSpan={7} className="text-center">Realize uma busca para visualizar os candidatos</TableCell></TableRow>}
                </TableBody>
            </Table>
        </div>
    )
}