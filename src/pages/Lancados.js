import React from "react";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";

export default function Lancados() {


    return (
        <div className="conteudoHome">
            <Menu></Menu>
            <div className="apresentacao">
                <table width="500" border="1px">
                    <tbody>
                        <tr className="trTopo">
                            <td>
                                Descrição
                            </td>
                            <td>
                                Valor
                            </td>
                            <td>
                                Data de Vencimento
                            </td>
                        </tr>
                        <tr className="trTopo">
                            <td>
                                Internet<br />
                                Luz<br />
                                Agua<br />
                            </td>
                            <td>
                                R$ 150,00<br />
                                R$ 100,00<br />
                                R$ 200,00<br />
                            </td>
                            <td>
                                10/01/2023<br />
                                20/01/2023<br />
                                15/01/2023<br />
                            </td>
                            <td>
                                "X"<br />
                                "X"<br />
                                "X"<br />
                            </td>
                        </tr>
                    </tbody>
                </table>                
            </div>
            <div className="btnVoltar">
                    <label><Link to="/home" style={{ textDecoration:'none' }}>Voltar </Link></label>
                </div>
        </div>
    )

}