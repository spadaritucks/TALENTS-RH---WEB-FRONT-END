'use client'
import './component.scss'
import { ChangeEvent } from "react"



interface TextAreaProps{
    name?: string
    label: string
    value?: string
    placeholder?: string
    onChange?: (e:ChangeEvent<HTMLTextAreaElement>) => void
    cols?: number
    rows?: number
    style?: React.CSSProperties
  
}

export default function TextArea ({placeholder,label,onChange,value,name, cols, rows, style }: TextAreaProps){


    return(
        <div className= "textarea-wrapper">
            <label htmlFor={label}>{label}</label>
            <textarea  name={name} placeholder={placeholder} value={value} onChange={onChange} cols={cols} rows={rows} style={style} />
        </div>
    )
}