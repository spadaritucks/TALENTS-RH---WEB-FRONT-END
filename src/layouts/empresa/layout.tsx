'use client'

import NavBar from "@/components/navbar/component"
import Link from "next/link"
import { ReactNode } from "react"
import './layout.scss'
import Button from "@/components/button/component"

export default function Main({ children }: { children: ReactNode }) {
    return (
        <>
            <NavBar>
                <Link href='/'>Headhunters</Link>
                <Link href='/'>Candidatos</Link>
                <Button type="button" variant="primary" ButtonName="Logout" />
            </NavBar>
            {children}

        </>

    )
}