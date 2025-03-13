'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import { Spinner } from "@/components/ui/spinner"
import { updateEmpresaAction } from "@/server actions/empresas.action"
import { useActionState, useState, useEffect } from "react"



export function CadastroForm() {
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
                <Input label="Senha para Acesso ao Painel" type='password' name='password' />
                {formErrors ? formErrors.password?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Confirme sua Senha" type='password' name='password_confirm' />
                {formErrors ? formErrors.error?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            {formErrors ? formErrors.error?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            {id ? <Input type="hidden" name="id" value={id.toString()} readOnly /> : null}

            <div className="submit-grid-btn" style={{ gridColumn: '1/-1' }}>
                <Button ButtonName="Enviar" type="submit" variant="primary" disabled={isPending} />
                {isPending &&  <Spinner size="lg" className="bg-black dark:bg-white" /> }
            </div>

        </form>


    );
}

