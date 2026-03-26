import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Certificate = () => {
  const navigate = useNavigate();
  const [userEstilo, setUserEstilo] = useState("");

  useEffect(() => {
    const resultadoSalvo = localStorage.getItem('perfilEstilo');
    if (resultadoSalvo) {
      setUserEstilo(resultadoSalvo);
    } else {
      setUserEstilo("FAÇA O TESTE");
    }
  }, []);

  const descricoes = {
    MINIMALISTA: "Curadoria consciente, priorizando a essência e a funcionalidade.",
    STREETWEAR: "Energia urbana, expressão criativa e o pulso das ruas.",
    ELEGANTE: "Sofisticação atemporal, valorizando a excelência nos detalhes."
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', fontFamily: 'serif' }}>
      <p style={{ letterSpacing: '4px', fontSize: '0.7rem', color: '#888', marginBottom: '20px' }}>ANÁLISE DE DNA CONCLUÍDA</p>
      
      <div style={{ backgroundColor: '#000', color: '#fff', padding: '60px 40px', textAlign: 'center', width: '100%', maxWidth: '450px' }}>
        <h2 style={{ fontSize: '2.5rem', letterSpacing: '5px', margin: '0 0 20px 0', textTransform: 'uppercase' }}>{userEstilo}</h2>
        <div style={{ width: '30px', height: '1px', backgroundColor: '#fff', margin: '0 auto 20px auto', opacity: 0.5 }}></div>
        <p style={{ fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.8 }}>
          {descricoes[userEstilo] || "Realize o quiz para identificar sua essência de moda."}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          onClick={() => navigate('/curadoria')} 
          style={{ padding: '12px 20px', border: 'none', background: '#000', color: '#fff', cursor: 'pointer', letterSpacing: '2px', fontSize: '0.7rem', fontWeight: 'bold' }}
        >
          VER CURADORIA
        </button>
        
        <button 
          onClick={() => window.print()} 
          style={{ padding: '12px 20px', border: '1px solid #000', background: 'none', cursor: 'pointer', letterSpacing: '2px', fontSize: '0.7rem' }}
        >
          SALVAR PDF
        </button>

        <button 
          onClick={() => navigate('/submit')} 
          style={{ padding: '12px 20px', border: '1px solid #000', background: 'none', cursor: 'pointer', letterSpacing: '2px', fontSize: '0.7rem' }}
        >
          REFAZER
        </button>
      </div>
    </div>
  );
};

export default Certificate;