import React from "react";
import { Link } from "react-router-dom";
import email from '../images/email.gif';
import password from '../images/password.gif';


export default function Login() {

    const handleLogin = (login) => {
        login.preventDefault();
        console.log("Validando Login")
    }

    return (
        <div>
            <form className="form" onSubmit={handleLogin}>
                <span className="finances">Finances Resource</span>
                <label>                    
                    <input type="email" name="email" className="inEmail" placeholder="Type your e-mail here"></input>                
                    <input type="password" name="password" className="inPass" placeholder="Type your P@$sw0rd"></input>               
                    <input type="submit" className="btnEntrar" value="Entrar" />
                </label>
                <span className="lblEntrar">Ainda nao tem uma conta ? <Link to="/register" style={{ textDecoration: 'none' }}>Registre-se</Link></span>
            </form>
        </div>
    )

}