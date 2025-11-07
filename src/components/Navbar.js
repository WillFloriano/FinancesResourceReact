import React from "react";
import logo from '../images/LogoNovo.png'
//import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import styles from "./Navbar.module.css";

import { useAuthValue } from '../context/AuthContext';

import Menu from './Menu';


const Navbar = () => {
    const { user } = useAuthValue();

    //const navigate = useNavigate();

    return (
        <nav className={styles.navbar}>
            <a href="/" className={styles.brand}>
                <span>WMZR TECNOLOGY</span>
            </a>
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
                {user && (
                        <li>
                            <Menu></Menu>
                        </li>                                            
                )}
                
            </ul>
        </nav>
        
    )
}

export default Navbar