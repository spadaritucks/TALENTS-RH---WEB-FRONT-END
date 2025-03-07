'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import { Spinner } from "@/components/ui/spinner"
import useNumericInput from "@/hooks/NumericInput"
import getCepAction from "@/server actions/cep.action"
import { createEmpresaAction } from "@/server actions/empresas.action"
import { useActionState, useState, useEffect } from "react"



export function CadastroForm() {
    const [data, HandleCadastroAction, isPending] = useActionState(createEmpresaAction, null);
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
                } else {

                    showModal("Erro", data.error)
                    data.error = null
                }
            }
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
                <Input label='Insira o seu CNPJ' type='text' name='cnpj' placeholder='00-000-000/0001-00' onInput={useNumericInput} />
                {formErrors ? formErrors.cnpj?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label='Razão Social' type='text' name='razao_social' placeholder='Razão Social da Empresa' />
                {formErrors ? formErrors.razao_social?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label='Nome Fantasia' type='text' name='nome_fantasia' placeholder='Nome Fantasia da Empresa' />
                {formErrors ? formErrors.nome_fantasia?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label='Segmento' type='text' name='segmento' placeholder='Segmento da Empresa' />
                {formErrors ? formErrors.segmento?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label='Número de Funcionários' type='text' name='numero_funcionarios' placeholder='Número de Funcionários' />
                {formErrors ? formErrors.numero_funcionarios?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <Input type="hidden" name="tipo_usuario" value="empresa" readOnly />
            <Input type="hidden" name="latitude" value={form.latitude} readOnly />
            <Input type="hidden" name="longitude" value={form.longitude} readOnly />
            <div className="submit-grid-btn" style={{ gridColumn: '1/-1' }}>
                <Button ButtonName="Enviar" type="submit" variant="primary" disabled={isPending} />
                {isPending &&  <Spinner size="lg" className="bg-black dark:bg-white" /> }
            </div>

        </form>


    );
}
