import styles from './PostDetails.module.css'
import { Link } from 'react-router-dom'

const PostDetail = ({post}) => {
    return (
      <div>          
          <h2 key={post.id}>Descrição: {post.title}</h2>
          <p>R$ {post.valor}</p>
          <p>Vencimento: {post.vencimento}</p>
          <p>Mês Referencia: {post.mesLancamento}</p>              
      </div>
    )
  }
  
  export default PostDetail