'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import TextArea from "@/components/textarea/component"
import { Spinner } from "@/components/ui/spinner"
import useNumericInput from "@/hooks/NumericInput"
import { consultores } from "@/json/consultores"
import { Headhunters } from "@/models/headhunter"
import { Cargos } from "@/models/cargos"
import { updateHeadhunterAction } from "@/server actions/headhunters.action"
import { useActionState, useState, useEffect } from "react"

interface FormProps {
    headhunters: Headhunters[]
    
}

export function CadastroForm({  headhunters }: FormProps) {
    const [data, HandleUpdateAction, isPending] = useActionState(updateHeadhunterAction, null);
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

    const headhunter = headhunters.find(headhunter => headhunter.user_id == id)

    const [form, setForm] = useState({
        como_conheceu: '',
        situacao: '',
        comportamento_description: '',
        anos_trabalho: '',
        quantia_vagas: '',
        horas_diarias: '',
        dias_semanais: '',
        nivel_senioridade: '',
        segmento: '',
        cv: '',
    })
    console.log(headhunter)

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
        headhunter ? setForm({
            ...form,
            como_conheceu: headhunter.como_conheceu,
            situacao: headhunter.situacao,
            comportamento_description: headhunter.comportamento_description,
            anos_trabalho: headhunter.anos_trabalho.toString(),
            quantia_vagas: headhunter.quantia_vagas.toString(),
            horas_diarias: headhunter.horas_diarias.toString(),
            dias_semanais: headhunter.dias_semanais.toString(),
            nivel_senioridade: headhunter.nivel_senioridade,
            segmento: headhunter.segmento,
            cv: headhunter.cv,
        }) : null
    },[headhunter,id])



    return (
        <form action={HandleUpdateAction}>
            <div>
                <Select label="Como Conheceu" name="como_conheceu" defaultValue={form.como_conheceu}>
                    <option value="">Selecione uma opção</option>
                    <option value="internet">Internet</option>
                    <option value="sites_de_emprego">Sites de emprego</option>
                    <option value="instagram">Instagram</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="nosso_site">Nosso Site</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">Linkedin</option>
                    <option value="outros">Outros</option>
                </Select>
                {formErrors ? formErrors.como_conheceu?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Sua Situação Atual" name="situacao" defaultValue={form.situacao}>
                    <option value="">Selecione uma opção</option>
                    <option value="nao_trabalhando">Não estou trabalhando</option>
                    <option value="minha_propria_empresa">Tenho a minha própria empresa</option>
                    <option value="instagram">Instagram</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="nosso_site">Nosso Site</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">Linkedin</option>
                    <option value="outros">Outros</option>
                </Select>
                {formErrors ? formErrors.situacao?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div style={{gridColumn: '1/-1'}}>
                <TextArea label='Descreva 03 habilidades comportamentais do seu perfil' rows={5} cols={30} name='comportamento_description' defaultValue={form.comportamento_description} />
                {formErrors ? formErrors.comportamento_description?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Anos de Trabalho" name="anos_trabalho" defaultValue={form.anos_trabalho}>
                    <option value="">Selecione uma opção</option>
                    <option value="01_03">01 à  03 anos</option>
                    <option value="04_06">04 à  06 anos</option>
                    <option value="07_10">07 à  10 anos</option>
                    <option value="mais_10">mais de 10 anos</option>
                </Select>
                {formErrors ? formErrors.anos_trabalho?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Quantidade de Vagas" name="quantia_vagas" defaultValue={form.quantia_vagas}>
                    <option value="">Selecione uma opção</option>
                    <option value="01">01</option>
                    <option value="02_04">entre 02 e 04</option>
                    <option value="05_10">entre 05 e 10</option>
                    <option value="mais_10">mais de 10</option>
                </Select>
                {formErrors ? formErrors.quantia_vagas?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Horas Diárias" name="horas_diarias" defaultValue={form.horas_diarias}>
                    <option value="">Selecione uma opção</option>
                    <option value="ate_2">Até 2 horas</option>
                    <option value="ate_4">Até 4 horas</option>
                    <option value="meio_periodo">Meio Periodo</option>
                    <option value="dia_inteiro">Dia inteiro</option>
                </Select>
                {formErrors ? formErrors.horas_diarias?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Dias Semanais" name="dias_semanais" defaultValue={form.dias_semanais}>
                    <option value="">Selecione uma opção</option>
                    <option value="01">01 dia</option>
                    <option value="03">03 dias</option>
                    <option value="05">05 dias</option>
                    <option value="07">07 dias</option>
                    <option value="finais_semana">Apenas Finais de Semana</option>
                </Select>
                {formErrors ? formErrors.dias_semanais?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Nível de Senioridade" name="nivel_senioridade" defaultValue={form.nivel_senioridade}>
                    <option value="">Selecione uma opção</option>
                    <option value="niveis_operacionais">Níveis Operacionais</option>
                    <option value="especialistas">Especialistas (Assistentes, Analistas, outros)</option>
                    <option value="media_gestao">Média Gestão</option>
                    <option value="ger_diretoria">Gerência e Diretoria</option>
                    <option value="todos_niveis">Todos os níveis</option>
                </Select>
                {formErrors ? formErrors.nivel_senioridade?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Segmento" name="segmento" defaultValue={form.segmento}>
                    <option value="">Selecione uma opção</option>
                    <option value="agronegocios">Agronegócios / Agricultura / Pecuária / Veterinária</option>
                    <option value="bancos_financeiro">Bancos e Financeiro</option>
                    <option value="educacao">Educação</option>
                    <option value="engenharia">Engenharia</option>
                    <option value="juridica">Jurídica</option>
                    <option value="arquitetura">Arquitetura / Decoração e Urbanismo</option>
                    <option value="industria">Indústria / Manufatura e Produção</option>
                    <option value="transporte">Transporte / Logística e Distribuição</option>
                    <option value="saude">Saúde / Química e Farmacêutica</option>
                    <option value="estetica">Estética / Moda e Beleza</option>
                    <option value="ti">TI</option>
                    <option value="outros">Outros</option>
                </Select>
                {formErrors ? formErrors.segmento?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Anexe seu CV" type='file' name='cv' defaultValue={form.cv} />
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
