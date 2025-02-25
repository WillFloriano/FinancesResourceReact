import styles from './Investimentos.module.css'

import LancDetailFIIS from '../../components/LancDetailsFIIS';
import LancDetail from '../../components/LancDetails';

const Investimentos = () => {
  return (
    <div className={styles.lancado}>            
      <h2>Investimentos</h2> 
      <table className={styles.tableFixo} border="1">           
            <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Tipo</th>
                      <th>Valor</th>
                      <th>Vencimento</th>
                      <th>Indexador</th>
                      <th>Ações</th>
                    </tr>
            </thead> 
                  <LancDetail />                    
        </table>              
        <table className={styles.tableHeader} border="1">           
            <thead >
                    <tr>
                      <th>Descrição</th>
                      <th>Tipo</th>
                      <th>Vlr. Investido</th>                     
                      <th>Vencimento</th>
                      <th>Indexador</th>
                      <th>Quantidade</th>
                      <th>Vlr. Pago</th>
                      <th>Vlr. Corrente</th>
                      <th>Qtd Final</th>
                      <th>Ações</th>
                    </tr>
            </thead>   
                  <LancDetailFIIS />                 
        </table>                    
    </div>
  )
}

export default Investimentos