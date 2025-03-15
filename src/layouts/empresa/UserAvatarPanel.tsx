'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Usuarios } from "@/models/usuarios"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "lucide-react"



interface UserAvatarPanelProps {
    userLogged: Usuarios
    foto_usuario: string
}

export default function UserAvatarPanel({ userLogged, foto_usuario }: UserAvatarPanelProps) {

    

    return (
        <div>
            <DropdownMenu>

                <DropdownMenuTrigger>
                    <div className="user-avatar-name">
                        <Avatar>
                            <img src={foto_usuario} alt=""/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h3>{userLogged.nome}</h3>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><a href={`/empresa/editar_usuario?id=${userLogged.id}`}>Dados do Responsavel</a></DropdownMenuItem>
                    <DropdownMenuItem><a href={`/empresa/editar_endereco?id=${userLogged.id}`}>Localização e Endereço</a></DropdownMenuItem>
                    <DropdownMenuItem><a href={`/empresa/editar_curriculo?id=${userLogged.id}`}>Dados da Empresa</a></DropdownMenuItem>
                    <DropdownMenuItem><a href={`/empresa/editar_senha?id=${userLogged.id}`}>Alterar Senha</a></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}