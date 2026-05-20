import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Removido AnimatePresence que não era usado aqui
import PageTransition from '../components/PageTransition';

const Curadoria = () => {
  const navigate = useNavigate();
  const [estilo, setEstilo] = useState("MINIMALISTA");

  useEffect(() => {
    const salvo = localStorage.getItem('perfilEstilo');
    // Ajuste: Garante que o texto esteja em maiúsculo para bater com as chaves do objeto 'conteudoEstilo'
    if (salvo) setEstilo(salvo.toUpperCase()); 
  }, []);

  const conteudoEstilo = {
    MINIMALISTA: {
      tendencia: "O Minimalismo em 2026 foca no 'Quiet Luxury'. O segredo é investir em tecidos nobres como linho e seda branca, eliminando logos e focando no corte reto.",
      dica: "Aprimore com: Alfaiataria desconstruída e acessórios em metal escovado.",
      fotos: ["minimalista1.jpg", "minimalista2.jpg", "minimalista3.jpg"]
    },
    STREETWEAR: {
      tendencia: "A tendência atual é o 'Tech-Utility'. Misture peças oversized com elementos funcionais (bolsos cargo, fivelas) e tecidos impermeáveis.",
      dica: "Aprimore com: Tênis tratorados e sobreposição de texturas contrastantes.",
      fotos: ["street1.jpg", "street2.jpg", "street3.jpg"]
    },
    ELEGANTE: {
      tendencia: "A elegância de 2026 pede o 'New Classic'. O visual é polido, mas com toques modernos como transparências sutis e cores monocromáticas vibrantes.",
      dica: "Aprimore com: Cinturas bem marcadas e sapatos de bico fino com design arquitetônico.",
      fotos: ["elegante1.jpg", "elegante2.jpg", "elegante3.jpg"]
    }
  };

  // Se o estilo salvo for diferente dos 3 acima, ele volta para MINIMALISTA por segurança
  const info = conteudoEstilo[estilo] || conteudoEstilo.MINIMALISTA;

  return (
    <PageTransition>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <span style={labelStyle}>GUIA DE ESTILO 2026</span>
          <h1 style={titleStyle}>{estilo}</h1>
        </header>

        <section style={infoBox}>
          <h2 style={subTitle}>Como elevar sua estética:</h2>
          <p style={description}>{info.tendencia}</p>
          <p style={highlightDica}>{info.dica}</p>
        </section>

        <div style={galleryGrid}>
          {info.fotos.map((foto, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              style={cardFoto}
            >
              <img 
                // Garanta que a pasta public/fotos-estilos exista!
                src={`/fotos-estilos/${foto}`} 
                alt={`Tendência ${estilo}`} 
                style={imgStyle}
                onError={(e) => { 
                  e.target.src = "https://via.placeholder.com/400x500?text=Foto+Nao+Encontrada"; 
                }}
              />
              <div style={imgOverlay}>REF #{index + 1}</div>
            </motion.div>
          ))}
        </div>

        <div style={navGroup}>
          <button onClick={() => navigate('/certificate')} style={btnSec}>← VOLTAR AO DNA</button>
          <button onClick={() => navigate('/')} style={btnPri}>MENU PRINCIPAL</button>
        </div>
      </div>
    </PageTransition>
  );
};

/* --- MANTENHA SEUS ESTILOS IGUAIS --- */
const containerStyle = { padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'serif', background: '#fff' };
const headerStyle = { textAlign: 'center', marginBottom: '50px' };
const labelStyle = { letterSpacing: '5px', fontSize: '0.7rem', color: '#999' };
const titleStyle = { fontSize: '3rem', letterSpacing: '10px', textTransform: 'uppercase', fontWeight: '300', margin: '10px 0' };
const infoBox = { borderLeft: '1px solid #000', paddingLeft: '30px', margin: '0 auto 60px auto', maxWidth: '800px' };
const subTitle = { fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px', color: '#555' };
const description = { fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '20px', color: '#111' };
const highlightDica = { fontSize: '0.9rem', fontStyle: 'italic', color: '#777' };
const galleryGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' };
const cardFoto = { position: 'relative', overflow: 'hidden', borderRadius: '2px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' };
const imgStyle = { width: '100%', height: '450px', objectFit: 'cover', display: 'block' };
const imgOverlay = { position: 'absolute', bottom: '20px', left: '20px', color: '#fff', fontSize: '0.6rem', letterSpacing: '2px', background: 'rgba(0,0,0,0.4)', padding: '5px 10px' };
const navGroup = { display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '80px' };
const btnPri = { background: '#000', color: '#fff', border: 'none', padding: '15px 30px', cursor: 'pointer', letterSpacing: '2px', fontSize: '0.7rem' };
const btnSec = { background: 'none', color: '#000', border: '1px solid #000', padding: '15px 30px', cursor: 'pointer', letterSpacing: '2px', fontSize: '0.7rem' };

export default Curadoria;