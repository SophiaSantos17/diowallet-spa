/* eslint-disable react-hooks/exhaustive-deps */
import Logo from "../assets/logo.png";
import Button from "../componentes/button";
import Cookies from "js-cookie"
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { userLogged } from "../services/user";
import { findAllTransaction, removeTransaction } from "../services/transactions";
import ErrorInput from "../componentes/errorInput";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [transaction, setTransactions] = useState([]);
    const [balace, setBalance] = useState(0);
    const [apiErrors, setApiErrors] = useState("");
    
    function validateToken() {
        const token = Cookies.get("token");
        if (!token) navigate("/signin");
    }

    async function getUserLogged(){
        try{
            const userResponse = await userLogged();
            setUser(userResponse.data) ;
            
        }catch(error){
            console.log(error);
            setApiErrors(error.message);
        }
    }

    async function getAllTransaction(){
        try{
            const response = await findAllTransaction();
            setTransactions(response.data);
            calculateBalance(response.data);
        }catch(error){
            console.log(error);
            setApiErrors(error.message);
        }
    }
    
    function calculateBalance(transactions) {
        let total = 0;
        transactions.forEach((transaction) => {
          transaction.type === "input"
            ? (total += Number(transaction.value))
            : (total -= Number(transaction.value));
        });
    
        setBalance(total);
    }

    async function deleteTransaction(id) {
        try {
            const shouldDelete = window.confirm("Deseja realmente excluir?");
            if (shouldDelete) {
                await removeTransaction(id);
                getAllTransaction();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        validateToken();
        getUserLogged();
        getAllTransaction();
    }, []);


     return(
        <main className="flex flex-col items-center justify-center bg-zinc-900 rounded p-8 w-[60rem] h-[35rem] text-2xl"> 
            {apiErrors && <ErrorInput text={apiErrors} />}
            <header className="flex items-center justify-between w-full pb-4">
                <img src={Logo} alt="Logo Dio Wallet" className="w-32"/>
                <div className="flex items-center text-white text-2xl gap-4">
                    <h1>Olá,  
                        <Link to={`/user/${user._id}`} > 
                            {user.name}
                        </Link>
                    </h1>
                    <Link to="/signin">
                        <GoSignOut /> 
                    </Link>

                </div>

            </header>

            <section className="bg-zinc-300 p-4 w-full h-full rounded flex items-center justify-center">
                {transaction.length ? (
                    <ul className=" w-full h-full flex flex-col justify-between">
                        <div className="h-[17rem] overflow-auto p-3">
                            {transaction.map((transaction, index) => (
                                <li key={index} className="flex justify-between items-start w-full">
                                    <span className="flex items-center gap-2">
                                        <span className="text-base text-zinc-500">
                                            {dayjs(transaction.createdAt).format("DD/MM")}
                                        </span>
                                        {transaction.description}
                                    </span>
                                    <span className={`
                                        ${
                                            transaction.type === "input" 
                                            ? "text-green-600" 
                                            : "text-red-600"
                                        }`}
                                    >
                                        R$ {transaction.value}
                                    </span>
                                    <span className="flex">
                                        <Link to={`/editTransaction/${transaction._id}`}> <MdEdit className=""/></Link>
                                        <Link > <FaTrashAlt className="" onClick={() => deleteTransaction(transaction._id)}  /></Link>
                                    </span>
                                </li>
                            ))}
                        </div>
                        <li className="flex justify-between items-start w-full px-3">
                            <span>
                                Balance:
                            </span> 
                            <span className={`${ balace > 0 ? "text-green-600" : "text-red-600" }`}>
                                R$ {balace}
                            </span>
                        </li>
                        
                    </ul>
                ) : (
                    <h2>There is no check-in or check-out</h2>
                )}
                
            </section>

            <footer className="w-full pt-2 flex gap-2 text-white text-lg font-bold">
                <Button text="Nem Input" type="button" icon="plus" transaction="input"/>
                <Button text="Nem Output" type="button" icon="minus" transaction="output"/>
            </footer>

        </main>
     );

}

export default Home;