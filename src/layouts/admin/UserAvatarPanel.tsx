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
}

export default function UserAvatarPanel({ userLogged }: UserAvatarPanelProps) {

    return (
        <div className="user-avatar-name">
            <DropdownMenu>

                <DropdownMenuTrigger>
                    <div className="user-avatar-name">
                        <Avatar>
                            <AvatarImage src={`${process.env.API_URL}/storage/${userLogged.foto_usuario}`} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h3>{userLogged.nome}</h3>
                    </div>
                </DropdownMenuTrigger>
                

                <DropdownMenuContent>
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><a href={`/admin/editar_usuario?id=${userLogged.id}`}>Dados Pessoais</a></DropdownMenuItem>
                    <DropdownMenuItem><a href={`/admin/editar_endereco?id=${userLogged.id}`}>Localização e Endereço</a></DropdownMenuItem>
                    <DropdownMenuItem><a href={`/admin/editar_curriculo?id=${userLogged.id}`}>Cargo e Atividades</a></DropdownMenuItem>
                    <DropdownMenuItem><a href={`/admin/editar_senha?id=${userLogged.id}`}>Alterar Senha</a></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}