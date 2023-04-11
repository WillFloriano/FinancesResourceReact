import styles from './Lancados.module.css'

//hooks
//import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetail from '../../components/PostDetails';


const Lancados = () => {

  const [mesLancamento, setMesLancamento] = useState(null)
  const { documents: posts, loading } = useFetchDocuments("lancamentos", mesLancamento)


  const handleSubmit = (e) => {
    e.preventDefault()    

  }

  return (
    <div className={styles.lancado}>
      <h2>Eventos Lançados</h2>
      <p>Selecione o mes para visualizar seus lançamentos!</p>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <select className={styles.select} onChange={setMesLancamento}>
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
        {loading && <p>Carregando ...</p>}
        {mesLancamento && (
          <div>
            {posts && posts.map((post) => (
              <PostDetail key={post.id} post={post} />
            ))}

          </div>
        )}
        {!mesLancamento && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lancados