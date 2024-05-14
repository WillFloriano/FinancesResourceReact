import styles from './Lancamentos.module.css'
import { useState } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'


const Lancamentos = () => {

  const [title, setTitle] = useState("")
  const [valor, setValor] = useState("")
  const [vencimento, setVencimento] = useState("")
  const [mesLancamento, setMesLancamento] = useState(null)
  const [formError, setFormError] = useState("");
  const [aviso, setAviso] = useState(null)

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("lancamentos", setMesLancamento)

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    if (!title || !valor || !vencimento || !mesLancamento) {
      setFormError("Todos os campos são obrigatórios!")
    }

    if (formError) return;

    insertDocument({
      title,
      valor,
      vencimento,
      mesLancamento,
      uid: user.uid,
      createBy: user.email,
    });

    if (!formError) {
      setTitle("")
      setVencimento("")
      setValor("")
      setAviso("Cadastrado com sucesso!")
      response.loading(false)

      const timer = setTimeout(() =>{
        setAviso("");
        
      }, 3000);

      return () => clearTimeout(timer);
    }

  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Lançamento</h2>
      <p>Selecione o mes e realize seu lançamento!</p>
      <form onSubmit={handleSubmit}>
        <select value={mesLancamento} className={styles.select} onChange={e => setMesLancamento(e.target.value)}>
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
      
      {!mesLancamento && (
          <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
        </div>)}
      {mesLancamento && (
        <div className={styles.form}>
        <label>
        <span>Descrição:</span>
        <input type="text" name="title" required placeholder="Descreva a compra" onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <label>
        <span>Dia da Compra:</span>
        <input type="date" name="vencimento" required placeholder="Dia da compra" onChange={(e) => setVencimento(e.target.value)} value={vencimento} />
       </label>
        <label>
        <span>Valor</span>
        <textarea name="valor" required placeholder="preencher com ponto quando nao for inteiro" onChange={(e) => setValor(e.target.value)} value={valor} />
      </label>        
            {!response.loading && <button className='btn Lanc'>Cadastrar</button>}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
            {aviso && <p className="aviso">{aviso}</p>}
      </div>
      )}
      </form>
      </div>                        
  )
}

export default Lancamentos