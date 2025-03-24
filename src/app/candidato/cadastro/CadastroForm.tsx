'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import TextArea from "@/components/textarea/component"
import { Spinner } from "@/components/ui/spinner"
import useNumericInput from "@/hooks/NumericInput"
import { consultores } from "@/json/consultores"
import { Cargos } from "@/models/cargos"
import { createCandidatoAction } from "@/server actions/candidato.action"
import getCepAction from "@/server actions/cep.action"
import { useActionState, useState, useEffect } from "react"

interface FormProps {
    cargos: Cargos[]

}

export function CadastroForm({ cargos }: FormProps) {
    const [data, HandleCadastroAction, isPending] = useActionState(createCandidatoAction, null);
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
                {formErrors ? formErrors.cep?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}

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
                {formErrors ? formErrors.cep?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
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
                <Input label="Ultimo Cargo" placeholder='Ex: Desenvolvedor Front-End' type="text" name="ultimo_cargo" />
                {formErrors ? formErrors.ultimo_cargo?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Ultimo Salario" placeholder='Ex: R$ 2000,00' type="text" name="ultimo_salario" onInput={useNumericInput} />
                {formErrors ? formErrors.ultimo_salario?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label='Pretensão Salarial CLT' placeholder='Ex: R$ 2000,00' type='text' name='pretensao_salarial_clt' onInput={useNumericInput} />
                {formErrors ? formErrors.pretensao_salarial_clt?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label='Pretensão Salarial PJ' placeholder='Ex: R$ 2000,00' type='text' name='pretensao_salarial_pj' onInput={useNumericInput} />
                {formErrors ? formErrors.pretensao_salarial_pj?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select key={cargos.length} label="Posição Desejada" name='posicao_desejada' defaultValue="Selecione">
                    <option disabled value='Selecione'>Selecione</option>,
                    {cargos.map((profissao, index) => (
                        <option value={profissao.id} key={index}>{profissao.nome}</option>
                    ))}
                </Select>
                {formErrors ? formErrors.posicao_desejada?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Escolaridade" name='escolaridade' defaultValue="Selecione">
                    <option disabled value='Selecione'>Selecione</option>
                    <option value="Ensino Medio">Ensino Medio</option>
                    <option value="Ensino Superior">Ensino Superior</option>
                    <option value="Pos-Graduação">Pos-Graduação</option>
                    <option value="Outros">Outros</option>
                </Select>
                {formErrors ? formErrors.escolaridade?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Graduação Principal" placeholder='Ex: Direito, Recursos Humanos' type="text" name="graduacao_principal" />
                {formErrors ? formErrors.graduacao_principal?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Como nos conheceu?" name='como_conheceu' defaultValue="Selecione">
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
                <Select label="Nome do Consultor da Talents RH " name='consultor_talents' defaultValue="Selecione" >
                    <option disabled value='Selecione'>Selecione</option>
                    {consultores.map((consultor, index) => (
                        <option value={consultor} key={consultor}>{consultor}</option>
                    ))}
                </Select>
                {formErrors ? formErrors.consultor_talents?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Select label="Nível de Inglês" name='nivel_ingles' defaultValue="Selecione">
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
                <TextArea label='Descreva abaixo certificações importantes da sua area' name='certificacoes' rows={5} />
                {formErrors ? formErrors.certificacoes?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div style={{ gridColumn: '1/-1' }}>
                <TextArea label='Descreva abaixo algumas palavras chaves que descrevem suas qualificações tecnicas' name='qualificacoes_tecnicas' rows={5} />
                {formErrors ? formErrors.qualificacoes_tecnicas?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
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
            {formErrors ? formErrors.error?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            <Input type="hidden" name="tipo_usuario" value="candidato" readOnly />
            <Input type="hidden" name="latitude" value={form.latitude} readOnly />
            <Input type="hidden" name="longitude" value={form.longitude} readOnly />
            <div className="submit-grid-btn" style={{ gridColumn: '1/-1' }}>
                <Button ButtonName="Enviar" type="submit" variant="primary" disabled={isPending} />
                {isPending &&  <Spinner size="lg" className="bg-black dark:bg-white" /> }
            </div>

        </form>


    );
}
