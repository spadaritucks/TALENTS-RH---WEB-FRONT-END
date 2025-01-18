'use client'

import NavBar from "@/components/navbar/component"
import Link from "next/link"
import { ReactNode } from "react"
import './layout.scss'
import Button from "@/components/button/component"
import { useAuthHeadhunter } from "@/hooks/auth/useAuth"

export default function Main({ children }: { children: ReactNode }) {

    const handleLogout = () => {

        const token = sessionStorage.getItem('token')

        if (token) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            window.location.href = '/headhunter/login'
        }
    }

    useAuthHeadhunter()

    return (
        <>
            <NavBar>
                <Link href='#candidado-search-area'>Candidatos</Link>
                <Link href='#headhunter-area'>Vagas</Link>
                <Button type="button" variant="primary" ButtonName="Logout" onClick={handleLogout} />
            </NavBar>
            {children}

        </>

    )
}