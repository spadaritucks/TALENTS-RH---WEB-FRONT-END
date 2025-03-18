'use client'
import './component.scss'

interface CounterProps{
    title: string;
    counter : number
}

export default function Counter({title, counter} : CounterProps) {

    return(
        <div className="counter-content">
            <h1>{title}</h1>
            <p>{counter}</p>
        </div>
    )
}