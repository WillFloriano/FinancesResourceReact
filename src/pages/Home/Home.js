import React from 'react'
import styles from './Home.module.css'
import { getAuth } from "firebase/auth";
import { useEffect } from 'react';


function Home() {

  const auth = getAuth();
  const user = auth.currentUser;

  
useEffect(() => {
  const script = document.createElement('script');

  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4910952789729743";
  script.async = true;
  script.crossOrigin = "anonymous";

  document.head.appendChild(script);

}, []);  

  return (
    <div>
      <span className={styles.saudacao}>Olá {user.email}</span>
      <div className={styles.container_financeiro}>
        <h3 className={styles.container_h3}>Remuneração Entrada:</h3>
          <div className={styles.container_lista}>
            <ul>
              <li>Salários - R$</li>
              <li>Vale Alimentação - R$ </li>
              <li>Vale Refeição - R$ </li>
            </ul>
            <span><b>Total: R$ </b></span>
          </div>
      </div>
      

      <div className={styles.container_contas}>
        <h3 className={styles.container_contas_h3}>Contas Fixas:</h3>
          <div className={styles.container_lista_contas}>
             <ul>
              <li>Internet Celular Mislene - R$</li>
              <li>Internet Celular William - R$ </li>
              <li>Internet Casa - R$ </li>
              <li>Luz - R$ </li>
              <li>Compras - R$ </li>
              <li>Entrada Apartamento - R$ </li>
              <li>Evolução de Obra - R$ </li>
              <li>Jhonata - R$ </li>
              <li>Mae Mislene - R$ </li>
              </ul>
                <span><b>Total: R$ </b></span>
      </div>
      </div>
      

    </div>

  )
}

export default Home