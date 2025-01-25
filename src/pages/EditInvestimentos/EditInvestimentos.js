import styles from './EditInvestimentos.module.css'
import { useState, useEffect } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const EditInvestimentos = () => {

  const {id} = useParams();
  const {document: post} = useFetchDocument("investimentos", id);

  const [title, setTitle] = useState("")
  const [valor, setValor] = useState("")
  const [vencimento, setVencimento] = useState("")
  const [indexador, setIndexador] = useState(null)
  const [formError, setFormError] = useState("");
  const [aviso, setAviso] = useState(null);


  useEffect(() => {

    if(post) {
      setTitle(post.title)
      setValor(post.valor)
      setVencimento(post.vencimento)
      setIndexador(post.indexador)
    }

  }, [post])

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("investimentos");

   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    if (!title || !valor || !vencimento || !indexador) {
      setFormError("Todos os campos são obrigatórios!")
    }

    if (formError) return;

    const data = {
      title,
      valor,
      vencimento,
      indexador,
      uid: user.uid,
    }


    updateDocument(id, data);

    if (!formError) {
      setTitle("")
      setVencimento("")
      setValor("") 
      setIndexador("")     
      setAviso("Alterado com sucesso!")
    }

    const timer = setTimeout(() =>{
      navigate("/Investimentos");
       
    }, 1000);

    return () => clearTimeout(timer);
  }

  return (
    <div className={styles.create_post}>
      <h2>Editar Investimento</h2>
      <form onSubmit={handleSubmit}>            
        <label>
        <span>Descrição:</span>
        <input type="text" name="title" required placeholder="Descreva a compra" onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>        
        <label>
        <span>Valor</span>
        <textarea name="valor" required placeholder="preencher com ponto" onChange={(e) => setValor(e.target.value)} value={valor} />
        </label>
        <label>
        <span>Indexador</span>
        <textarea name="index" required placeholder="preencher indexador" onChange={(e) => setIndexador(e.target.value)} value={indexador} />
        </label>
      <label>
        <span>Data de Vencimento</span>
        <input type="date" name="vencimento" required onChange={(e) => setVencimento(e.target.value)} value={vencimento} />     
      </label>        
        {!response.loading && <button className='btn'>Editar</button>}
        {response.loading && <button className='btn' disabled>Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
        {aviso && <p className="aviso">{aviso}</p>}
      </form>
    </div>
  )
}

export default EditInvestimentos