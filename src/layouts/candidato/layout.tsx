'use client'

import NavBar from "@/components/navbar/component"
import Link from "next/link"
import { ReactNode, useEffect, useState } from "react"
import './layout.scss'
import Button from "@/components/button/component"
import { useAuthHeadhunter } from "@/hooks/auth/useAuth"
import BussinesBag from '../../../public/business-bag.png'
import BussinesGuy from '../../../public/business-guy.png'
import cargo from '../../../public/cargos.png'
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserProps } from "@/api/users/api"
import logo from '../../../public/logo.png'
import { useAuthCandidato } from "@/hooks/auth/useAuth"

export default function Main({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<UserProps>() // Dados do Usuario Logado
    const handleLogout = () => {
        const token = sessionStorage.getItem('token')
        if (token) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            window.location.href = '/candidato/login'
        }

        useAuthCandidato()

    }


    // Consultar dados do usuario logado
    useEffect(() => {
        const userDados = sessionStorage.getItem('user')
        if (userDados) {
            setUser(JSON.parse(userDados))
        }
    }, []);

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
                            <h3>{user?.nome}</h3>
                        </div>
                        
                    </div>
                    <Button type="button" variant="primary" ButtonName="Logout" onClick={handleLogout} />
                </div>
            </NavBar>
            {children}
        </>
    )
}