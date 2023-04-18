import styles from './Lancados.module.css'

//hooks
//import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import PostDetail from '../../components/PostDetails';


const Lancados = () => {

  const [mesLancamento, setMesLancamento] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()


  }

  return (
    <div className={styles.lancado}>
      <h2>Eventos Lançados</h2>
      <p>Selecione o mes para visualizar seus lançamentos!</p>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <select className={styles.select} onLoad={e => setMesLancamento(e.target.value)} onChange={e => setMesLancamento(e.target.value)}>
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
          <option>Outbro</option>
          <option>Novembro</option>
          <option>Dezembro</option>
        </select>
      </form>
      <div>
        {!mesLancamento && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
          </div>
        )}
        {mesLancamento && (
          <div>
            <PostDetail mesLancamento={mesLancamento} />
          </div>

        )}
      </div>
    </div>
  )
}

export default Lancados