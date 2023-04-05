import React from "react";
import logo from '../images/Logo.png'

import { NavLink } from 'react-router-dom'
import styles from "./Navbar.module.css";

import { useAuthentication } from '../hooks/userAuthentication';

import { useAuthValue } from '../context/AuthContext';


const Navbar = () => {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.brand}>
                Finances <span>Resource<img src={logo} alt="WF TECNOLOGY"/></span>
            </NavLink>
            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>Home </NavLink>
                </li>
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
                    <>

                        <li>
                            <NavLink to="/lancamentos" className={({ isActive }) => (isActive ? styles.active : "")}>Novo Lancamento</NavLink>
                        </li>
                        <li>
                            <NavLink to="/lancados" className={({ isActive }) => (isActive ? styles.active : "")}>Eventos Lançados</NavLink>
                        </li>
                        <li>
                            <button onClick={logout}>Sair</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar