'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import { Spinner } from "@/components/ui/spinner"
import { Admins } from "@/models/admins"
import { updateAdminAction } from "@/server actions/admins.action"
import { useActionState, useState, useEffect } from "react"

interface FormProps {
    admins: Admins[]

}

export function CadastroForm({ admins }: FormProps) {
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

    const admin = admins.find(adm => adm.user_id == id)

    const [form, setForm] = useState({
        cargo: '',
        atividades: '',
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

    useEffect(() => {
        admin ? setForm({
            ...form,
            cargo: admin.cargo,
            atividades: admin.atividades,
            cv: admin.cv,
        }) : null
    }, [admin, id])

    return (

        <form action={HandleUpdateAction}>
            <div>
                <Input label="Cargo" type="text" name="cargo" value={form.cargo} />
                {formErrors ? formErrors.cargo?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label='Atividades' type='text' name='atividades' value={form.atividades} />
                {formErrors ? formErrors.atividades?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Curriculo" type="file" name="cv" />
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
