'use client'

import NavBar from "@/components/navbar/component"
import Link from "next/link"
import { ReactNode, useEffect, useState } from "react"
import './layout.scss'
import Button from "@/components/button/component"
import { UserProps } from "@/api/users/api"
import Image from "next/image"
import logo from '../../../public/logo.png'
import { useAuthHeadhunter } from "@/hooks/auth/useAuth"

export default function Main({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<UserProps>() // Dados do Usuario Logado
    const handleLogout = () => {
        const token = sessionStorage.getItem('token')
        if (token) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            window.location.href = '/headhunter/login'
        }
        useAuthHeadhunter()
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
                    <Link href='/headhunter/vagas'><Image className="link-icon" src={logo} alt="" />Vagas</Link>
                    <Link href='/headhunter/perfil'><Image className="link-icon" src={logo} alt="" />Perfil</Link>
                </div>

                <div className="user-content">
                    <div className="user-avatar-name">
                        <Image src={logo} alt="" className="user-avatar" />
                        <h3>{user?.nome}</h3>
                    </div>
                    <Button type="button" variant="primary" ButtonName="Logout" onClick={handleLogout} />
                </div>
            </NavBar>
            {children}
        </>
    )
}