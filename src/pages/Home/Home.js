import React from 'react'
import styles from './Home.module.css'
import { useAuthValue } from '../../context/AuthContext';

function Home() {
  const { user } = useAuthValue();

  return (
    <div className={styles.container_financeiro}>
      <h3>Com o Finances Resource você pode:</h3>
      <div className={styles.container_lista}>
        <ul>
          <li>Controle suas finanças de forma simples</li>
          <li>Faça lançamentos mensais</li>
          <li>Controle o vencimento</li>
          <li>Altere o status conforme a necessidade</li>
          <li>Visualize o resumo de gastos mensais</li>
        </ul>
        {!user && (<p><b>Crie uma conta ou faça login para começar!</b></p>)}
        
      </div>
    </div>

  )
}

export default Home