import styles from './Lancamentos.module.css'
import { useState } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

import React, { useEffect } from 'react';

const Lancamentos = () => {

  const [title, setTitle] = useState("")
  const [valor, setValor] = useState("")
  const [dividido, setDividido] = useState("")
  const [mesLancamento, setMesLancamento] = useState(null)
  const [formError, setFormError] = useState("");
  const [aviso, setAviso] = useState(null)

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("lancamentos", setMesLancamento)

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    if (!title || !valor || !mesLancamento || !dividido) {
      setFormError("Todos os campos são obrigatórios!")
    }

    if (formError) return;

    insertDocument({
      title,
      valor,
      mesLancamento,
      uid: user.uid,
      createBy: user.email,
      dividido,
    });

    if (!formError) {
      setTitle("")
      setDividido("")
      setValor("")      
      setAviso("Cadastrado com sucesso!")

      const timer = setTimeout(() =>{
        setAviso("");
        
      }, 3000);

      return () => clearTimeout(timer);
    }

  }

  
useEffect(() => {
  const script = document.createElement('script');

  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4910952789729743";
  script.async = true;
  script.crossOrigin = "anonymous";

  document.head.appendChild(script);

}, []);  


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
        <span>Valor</span>
        <textarea name="valor" required placeholder="preencher com ponto" onChange={(e) => setValor(e.target.value)} value={valor} />
      </label>
      <label>
        <span>Dividido</span>
        <select value={dividido} className={styles.select} onChange={e => setDividido(e.target.value)}>
          <option>Selecione</option>
          <option>Sim</option>
          <option>Não</option>          
        </select>        
      </label>
      {aviso && <p className="aviso">{aviso}</p>}        
            <button className='btn Lanc'>Cadastrar</button>
            
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}          
      </div>
      )}
      </form>
      </div>                        
  )
}

export default Lancamentos