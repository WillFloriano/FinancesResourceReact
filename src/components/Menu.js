import React from "react";
import logo from '../images/Logo.png'
import { NavLink } from 'react-router-dom'
import styles from "./Navbar.module.css";

import { useAuthValue } from '../context/AuthContext';


const Navbar = () => {
    const { user } = useAuthValue();


    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.brand}>
                Finances <span>Resource <img src={logo} alt="WF TECNOLOGY"/></span>
            </NavLink>
            <ul className={styles.links_list}>                
                {!user && (
                    <>
                        <li>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")}>Cadastrar</NavLink>
                        </li>
                    </>
                )}                
            </ul>
        </nav>
    )
}

export default Navbar