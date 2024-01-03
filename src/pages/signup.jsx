import Input from "../componentes/input";
import Button from "../componentes/button";
import Logo from "../assets/logo.png"

import { Link } from "react-router-dom";

const Signup = () => {
    return(
        <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem] relative">
            <img src={Logo} alt="Logo DioWallet" className="w-44"/>
            <form className="flex flex-col justify-center gap-4 w-full text-2xl">
                <Input type="text" placeholder="Nome Complete"></Input>
                <Input type="email" placeholder="Email"></Input>
                <Input type="password" placeholder="Senha"></Input>
                <Input type="password" placeholder="Confirme a Senha"></Input>
                
                <Button text="SIGNUP" type="submit"/>
            </form>

            <p className="text-white text-2xl">Tem conta? <Link to="/signin" className="text-sky-400 hover:text-sky-600"> Logue-se </Link></p>

        </div>
    )   
}

export default Signup;