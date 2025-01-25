import styles from './Investimentos.module.css'

import LancDetail from '../../components/LancDetails';

const Investimentos = () => {
  return (
    <div className={styles.lancado}>            
      <h2>Investimentos</h2>
      <div>      
            <LancDetail />          
    </div>
    </div>
  )
}

export default Investimentos