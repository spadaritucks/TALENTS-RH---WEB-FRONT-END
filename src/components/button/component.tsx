'use client'
import './component.scss'

type ButtonTypes = 'submit' | 'button' | 'reset'
type ButtonVariants = 'primary' | 'secondary'

interface ButtonProps{
    type: ButtonTypes;
    variant: ButtonVariants;
    ButtonName: string;
    disabled?:boolean;
    onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void

}


export default function Button({type,variant, ButtonName, onClick,disabled}: ButtonProps){

    return(
        <button type={type} className={variant} onClick={onClick} disabled={disabled}>{ButtonName}</button>
    )

}