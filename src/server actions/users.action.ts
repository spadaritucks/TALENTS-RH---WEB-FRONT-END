'use server'

import { getAllUsers } from "@/api/users/api";


export async function getUsersAction() {
    const data = await getAllUsers();
    return data.users; // Retorna os processos
}