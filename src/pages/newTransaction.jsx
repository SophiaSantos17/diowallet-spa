import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "../schemas/transactionSchema";
import Input from "../componentes/input";
import Button from "../componentes/button";
import ErrorInput from "../componentes/errorInput";
import { createNewTransaction } from "../services/transactions";

const NewTransaction = () => {
    const navigate = useNavigate();
    const {type} = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(transactionSchema),
    });
    async function onSubmitForm(data){
        try{
            const body = {...data, type};
            await createNewTransaction(body);
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }
    return(

        <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 gap-7 relative">
            <header>
                <Link to="/">
                    <BiArrowBack className="text-white absolute top-3 left-3 text-2xl"/>
                </Link>
                <h1 className="text-white font-bold text-5xl"> New {type}</h1>
            </header>
            <form onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col justify-center gap-4 w-full text-2xl">

                <Input 
                        type="number" 
                        placeholder="Value" 
                        register={register} 
                        name="value"
                />
                {errors.value && <ErrorInput text={errors.value.message}/>}
                <Input 
                    type="text" 
                    placeholder="Description"
                    register={register} 
                    name="description"
                />
                {errors.description && <ErrorInput text={errors.description.message}/>}
                
                <Button text="SAVE" type="submit"/>

            </form>
        </div>

    );
}

export default NewTransaction;