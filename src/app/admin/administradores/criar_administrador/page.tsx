import Main from "@/layouts/admin/layout";
import './page.scss'
import CriarAdministradorForm from "./CriarAdministradorForm";
export const dynamic = "force-dynamic";

export default function CriarAdministradorPage() {

    return (
        <Main>
            <section className="formAdmin">
                <h1>Cadastro do Administrador</h1>
                <CriarAdministradorForm />

            </section>
        </Main>
    )
}