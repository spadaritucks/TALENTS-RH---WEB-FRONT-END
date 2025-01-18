'use client'

import './component.scss'
import TagsInputs from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

interface TagsInputProps{
    label: string
    value: string[]
    onChange: (tags: string[]) => void
    inputProps: {placeholder: string}
}

export default function TagsInput({label, value, onChange}: TagsInputProps){

    

    return(
        <div className= "input-wrapper">
            <label htmlFor={label}>{label}</label>
            <TagsInputs value={value} onChange={onChange} inputProps={{ placeholder: 'Adicionar competência' }} />
        </div>
    )
}