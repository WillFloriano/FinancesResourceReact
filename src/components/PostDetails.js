import { Link } from 'react-router-dom'
import { useFetchDocuments } from '../hooks/useFetchDocuments';
import { useDeleteDocument } from '../hooks/useDeleteDocuments'

import styles from './PostDetails.module.css'


const PostDetail = ({ mesLancamento }) => {

  const { documents: posts, loading } = useFetchDocuments("lancamentos", mesLancamento)

  const { deleteDocument } = useDeleteDocument("lancamentos");

  return (
    <div className={styles.post_detail}>
      {loading && <p>Carregando ...</p>}
        {posts && posts.length === 0 ? (
          <div className={styles.post_header}>
          <span>Nenhum Evento encontrado !</span>

        </div>
        ) : (
          <div className={styles.post_header}>
          <span>Eventos Lançados</span>
          <span>Ações</span>
        </div>
        )}        
        {posts && posts.map((post) => (
          <div className={styles.post_row} key={post.id}>
            <p >Descrição: {post.title}</p>
            <p>Valor R$ {post.valor}</p>
            <p>Vencimento: {post.vencimento.toString("DD/MM/YYYY")}</p>
            <p>Mês Referencia: {post.mesLancamento}</p>
            <Link to={`/lancados/edit/${post.id}`} className="btn ">Editar</Link>
            <button onClick={() => deleteDocument(post.id)} className="btn btn-danger">Excluir</button>
          </div>
        ))}
    </div>
  )
}

export default PostDetail