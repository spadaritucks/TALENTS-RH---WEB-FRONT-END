'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import Select from "@/components/select/component"
import TextArea from "@/components/textarea/component"
import { Spinner } from "@/components/ui/spinner"
import useNumericInput from "@/hooks/NumericInput"
import { consultores } from "@/json/consultores"
import { Candidatos } from "@/models/candidatos"
import { Cargos } from "@/models/cargos"
import { Usuarios } from "@/models/usuarios"
import { updateAdminAction } from "@/server actions/admins.action"
import { updateCandidatoAction } from "@/server actions/candidato.action"
import getCepAction from "@/server actions/cep.action"
import { useActionState, useState, useEffect } from "react"

interface FormProps {
    userAdmins: Usuarios[]
}

export function CadastroForm({ userAdmins }: FormProps) {
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

    const userAdmin = userAdmins.find(user => user.id == id);

    const [form, setForm] = useState({
        cep: '',
        logradouro: '',
        cidade: "",
        bairro: "",
        estado: "",
        numero: '',
        latitude: '',
        longitude: '',
    })

    useEffect(() => {
        userAdmin ? setForm({
            ...form,
            cep: userAdmin.cep,
            logradouro: userAdmin.logradouro,
            cidade: userAdmin.cidade,
            bairro: userAdmin.bairro,
            estado: userAdmin.estado,
            numero: userAdmin.numero,
            latitude: userAdmin.latitude,
            longitude: userAdmin.longitude,
        }) : null
    }, [userAdmin, id])


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

        <form action={HandleUpdateAction}>

            <div>
                <Input label="CEP" placeholder='CEP' type="text" name="cep" defaultValue={form.cep} maxlength={8} onChange={(e) => handleCepChange(e.target.value)} />
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
                <Input label="Numero" placeholder='Numero da Residencia' defaultValue={form.numero} type="text" name="numero" />
                {formErrors ? formErrors.cep?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>

            <Input type="hidden" name="latitude" value={form.latitude} readOnly />
            <Input type="hidden" name="longitude" value={form.longitude} readOnly />
            {id ? <Input type="hidden" name="id" value={id.toString()} readOnly /> : null}

            <div className="submit-grid-btn" style={{ gridColumn: '1/-1' }}>
                <Button ButtonName="Enviar" type="submit" variant="primary" disabled={isPending} />
                {isPending && <Spinner size="lg" className="bg-black dark:bg-white" />}
            </div>

        </form>


    );
}
