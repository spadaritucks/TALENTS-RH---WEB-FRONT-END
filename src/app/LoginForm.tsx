'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import { Spinner } from "@/components/ui/spinner"
import { LoginAction } from "@/server actions/login.action"
import Link from "next/link"
import { useActionState, useState, useEffect } from "react"

export function LoginForm() {
    const [data, HandleLoginAction, isPending] = useActionState(LoginAction, null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
    const { showModal } = useModal();
    

    // Atualiza os erros quando há resposta da API
    useEffect(() => {
        if (data) {
            if(data.error){
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
        <form className="flex flex-col items-center justify-center" action={HandleLoginAction}>
            <Input label="Email" type="email" name="email"  />
            {formErrors ? formErrors.email?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            <Input label="Senha" type="password" name="password" />
            {formErrors ? formErrors.password?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            <div className="form-footer">
                <Button ButtonName="Login" type="submit" variant="primary" disabled={isPending} />
                <Link href="/perfil">Crie sua Conta</Link>
            </div>
            {isPending && <Spinner size="lg" className="bg-black dark:bg-white" />}
        </form>
    );
}
