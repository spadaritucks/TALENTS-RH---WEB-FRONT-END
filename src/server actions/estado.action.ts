'use server'

import getEstado from "@/api/estados/api";

export default async function getEstadoAction () {
    const data =  await getEstado()
    return data
}