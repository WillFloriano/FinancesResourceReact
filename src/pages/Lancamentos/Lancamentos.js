import styles from './Lancamentos.module.css'
import { useState } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

import React from 'react';

const Lancamentos = () => {

  const [title, setTitle] = useState("")
  const [valor, setValor] = useState("")
  const [mesLancando, setMesLancando] = useState(null)
  const [parcela, setParcela] = useState("")
  const [categoria, setCategoria] = useState("")
  const [comprador, setComprador] = useState(null)
  const [formError, setFormError] = useState(null);
  const [aviso, setAviso] = useState(null)

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("lancamentos")

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    if (!title || !valor || !mesLancando || !parcela || !categoria || !comprador) {
      setFormError("Todos os campos são obrigatórios!")
    }

    if (formError) return;

    var inserido = 0;
    var mes = mesLancando

    if(parcela > 1)
      {
          while(parcela > inserido)
          {                        
            
            insertDocument({
              title,
              valor,
              mes,
              categoria,
              comprador,
              uid: user.uid,
              createBy: user.email,
            });  

            inserido++
            mes++

          }
      }else{
        insertDocument({
          title,
          valor,
          mes,
          categoria,
          comprador,
          uid: user.uid,
          createBy: user.email,
        });
      }
        
    if (!formError) {
      setTitle("")
      setValor("")
      setParcela("")   
      setCategoria("") 
      setComprador("") 
      setAviso("Cadastrado com sucesso!")

      const timer = setTimeout(() =>{
        setAviso("");
        
      }, 3000);

      return () => clearTimeout(timer);
    }

  }

  
// useEffect(() => {
//   const script = document.createElement('script');

//   script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4910952789729743";
//   script.async = true;
//   script.crossOrigin = "anonymous";

//   document.head.appendChild(script);

// }, []);  


  return (
    <div className={styles.create_post}>
      <h2>Criar Lançamento</h2>
      <p>Selecione o mes e realize seu lançamento!</p>
      <form onSubmit={handleSubmit}>
        <select value={mesLancando} className={styles.select} onChange={e => setMesLancando(parseInt(e.target.value))}>
          <option value={0}>Selecione</option>
          <option value={1}>Janeiro</option>
          <option value={2}>Fevereiro</option>
          <option value={3}>Março</option>
          <option value={4}>Abril</option>
          <option value={5}>Maio</option>
          <option value={6}>Junho</option>
          <option value={7}>Julho</option>
          <option value={8}>Agosto</option>
          <option value={9}>Setembro</option>
          <option value={10}>Outbro</option>
          <option value={11}>Novembro</option>
          <option value={12}>Dezembro</option>
        </select>        
      
      {!mesLancando && (
          <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
        </div>)}
      {mesLancando && (
        <div className={styles.form}>
          <label>
        <span>Categoria</span>
        <select value={categoria}  onChange={e => setCategoria(e.target.value)}>
          <option value={0}>Selecione</option>
          <option value={"Casa"}>Casa</option>
          <option value={"Fast Food"}>Fast Food</option>
          <option value={"Farmacia"}>Farmacia</option>
          <option value={"Gatos"}>Gatos</option>
          <option value={"Gasolina"}>Gasolina</option>
          <option value={"Lazer"}>Lazer</option>
          <option value={"Mercado"}>Mercado</option>
          <option value={"MarketPlace"}>MarketPlace</option>                              
          {/* <option value={9}></option>
          <option value={10}></option>
          <option value={11}></option>
          <option value={12}></option> */}
        </select>        
      </label>  
      <label>
      <span>Comprador</span>
      <select value={comprador} onChange={e => setComprador(e.target.value)}>
          <option value={0}>Selecione</option>
          <option value={"Ambos"}>Ambos</option>
          <option value={"Will"}>Will</option>
          <option value={"Mis"}>Mis</option>
        </select>        
      </label>  
        <label>
        <span>Descrição:</span>
        <input type="text" name="title" required placeholder="Descreva a compra" onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>        
        <label>
        <span>Valor</span>
        <textarea name="valor" required placeholder="preencher com ponto" onChange={(e) => setValor(e.target.value)} value={valor} />
        <span>Parcela</span>
        <input type='number' name="parcela" required onChange={(e) => setParcela(e.target.value)} value={parcela} />
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