
import NavBar from "@/components/navbar/component"
import Link from "next/link"
import { ReactNode, useActionState, useEffect, useState } from "react"
import './layout.scss'
import Button from "@/components/button/component"
import BussinesBag from '../../../public/business-bag.png'
import BussinesGuy from '../../../public/business-guy.png'
import cargo from '../../../public/cargos.png'
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { LogoutAction } from "@/server actions/login.action"
import { cookies } from "next/headers"

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
                    <Link href='/candidato/vagas'><Image className="link-icon" src={BussinesBag} alt="" />Vagas</Link>
                    <Link href='/candidato/perfil'><Image className="link-icon" src={BussinesGuy} alt="" />Perfil</Link>
                </div>

                <div className="user-content">
                    <div className="user-avatar-name">
                        <div className="user-avatar-name">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h3>{userLogged?.nome}</h3>
                        </div>
                        
                    </div>
                    <Button type="button" variant="primary" ButtonName="Logout" onClick={LogoutAction} />
                </div>
            </NavBar>
            {children}
        </>
    )
}