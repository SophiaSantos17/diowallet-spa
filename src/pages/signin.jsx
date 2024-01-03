import Input from "../componentes/input";
import Logo from "../assets/logo.png"
import Button from "../componentes/button";

const Signin = () => {
    return(
        <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem]">
            <img src={Logo} alt="Logo DioWallet" className="w-44"/>
            <form className="flex flex-col justify-center gap-4 w-full text-2xl">
                <Input type="email" placeholder="Email"></Input>
                <Input type="password" placeholder="Senha"></Input>
                
                <Button text="SIGNIN" type="submit"/>
            </form>

            <p className="text-white text-2xl">Não tem conta? Resgistre-se</p>

        </div>
    )   
}

export default Signin;