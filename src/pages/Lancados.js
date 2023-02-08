import excluir from '../images/excluir.gif';
import refresh from '../images/refresh.gif';
import '../App.css';
import React from "react";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import { useFetch } from '../components/useFetch';

const url = "http://localhost:3000/lancados"

export default function Lancados() {

    const { data: items, httpConfig, loading, error } = useFetch(url);

    const handleRemove = (id) => {
        httpConfig(id, "DELETE")
    };

    return (
        <div className="conteudoHome">
            <Menu></Menu>
            <div className="apresentacao">
                <table width="500" border="1px">
                    <tbody>
                        <div className="trTopo">
                            <td width="121px">
                                Descrição
                            </td>
                            <td width="114px">
                                Valor
                            </td>
                            <td width="130px">
                                Vencimento
                            </td>
                            <td width="105px">
                                Ações
                            </td>
                        </div>
                        <tr className="trContainer">
                            <div className="divContainer">
                                <td>
                                    {items && items.map((product) => (
                                        <li key={product.id}>{product.name}<br />
                                        </li>
                                    ))}
                                </td>
                                <td>
                                    {items && items.map((product) => (
                                        <li key={product.id}>R$: {product.price}<br />
                                        </li>
                                    ))}
                                </td>
                                <td>
                                    {items && items.map((product) => (
                                        <li key={product.id}>{product.date}<br />
                                        </li>
                                    ))}
                                </td>
                                <td>
                                    {items && items.map((product) => (
                                        <li key={product.id}>
                                            <img src={excluir} alt="Delete" onClick={()=> handleRemove(product.id)} className="imgExclui" />
                                            <img src={refresh} alt="Editar" className="imgExclui" />
                                        </li>
                                    ))}
                                </td>                                
                            </div>
                        </tr>
                    </tbody>
                </table>
            </div >
            <div className="btnVoltar">
                <span><Link to="/home" style={{ textDecoration: 'none' }}>Voltar </Link></span>
            </div>
        </div >
    )

}