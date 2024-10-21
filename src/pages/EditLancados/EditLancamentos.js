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
  const [vencimento, setVencimento] = useState("")
  const [mesLancamento, setMesLancamento] = useState(null)
  const [formError, setFormError] = useState("");
  const [aviso, setAviso] = useState(null);


  useEffect(() => {

      const script = document.createElement('script');
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4910952789729743";
      script.async = true;
      script.crossOrigin = "anonymous";
  
      document.head.appendChild(script);

    if(post) {
      setTitle(post.title)
      setValor(post.valor)
      setVencimento(post.vencimento)
      setMesLancamento(post.mesLancamento)
    }

  }, [post])

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("lancamentos");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    if (!title || !valor || !vencimento || !mesLancamento) {
      setFormError("Todos os campos são obrigatórios!")
    }

    if (formError) return;

    const data = {
      title,
      valor,
      vencimento,
      mesLancamento,
      uid: user.uid,
      createBy: user.email,
    }


    updateDocument(id, data);

    if (!formError) {
      setTitle("")
      setVencimento("")
      setValor("")      
      setAviso("Alterado com sucesso!")
    }

    const timer = setTimeout(() =>{
      navigate("/lancados/mes/" + post.mesLancamento);
       
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
          <span>Vencimento:</span>
          <input type="date" name="vencimento" required placeholder="Dia de vencimento" onChange={(e) => setVencimento(e.target.value)} value={vencimento} />
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