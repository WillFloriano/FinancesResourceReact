import { Link } from 'react-router-dom'
import { useFetchInvestimentos } from '../hooks/useFetchInvestimentos';
import { useDeleteDocument } from '../hooks/useDeleteDocuments';

import styles from './LancDetails.module.css'

const LancDetail = () => {

  const { documents: posts, loading } = useFetchInvestimentos("investimentos")

  const { deleteDocument } = useDeleteDocument("investimentos");
  
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
            <span>Vencimento</span>
            <span>Indexador</span>   
          <span>Ações</span>          
        </div>                
        )} 
        {posts && posts.map((post) => (         
          <div className={styles.post_row} key={post.id}>   
          <ul>
            <li>{post.title}</li>
            <li>{post.valor}</li>                        
            <li>{post.vencimento}</li> 
            <li>{post.indexador}</li>                     
          </ul>                                 
            <Link to={`/investimentos/edit/${post.id}`} className="btn ">Editar</Link>
            <button onClick={() => deleteDocument(post.id)} className="btn btn-danger">Excluir</button>                    
          </div>          
        ))}
         {posts && posts.length > 0 ? (                                   
              <p>Total Investido - R$               
                  <span id="valTotal">
                    {
                      posts.map((post) => Math.round(parseFloat(post.valor))).reduce((total, valor) => total + valor)
                    }
                  </span>                                  
              </p>          
        ): (
          <div className={styles.post_header}>
        </div>
        )
        }
    </div>
  )
}

export default LancDetail