import { Link } from 'react-router-dom'
import { useFetchInvestimentos } from '../hooks/useFetchInvestimentos';
import { useDeleteDocument } from '../hooks/useDeleteDocuments';
//import Valores from './GetValoresFiis.tsx'

import FormatNumber from './FormatNumber'

import styles from './LancDetailsFIIS.module.css'

const LancDetail = () => {
  
  const { documents: posts, loading } = useFetchInvestimentos("investimentos")

  const { deleteDocument } = useDeleteDocument("investimentos");

  if (loading) {
    return <thead></thead>;
  }
  
  return (
    <tbody className={styles.divTable}>
      {posts && posts.length === 0 ? (
        <span>Nenhum Evento encontrado!</span>
      ) : (
        <>
          {Array.isArray(posts) && posts.map((post) =>
            post.indexador === "FIIS" ? (
              <tr key={post.id}>
                <td data-label="Título">{post.title}</td>
                <td data-label="Tipo">Variável</td>
                <td data-label="Valor">{FormatNumber(post.valor * post.qtd)}</td>
                <td data-label="Vencimento">{new Date(post.vencimento).toLocaleDateString("pt-br")}</td>
                <td data-label="Indexador">{post.indexador}</td>
                <td data-label="Quantidade">{post.qtd}</td>
                <td data-label="Valor Unitário">{FormatNumber(post.valor)}</td>
                <td data-label="Valor Total">R$ 0,00</td>
                <td className={styles.btnEditar}>
                  <Link to={`/investimentos/edit/${post.id}`}>Editar</Link>
                </td>
                <td className={styles.btnExcluir} onClick={() => deleteDocument(post.id)}>
                  Excluir
                </td>
              </tr>
            ) : null
          )}
        </>
      )}
    </tbody>
  );
  
  
  
  
}   

export default LancDetail