'use client'
import './component.scss'
import { ChangeEvent } from "react"

type InputTypes = 'text' | 'checkbox' | 'file'| 'number' | 'password' | 'email' | 'date'

interface InputProps{
    name?: string
    type: InputTypes
    label: string
    value?: string
    placeholder?: string
    onChange?: (e:ChangeEvent<HTMLInputElement>) => void
    onInput?: (e:ChangeEvent<HTMLInputElement>) => void
}

export default function Input ({placeholder,label,onChange, type,value,name, onInput}: InputProps){


    return(
        <div className= {`${type === "checkbox" ? "input-wrapper-checkbox"  : "input-wrapper"}`}>
            <label htmlFor={label}>{label}</label>
            <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} onInput={onInput} />
        </div>
    )
}