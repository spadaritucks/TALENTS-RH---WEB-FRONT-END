import Main from "@/layouts/admin/layout"
import './page.scss'
import { Usuarios } from "@/models/usuarios";
import { getUsersAction } from "@/server actions/users.action";
import { ChamadosAtualizacoes } from "@/models/chamados";
import { getAllAtualizacoesAction} from "@/server actions/chamados.action";
import { cookies } from "next/headers";
import Atualizacoes from "./Atualizacoes";
export const dynamic = "force-dynamic";


export default async function ChamadosPage() {
   
   
    const atualizacoes: ChamadosAtualizacoes[] = await getAllAtualizacoesAction()
    const usuarios: Usuarios[] = await getUsersAction()

    const cookiesStore = await cookies();
    const requestCookie = cookiesStore.get('user')?.value
    let userLogged = null;

    try {
        if (requestCookie) {
            userLogged = JSON.parse(requestCookie);
        }
    } catch (error) {
        console.error("Erro ao parsear cookie 'user':", error);
    }

    const apiStorage = `${process.env.API_URL}/storage`
    
    

    return (
        <Main>
            <section className="acompamhamento-div">
               <Atualizacoes atualizacoes={atualizacoes} usuarios={usuarios} apiStorage={apiStorage} userLogged={userLogged} />
            
            </section>
        </Main>
    )
}