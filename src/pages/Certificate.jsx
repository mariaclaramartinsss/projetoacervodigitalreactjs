import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const Certificate = () => {
  const navigate = useNavigate();
  const [userEstilo, setUserEstilo] = useState("");

  useEffect(() => {
    // Buscamos o que está salvo. Se estiver "ROUPAS DE RUA", convertemos para "STREETWEAR"
    let resultadoSalvo = localStorage.getItem('perfilEstilo');
    
    if (resultadoSalvo === "ROUPAS DE RUA") {
      resultadoSalvo = "STREETWEAR";
      localStorage.setItem('perfilEstilo', "STREETWEAR");
    }

    if (resultadoSalvo) {
      setUserEstilo(resultadoSalvo);
    } else {
      setUserEstilo("FAÇA O TESTE");
    }
  }, []);

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', fontFamily: 'serif', padding: '20px' }}>
        
        <p style={{ letterSpacing: '4px', fontSize: '0.7rem', color: '#888', marginBottom: '20px', textTransform: 'uppercase' }}>Análise Conclusão</p>
        <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '30px' }}></div>
        
        <p style={{ letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '40px' }}>MARIA, SEU DNA É:</p>

        <div style={{ border: '1px solid #eee', padding: '50px 20px', textAlign: 'center', width: '100%', maxWidth: '500px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', letterSpacing: '8px', margin: 0, textTransform: 'uppercase', fontWeight: '400' }}>
            {userEstilo}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '500px' }}>
          {/* BOTÃO QUE LEVA PARA A GALERIA DE FOTOS */}
          <button 
            onClick={() => navigate('/curadoria')} 
            style={{ padding: '18px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', letterSpacing: '2px', fontSize: '0.75rem', fontWeight: 'bold' }}
          >
            ACESSAR CURADORIA E TENDÊNCIAS
          </button>

          <button 
            onClick={() => navigate('/submit')} 
            style={{ padding: '15px', background: 'none', border: '1px solid #eee', color: '#888', cursor: 'pointer', letterSpacing: '2px', fontSize: '0.7rem' }}
          >
            REFAZER TESTE
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default Certificate;