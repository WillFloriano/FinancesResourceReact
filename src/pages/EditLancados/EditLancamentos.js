import styles from './EditLancamentos.module.css'
import { useState, useEffect } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Lancamentos = () => {

  const {id} = useParams();
  const {document: post} = useFetchDocument("lancamentos", id);

  const [title, setTitle] = useState("")
  const [valor, setValor] = useState("")
  const [mesLancamento, setMesLancamento] = useState(null)
  const [formError, setFormError] = useState("");
  const [aviso, setAviso] = useState(null);


  useEffect(() => {

    if(post) {
      setTitle(post.title)
      setValor(post.valor)
      setMesLancamento(post.mes)
    }

  }, [post])

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("lancamentos");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    if (!title || !valor || !mesLancamento) {
      setFormError("Todos os campos são obrigatórios!")
    }

    if (formError) return;

    const data = {
      title,
      valor,
      mesLancamento,
      uid: user.uid,
      createBy: user.email,
    }


    updateDocument(id, data);

    if (!formError) {
      setTitle("")
      setValor("")  
      setMesLancamento(mesLancamento)    
      setAviso("Alterado com sucesso!")      
    }

    const timer = setTimeout(() =>{
      navigate("/lancados/");
       
    }, 1000);

    return () => clearTimeout(timer);

  }

  return (
    <div className={styles.create_post}>
      <h2>Editar Evento Lançado</h2>
      <form onSubmit={handleSubmit}>
        <select value={mesLancamento} className={styles.select} >
          <option>{mesLancamento}</option>

        </select>

        <label>
          <span>Descrição:</span>
          <input type="text" name="title" required placeholder="Descreva o evento" onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>        
        <label>
          <span>Valor</span>
          <textarea name="valor" required placeholder="Insira o valor" onChange={(e) => setValor(e.target.value)} value={valor} />
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

export default Lancamentos