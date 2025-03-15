import Main from "@/layouts/admin/layout"
import './page.scss'
import Link from "next/link"
import Button from "@/components/button/component"
import { useModal } from "@/components/modal/context"
import HeadhuntersList from "./HeadhuntersList"
import { getHeadhuntersAction } from "@/server actions/headhunters.action"
import { Headhunters } from "@/models/headhunter"
import { Usuarios } from "@/models/usuarios"
export const dynamic = "force-dynamic";

export default async function HeadHuntersPanel() {
   

    const headhunterAction = await getHeadhuntersAction()
    const headhunters : Headhunters[] = headhunterAction.headhunters
    const userHeadhunters : Usuarios[] = headhunterAction.users
    
    
    return (
        <Main>
            <section className="headhunter-area">
                <h1>Painel de Headhunters</h1>
                <HeadhuntersList headhunters={headhunters} userHeadhunters={userHeadhunters} />
            </section>
        </Main>
    )
}