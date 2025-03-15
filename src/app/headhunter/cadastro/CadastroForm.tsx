'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import TextArea from "@/components/textarea/component"
import { Spinner } from "@/components/ui/spinner"
import useNumericInput from "@/hooks/NumericInput"
import getCepAction from "@/server actions/cep.action"
import { createHeadhunterAction } from "@/server actions/headhunters.action"
import { useActionState, useState, useEffect } from "react"



export function CadastroForm() {
    const [data, HandleCadastroAction, isPending] = useActionState(createHeadhunterAction, null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
    const { showModal } = useModal();
    const [form, setForm] = useState({
        cep: '',
        logradouro: '',
        cidade: "",
        bairro: "",
        estado: "",
        latitude: '',
        longitude: '',
    })



      // Atualiza os erros quando há resposta da API
      useEffect(() => {
        if (data) {
            if (data.error) {
                if (typeof data.error === "object") {
                    setFormErrors(data.error);
                    return
                } else {

                    showModal("Erro", data.error)
                    data.error = null
                    return
                }
            }
            showModal("Sucesso", data.message)
            
        }
    }, [data]); // Dependência para executar o efeito quando 'data' mudar

    const handleCepChange = async (cep: string) => {
        if (cep.length === 8) {
            const data = await getCepAction(cep)
            data.erro ? showModal('Erro', <p>Não foi possivel encontrar o CEP</p>) :
                setForm({
                    ...form,
                    cep,
                    logradouro: data.logradouro,
                    cidade: data.localidade,
                    bairro: data.bairro,
                    estado: data.uf,
                    latitude: data.lat,
                    longitude: data.lon

                })
        }
    }


    return (

        <form action={HandleCadastroAction}>
            <div>
                <Input label="Foto do Usuario" placeholder='Insira sua Foto' type="file" name="foto_usuario" />
            </div>
            <div>
                <Input label="Nome" placeholder='Nome' type="text" name="nome" />
                {formErrors ? formErrors.nome?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Sobrenome" placeholder='Sobrenome' type="text" name="sobrenome" />
                {formErrors ? formErrors.sobrenome?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="CEP" placeholder='CEP' type="text" name="cep" maxlength={8} onChange={(e) => handleCepChange(e.target.value)} />
                {formErrors ? formErrors.cep?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Logradouro" placeholder='Logradouro' type="text" name="logradouro" onChange={(e) => setForm({ ...form, logradouro: e.target.value })} value={form.logradouro} readOnly />
                {formErrors ? formErrors.logradouro?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}

            </div>
            <div>
                <Input label="Cidade" placeholder='Cidade' type="text" name="cidade" onChange={(e) => setForm({ ...form, cidade: e.target.value })} value={form.cidade} readOnly />
                {formErrors ? formErrors.cidade?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Bairro" placeholder='Bairro' type="text" name="bairro" onChange={(e) => setForm({ ...form, bairro: e.target.value })} value={form.bairro} readOnly />
                {formErrors ? formErrors.bairro?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Estado" placeholder='Estado' type="text" name="estado" onChange={(e) => setForm({ ...form, estado: e.target.value })} value={form.estado} readOnly />
                {formErrors ? formErrors.estado?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Numero" placeholder='Numero da Residencia' type="text" name="numero" />
                {formErrors ? formErrors.numero?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Email" placeholder='exemplo@dominio.com' type="email" name="email" />
                {formErrors ? formErrors.email?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Celular Principal" placeholder='(11) 99999-9999' type="text" name="celular_1" onInput={useNumericInput} />
                {formErrors ? formErrors.celular_1?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Celular Alternativo" placeholder='(11) 99999-9999' type="text" name="celular_2" onInput={useNumericInput} />
                {formErrors ? formErrors.celular_2?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Data de Nascimento" type="date" name="data_nascimento" />
                {formErrors ? formErrors.data_nascimento?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Linkedin" placeholder='linkedin.com/in/usuario' type="text" name="linkedin" />
                {formErrors ? formErrors.linkedin?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Como Conheceu" name="como_conheceu" defaultValue="">
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
                <Select label="Sua Situação Atual" name="situacao" defaultValue="">
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
                <TextArea label='Descreva 03 habilidades comportamentais do seu perfil' rows={5} cols={30} name='comportamento_description' />
                {formErrors ? formErrors.comportamento_description?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Anos de Trabalho" name="anos_trabalho" defaultValue="">
                    <option value="">Selecione uma opção</option>
                    <option value="01_03">01 à  03 anos</option>
                    <option value="04_06">04 à  06 anos</option>
                    <option value="07_10">07 à  10 anos</option>
                    <option value="mais_10">mais de 10 anos</option>
                </Select>
                {formErrors ? formErrors.anos_trabalho?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Quantidade de Vagas" name="quantia_vagas" defaultValue="">
                    <option value="">Selecione uma opção</option>
                    <option value="01">01</option>
                    <option value="02_04">entre 02 e 04</option>
                    <option value="05_10">entre 05 e 10</option>
                    <option value="mais_10">mais de 10</option>
                </Select>
                {formErrors ? formErrors.quantia_vagas?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Horas Diárias" name="horas_diarias" defaultValue="">
                    <option value="">Selecione uma opção</option>
                    <option value="ate_2">Até 2 horas</option>
                    <option value="ate_4">Até 4 horas</option>
                    <option value="meio_periodo">Meio Periodo</option>
                    <option value="dia_inteiro">Dia inteiro</option>
                </Select>
                {formErrors ? formErrors.horas_diarias?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Dias Semanais" name="dias_semanais" defaultValue="">
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
                <Select label="Nível de Senioridade" name="nivel_senioridade" defaultValue="">
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
                <Select label="Segmento" name="segmento" defaultValue="">
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
                <Input label="Anexe seu CV" type='file' name='cv' />
                {formErrors ? formErrors.cv?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Senha para Acesso ao Painel" type='password' name='password' />
                {formErrors ? formErrors.password?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Confirme sua Senha" type='password' name='password_confirm' />
                {formErrors ? formErrors.error?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <Input type="hidden" name="tipo_usuario" value="headhunter" readOnly />
            <Input type="hidden" name="latitude" value={form.latitude} readOnly />
            <Input type="hidden" name="longitude" value={form.longitude} readOnly />
            <div className="submit-grid-btn" style={{ gridColumn: '1/-1' }}>
                <Button ButtonName="Enviar" type="submit" variant="primary" disabled={isPending} />
                {isPending &&  <Spinner size="lg" className="bg-black dark:bg-white" /> }
            </div>

        </form>


    );
}
