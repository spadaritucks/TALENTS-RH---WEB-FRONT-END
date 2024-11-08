'use client'

import NavBar from "@/components/navbar/component"
import Link from "next/link"
import { ReactNode } from "react"
import './layout.scss'
import Button from "@/components/button/component"
import { useAuthEmpresa } from "@/hooks/auth/useAuth"

export default function Main({ children }: { children: ReactNode }) {

    const handleLogout = () => {

        const token = sessionStorage.getItem('token')

        if (token) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            window.location.href = '/empresa/login'
        }
    }

    useAuthEmpresa()

    return (
        <>
            <NavBar>
                <Link href='/'>Headhunters</Link>
                <Link href='/'>Candidatos</Link>
                <Button type="button" variant="primary" ButtonName="Logout" onClick={handleLogout} />
            </NavBar>
            {children}

        </>

    )
}