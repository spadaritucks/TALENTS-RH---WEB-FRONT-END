import Main from "@/layouts/admin/layout"
import CargosList from "./CargosList"
import './page.scss'
import { Cargos } from "@/models/cargos"
import { getProfissoesAction } from "@/server actions/profissoes.action"
export const dynamic = "force-dynamic";

export default async function CargosPage() {



    const profissoes : Cargos[] = await getProfissoesAction()

    return (
        <Main>
            <CargosList profissoes={profissoes} />
        </Main>
    )
}