import { Link } from 'react-router-dom';
import { useFetchDocuments } from '../hooks/useFetchDocuments';
import { useDeleteDocument } from '../hooks/useDeleteDocuments';
import styles from './PostDetails.module.css';

const PostDetail = ({ mes, uid }) => {
  const { documents: posts, loading } = useFetchDocuments("lancamentos", mes, uid);
  const { deleteDocument } = useDeleteDocument("lancamentos");

  // Filtrando os posts que têm comprador "Ambos" ou "Mis" e validando se o valor é numérico
  const postsFiltrados = posts?.filter(post => {
    const comprador = (post.comprador || "").trim().toLowerCase();
    const valorNumerico = parseFloat(post.valor);
    return (comprador === "ambos" || comprador === "mis") && !isNaN(valorNumerico);
  });

  // Calculando o total com os posts filtrados
  const totalFiltrado = postsFiltrados?.map(post => Math.round(parseFloat(post.valor) / 2))
    .reduce((total, valor) => total + valor, 0);

  return (
    <div className={styles.post_detail}>
      {loading && <p>Carregando ...</p>}
      
      {posts && posts.length === 0 ? (
        <div className={styles.post_header}>
          <span>Nenhum Evento encontrado!</span>
        </div>
      ) : (
        <div className={styles.post_header}>
          <span>Descrição</span>
          <span>Valor</span>
          <span>Categoria</span>
          <span>Ações</span>
        </div>
      )}

      {/* Renderizando os posts filtrados */}
      {postsFiltrados && postsFiltrados.map(post => (
        <div className={styles.post_row} key={post.id}>
          <ul>
            <li>{post.title}</li>
            <li>R$ {post.valor}</li>
            <li>{post.categoria}</li>
          </ul>

          <div>
            <div className={styles.btnEditar}>
              <Link to={`/lancados/edit/${post.id}`}>Editar</Link>
            </div>
            <div className={styles.btnExcluir} onClick={() => deleteDocument(post.id)}>
              Excluir
            </div>
          </div>
        </div>
      ))}

      {/* Exibindo o total filtrado */}
      {postsFiltrados && postsFiltrados.length > 0 && (
        <p>
          <span id="valTotal">
            Total: R$ {totalFiltrado}
          </span>
        </p>
      )}
    </div>
  );
};

export default PostDetail;
