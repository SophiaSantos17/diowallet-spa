import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:5000";

export function findAllTransaction(){
    const response = axios.get(`${BASE_URL}/transactions`, {
        headers: {Authorization: `Bearer ${Cookies.get("token")}` 
    }, });
    return response;
}

export function getTransactionByID(id){
    const response = axios.get(`${BASE_URL}/transactions/${id}`, {
        headers: {Authorization: `Bearer ${Cookies.get("token")}` 
    }, });
    return response;
}

export function createNewTransaction(body){
    const response = axios.post(`${BASE_URL}/transactions`, body, {
        headers: {Authorization: `Bearer ${Cookies.get("token")}` 
    }, });
    return response;
}

export function editTransaction(data, id){
    const response = axios.put(`${BASE_URL}/transactions/${id}`, data, {
        headers: {Authorization: `Bearer ${Cookies.get("token")}` 
    }, });
    return response;
}

export async function removeTransaction(id) {
    try {
        const response = await axios.delete(`${BASE_URL}/transactions/${id}`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        return response;
    } catch (error) {
        // Você pode lidar com erros aqui, como registrar no console ou lançar novamente
        console.error("Erro ao excluir transação:", error);
        throw error;
    }
}