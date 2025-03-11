'use client'


import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import { Spinner } from "@/components/ui/spinner"
import useNumericInput from "@/hooks/NumericInput"
import { Candidatos } from "@/models/candidatos"
import { Cidades } from "@/models/cidades"
import { Empresas } from "@/models/empresas"
import { Estados } from "@/models/estados"
import { Headhunters } from "@/models/headhunter"
import { Processos, StatusProcesso } from "@/models/processos"
import { Usuarios } from "@/models/usuarios"
import { Vagas } from "@/models/vagas"
import getCidadesAction from "@/server actions/cidades.action"
import { getVagaByQueryStringAction } from "@/server actions/vagas.action"
import { useActionState, useState } from "react"




interface VagasListProps {
    vagas: Vagas[]
    processos: Processos[]
    candidatos: Candidatos[]
    empresas: Empresas[]
    headhunters: Headhunters[]
    usersCandidatos: Usuarios[];
    usersEmpresas: Usuarios[];
    usersHeadhunters: Usuarios[];
    userLogged: Usuarios
    estados: Estados[]
}

export default function VagasList({
    processos,
    candidatos,
    empresas,
    headhunters,
    usersEmpresas,
    usersHeadhunters,
    userLogged,
    estados

}: VagasListProps) {
    const { showModal } = useModal()
    const [dataVagas, HandleFiltragemAction, isPendingVagas] = useActionState(getVagaByQueryStringAction, null)
    const vagasFiltradas: Vagas[] = dataVagas
    const [cidades, setCidades] = useState<Cidades[] | []>([]);

    const handleBuscaCidades = async (uf: string) => {
        const response = await getCidadesAction(uf)
        setCidades(response)
    }




    return (
        <>
            <div className="search-vagas">
                <form action={HandleFiltragemAction}>
                    <Input type="text" name="competencias" label="Competencias" placeholder="Excel, Word" />
                    <Select label="Estado" name="estado" defaultValue="" onChange={(e) => handleBuscaCidades(e.target.value)}>
                        <option value="">Selecione</option>
                        {estados.map((estado) => <option key={estado.id} value={estado.id}>{estado.nome}</option>)}
                    </Select>
                    <Select label="Cidades" name="cidade" defaultValue="" disabled={!cidades.length} >
                        <option value="">Selecione</option>
                        {cidades.map((cidade) => <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>)}
                    </Select>
                    <Select label="Nivel de Senioridade" name="nivel_senioridade" defaultValue="">
                        <option value="">Selecione</option>
                        <option value="estagio">Estagio</option>
                        <option value="junior">Junior</option>
                        <option value="pleno">Pleno</option>
                        <option value="senior">Senior</option>
                        <option value="lider_tecnico">Lider Tecnico</option>
                    </Select>
                    <Input label="Salario Minimo" type="text" onInput={useNumericInput} name="salario_minimo" placeholder="R$ 2000,00" />
                    <Input label="Salario Maximo" type="text" onInput={useNumericInput} name="salario_maximo" placeholder="R$ 5000,00" />

                    <div style={{ gridColumn: '1/-1', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Button ButtonName="Buscar" type="submit" variant="primary" disabled={isPendingVagas} />
                        {isPendingVagas ? <Spinner size="lg" className="bg-black dark:bg-white" /> : null}
                    </div>

                </form>
            </div>
            <div className="vagas-container">
                {vagasFiltradas && vagasFiltradas.length > 0 ? vagasFiltradas.map((vaga) => {


                    const headhunterId = headhunters.find(headhunter => headhunter.id === vaga.headhunter_id)
                    const headhunterUser = usersHeadhunters.find(user => user.id === headhunterId?.user_id)

                    //Filtração para o Endereço da Empresa da vaga
                    const vagaEmpresa = empresas.find(vagaEmpresa => vagaEmpresa.id === vaga.empresa_id)
                    const userEmpresa = usersEmpresas.find(user => user.id == vagaEmpresa?.user_id)

                    return (
                        <div key={vaga.id} className="vaga-card">
                            <h2>{vaga.titulo}</h2>
                            <h3>{vagaEmpresa?.nome_fantasia}</h3>
                            <p><strong>Responsavel: </strong>{headhunterUser?.nome} {headhunterUser?.sobrenome}</p>
                            <p><strong>Região: </strong>{userEmpresa?.cidade} - {userEmpresa?.estado}</p>
                            <p><strong>Nivel :</strong> {vaga.nivel_senioridade}</p>
                            {vaga.tipo_salario === "valor" ? <p><strong>Salario: </strong> De R${vaga.salario_minimo} até R${vaga.salario_maximo}</p> : <p><strong>Salario: </strong>{vaga.tipo_salario}</p>}
                            <p><strong>Publicada em:</strong> {new Date(vaga.created_at).toLocaleDateString('pt-BR')}</p>
                            <p><strong>Requisitos: </strong>{Array.isArray(vaga.competencias) ? vaga.competencias.join(', ') : vaga.competencias}</p>
                            <Button ButtonName="Exibir Descrição da Vaga" type="button" variant="secondary" onClick={() => {
                                showModal("Descrição da Vaga",
                                    <p>{vaga.descricao}</p>
                                )
                            }} />
                            <Button ButtonName="Ver Candidatos" type="button" variant="primary" onClick={() => {
                                window.location.href = `/admin/candidato_vaga?id=${vaga.id}`
                            }} />

                        </div>
                    )
                }) : <p>Selecione uma opção de busca de vagas</p>}
            </div></>
    )
}



