import styles from './LancInvestimentos.module.css'
import { useState } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

import React from 'react';

const LancInvestimentos = () => {

  const [title, setTitle] = useState("")
  const [valor, setValor] = useState("")
  const [vencimento, setVencimento] = useState("")
  const [indexador, setIndexador] = useState(null)
  const [formError, setFormError] = useState("");
  const [aviso, setAviso] = useState(null)

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("investimentos", setVencimento)

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    if (!title || !valor || !vencimento || !indexador) {
      setFormError("Todos os campos são obrigatórios!")
    }

    if (formError) return;

    insertDocument({
      title,
      valor,
      vencimento,
      indexador,
      uid: user.uid,
    });

    if (!formError) {
      setTitle("")
      setVencimento("")
      setValor("")
      setIndexador("")      
      setAviso("Cadastrado com sucesso!")

      const timer = setTimeout(() =>{
        setAviso("");
        
      }, 3000);

      return () => clearTimeout(timer);
    }

  }
  
  return (
    <div className={styles.create_post}>
      <h2>Lançar Investimentos</h2>      
      <form onSubmit={handleSubmit}>             
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
        <span>Indexador</span>
        <textarea name="index" required placeholder="preencher indexador" onChange={(e) => setIndexador(e.target.value)} value={indexador} />
        </label>
      <label>
        <span>Data de Vencimento</span>
        <input type="date" name="vencimento" required onChange={(e) => setVencimento(e.target.value)} value={vencimento} />     
      </label>
      {aviso && <p className="aviso">{aviso}</p>}        
            <button className='btn Lanc'>Cadastrar</button>
            
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}          
      </div>
      </form>
      </div>                        
  )
}

export default LancInvestimentos