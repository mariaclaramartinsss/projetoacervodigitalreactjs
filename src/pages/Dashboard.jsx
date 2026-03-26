import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

function Dashboard() {
  const [looks, setLooks] = useState([]);
  const [verTudo, setVerTudo] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const estiloUsuario = localStorage.getItem('perfilEstilo')?.trim();
  const nomeUsuario = localStorage.getItem('nomeUsuario');

  async function carregarDados() {
    try {
      setCarregando(true);
      let query = supabase.from('meus_looks').select('*');
      if (!verTudo && estiloUsuario) {
        query = query.ilike('estilo', estiloUsuario);
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      setLooks(data || []);
    } catch (err) {
      console.error(err.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, [verTudo]);

  return (
    <div style={wrapperStyle}>
      <div className="container" style={squareContainer}>
        
        <header style={{ marginBottom: '40px' }}>
          <h2 style={titleStyle}>
            {verTudo ? "ACERVO TOTAL" : `CURADORIA: ${nomeUsuario?.toUpperCase() || 'MARIA'}`}
          </h2>
          <div style={lineStyle}></div>
          
          <button onClick={() => setVerTudo(!verTudo)} style={textButtonStyle}>
            {verTudo ? "← VOLTAR PARA MEU DNA" : "VER TODO O ACERVO →"}
          </button>
        </header>

        {carregando ? (
          <p style={loadingStyle}>SINCRONIZANDO...</p>
        ) : (
          <div style={gridAcervo}>
            {looks.length > 0 ? (
              looks.map((item) => (
                <div key={item.id} className="card-look" style={cardEstilo}>
                  <h3 style={itemTitleStyle}>{item.nome_look?.toUpperCase()}</h3>
                  <span style={tagStyle}>#{item.estilo}</span>
                </div>
              ))
            ) : (
              <div style={emptyStateStyle}>
                <p>NENHUM ITEM NESTA CATEGORIA.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* --- ESTILOS DE LUXO CENTRALIZADO --- */

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start', // Começa do topo mas com respiro
  minHeight: '100vh',
  padding: '40px 20px'
};

const squareContainer = {
  width: '100%',
  maxWidth: '800px', // Um pouco mais largo que o cadastro para caber o grid
  padding: '60px 40px',
  backgroundColor: '#fff',
  border: '1px solid #eee',
  textAlign: 'center',
  boxShadow: '0 20px 50px rgba(0,0,0,0.02)'
};

const titleStyle = {
  letterSpacing: '5px',
  fontWeight: '300',
  fontSize: '1.2rem',
  marginBottom: '10px'
};

const lineStyle = {
  width: '40px',
  height: '1px',
  backgroundColor: '#000',
  margin: '20px auto'
};

const textButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#999',
  fontSize: '0.6rem',
  letterSpacing: '2px',
  cursor: 'pointer',
  textDecoration: 'underline',
  textUnderlineOffset: '4px'
};

const gridAcervo = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  gap: '20px',
  marginTop: '40px'
};

const cardEstilo = {
  padding: '30px 15px',
  border: '1px solid #f5f5f5',
  backgroundColor: '#fff'
};

const itemTitleStyle = {
  fontSize: '1.0rem', // Letra legível e elegante
  letterSpacing: '1px',
  fontWeight: '600',
  margin: '10px 0'
};

const tagStyle = {
  fontSize: '0.9rem',
  color: '#918f8f',
  letterSpacing: '1px'
};

const loadingStyle = {
  fontSize: '0.7rem',
  letterSpacing: '3px',
  color: '#ccc',
  marginTop: '50px'
};

const emptyStateStyle = {
  gridColumn: '1/-1',
  padding: '60px',
  color: '#ddd',
  fontSize: '0.7rem',
  letterSpacing: '2px'
};

export default Dashboard;