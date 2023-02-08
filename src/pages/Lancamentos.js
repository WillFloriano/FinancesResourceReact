import React from "react";
import Menu from "../components/Menu";
import { useState } from 'react';
import { useFetch } from '../components/useFetch';

const url = "http://localhost:3000/lancados"

export default function Lancamentos() {
    const {httpConfig } = useFetch(url);
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [date, setDate] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = {
            name,
            price,
            date,
        };

        httpConfig(product, "POST");

        setName("")
        setPrice("")
        setDate("")

    };


    return (
        <div className="conteudoHome">
            <Menu></Menu>
            <div className="apresentacao">
                <form onSubmit={handleSubmit}>
                    <label className="containerlanc">
                        Descrição: <input type="text" className="txtDescricao" placeholder="Descrição do lançamento" value={name} name="name" onChange={(e) => setName(e.target.value)}></input>
                        Valor: <input type="number" className="txtValor" placeholder="Valor do lançamento" value={price} name="proce" onChange={(e) => setPrice(e.target.value)}></input>
                        Data de vencimento: <input type="date" className="txtVencimento" placeholder="Digite a data de vencimento" value={date} name="date" onChange={(e) => setDate(e.target.value)}></input>
                        Repete meses ? <input type="number" className="txtmeses" placeholder="Quantidade de parcelas"></input>
                        <br />
                        <button className="btnInsert">Inserir</button>
                    </label>
                </form>
            </div>
        </div>
    )
}