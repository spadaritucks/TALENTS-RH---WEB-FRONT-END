'use client'

import { ReactNode, useState } from "react"
import './component.scss'
import Image from "next/image"
import logo from '../../../public/logo-not-background.png'
import menu from '../../../public/menu.png'
import close from '../../../public/close-menu.png'

interface NavbarProps {
    children: ReactNode
}


export default function NavBar({ children }: NavbarProps) {

    const [open, setOpen] = useState<boolean>(false);

    const openSideBar = () => {
        setOpen(!open)
    }

    return (
        <nav className="nav-area">
            {open ? <Image className="menu-icon" src={close} onClick={openSideBar} alt="" /> : <Image className="menu-icon" onClick={openSideBar} src={menu} alt="" />}
            <Image src={logo} alt="" className="logo" />
            <div className={`nav-content ${open ? 'open' : ''}`}>
                {children}
            </div>
        </nav>

    )
}