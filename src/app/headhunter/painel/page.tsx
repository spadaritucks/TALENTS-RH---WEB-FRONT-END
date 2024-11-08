'use client'

import Main from "@/layouts/headhunter/layout"
import './page.scss'
import Link from "next/link"
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
import Input from "@/components/input/component"
import { useState } from "react"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import TextArea from "@/components/textarea/component"
import useNumericInput from "@/hooks/NumericInput"



export default function Painel() {
    const [descricaoVaga, setDescricaoVaga] = useState<boolean>(false);
    const [criarVaga, setCriarVaga] = useState<boolean>(false);
    const { showModal } = useModal();
    const modalOpened = descricaoVaga || criarVaga

    //Exibição da Janela Modal de Descrição da Vaga
    const handleDescricaoVaga = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDescricaoVaga(!descricaoVaga);
        showModal('Descrição da Vaga', <div>Descrição da Vaga</div>);
    }

    //Exibição da Janela Modal de Criar Vaga de Emprego
    const handleCriarVaga = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCriarVaga(!criarVaga);
        showModal('Criar Vaga de Emprego', <CriarVagaForm />);
    }






    return (
        <Main>

            <section className="headhunter-area">
                <h1>Painel do Headhunter</h1>
                <div className="headhunter-operations">
                    <Button ButtonName="Criar Vaga" onClick={handleCriarVaga} type="button" variant="primary" />
                    <div className="painel-vagas">
                        <div className="painel-vagas-create-search">
                            <Input label="Pesquisar Vaga" type="text" />
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="table-head">Id</TableHead>
                                    <TableHead className="table-head">Vaga</TableHead>
                                    <TableHead className="table-head">Responsavel</TableHead>
                                    <TableHead className="table-head">Nivel</TableHead>
                                    <TableHead className="table-head">Salario</TableHead>
                                    <TableHead className="table-head">Descrição da Vaga</TableHead>
                                    <TableHead className="table-head">Data de Criação</TableHead>
                                    <TableHead className="table-head">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="table-cell">1</TableCell>
                                    <TableCell className="table-cell">Desenvolvedor Front-End</TableCell>
                                    <TableCell className="table-cell">João da Silva</TableCell>
                                    <TableCell className="table-cell">Pleno</TableCell>
                                    <TableCell className="table-cell">R$ 5.000,00</TableCell>
                                    <TableCell className="table-cell"><Button ButtonName="Descrição" type="button" variant="secondary" onClick={handleDescricaoVaga} /></TableCell>
                                    <TableCell className="table-cell">2024-01-01</TableCell>
                                    <TableCell className="table-cell">Ativo</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                </div>
            </section>
        </Main>
    )
}


//Formulario de Criação de Vaga de Emprego
const CriarVagaForm = () => {

    const [isSalario, setIsSalario] = useState<boolean>(false);

    //Função onChange para Exibição Condicional do Input do Valor do Salario
    const handleInputSalario = (e:React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const value = e.currentTarget.value
        value === "valor" ? setIsSalario(true) : setIsSalario(false)
    }

    return (
        <form>
            <Select label="Selecione a Empresa" defaultValue="selecione" name="empresa_id">
                <option value="selecione">Selecione</option>
                <option value="1">Empresa 1</option>
            </Select>
            <Select label="Selecione a Profissão" defaultValue="selecione" name="profissao_id">
                <option value="selecione">Selecione</option>
                <option value="1">Desenvolvedor Front-End</option>
            </Select>
            <Input label="Nome da Vaga" type="text" name="titulo" />
            <TextArea label="Descrição da Vaga" name="descricao" rows={5} cols={30} placeholder="Requisitos, Diferenciais, Atividades" />
            <Select label="Salario Estipulado" defaultValue="selecione" name="salario" onChange={(e)=> handleInputSalario(e)}>
                <option value="selecione">Selecione</option>
                <option value="A combinar">A combinar</option>
                <option value="valor">Estipular valor</option>
            </Select>
            {isSalario ? <Input disabled={!isSalario} label="Valor do Salario" type="text" onInput={useNumericInput} name = "salario" placeholder="R$ 2000,00" /> : ''}


            <Select label="Selecione a Senoridade" defaultValue="selecione" name="nivel_senoridade">
                <option value="selecione">Selecione</option>
                <option value="estagio">Estagio</option>
                <option value="junior">Junior</option>
                <option value="pleno">Pleno</option>
                <option value="senior">Senior</option>
                <option value="lider_tecnico">Lider Tecnico</option>
            </Select>
        </form>
    )
}
