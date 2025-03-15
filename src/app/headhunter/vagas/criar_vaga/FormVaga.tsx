'use client'

import Button from "@/components/button/component";
import Input from "@/components/input/component";
import { useModal } from "@/components/modal/context";
import Select from "@/components/select/component";
import TagsInput from "@/components/tagsinput/component";
import TextArea from "@/components/textarea/component";
import { Spinner } from "@/components/ui/spinner";
import useNumericInput from "@/hooks/NumericInput";
import { Cargos } from "@/models/cargos";
import { Empresas } from "@/models/empresas";
import { Headhunters } from "@/models/headhunter";
import { Usuarios } from "@/models/usuarios";
import { createVagasAction } from "@/server actions/vagas.action";
import { useActionState, useEffect, useState } from "react";


interface CriarVagaProps {
    empresas: Empresas[]
    profissoes: Cargos[]
    headhunters : Headhunters[]
    userLogged: Usuarios
}


export default function CriarVagaForm({ empresas, profissoes, userLogged,headhunters }: CriarVagaProps) {


    const [isSalario, setIsSalario] = useState<boolean>(false);
    const [competencias, setCompetencias] = useState<string[]>([]);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario
    const [data, handleCriarVaga, isPending] = useActionState(createVagasAction, null)
    const { showModal } = useModal()
    const headhunterLogged = headhunters.find(headhunter => headhunter.user_id == userLogged.id)
    

    //Função onChange para Exibição Condicional do Input do Valor do Salario
    const handleInputSalario = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const value = e.currentTarget.value
        value === "valor" ? setIsSalario(true) : setIsSalario(false)
    }

    const handleCompetenciasChange = (tags: string[]) => {

        setCompetencias(tags);
    };

    useEffect(() => {
        if (data) {
            if (data.error) {
                if (typeof data.error === 'object') {
                    setFormErrors(data.error)
                } else {
                    showModal("Erro", data.error)
                    data.error = null
                }

            }
            showModal("Sucesso", data.message)


        }
    }, [data]); // Dependência para executar o efeito quando 'data' mudar






    return (
        <form className="criar-vaga-form" action={handleCriarVaga}>
            
            <div>
                <Select label="Selecione a Profissão" defaultValue="selecione" name="profissao_id">
                    <option value="selecione">Selecione</option>
                    {
                        profissoes.map((profissao) => (
                            <option key={profissao.id} value={profissao.id}>{profissao.nome}</option>
                        ))

                    }
                </Select>
                {formErrors ? formErrors.profissao_id?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Selecione a Empresa" defaultValue="selecione" name="empresa_id">
                    <option value="selecione">Selecione</option>
                    {
                        empresas.map((empresa) => (
                            <option key={empresa.id} value={empresa.id}>{empresa.nome_fantasia}</option>
                        ))

                    }
                </Select>
                {formErrors ? formErrors.empresa_id?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Nome da Vaga" type="text" name="titulo" />
                {formErrors ? formErrors.titulo?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div style={{ gridColumn: '1/-1' }}>
                <TextArea label="Descrição da Vaga" name="descricao" rows={5} cols={30} placeholder="Requisitos, Diferenciais, Atividades" />
                {formErrors ? formErrors.descricao?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div style={{ gridColumn: '1/-1' }}>
                <TagsInput label="Digite as Palavras Chaves" value={competencias} onChange={handleCompetenciasChange} inputProps={{ placeholder: 'Adicionar competência' }} />
                <Input type="hidden" name="competencias" value={competencias.join(',')} />
                {formErrors ? formErrors.competencias?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>

            <Select label="Salario Estipulado" defaultValue="selecione" name="tipo_salario" onChange={(e) => handleInputSalario(e)}>
                <option value="selecione">Selecione</option>
                <option value="A combinar">A combinar</option>
                <option value="valor">Estipular valor</option>
            </Select>
            {formErrors ? formErrors.tipo_salario?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}

            <Select label="Selecione a Senioridade" defaultValue="selecione" name="nivel_senioridade">
                <option value="selecione">Selecione</option>
                <option value="estagio">Estagio</option>
                <option value="junior">Junior</option>
                <option value="pleno">Pleno</option>
                <option value="senior">Senior</option>
                <option value="lider_tecnico">Lider Tecnico</option>
            </Select>
            {formErrors ? formErrors.nivel_senioridade?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}

            {isSalario ?
                <div>
                    <Input disabled={!isSalario} label="Salario Minimo" type="text" onInput={useNumericInput} name="salario_minimo" placeholder="R$ 2000,00" />
                    {formErrors ? formErrors.salario_minimo?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
                </div> : ''}

            {isSalario ?
                <div>
                    <Input disabled={!isSalario} label="Salario Maximo" type="text" onInput={useNumericInput} name="salario_maximo" placeholder="R$ 4000,00" />
                    {formErrors ? formErrors.salario_maximo?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
                </div> : ''}


            <div>
                <Select label="Status da Vaga" defaultValue="selecione" name="status">
                    <option value="selecione">Selecione</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Suspensa">Suspensa</option>
                    <option value="Finalizada">Finalizada</option>
                </Select>
                {formErrors ? formErrors.status?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Data de Fechamento" type="date" name="data_final" />
                {formErrors ? formErrors.data_final?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <Input type="hidden" name="headhunter_id" value={headhunterLogged?.id.toString()} />
            
            <div style={{ gridColumn: '1/-1' }}>
                <Button ButtonName="Criar Vaga" type="submit" variant="primary" />
                {isPending && <Spinner size="lg" className="bg-black dark:bg-white" />}
            </div>
        </form>
    )
}