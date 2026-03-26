import React, { useState } from 'react';
import { supabase } from '../services/supabase'; 

const SubmitWork = () => {
  const [etapa, setEtapa] = useState(0);
  const [pontos, setPontos] = useState({ MINIMALISTA: 0, STREETWEAR: 0, ELEGANTE: 0 });
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [quizIniciado, setQuizIniciado] = useState(false);
  const [resultadoFinal, setResultadoFinal] = useState(null);

  const perguntas = [
    { 
      q: "QUAL A SUA PRIORIDADE AO SE VESTIR?", 
      opcoes: [
        { t: "CONFORTO E EXPRESSÃO URBANA", tipo: "STREETWEAR" },
        { t: "SOFISTICAÇÃO E CAIMENTO PERFEITO", tipo: "ELEGANTE" },
        { t: "ESSENCIALISMO E CORES NEUTRAS", tipo: "MINIMALISTA" }
      ]
    },
    { 
      q: "ESCOLHA UM ACESSÓRIO ESSENCIAL:", 
      opcoes: [
        { t: "TÊNIS DE EDIÇÃO LIMITADA", tipo: "STREETWEAR" },
        { t: "RELOGIO DE LUXO OU JOIA", tipo: "ELEGANTE" },
        { t: "ÓCULOS DE SOL MÍNIMO", tipo: "MINIMALISTA" }
      ]
    },
    { 
      q: "QUAL O SEU AMBIENTE FAVORITO?", 
      opcoes: [
        { t: "GALERIAS E ESPAÇOS CLEAN", tipo: "MINIMALISTA" },
        { t: "RUAS E EVENTOS URBANOS", tipo: "STREETWEAR" },
        { t: "JANTARES E LUGARES CLÁSSICOS", tipo: "ELEGANTE" }
      ]
    }
  ];

  const responder = async (tipo) => {
    const novosPontos = { ...pontos, [tipo]: pontos[tipo] + 1 };
    setPontos(novosPontos);

    if (etapa < perguntas.length - 1) {
      setEtapa(etapa + 1);
    } else {
      let estiloGanhador = "MINIMALISTA";
      let maiorPontuacao = -1;

      for (let estilo in novosPontos) {
        if (novosPontos[estilo] > maiorPontuacao) {
          maiorPontuacao = novosPontos[estilo];
          estiloGanhador = estilo;
        }
      }

      try {
        await supabase
          .from('perfis_estilo')
          .insert([
            { 
              nome_usuario: nomeUsuario, 
              estilo_resultado: estiloGanhador 
            }
          ]);
      } catch (err) {
        console.error("Erro ao salvar:", err.message);
      }

      localStorage.setItem('perfilEstilo', estiloGanhador);
      localStorage.setItem('nomeUsuario', nomeUsuario);
      setResultadoFinal(estiloGanhador);
    }
  };

  // TELA DE RESULTADO FINAL (DENTRO DO QUADRADO)
  if (resultadoFinal) {
    return (
      <div style={wrapperStyle}>
        <div className="container" style={squareContainer}>
          <h2 style={stepStyle}>ANÁLISE CONCLUÍDA</h2>
          <div style={lineStyle}></div>
          <h1 style={{...questionStyle, fontSize: '1.2rem'}}>{nomeUsuario.toUpperCase()}, SEU DNA É:</h1>
          <div style={resultadoDestaque}>
            {resultadoFinal}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            style={{ ...buttonStyle, background: '#000', color: '#fff', marginTop: '20px' }}
          >
            REFAZER TESTE
          </button>
        </div>
      </div>
    );
  }

  // TELA DE ENTRADA (DENTRO DO QUADRADO)
  if (!quizIniciado) {
    return (
      <div style={wrapperStyle}>
        <div className="container" style={squareContainer}>
          <h2 style={{...questionStyle, fontSize: '1.8rem'}}>JORNADA DE ESTILO</h2>
<p style={{ 
    fontSize: '1.2rem', 
    letterSpacing: '3px', 
    marginBottom: '40px', 
    textTransform: 'uppercase',
    color: '#2b2a2ade' 
}}>
  COMO PODEMOS TE CHAMAR?
</p>
          <div style={lineStyle}></div>
          <input 
            type="text" 
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            placeholder="DIGITE SEU NOME"
            style={inputNomeStyle}
          />
          <button 
            onClick={() => nomeUsuario.length > 2 && setQuizIniciado(true)}
            style={{ ...buttonStyle, background: '#000', color: '#fff', cursor: nomeUsuario.length < 3 ? 'not-allowed' : 'pointer' }}
            disabled={nomeUsuario.length < 3}
          >
            INICIAR ANÁLISE
          </button>
        </div>
      </div>
    );
  }

  // TELA DO QUIZ (DENTRO DO QUADRADO)
  return (
    <div style={wrapperStyle}>
      <div className="container" style={squareContainer}>
        <div style={progressContainer}>
          <div style={{ ...progressBar, width: `${((etapa + 1) / perguntas.length) * 100}%` }}></div>
        </div>
        <p style={stepStyle}>ANÁLISE PARA: {nomeUsuario.toUpperCase()}</p>
        <p style={{...stepStyle, color: '#000', fontWeight: 'bold'}}>ETAPA: {etapa + 1} / {perguntas.length}</p>
        <div style={lineStyle}></div>
        <h2 style={{...questionStyle, fontSize: '1.4rem'}}>{perguntas[etapa].q}</h2>
        <div style={optionsGrid}>
          {perguntas[etapa].opcoes.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => responder(opt.tipo)} 
              style={buttonStyle}
              onMouseOver={(e) => { e.target.style.background = '#000'; e.target.style.color = '#fff'; e.target.style.borderColor = '#000'; }}
              onMouseOut={(e) => { e.target.style.background = '#fff'; e.target.style.color = '#000'; e.target.style.borderColor = '#eee'; }}
            >
              {opt.t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* --- ESTILOS DE LUXO CENTRALIZADOS --- */
const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh', // Ocupa a tela toda
  width: '100%',
  padding: '20px',
  backgroundColor: '#f9f9f9', // <--- A MÁGICA ESTÁ AQUI (Cinza claríssimo)
};

const squareContainer = {
  width: '100%',
  maxWidth: '600px',
  padding: '80px 40px',
  backgroundColor: '#ffffff', // Branco puro para contrastar com o fundo
  border: '1px solid #eee',
  textAlign: 'center',
  boxShadow: '0 30px 60px rgba(0,0,0,0.05)', // Sombra suave que dá elegância
};

const lineStyle = {
  width: '40px',
  height: '1px',
  backgroundColor: '#000',
  margin: '25px auto'
};

const inputNomeStyle = {
  width: '100%',
  border: 'none',
  borderBottom: '2px solid #000',
  padding: '15px 0',
  fontSize: '1.6rem', // Fonte aumentada para impacto no nome
  textAlign: 'center',
  marginBottom: '40px',
  outline: 'none',
  letterSpacing: '2px',
  textTransform: 'uppercase'
};

const resultadoDestaque = {
  padding: '40px', 
  border: '1px solid #eee', 
  fontSize: '2.5rem', 
  letterSpacing: '8px',
  fontWeight: 'bold',
  marginBottom: '40px',
  textTransform: 'uppercase'
};

const progressContainer = { width: '100%', maxWidth: '100%', height: '1px', background: '#eee', marginBottom: '30px' };
const progressBar = { height: '100%', background: '#000', transition: 'width 0.3s' };
const stepStyle = { fontSize: '0.6rem', letterSpacing: '3px', color: '#bbb', marginBottom: '10px', textTransform: 'uppercase' };
const questionStyle = { fontWeight: '300', textAlign: 'center', marginBottom: '40px', color: '#111', letterSpacing: '1px', textTransform: 'uppercase', lineHeight: '1.4' };
const optionsGrid = { display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' };
const buttonStyle = { padding: '20px', background: '#fff', border: '1px solid #eee', fontSize: '0.8rem', letterSpacing: '2px', cursor: 'pointer', transition: '0.3s', textTransform: 'uppercase', width: '100%' };

export default SubmitWork;