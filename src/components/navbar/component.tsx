'use client'

import Image from "next/image"
import logo from '@/../public/logo.png'
import { ReactNode } from "react"
import './component.scss'


interface NavBarProps {
    children: ReactNode
}

export default function NavBar({ children }: NavBarProps) {

    return (
        <nav className="nav-area">
            <Image src={logo} alt="logo" width={100} height={100}></Image>
            <div className="nav-links">
                {children}
            </div>
        </nav>
    )
}