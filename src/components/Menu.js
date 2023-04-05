import React from "react";
import home from '../images/home.gif'
import lancados from '../images/lancados.gif'
import lancamentos from '../images/lancamentos.gif'
import perfil from '../images/perfil.gif'
import logout from '../images/logout.gif'
import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <div className="horizontal">
            <ul className="ul">
                <li className="liHome"><Link to="/home" style={{ textDecoration: 'none' }}><img src={home} alt="pagina inicial"></img>Home</Link></li>
                <li className="liLancados"><Link to="/lancados" style={{ textDecoration: 'none' }}><img src={lancados} alt="lançados"></img>Eventos Lançados</Link></li>
                <li className="liLancamentos"><Link to="/lancamentos" style={{ textDecoration: 'none' }}><img src={lancamentos} alt="lançamentos"></img>Novo Evento</Link></li>
                <li className="liPerfil"><Link to="/profile" style={{ textDecoration: 'none' }}><img src={perfil} alt="perfil"></img>Perfil</Link></li>
                <li className="liLogout"><Link to="/" style={{ textDecoration: 'none' }}><img src={logout} alt="Sair"></img>Sair do sistema</Link></li>
            </ul>
        </div>
    )
}