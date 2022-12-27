import React from "react";
import Menu from "../components/Menu";


export default function Lancamentos() {

    return (
        <div className="conteudoHome">
            <Menu></Menu>
            <div className="apresentacao">
                <div className="containerlanc">
                    Descrição: <input type="text" className="txtDescricao" placeholder="Descrição do lançamento"></input>
                    Valor: <input type="text" className="txtValor" placeholder="Valor do lançamento"></input>
                    Data de vencimento: <input type="date" className="txtVencimento" placeholder="Digite a data de vencimento"></input>
                    Repete meses ? <input type="number" className="txtmeses" placeholder="Quantidade de parcelas"></input>
                    <br />
                    <button className="btnInsert">Inserir</button>
                </div>
            </div>
        </div>
    )
}