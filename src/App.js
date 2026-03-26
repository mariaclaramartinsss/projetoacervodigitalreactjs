import React, { useState } from 'react';
import SubmitWork from './pages/SubmitWork';
import Dashboard from './pages/Dashboard';
import EnviarLook from './pages/EnviarLook';

function App() {
  const [telaAtiva, setTelaAtiva] = useState('quiz');

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* NAVBAR LUXUOSA */}
      <nav style={navStyle}>
        <div style={logoStyle}>MODA 2026</div>
        <div style={menuStyle}>
          <span onClick={() => setTelaAtiva('quiz')} style={linkStyle(telaAtiva === 'quiz')}>ANÁLISE</span>
          <span onClick={() => setTelaAtiva('cadastro')} style={linkStyle(telaAtiva === 'cadastro')}>UPLOAD</span>
          <span onClick={() => setTelaAtiva('dashboard')} style={linkStyle(telaAtiva === 'dashboard')}>ACERVO</span>
        </div>
      </nav>

      {/* LINHA DIVISORA FINA */}
      <div style={{ height: '1px', backgroundColor: '#f0f0f0', width: '100%' }} />

      {/* CONTEÚDO */}
      <main style={{ paddingTop: '40px' }}>
        {telaAtiva === 'quiz' && <SubmitWork />}
        {telaAtiva === 'cadastro' && <EnviarLook />}
        {telaAtiva === 'dashboard' && <Dashboard />}
      </main>
    </div>
  );
}

/* --- ESTILOS LUXO --- */
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '25px 50px',
  backgroundColor: '#fff',
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const logoStyle = {
  fontSize: '1.2rem',
  letterSpacing: '5px',
  fontWeight: '300',
  color: '#000'
};

const menuStyle = {
  display: 'flex',
  gap: '40px'
};

const linkStyle = (isActive) => ({
  fontSize: '0.7rem',
  letterSpacing: '2px',
  cursor: 'pointer',
  color: isActive ? '#000' : '#bbb',
  fontWeight: isActive ? '600' : '300',
  transition: '0.3s',
  borderBottom: isActive ? '1px solid #000' : 'none',
  paddingBottom: '5px'
});

export default App;