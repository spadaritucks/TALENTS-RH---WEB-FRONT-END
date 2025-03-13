'use client'
import './component.scss'
import { ChangeEvent, ReactNode } from "react"



interface SelectProps{
    name?: string;
    defaultValue?: string
    label: string
    value?: string
    onChange?: (e:ChangeEvent<HTMLSelectElement>) => void
    children:ReactNode
    SelectKey?:string
    style?: React.CSSProperties
    disabled?: boolean

}

export default function Select ({label,onChange, defaultValue,children,value,name,SelectKey, style, disabled}: SelectProps){


    return(
        <div className="select-wrapper" >
            <label htmlFor={label}>{label}</label>
            <select disabled={disabled} style={style} name={name} defaultValue={defaultValue} value={value} onChange={onChange}>
                {children}
            </select>
        </div>
    )
}