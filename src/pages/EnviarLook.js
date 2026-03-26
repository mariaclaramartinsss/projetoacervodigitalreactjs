import React, { useState } from 'react';
import { supabase } from '../services/supabase';

function EnviarLook() {
  const [nome, setNome] = useState('');
  const [estilo, setEstilo] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!nome || !estilo) return alert("Preencha todos os campos.");

    setEnviando(true);
    try {
      const { error } = await supabase
        .from('meus_looks')
        .insert([{ nome_look: nome, estilo: estilo.toUpperCase() }]);

      if (error) throw error;

      setMensagem("PEÇA ADICIONADA AO ACERVO.");
      setNome('');
      setEstilo('');
      setTimeout(() => setMensagem(''), 3000);
    } catch (err) {
      alert("Erro: " + err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={wrapperStyle}> {/* Este é o fundo que centraliza tudo */}
      <div className="container" style={squareContainer}> {/* O quadrado branco */}
        
        <header style={{ marginBottom: '40px' }}>
          <h2 style={{ letterSpacing: '5px', fontWeight: '300', fontSize: '1rem' }}>UPLOAD</h2>
          <div style={{ width: '30px', height: '1px', backgroundColor: '#000', margin: '15px auto' }}></div>
        </header>

        <form onSubmit={handleSalvar} style={formStyle}>
          <div style={inputGroup}>
            <label style={labelStyle}>NOME DA PEÇA</label>
            <input 
              type="text" 
              placeholder="Ex: BLAZER OVERSIZED"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>ESTILO / TAG</label>
            <input 
              type="text" 
              placeholder="Ex: MINIMALISTA"
              value={estilo}
              onChange={(e) => setEstilo(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button 
            type="submit" 
            disabled={enviando}
            style={blackButtonStyle}
          >
            {enviando ? "ENVIANDO..." : "SALVAR NO ACERVO"}
          </button>

          {mensagem && <p style={successStyle}>{mensagem}</p>}
        </form>
      </div>
    </div>
  );
}

/* --- ESTILOS DE CENTRALIZAÇÃO E QUADRADO --- */
const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh', // Centraliza verticalmente na tela
  width: '100%'
};

const squareContainer = {
  width: '100%',
  maxWidth: '450px',
  padding: '60px 40px',
  backgroundColor: '#fff',
  border: '1px solid #eee',
  textAlign: 'center',
  boxShadow: '0 20px 50px rgba(0,0,0,0.03)' // Sombra bem sutil
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '30px'
};

const inputGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  textAlign: 'left'
};

const labelStyle = {
  fontSize: '1.5rem',
  letterSpacing: '2px',
  fontWeight: '600',
  color: '#000'
};

const inputStyle = {
  border: 'none',
  borderBottom: '1px solid #eee',
  padding: '10px 0',
  fontSize: '1.2rem',
  outline: 'none',
  transition: 'border-color 0.3s'
};

const blackButtonStyle = {
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  padding: '15px',
  fontSize: '0.7rem',
  letterSpacing: '2px',
  cursor: 'pointer',
  marginTop: '10px'
};

const successStyle = {
  fontSize: '0.6rem',
  letterSpacing: '1px',
  marginTop: '20px',
  color: '#999'
};

export default EnviarLook;