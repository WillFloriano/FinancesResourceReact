import { Link } from 'react-router-dom'
import { useFetchDocuments } from '../hooks/useFetchDocuments';
import { useDeleteDocument } from '../hooks/useDeleteDocuments';

import styles from './PostDetails.module.css'

const PostDetail = ({ mes, uid}) => {

  const { documents: posts, loading } = useFetchDocuments("lancamentos", mes, uid)

  const { deleteDocument } = useDeleteDocument("lancamentos");
  
  //posts.map(p => p.valor).reduce((total,valor) => total + valor);
  //this.postS.reduce((total, postS)=> total + postS.valor)


  return (    

    <div className={styles.post_detail}>        
      {loading && <p>Carregando ...</p>}
        {posts && posts.length === 0 ? (
          <div className={styles.post_header}>
          <span>Nenhum Evento encontrado !</span>
        </div>
        ) : (
          <div className={styles.post_header}>
           <span>Descrição</span>
            <span>Valor</span>
            <span>Mês</span>
            <span>Dia da Compra</span>   
          <span>Ações</span>          
        </div>                
        )} 
        {posts && posts.map((post) => (         
          <div className={styles.post_row} key={post.id}>   
          <ul>
            <li>{post.title}</li>
            <li>R$ {post.valor}</li>
            <li>{post.mesLancamento}</li>  
            <li id="p_compra">{new Date(post.vencimento).toLocaleDateString("pt-br")}</li>                     
          </ul>                                 
            <Link to={`/lancados/edit/${post.id}`} className="btn ">Editar</Link>
            <button onClick={() => deleteDocument(post.id)} className="btn btn-danger">Excluir</button>                    
          </div>          
        ))}
        {posts && posts.length > 0 ? (
              
              <p>Total - R$ <span id="valTotal">{posts.map((post) => Math.round(parseFloat(post.valor))).reduce((total, valor) => total + valor)}</span> </p>          
        ): (
          <div className={styles.post_header}>
        </div>
        )
        }  
        
    </div>
  )
}

export default PostDetail