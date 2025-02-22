import styles from './Lancados.module.css'

//hooks
//import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import PostDetail from '../../components/PostDetails';
import { useAuthValue } from '../../context/AuthContext';
import {useParams } from 'react-router-dom'

const Lancados = () => {

  const {user} = useAuthValue();
  const uid = user.uid
  const [mesLancamento, setMesLancamento] = useState(null)
  const {id} = useParams();
 
  const handleSubmit = (e) => {
    e.preventDefault() 
  
  }
    
  return (
    <div className={styles.lancado}>            
      <h2>Eventos Lançados</h2>
      <p>Selecione o mes para visualizar seus lançamentos!</p>      
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <select className={styles.select} value="Selecione" onChange={e => setMesLancamento(e.target.value)}>
          <option>Selecione</option>
          <option>Janeiro</option>
          <option>Fevereiro</option>
          <option>Março</option>
          <option>Abril</option>
          <option>Maio</option>
          <option>Junho</option>
          <option>Julho</option>
          <option>Agosto</option>
          <option>Setembro</option>
          <option>Outubro</option>
          <option>Novembro</option>
          <option>Dezembro</option>
        </select>
      </form>
      <div>
      {id && id.length > 0 ? (
          <div>
            <PostDetail mes={id} uid={uid} />
          </div>) : (
          !mesLancamento && (
          <div className={styles.noposts}>
            <p>Não foram encontrados dados</p>
          </div>
        ))}
        {mesLancamento && (
          <div>
            <PostDetail mes={mesLancamento} uid={uid} />
          </div>

        )}
      </div>
    </div>
  )
}

export default Lancados