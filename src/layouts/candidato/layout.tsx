'use client'

import NavBar from "@/components/navbar/component"
import Link from "next/link"
import { ReactNode } from "react"
import './layout.scss'
import Button from "@/components/button/component"
import { useAuthCandidato } from "@/hooks/auth/useAuth"

export default function Main({ children }: { children: ReactNode }) {

    const handleLogout = () => {

        const token = sessionStorage.getItem('token')

        if (token) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            window.location.href = '/candidato/login'
        }
    }

    useAuthCandidato()

    return (
        <>
            <NavBar>
                <Link href='/'>Vagas</Link>
                <Link href='/'>Perfil</Link>
                <Button type="button" variant="primary" ButtonName="Logout" onClick={handleLogout} />
            </NavBar>
            {children}

        </>

    )
}

