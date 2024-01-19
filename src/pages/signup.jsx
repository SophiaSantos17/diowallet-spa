import Input from "../componentes/input";
import Button from "../componentes/button";
import Logo from "../assets/logo.png"
import ErrorInput from "../componentes/errorInput";
import {signupSchema} from "../schemas/signupSchema.js";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { signup } from "../services/user.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {

    const {
        register, 
        handleSubmit, 
        formState:{errors},
    } = useForm({resolver: zodResolver(signupSchema)});

    const navigate = useNavigate();
    const [apiErrors, setApiErrors] = useState("");

    async function handleSubmitForm(data){
        try{
            await signup(data);
            navigate("/signin");
        }catch(error){
            console.log(error);
            setApiErrors(error.message);
        }
    }

    
    return(
        <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem] relative">
            <img src={Logo} alt="Logo DioWallet" className="w-44"/>
            {apiErrors && <ErrorInput text={apiErrors} />}
            <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col justify-center gap-4 w-full text-2xl">
                <Input 
                    type="text" 
                    placeholder="Nome Complete" 
                    register={register} 
                    name="name"
                />
                {errors.name && <ErrorInput text={errors.name.message}/>}
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
                <Input 
                    type="password" 
                    placeholder="Confirme a Senha"
                    register={register} 
                    name="confirmPassword"
                />
                {errors.confirmPassword && <ErrorInput text={errors.confirmPassword.message}/>}
                
                <Button text="SIGNUP" type="submit"/>
            </form>

            <p className="text-white text-2xl">Tem conta? <Link to="/signin" className="text-sky-400 hover:text-sky-600"> Logue-se </Link></p>

        </div>
    )   
}

export default Signup;