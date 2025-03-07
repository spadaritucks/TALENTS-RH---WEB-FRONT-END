
import './page.scss'
import Image from "next/image"
import logo from '@/../public/logo-not-background.png'
import { CadastroForm } from './CadastroForm'


export default function Cadastro() {



    return (
        <section className='cadastro-area'>
            <div className='cadastro-content'>

                <Image width={160} height={160} src={logo} alt='Logo Talents RH'></Image>
                <h2>Cadastro do Headhunter</h2>
                <CadastroForm/>
            </div>
        </section>
    )
}