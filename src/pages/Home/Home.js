import styles from './Home.module.css';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import logo from '../../images/LogoNovo.png';
import { useAuthValue } from '../../context/AuthContext';
import { useState } from 'react';
import React from 'react';

const Home = () => {
  const { user } = useAuthValue();

  const handleSubmit = (e) => {
    e.preventDefault() 
  
  }

  const [mesAtual, setMesAtual] = useState("");
  const { documents: posts } = useFetchDocuments("lancamentos", mesAtual, user.uid);

  const nubank = posts?.filter(post => {
    const cartao = (post.cartao || "").trim().toLowerCase();
    const valorNumerico = parseFloat(post.valor);
    return cartao === "nubank" && !isNaN(valorNumerico);
  }) || [];

  const itau = posts?.filter(post => {
    const cartao = (post.cartao || "").trim().toLowerCase();
    const valorNumerico = parseFloat(post.valor);
    return cartao === "itau" && !isNaN(valorNumerico);
  }) || [];

  const santander = posts?.filter(post => {
    const cartao = (post.cartao || "").trim().toLowerCase();
    const valorNumerico = parseFloat(post.valor);
    return cartao === "santander" && !isNaN(valorNumerico);
  }) || [];

    const MP = posts?.filter(post => {
    const cartao = (post.cartao || "").trim().toLowerCase();
    const valorNumerico = parseFloat(post.valor);
    return cartao === "MP" && !isNaN(valorNumerico);
  }) || [];

  const calcularTotal = (lista) => {
    return lista.reduce((acc, post) => acc + parseFloat(post.valor || 0), 0);
  };

  const totalGeral = calcularTotal([...nubank, ...itau, ...santander]);

  const totaisPorCategoria = {};
  posts?.forEach(post => {
    const categoria = (post.categoria || "Outros").trim();
    const valor = parseFloat(post.valor || 0);
    if (!isNaN(valor)) {
      if (!totaisPorCategoria[categoria]) {
        totaisPorCategoria[categoria] = 0;
      }
      totaisPorCategoria[categoria] += valor;
    }
  });

  const formatarMoeda = (valor) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  if (user.uid === "wjuppa1J53bsHiZIhlbAqrCuic03") {
    return (
      <div className={styles.container_home}>
        <div>
          <img src={logo} alt='WMZR Tecnology' />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <select className={styles.select} value={mesAtual} onChange={e => setMesAtual(parseInt(e.target.value))}>
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
          <option value={10}>Outubro</option>
          <option value={11}>Novembro</option>
          <option value={12}>Dezembro</option>
        </select>
      </form>
      <h2>Cartões de Crédito</h2>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h4 className={styles.cardItau}>Itau</h4>
          {itau.length === 0 ? <p>Sem lançamentos</p> : (
            <p><strong>Total:</strong> {formatarMoeda(calcularTotal(itau))}</p>
          )}
        </div>

        <div className={styles.card}>
          <h4 className={styles.cardNubank}>Nubank</h4>
          {nubank.length === 0 ? <p>Sem lançamentos</p> : (
            <p><strong>Total:</strong> {formatarMoeda(calcularTotal(nubank))}</p>
          )}
        </div>

        <div className={styles.card}>
          <h4 className={styles.cardSantander}>Santander</h4>
          {santander.length === 0 ? <p>Sem lançamentos</p> : (
            <p><strong>Total:</strong> {formatarMoeda(calcularTotal(santander))}</p>
          )}
        </div>

        <div className={styles.card}>
          <h4 className={styles.cardMP}>Mercado Pago</h4>
          {MP.length === 0 ? <p>Sem lançamentos</p> : (
            <p><strong>Total:</strong> {formatarMoeda(calcularTotal(MP))}</p>
          )}
        </div>

        <div className={styles.card}>
          <h4>Totais</h4>
          <h5>Por Categoria:</h5>
          <ul className={styles.ulLista}>
            {Object.entries(totaisPorCategoria).map(([categoria, total]) => (
              <li key={categoria}>
                {categoria}: {formatarMoeda(total)}
              </li>
            ))}
          </ul>
          <p><strong>Total Geral:</strong> {formatarMoeda(totalGeral)}</p>
        </div>
      </div>

      <hr />

      <div>
        <h3>Contas Fixas:</h3>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h4>Casa</h4>
            <ul className={styles.ulLista}>
              <li>Luz: R$ 200,00</li>
              <li>Internet: R$ 70,00</li>
              <li>Compras: R$ 150,00</li>
              <li>Celulares: R$ 80,00</li>
              <li>Convenio: R$ 630,00</li>
              <li>Inss Mãe: R$ 20,00</li>
              <li>Seguro Moto: R$ 177,95</li>
              <li>Mei: R$ 80,90</li>
              <li>Gatos: R$ 250,00</li>
              <li>Gasolina: R$ 200,00</li>
              <li>Cabelo: R$ 40,00</li>
            </ul>
            <p><strong>Total:</strong> R$ 1.948,85</p>
          </div>

          <div className={styles.card}>
            <h4>Streaming</h4>
            <ul className={styles.ulLista}>
              <li>Netflix: R$ 20,90</li>
              <li>Spotfy: R$ 30,00</li>
              <li>HBO Max: R$ 31,80</li>
              <li>Apple: R$ 4,90</li>
            </ul>
            <p><strong>Total:</strong> R$ 87,60</p>
          </div>

          <div className={styles.card}>
            <h4>Apartamento</h4>
            <ul className={styles.ulLista}>
              <li>Evolução: R$ 566,50</li>
              <li>Entrada: R$ 800,00</li>
            </ul>
            <p><strong>Total:</strong> R$ 1.366,50</p>
          </div>

          <div className={styles.card}>
            <h4>Totais</h4>
            <p><strong>Total Geral:</strong> R$ 3.402,95</p>
            <p><strong>Total Sem Evolução:</strong> R$ 2.602,95</p>
            <p><strong>Salário:</strong> R$ 6.500,00</p>
            <p><strong>Deveria Sobrar:</strong> R$ 3.097,05</p>
            <p><strong>Reserva Emergencia 6 meses:</strong> R$ 15.617,70</p>
            <p><strong>Investir:</strong> R$ 500,00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
