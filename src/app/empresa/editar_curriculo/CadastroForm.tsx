'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import TextArea from "@/components/textarea/component"
import { Spinner } from "@/components/ui/spinner"
import useNumericInput from "@/hooks/NumericInput"
import { consultores } from "@/json/consultores"
import { Empresas } from "@/models/empresas"
import { Cargos } from "@/models/cargos"
import { updateEmpresaAction } from "@/server actions/empresas.action"
import { useActionState, useState, useEffect } from "react"

interface FormProps {
    empresas: Empresas[]
    
}

export function CadastroForm({ empresas }: FormProps) {
    const [data, HandleUpdateAction, isPending] = useActionState(updateEmpresaAction, null);
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

    const empresa = empresas.find(empresa => empresa.user_id == id)
 

    const [form, setForm] = useState({
        cnpj: empresa ? empresa.cnpj : '',
        razao_social: empresa ? empresa.razao_social : '',
        nome_fantasia: empresa ? empresa.nome_fantasia : '',
        segmento: empresa ? empresa.segmento : '',
        numero_funcionarios: empresa ? empresa.numero_funcionarios.toString() : '',
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
        empresa ? setForm({
            ...form,
            cnpj: empresa.cnpj,
            razao_social: empresa.razao_social,
            nome_fantasia: empresa.nome_fantasia,
            segmento: empresa.segmento,
            numero_funcionarios: empresa.numero_funcionarios.toString(),
            
        }) : null
    },[empresa,id])



    return (

        <form action={HandleUpdateAction}>
            <div>
                <Input label='Insira o seu CNPJ' type='text' name='cnpj' placeholder='00-000-000/0001-00' onInput={useNumericInput} defaultValue={form.cnpj} />
                {formErrors ? formErrors.cnpj?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label='Razão Social' type='text' name='razao_social' placeholder='Razão Social da Empresa' defaultValue={form.razao_social} />
                {formErrors ? formErrors.razao_social?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label='Nome Fantasia' type='text' name='nome_fantasia' placeholder='Nome Fantasia da Empresa' defaultValue={form.nome_fantasia} />
                {formErrors ? formErrors.nome_fantasia?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label='Segmento' type='text' name='segmento' placeholder='Segmento da Empresa' defaultValue={form.segmento} />
                {formErrors ? formErrors.segmento?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label='Número de Funcionários' type='text' name='numero_funcionarios' placeholder='Número de Funcionários' defaultValue={form.numero_funcionarios} />
                {formErrors ? formErrors.numero_funcionarios?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>

            {id ? <Input type="hidden" name="id" value={id.toString()} readOnly /> : null}

            <div className="submit-grid-btn" style={{ gridColumn: '1/-1' }}>
                <Button ButtonName="Enviar" type="submit" variant="primary" disabled={isPending} />
                {isPending && <Spinner size="lg" className="bg-black dark:bg-white" />}
            </div>

        </form>


    );
}
