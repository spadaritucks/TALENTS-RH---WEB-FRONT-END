'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import TextArea from "@/components/textarea/component"
import { Spinner } from "@/components/ui/spinner"
import useNumericInput from "@/hooks/NumericInput"
import { consultores } from "@/json/consultores"
import { Candidatos } from "@/models/candidatos"
import { Cargos } from "@/models/cargos"
import { updateCandidatoAction } from "@/server actions/candidato.action"
import { useActionState, useState, useEffect } from "react"

interface FormProps {
    cargos: Cargos[]
    candidatos: Candidatos[]
    
}

export function CadastroForm({ cargos, candidatos }: FormProps) {
    const [data, HandleUpdateAction, isPending] = useActionState(updateCandidatoAction, null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
    const { showModal } = useModal();

    useEffect(() => {
        if (typeof window !== 'undefined') { // Garante que só executa no cliente
            const searchParams = new URLSearchParams(window.location.search)
            const idString = searchParams.get('id')
            setId(idString ? parseInt(idString) : null)
        }
    }, [])
    const [id, setId] = useState<number | null>(null)

    const candidato = candidatos.find(candidato => candidato.user_id == id)

    const [form, setForm] = useState({
        ultimo_cargo: '',
        ultimo_salario: '',
        pretensao_salarial_clt: '',
        pretensao_salarial_pj: '',
        posicao_desejada: '',
        escolaridade: '',
        graduacao_principal: '',
        como_conheceu: '',
        consultor_talents: '',
        nivel_ingles: '',
        certificacoes: '',
        qualificacoes_tecnicas: '',
        cv: '',
    })

    // Atualiza os erros quando há resposta da API
    useEffect(() => {
        if (data) {
            if (data.error) {
                if (typeof data.error === "object") {
                    setFormErrors(data.error);
                } else {

                    showModal("Erro", data.error)
                    data.error = null
                }
            }
            showModal('Sucesso', data.message)
        }
    }, [data]); // Dependência para executar o efeito quando 'data' mudar

    useEffect(()=>{
        candidato ? setForm({
            ...form,
            ultimo_cargo: candidato.ultimo_cargo,
            ultimo_salario: candidato.ultimo_salario.toString(),
            pretensao_salarial_clt: candidato.pretensao_salarial_clt.toString(),
            pretensao_salarial_pj: candidato.pretensao_salarial_pj.toString(),
            posicao_desejada: candidato.posicao_desejada,
            escolaridade: candidato.escolaridade,
            graduacao_principal: candidato.graduacao_principal,
            como_conheceu: candidato.como_conheceu,
            consultor_talents: candidato.consultor_talents,
            nivel_ingles: candidato.nivel_ingles,
            certificacoes: candidato.certificacoes,
            qualificacoes_tecnicas: candidato.qualificacoes_tecnicas,
            cv: candidato.cv,
        }) : null
    },[candidato,id])



    return (

        <form action={HandleUpdateAction}>
            <div>
                <Input label="Ultimo Cargo" placeholder='Ex: Desenvolvedor Front-End' type="text" name="ultimo_cargo" defaultValue={form.ultimo_cargo} />
                {formErrors ? formErrors.ultimo_cargo?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Ultimo Salario" placeholder='Ex: R$ 2000,00' type="text" name="ultimo_salario" onInput={useNumericInput} defaultValue={form.ultimo_salario} />
                {formErrors ? formErrors.ultimo_salario?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label='Pretensão Salarial CLT' placeholder='Ex: R$ 2000,00' type='text' name='pretensao_salarial_clt' onInput={useNumericInput} defaultValue={form.pretensao_salarial_clt} />
                {formErrors ? formErrors.pretensao_salarial_clt?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label='Pretensão Salarial PJ' placeholder='Ex: R$ 2000,00' type='text' name='pretensao_salarial_pj' onInput={useNumericInput} defaultValue={form.pretensao_salarial_pj} />
                {formErrors ? formErrors.pretensao_salarial_pj?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select key={cargos.length} label="Posição Desejada" name='posicao_desejada' defaultValue={form.posicao_desejada}>
                    <option disabled value='Selecione'>Selecione</option>,
                    {cargos.map((profissao, index) => (
                        <option value={profissao.id} key={index}>{profissao.nome}</option>
                    ))}
                </Select>
                {formErrors ? formErrors.posicao_desejada?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Escolaridade" name='escolaridade' defaultValue={form.escolaridade}>
                    <option disabled value='Selecione'>Selecione</option>
                    <option value="Ensino Medio">Ensino Medio</option>
                    <option value="Ensino Superior">Ensino Superior</option>
                    <option value="Pos-Graduação">Pos-Graduação</option>
                    <option value="Outros">Outros</option>
                </Select>
                {formErrors ? formErrors.escolaridade?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Graduação Principal" placeholder='Ex: Direito, Recursos Humanos' type="text" name="graduacao_principal" defaultValue={form.graduacao_principal} />
                {formErrors ? formErrors.graduacao_principal?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Como nos conheceu?" name='como_conheceu' defaultValue={form.como_conheceu}>
                    <option disabled value='Selecione'>Selecione</option>
                    <option value="Nossa consultora entrou em contato com você">Nossa consultora entrou em contato com você</option>
                    <option value="Anúncio da vaga">Anúncio da vaga</option>
                    <option value="Sites de Emprego">Sites de Emprego</option>
                    <option value="Ví a vaga no LinkedIn">Ví a vaga no LinkedIn</option>
                    <option value="Site da Talents RH">Site da Talents RH</option>
                    <option value="Consultoria Parceira">Consultoria Parceira</option>
                    <option value="Parceria Anhanguera">Parceria Anhanguera</option>
                    <option value="Parceria AMIG">Parceria AMIG</option>
                    <option value="Eventos">Eventos</option>
                    <option value="Família / Amigos">Família / Amigos</option>
                    <option value="Outros">Outros</option>
                </Select>
                {formErrors ? formErrors.como_conheceu?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Nome do Consultor da Talents RH " name='consultor_talents' defaultValue={form.consultor_talents}>
                    <option disabled value='Selecione'>Selecione</option>
                    {consultores.map((consultor, index) => (
                        <option value={consultor} key={consultor}>{consultor}</option>
                    ))}
                </Select>
                {formErrors ? formErrors.consultor_talents?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Nível de Inglês" name='nivel_ingles' defaultValue={form.nivel_ingles}>
                    <option disabled value='Selecione'>Selecione</option>
                    <option value="Basico">Básico</option>
                    <option value="Intermediario">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                    <option value="Fluente">Fluente</option>
                    <option value="N/A">N/A</option>
                </Select>
                {formErrors ? formErrors.nivel_ingles?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div style={{ gridColumn: '1/-1' }}>
                <TextArea label='Descreva abaixo certificações importantes da sua area' name='certificacoes' rows={5} defaultValue={form.certificacoes} />
                {formErrors ? formErrors.certificacoes?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div style={{ gridColumn: '1/-1' }}>
                <TextArea label='Descreva abaixo algumas palavras chaves que descrevem suas qualificações tecnicas' name='qualificacoes_tecnicas' rows={5} defaultValue={form.qualificacoes_tecnicas} />
                {formErrors ? formErrors.qualificacoes_tecnicas?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Anexe seu CV" type='file' name='cv' />
                {formErrors ? formErrors.cv?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>

            {id ? <Input type="hidden" name="id" value={id.toString()} readOnly /> : null}

            <div className="submit-grid-btn" style={{ gridColumn: '1/-1' }}>
                <Button ButtonName="Enviar" type="submit" variant="primary" disabled={isPending} />
                {isPending && <Spinner size="lg" className="bg-black dark:bg-white" />}
            </div>

        </form>


    );
}
