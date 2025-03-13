'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import { Spinner } from "@/components/ui/spinner"
import useNumericInput from "@/hooks/NumericInput"
import { Admins } from "@/models/admins"
import { Usuarios } from "@/models/usuarios"
import { updateAdminAction } from "@/server actions/admins.action"
import { useActionState, useState, useEffect } from "react"

interface FormProps {
    admins: Admins[]
    userAdmins: Usuarios[]
}

export function CadastroForm({ admins, userAdmins }: FormProps) {
    const [data, HandleUpdateAction, isPending] = useActionState(updateAdminAction, null);
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

    const userAdmin = userAdmins.find(user => user.id == id)
    const admin = admins.find(admin => admin.user_id == id)

    const [form, setForm] = useState({
        foto_usuario: '',
        nome: '',
        sobrenome: '',
        email: '',
        celular_1: '',
        celular_2: '',
        data_nascimento: new Date(),
        linkedin: '',
    })


    useEffect(()=>{
        admin && userAdmin ? setForm({
            ...form,
            nome: userAdmin.nome,
            sobrenome: userAdmin.sobrenome,
            email : userAdmin.email,
            celular_1: userAdmin.celular_1,
            celular_2: userAdmin.celular_2 || '',
            data_nascimento: userAdmin.data_nascimento,
            linkedin : userAdmin.linkedin || '',
            
            
        }) : null
    },[admin, userAdmin, id])


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
