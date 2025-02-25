import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/userAuthentication";
import { useAuthValue } from "../context/AuthContext";
import styles from "./Navbar.module.css"; // Importando o CSS

const Menu = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  const [isLançamentosSubmenuVisible, setIsLançamentosSubmenuVisible] = useState(false);
  const [isInvestimentosSubmenuVisible, setIsInvestimentosSubmenuVisible] = useState(false);

  const handleLançamentosMouseEnter = () => setIsLançamentosSubmenuVisible(true);
  const handleLançamentosMouseLeave = () => setIsLançamentosSubmenuVisible(false);

  const handleInvestimentosMouseEnter = () => setIsInvestimentosSubmenuVisible(true);
  const handleInvestimentosMouseLeave = () => setIsInvestimentosSubmenuVisible(false);

  return (
    <nav>
      {user.uid === "wjuppa1J53bsHiZIhlbAqrCuic03" && (
        <>
        <span>{user.email}</span>
          <ul className={styles.menuM}>
            <li
              className={styles.menuItemM}
              onMouseEnter={handleLançamentosMouseEnter}
              onMouseLeave={handleLançamentosMouseLeave}
            >
              <span>Lançamentos</span>
              {isLançamentosSubmenuVisible && (
                <ul className={styles.submenuM}>
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

            <li
              className={styles.liOculta}
              onMouseEnter={handleInvestimentosMouseEnter}
              onMouseLeave={handleInvestimentosMouseLeave}
            >
              <span>Investimentos</span>
              {isInvestimentosSubmenuVisible && (
                <ul className={styles.liOculta}>
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

            <span>
              <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
                Home
              </NavLink>
            </span>

            <span>
              <button onClick={logout}>Sair</button>
            </span>
          </ul>
        </>
      )}

      {user.uid !== "wjuppa1J53bsHiZIhlbAqrCuic03" && (
        <>
        <span>{user.email}</span>
          <ul className={styles.menu}>
            <li
              className={styles.menuItem}
              onMouseEnter={handleLançamentosMouseEnter}
              onMouseLeave={handleLançamentosMouseLeave}
            >
              <span>Lançamentos</span>
              {isLançamentosSubmenuVisible && (
                <ul className={styles.submenu}>
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

            <li
              className={styles.menuItem}
              onMouseEnter={handleInvestimentosMouseEnter}
              onMouseLeave={handleInvestimentosMouseLeave}
            >
              <span>Investimentos</span>
              {isInvestimentosSubmenuVisible && (
                <ul className={styles.submenu}>
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

            <span>
              <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
                Home
              </NavLink>
            </span>

            <span>
              <button onClick={logout}>Sair</button>
            </span>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Menu;
