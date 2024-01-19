import Input from "../componentes/input";
import Logo from "../assets/logo.png"
import Button from "../componentes/button";
import ErrorInput from "../componentes/errorInput";
import Cookies from "js-cookie";
import {signinSchema} from "../schemas/signinSchema.js";
import {zodResolver} from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signin } from "../services/user.js";
import { useEffect, useState } from "react";

const Signin = () => {
    
    const {
        register, 
        handleSubmit, 
        formState:{errors},
    } = useForm({resolver: zodResolver(signinSchema)});
    const [apiErrors, setApiErrors] = useState("");
    const navigate = useNavigate();

    async function handleSubmitForm(data){
        try{
            const token = await signin(data);
            Cookies.set("token", token.data, {expires: 1});
            navigate("/");
        }catch(error){
            console.log(error.message);
            setApiErrors(error.message);
        }
    }
    
    useEffect(() => {
        Cookies.remove("token");
    }, []);
    
    return(
        <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem]">
            <img src={Logo} alt="Logo DioWallet" className="w-44"/>
            {apiErrors && <ErrorInput text={apiErrors} />}
            <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col justify-center gap-4 w-full text-2xl">
                <Input 
                    type="email" 
                    placeholder="Email" 
                    register={register} 
                    name="email"
                />
                {errors.email && <ErrorInput text={errors.email.message}/>}
                <Input 
                    type="password" 
                    placeholder="Senha" 
                    register={register} 
                    name="password"
                    />
                {errors.password && <ErrorInput text={errors.password.message}/>}
                
                <Button text="SIGNIN" type="submit"/>
            </form>

            <p className="text-white text-2xl">Não tem conta? <Link to="/signup" className="text-sky-400 hover:text-sky-600"> Resgistre-se </Link></p>

        </div>
    )   
}

export default Signin;