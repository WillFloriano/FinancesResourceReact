import React from "react";
import { Link } from "react-router-dom";


export default function Login(){
    return(
        <div>            
            <form className="form">
                <label className="finances">Finances Resource</label>
                <input type="email" className="inEmail" placeholder="Type your e-mail here"></input>
                <input type="password" className="inPass" placeholder="Type your p@$$w0rd"></input>
                <button className="btnEntrar">Entrar</button>
                <label className="lblEntrar">Ainda nao tem uma conta ? <Link to="/register" style={{ textDecoration:'none' }}>Registre-se</Link></label>
            </form>            
        </div>
    )

}