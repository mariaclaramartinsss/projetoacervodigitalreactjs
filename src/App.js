import React, { useState } from 'react';
import SubmitWork from './pages/SubmitWork';
import Dashboard from './pages/Dashboard';
import EnviarLook from './pages/EnviarLook';
import Login from './pages/Login';
import ReviewQueue from './pages/ReviewQueue';

function App() {
  const [telaAtiva, setTelaAtiva] = useState('tendencias');
  const usuario = localStorage.getItem('nomeUsuario');

  const irPara = (tela) => {
    // Páginas que precisam de login
    const telasProtegidas = ['quiz', 'cadastro', 'dashboard'];
    if (telasProtegidas.includes(tela) && !usuario) {
      setTelaAtiva('login');
    } else {
      setTelaAtiva(tela);
    }
  };

  const sair = () => {
    localStorage.removeItem('nomeUsuario');
    localStorage.removeItem('perfilEstilo');
    setTelaAtiva('tendencias');
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: "'Georgia', serif" }} translate="no">

      {/* NAVBAR */}
      <nav style={navStyle}>
        {/* LOGO */}
        <div style={logoStyle} onClick={() => irPara('tendencias')}>
          CLOSET INTELIGENTE
        </div>

        {/* MENU CENTRAL */}
        <div style={menuStyle}>
          <span
            onClick={() => irPara('tendencias')}
            style={linkStyle(telaAtiva === 'tendencias')}
          >
            TENDÊNCIAS
          </span>
          <span
            onClick={() => irPara('quiz')}
            style={linkStyle(telaAtiva === 'quiz')}
          >
            ANÁLISE
          </span>
          <span
            onClick={() => irPara('cadastro')}
            style={linkStyle(telaAtiva === 'cadastro')}
          >
            CURADORIA
          </span>
          <span
            onClick={() => irPara('dashboard')}
            style={linkStyle(telaAtiva === 'dashboard')}
          >
            SEU GUARDA-ROUPA
          </span>
        </div>

        {/* LOGIN / USUÁRIO */}
        <div style={usuarioArea}>
          {usuario ? (
            <>
              <span style={usuarioNome}>
                {usuario.toUpperCase()}
              </span>
              <span style={btnSair} onClick={sair}>
                SAIR
              </span>
            </>
          ) : (
            <span
              style={btnEntrar}
              onClick={() => irPara('login')}
            >
              ENTRAR
            </span>
          )}
        </div>
      </nav>

      {/* LINHA DIVISORA */}
      <div style={{ height: '1px', backgroundColor: '#f0f0f0', width: '100%' }} />

      {/* CONTEÚDO */}
      <main>
        {telaAtiva === 'tendencias' && <ReviewQueue onIrParaQuiz={() => irPara('quiz')} />}
        {telaAtiva === 'login'      && <Login onLoginSucesso={() => setTelaAtiva('quiz')} />}
        {telaAtiva === 'quiz'       && <SubmitWork />}
        {telaAtiva === 'cadastro'   && <EnviarLook />}
        {telaAtiva === 'dashboard'  && <Dashboard />}
      </main>
    </div>
  );
}

/* ─── ESTILOS ──────────────────────────────────────────── */

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '22px 50px',
  backgroundColor: '#fff',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  borderBottom: '0.5px solid #f0f0f0',
};

const logoStyle = {
  fontSize: '1rem',
  letterSpacing: '6px',
  fontWeight: '300',
  color: '#000',
  cursor: 'pointer',
  minWidth: '120px',
};

const menuStyle = {
  display: 'flex',
  gap: '36px',
  alignItems: 'center',
};

const linkStyle = (isActive) => ({
  fontSize: '0.65rem',
  letterSpacing: '2.5px',
  cursor: 'pointer',
  color: isActive ? '#000' : '#bbb',
  fontWeight: isActive ? '600' : '300',
  transition: 'color 0.2s',
  borderBottom: isActive ? '1px solid #000' : '1px solid transparent',
  paddingBottom: '4px',
  textTransform: 'uppercase',
  userSelect: 'none',
});

const usuarioArea = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  minWidth: '120px',
  justifyContent: 'flex-end',
};

const usuarioNome = {
  fontSize: '0.6rem',
  letterSpacing: '2px',
  color: '#888',
};

const btnSair = {
  fontSize: '0.6rem',
  letterSpacing: '2px',
  color: '#bbb',
  cursor: 'pointer',
  borderBottom: '1px solid #ddd',
  paddingBottom: '2px',
  userSelect: 'none',
};

const btnEntrar = {
  fontSize: '0.6rem',
  letterSpacing: '2px',
  color: '#000',
  cursor: 'pointer',
  borderBottom: '1px solid #000',
  paddingBottom: '2px',
  userSelect: 'none',
};

export default App;