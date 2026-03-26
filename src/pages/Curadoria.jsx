import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Curadoria = () => {
  const navigate = useNavigate();
  const [estilo, setEstilo] = useState("MINIMALISTA");

  useEffect(() => {
    const salvo = localStorage.getItem('perfilEstilo');
    if (salvo) setEstilo(salvo);
  }, []);

  const dadosCuradoria = {
    MINIMALISTA: {
      txt: "Foco no essencial. Sua curadoria preza por linhas limpas e cores neutras.",
      pecas: ["Blazer Oversized Cinza", "T-shirt Algodão Egípcio", "Calça Reta Off-White"],
      paleta: ["#FFFFFF", "#D3D3D3", "#4A4A4A"]
    },
    STREETWEAR: {
      txt: "Expressão e volume. Sua curadoria foca no conforto urbano e peças statement.",
      pecas: ["Moletom Heavyweight", "Calça Cargo Utilitária", "Sneaker Cano Alto"],
      paleta: ["#000000", "#FF4D00", "#696969"]
    },
    ELEGANTE: {
      txt: "Sofisticação atemporal. Sua curadoria une o clássico ao contemporâneo.",
      pecas: ["Sobretudo Estruturado", "Mocassim de Couro", "Camisa em Seda"],
      paleta: ["#1C1C1C", "#E5E5E5", "#3D0C11"]
    }
  };

  const info = dadosCuradoria[estilo] || dadosCuradoria.MINIMALISTA;

  return (
    <div style={containerStyle}>
      <p style={labelStyle}>SUA SELEÇÃO EXCLUSIVA</p>
      <h1 style={titleStyle}>{estilo} 2026</h1>
      <p style={descStyle}>{info.txt}</p>

      <div style={gridStyle}>
        {info.pecas.map((item, i) => (
          <div key={i} style={itemCard}>
            <div style={imgBox}>FOTO EM BREVE</div>
            <p style={itemTxt}>{item}</p>
          </div>
        ))}
      </div>

      <div style={paletaBox}>
        <p style={{ fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '15px' }}>PALETA SUGERIDA</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {info.paleta.map((cor, i) => (
            <div key={i} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: cor, border: '1px solid #eee' }}></div>
          ))}
        </div>
      </div>

      <button onClick={() => navigate('/certificate')} style={btnStyle}>VOLTAR AO GUIA</button>
    </div>
  );
};

const containerStyle = { minHeight: '100vh', padding: '60px 20px', textAlign: 'center', backgroundColor: '#fff', fontFamily: 'serif' };
const labelStyle = { fontSize: '0.6rem', letterSpacing: '4px', color: '#999', marginBottom: '10px' };
const titleStyle = { fontSize: '2rem', fontWeight: '300', letterSpacing: '5px', marginBottom: '20px' };
const descStyle = { fontSize: '0.9rem', color: '#666', maxWidth: '400px', margin: '0 auto 40px auto', lineHeight: '1.6' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto' };
const itemCard = { border: '1px solid #f0f0f0', padding: '20px' };
const imgBox = { width: '100%', height: '180px', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#ccc', marginBottom: '15px' };
const itemTxt = { fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' };
const paletaBox = { marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #eee' };
const btnStyle = { marginTop: '40px', padding: '15px 30px', border: '1px solid #000', background: 'none', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '2px' };

export default Curadoria;