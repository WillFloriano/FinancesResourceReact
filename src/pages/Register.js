import React from "react";
import { Link } from "react-router-dom";

export default function Register(){

    
    return(
        <div>
            <form className="form">
                <label className="finances">Finances Resource</label>
                <input type="email" className="inEmail" placeholder="Type your e-mail here"></input>
                <input type="password" className="inPass" placeholder="Type your p@$$w0rd"></input>
                <button className="btnRegistrar">Registrar</button>
                <label className="lblRegistro">Já tem uma conta ? <Link to="/" style={{ textDecoration:'none' }}>Entre</Link></label>
            </form>            
        </div>
    )
}