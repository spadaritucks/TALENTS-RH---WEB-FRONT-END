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
import { Usuarios } from "@/models/usuarios"
import { updateEmpresaAction } from "@/server actions/empresas.action"
import getCepAction from "@/server actions/cep.action"
import { Underline } from "lucide-react"
import { useActionState, useState, useEffect } from "react"

interface FormProps {
    cargos: Cargos[]
    empresas: Empresas[]
    userEmpresas: Usuarios[]
}

export function CadastroForm({ cargos, empresas, userEmpresas }: FormProps) {
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

    const userEmpresa = userEmpresas.find(user => user.id == id)
    const empresa = empresas.find(empresa => empresa.user_id == id)

    const [form, setForm] = useState({
        foto_usuario: '',
        nome: userEmpresa?.nome,
        sobrenome: '',
        email: '',
        celular_1: '',
        celular_2: '',
        data_nascimento: new Date(),
        linkedin: '',
    })


    useEffect(()=>{
        empresa && userEmpresa ? setForm({
            ...form,
            nome: userEmpresa.nome,
            sobrenome: userEmpresa.sobrenome,
            email : userEmpresa.email,
            celular_1: userEmpresa.celular_1,
            celular_2: userEmpresa.celular_2 || '',
            data_nascimento: userEmpresa.data_nascimento,
            linkedin : userEmpresa.linkedin || '',
            
            
        }) : null
    },[empresa, userEmpresa, id])


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


    return (

        <form action={HandleUpdateAction}>
            <div>
                <Input label="Foto do Usuario" placeholder='Insira sua Foto' type="file" name="foto_usuario" />
            </div>
            <div>
                <Input label="Nome" placeholder='Nome' type="text" name="nome" defaultValue={form.nome} />
                {formErrors ? formErrors.nome?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Sobrenome" placeholder='Sobrenome' type="text" name="sobrenome" defaultValue={form.sobrenome} />
                {formErrors ? formErrors.sobrenome?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Email" placeholder='exemplo@dominio.com' type="email" name="email" defaultValue={form.email} />
                {formErrors ? formErrors.email?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Celular Principal" placeholder='(11) 99999-9999' defaultValue={form.celular_1} type="text" name="celular_1" onInput={useNumericInput} />
                {formErrors ? formErrors.celular_1?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Celular Alternativo" placeholder='(11) 99999-9999' defaultValue={form.celular_2} type="text" name="celular_2" onInput={useNumericInput} />
                {formErrors ? formErrors.celular_2?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Data de Nascimento" type="date" name="data_nascimento" defaultValue={form.data_nascimento.toString()} />
                {formErrors ? formErrors.data_nascimento?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Linkedin" placeholder='linkedin.com/in/usuario' type="text" name="linkedin" defaultValue={form.linkedin} />
                {formErrors ? formErrors.linkedin?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            
            {id ? <Input type="hidden" name="id" value={id.toString()} readOnly /> : null}

            <div className="submit-grid-btn" style={{ gridColumn: '1/-1' }}>
                <Button ButtonName="Enviar" type="submit" variant="primary" disabled={isPending} />
                {isPending && <Spinner size="lg" className="bg-black dark:bg-white" />}
            </div>

        </form>


    );
}
