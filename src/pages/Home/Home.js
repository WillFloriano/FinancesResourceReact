import styles from './Home.module.css';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import logo from '../../images/LogoNovo.png';
import { useAuthValue } from '../../context/AuthContext';
import React from 'react';

const Home = () => {
  const { user } = useAuthValue();

  const mesAtual = new Date().getMonth() + 1;
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
      <h2>Cartões de Crédito</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Itau */}
        <div style={{ border: '1px solid #ccc', padding: '10px', flex: 1 }}>
          <h4>Itau</h4>
          {itau.length === 0 ? <p>Sem lançamentos</p> : (
            <>
              {itau.map(post => (
                <div key={post.id} className={styles.post_row}>
                  <ul>
                    <li><strong>{post.title}</strong></li>
                    <li>{formatarMoeda(parseFloat(post.valor))}</li>
                  </ul>
                </div>
              ))}
              <p><strong>Total:</strong> {formatarMoeda(calcularTotal(itau))}</p>
            </>
          )}
        </div>

        {/* Nubank */}
        <div style={{ border: '1px solid #ccc', padding: '10px', flex: 1 }}>
          <h4>Nubank</h4>
          {nubank.length === 0 ? <p>Sem lançamentos</p> : (
            <>
              {nubank.map(post => (
                <div key={post.id} className={styles.post_row}>
                  <ul>
                    <li><strong>{post.title}</strong></li>
                    <li>{formatarMoeda(parseFloat(post.valor))}</li>
                  </ul>
                </div>
              ))}
              <p><strong>Total:</strong> {formatarMoeda(calcularTotal(nubank))}</p>
            </>
          )}
        </div>

        {/* Santander */}
        <div style={{ border: '1px solid #ccc', padding: '10px', flex: 1 }}>
          <h4>Santander</h4>
          {santander.length === 0 ? <p>Sem lançamentos</p> : (
            <>
              {santander.map(post => (
                <div key={post.id} className={styles.post_row}>
                  <ul>
                    <li><strong>{post.title}</strong></li>
                    <li>{formatarMoeda(parseFloat(post.valor))}</li>
                  </ul>
                </div>
              ))}
              <p><strong>Total:</strong> {formatarMoeda(calcularTotal(santander))}</p>
            </>
          )}
        </div>

        {/* Totais gerais */}
        <div style={{ border: '1px solid #ccc', padding: '10px', flex: 1 }}>
          <h4>Totais</h4>
          <p><strong>Total Geral:</strong> {formatarMoeda(totalGeral)}</p>
          <h5>Por Categoria:</h5>
          <ul>
            {Object.entries(totaisPorCategoria).map(([categoria, total]) => (
              <li key={categoria}>
                {categoria}: {formatarMoeda(total)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr />
      <h3>Editar Valor Selecionado</h3>
      {/* Formulário de edição (se desejado) */}
    </div>
  );
};

export default Home;
