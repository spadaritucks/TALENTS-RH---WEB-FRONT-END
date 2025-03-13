
import NavBar from "@/components/navbar/component"
import Link from "next/link"
import { ReactNode } from "react"
import './layout.scss'
import Button from "@/components/button/component"
import BussinesBag from '../../../public/business-bag.png'
import BussinesGuy from '../../../public/business-guy.png'
import Image from "next/image"

import { LogoutAction } from "@/server actions/login.action"
import { cookies } from "next/headers"
import UserAvatarPanel from "./UserAvatarPanel"
export const dynamic = "force-dynamic";

export default async function Main({ children }: { children: ReactNode }) {

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




    return (
        <>
            <NavBar>
                <div className="links-content">
                    <Link href='/candidato/minhas_vagas'><Image className="link-icon" src={BussinesBag} alt="" />Minhas Vagas</Link>
                    <Link href='/candidato/painel'><Image className="link-icon" src={BussinesBag} alt="" />Painel de Vagas</Link>
                </div>

                <div className="user-content">
                    <UserAvatarPanel userLogged={userLogged} />
                    <Button type="button" variant="primary" ButtonName="Logout" onClick={LogoutAction} />
                </div>
            </NavBar>
            {children}
        </>
    )
}