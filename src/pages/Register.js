import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (
        <div>
            <form className="form" onSubmit="">
                <span className="finances">Finances Resource</span>
                <label className="inEmail">
                    <input type="email" name="rEmail" className="inEmail" placeholder="Type your e-mail here" onChange={(e)=> setEmail(e.target.value)}></input>
                    <input type="password" name="rPassword" className="inPass" placeholder="Type your P@s$w0rd" onChange={(e)=> setPassword(e.target.value)}></input> 
                    <input type="submit" className="btnRegistrar" value="Registrar"></input>                   
                </label>                
                <span className="lblRegistro">Já tem uma conta ? <Link to="/" style={{ textDecoration: 'none' }}>Entre</Link></span>
            </form>
        </div>
    )
}