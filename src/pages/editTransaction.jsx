
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useEffect, useState } from "react";
import { editTransaction, getTransactionByID } from "../services/transactions";
import Button from "../componentes/button";
import { transactionSchema } from "../schemas/transactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../componentes/input";
import ErrorInput from "../componentes/errorInput";

const EditTransaction = () => {
    let { id } = useParams();
    const [transaction, setTransaction] = useState({});
    const navigate = useNavigate();

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(transactionSchema),
    });

    async function onSubmitForm(data){
        try{
            const body = {...data};
            await editTransaction(body, id);
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }

    async function getInfoTransacion(id) {
        try {
            const response = await getTransactionByID(id);
            setTransaction(response.data);

            // Use o método setValue para definir os valores iniciais dos campos
            setValue("value", response.data.value);
            setValue("description", response.data.description);
        } catch (err) {
            console.log(err);
        }
    }
    

    useEffect(() => {
        getInfoTransacion(id);
    }, [id]);

    return(

        <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 gap-7 relative">
            <header>
                <Link to="/">
                    <BiArrowBack className="text-white absolute top-3 left-3 text-2xl"/>
                </Link>
                <h1 className="text-white font-bold text-5xl"> Edit Transaction</h1>
            </header>
            <form onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col justify-center gap-4 w-full text-2xl">

               
                <Input
                    type="number"
                    placeholder="Value"
                    register={register}
                    name="value"
                    defaultValue={transaction.value}
                />
                {errors.value && <ErrorInput text={errors.value.message}/>}

                <Input
                    type="text"
                    placeholder="Description"
                    register={register}
                    name="description"
                    defaultValue={transaction.description}
                />
                {errors.description && <ErrorInput text={errors.description.message}/>}
                
                <Button text="SAVE" type="submit"/>

            </form>
        </div>

    );
}

export default EditTransaction;