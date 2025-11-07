import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/userAuthentication";
import { useAuthValue } from "../context/AuthContext";
import styles from "./Menu.module.css";

const Menu = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  const [isLançamentosSubmenuVisible, setIsLançamentosSubmenuVisible] = useState(false);
  const [isInvestimentosSubmenuVisible, setIsInvestimentosSubmenuVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLançamentos = () => setIsLançamentosSubmenuVisible(!isLançamentosSubmenuVisible);
  const toggleInvestimentos = () => setIsInvestimentosSubmenuVisible(!isInvestimentosSubmenuVisible);

  if (!user) return null;

  const isMasterUser = user.uid === "wjuppa1J53bsHiZIhlbAqrCuic03";
  const menuClass = isMasterUser ? styles.menuM : styles.menu;
  const itemClass = isMasterUser ? styles.menuItemM : styles.menuItem;
  const submenuClass = styles.submenu;

  // Detectar se é mobile (para alternar entre hover e click)
  const isMobile = window.innerWidth <= 768;

  return (
    <nav className={styles.menu_nav}>
      <button
        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <span className={styles.user_email}>{user.email}</span>

      <ul className={`${menuClass} ${isMenuOpen ? styles.menu_open : ''}`}>

        {/* Lançamentos */}
        <li
          className={itemClass}
          onMouseEnter={!isMobile ? () => setIsLançamentosSubmenuVisible(true) : undefined}
          onMouseLeave={!isMobile ? () => setIsLançamentosSubmenuVisible(false) : undefined}
          onClick={isMobile ? toggleLançamentos : undefined}
        >
          <span>Lançamentos ▾</span>
          {isLançamentosSubmenuVisible && (
            <ul className={`${submenuClass} ${isLançamentosSubmenuVisible ? styles.show : ""}`}>
              <li>
                <NavLink to="/lancamentos" className={({ isActive }) => (isActive ? styles.active : "")}>
                  Novo Lançamento
                </NavLink>
              </li>
              <li>
                <NavLink to="/lancados" className={({ isActive }) => (isActive ? styles.active : "")}>
                  Eventos Lançados
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Investimentos */}
        <li
          className={isMasterUser ? styles.liOculta : itemClass}
          onMouseEnter={!isMobile ? () => setIsInvestimentosSubmenuVisible(true) : undefined}
          onMouseLeave={!isMobile ? () => setIsInvestimentosSubmenuVisible(false) : undefined}
          onClick={isMobile ? toggleInvestimentos : undefined}
        >
          <span>Investimentos ▾</span>
          {isInvestimentosSubmenuVisible && (
            <ul className={`${submenuClass} ${isInvestimentosSubmenuVisible ? styles.show : ""}`}>
              <li>
                <NavLink to="/lancinvestimentos" className={({ isActive }) => (isActive ? styles.active : "")}>
                  Novo Investimento
                </NavLink>
              </li>
              <li>
                <NavLink to="/investimentos" className={({ isActive }) => (isActive ? styles.active : "")}>
                  Investimentos
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Links fixos */}
        <span className={styles.nav_link_span}>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
            Home
          </NavLink>
        </span>

        <span className={styles.nav_link_span}>
          <button onClick={logout}>Sair</button>
        </span>
      </ul>
    </nav>
  );
};

export default Menu;
