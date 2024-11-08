'use client'

import { useEffect } from "react"


export const useAuthCandidato = () => {

    useEffect(()=>{
        const token = sessionStorage.getItem('token')

        if(!token){
            window.location.href = '/candidato/login'
        }
    },[])

}

export const useAuthHeadhunter = () => {

    useEffect(()=>{
        const token = sessionStorage.getItem('token')

        if(!token){
            window.location.href = '/headhunter/login'
        }
    },[])

}

export const useAuthEmpresa = () => {

    useEffect(()=>{
        const token = sessionStorage.getItem('token')

        if(!token){
            window.location.href = '/empresa/login'
        }
    },[])

}