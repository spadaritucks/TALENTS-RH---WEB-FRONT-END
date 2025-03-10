import Main from "@/layouts/admin/layout";
import CriarConsultorForm from "./CriarConsultorForm";
import './page.scss'
export const dynamic = "force-dynamic";

export default function CriarConsultorPage() {

    return (
        <Main>
            <section className="formConsultor">
                <h1>Cadastro do Consultor</h1>
                <CriarConsultorForm />

            </section>
        </Main>
    )
}