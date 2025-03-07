'use server'

import { getCep } from "@/api/cep/api"


export default async function getCepAction(cep:string){

    const data = await getCep(cep);
    
    if(data.erro){
        return {erro: data.erro}
    }

    return data

}