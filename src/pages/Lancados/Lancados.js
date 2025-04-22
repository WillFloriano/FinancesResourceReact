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
        <select className={styles.select} value={mesLancamento} onChange={e => setMesLancamento(parseInt(e.target.value))}>
          <option value={0}>Selecione</option>
          <option value={1}>Janeiro</option>
          <option value={2}>Fevereiro</option>
          <option value={3}>Março</option>
          <option value={4}>Abril</option>
          <option value={5}>Maio</option>
          <option value={6}>Junho</option>
          <option value={7}>Julho</option>
          <option value={8}>Agosto</option>
          <option value={9}>Setembro</option>
          <option value={10}>Outbro</option>
          <option value={11}>Novembro</option>
          <option value={12}>Dezembro</option>
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