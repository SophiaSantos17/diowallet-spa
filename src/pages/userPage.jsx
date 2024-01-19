/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ErrorInput from "../componentes/errorInput";
import { userLogged } from "../services/user";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";


const UserPage = () => {
    const [user, setUser] = useState({});
    const [apiErrors, setApiErrors] = useState(""); 

    async function getUser(){
        try{
            const userResponse = await userLogged();
            setUser(userResponse.data) ;
            
        }catch(error){
            console.log(error);
            setApiErrors(error.message);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <main className="flex flex-col items-start justify-around bg-zinc-900 rounded p-8 gap-7 relative text-white">
            {apiErrors && <ErrorInput text={apiErrors} />}
            <Link to="/">
                    <BiArrowBack className="text-white absolute top-3 left-3 text-2xl"/>
            </Link>
            <h1 className="text-white font-bold text-5xl">Informações do Usuário</h1>
            <div className="flex justify-between items-start w-full">
                <span>
                    <p className="py-1">User:</p>
                    <p className="py-1">Email:</p>
                </span>
                <span>
                    <p className="py-1">{user.name}</p>
                    <p className="py-1">{user.email}</p>
                </span>
            </div>
        </main>
    );
};

export default UserPage;