'use client'

import Button from "@/components/button/component"
import Input from "@/components/input/component"
import { useModal } from "@/components/modal/context"
import { Spinner } from "@/components/ui/spinner"
import useNumericInput from "@/hooks/NumericInput"
import { Consultores } from "@/models/consultores"
import { Usuarios } from "@/models/usuarios"
import getCepAction from "@/server actions/cep.action"
import { createConsultorAction, updateConsultorAction } from "@/server actions/consultores.action"
import { useActionState, useEffect, useState } from "react"
import './page.scss'

interface ConsultoresEditFormProps {
    consultores: Consultores[]
    userConsultores: Usuarios[]
}

export default function EditarConsultorForm({
    consultores,
    userConsultores
}: ConsultoresEditFormProps) {

    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({}) //Objeto responsavel por validação do formulario
    const [data, handleCriarConsultor, isPending] = useActionState(updateConsultorAction, null)
    const { showModal, hideModal } = useModal()
    const [form, setForm] = useState({
        cep: '',
        logradouro: '',
        cidade: "",
        bairro: "",
        estado: "",
        latitude: '',
        longitude: '',
    })

    useEffect(() => {
        if (typeof window !== 'undefined') { // Garante que só executa no cliente
            const searchParams = new URLSearchParams(window.location.search)
            const idString = searchParams.get('id')
            setId(idString ? parseInt(idString) : null)
        }
    }, [])
    const [id, setId] = useState<number | null>(null)

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

    useEffect(() => {
        if (data) {
            if (data.error) {
                if (typeof data.error === 'object') {
                    setFormErrors(data.error)
                    return
                } else {
                    showModal("Erro", data.error)
                    data.error = null
                    return
                }
            }
            showModal("Sucesso", data.message)
        }
    })

    const userConsultorEditado = userConsultores.find(user => user.id == id)


    return (

        <>
            <div className="consultorDados">
                <p><strong>Nome: </strong>{userConsultorEditado?.nome} {userConsultorEditado?.sobrenome}</p>
            </div>
            <form className='consultor-form' action={handleCriarConsultor}>
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
                <Input label="Cargo" type="text" name="cargo" />
                {formErrors ? formErrors.cargo?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label='Atividades' type='text' name='atividades' />
                {formErrors ? formErrors.atividades?.map((error, index) => <p className="text-red-400 text-sm" key={index}>{error}</p>) : null}
            </div>
            <div>
                <Input label="Curriculo" type="file" name="cv" />
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
            <div className='button-submit-grid' style={{ gridColumn: '1 /-1' }}>
                <Input type="hidden" name="tipo_usuario" value="consultor" readOnly />
                <Input type="hidden" name="latitude" value={form.latitude} readOnly />
                <Input type="hidden" name="longitude" value={form.longitude} readOnly />
                <Button ButtonName='Enviar' variant='primary' type='submit' disabled={isPending} />
                {isPending ? <Spinner size="lg" className="bg-black dark:bg-white" /> : null}
            </div>
            </form>
        </>
    )
}