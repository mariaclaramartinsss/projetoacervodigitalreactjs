import React, { useState } from 'react';

const tendencias = [
  {
    id: 1,
    numero: '01',
    tag: 'MINIMALISMO',
    titulo: 'Arquitetura do Simples',
    ano: '2026',
    imagem: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    descricao: 'Cortes arquitetônicos e paleta monocromática. Cada peça existe por intenção, não por acaso.',
    pecas: ['Sobretudo estruturado', 'Calça pantalona', 'Body de alça'],
    cores: ['#F5F5F5', '#C8C8C8', '#1A1A1A'],
  },
  {
    id: 2,
    numero: '02',
    tag: 'STREET UTILITY',
    titulo: 'Luxo Funcional',
    ano: '2026',
    imagem: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    descricao: 'O encontro entre o conforto das ruas e o luxo funcional. Atitude e sofisticação coexistem.',
    pecas: ['Cargo oversized', 'Jaqueta técnica', 'Tênis plataforma'],
    cores: ['#F0F0F0', '#888888', '#000000'],
  },
  {
    id: 3,
    numero: '03',
    tag: 'ECO-LUXE',
    titulo: 'Sustentabilidade Elevada',
    ano: '2026',
    imagem: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=800&q=80',
    descricao: 'Sustentabilidade no mais alto nível de sofisticação. O futuro da moda é consciente e belo.',
    pecas: ['Linho natural', 'Malha orgânica', 'Couro vegetal'],
    cores: ['#EDE8E0', '#C4B8A0', '#5C4A30'],
  },
  {
    id: 4,
    numero: '04',
    tag: 'NEO-ROMÂNTICO',
    titulo: 'Delicadeza Revisitada',
    ano: '2026',
    imagem: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    descricao: 'releitura contemporânea do romantismo clássico, unindo delicadeza nostálgica com força estética moderna. Caracteriza-se por babados, rendas, tules, tecidos fluidos e estampas florais, focando na expressão emocional, feminilidade e sofisticação',
    pecas: ['Vestido midi', 'Blusa de chiffon', 'Saia plissada'],
    cores: ['#FAF0F3', '#E8C0CC', '#C06080'],
  },
  {
    id: 5,
    numero: '05',
    tag: 'DARK ACADEMIA',
    titulo: 'Erudição e Mistério',
    ano: '2026',
    imagem: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    descricao: 'Tweed, veludo e couro em composições que evocam bibliotecas e corredores históricos.',
    pecas: ['Blazer tweed', 'Calça wide leg', 'Bota de cano alto'],
    cores: ['#2A1A1A', '#4A3030', '#8A6050'],
  },
  {
    id: 6,
    numero: '06',
    tag: 'BOHO EDITORIAL',
    titulo: 'Boho Chic',
    ano: '2026',
    imagem: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
    descricao: 'Espírito livre com olhar refinado. Texturas, camadas e peças com história.',
    pecas: ['Vestido maxi', 'Colete de couro', 'Sandália artesanal'],
    cores: ['#F5E6C8', '#C8A040', '#784020'],
  },
];

export default function ReviewQueue() {
  const [hoveredId, setHoveredId] = useState(null);
  const [cardExpandido, setCardExpandido] = useState(null);

  const toggleCard = (id) => {
    setCardExpandido(cardExpandido === id ? null : id);
  };

  return (
    <div style={pageStyle} translate="no">

      {/* HEADER */}
      <header style={headerStyle}>
        <p style={eyebrowStyle}>CURADORIA EXCLUSIVA</p>
        <h1 style={titleStyle}>TENDÊNCIAS</h1>
        <p style={anoStyle}>2026</p>
        <div style={headerLine}></div>
        <p style={headerDesc}>
          Seis movimentos que vão definir o vocabulário visual da moda nos próximos meses.
        </p>
      </header>

      {/* GRID PRINCIPAL */}
      <div style={gridStyle}>
        {tendencias.map((item) => {
          const isHovered = hoveredId === item.id;
          const isExpandido = cardExpandido === item.id;

          return (
            <div
              key={item.id}
              style={{
                ...cardStyle,
                boxShadow: isHovered ? '0 20px 60px rgba(0,0,0,0.10)' : '0 4px 20px rgba(0,0,0,0.03)',
                transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* IMAGEM */}
              <div style={imageWrapper}>
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  style={{
                    ...imgStyle,
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.style.backgroundColor = '#f0f0f0';
                  }}
                />
                {/* Número sobreposto */}
                <div style={numeroOverlay}>{item.numero}</div>
                {/* Tag sobreposta */}
                <div style={tagOverlay}>{item.tag}</div>
              </div>

              {/* CONTEÚDO */}
              <div style={textContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={itemTitle}>{item.titulo}</h3>
                  <span style={itemAno}>{item.ano}</span>
                </div>
                <div style={divider}></div>
                <p style={itemDesc}>{item.descricao}</p>

                {/* PALETA */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '16px', marginBottom: '16px' }}>
                  {item.cores.map((cor, i) => (
                    <div
                      key={i}
                      title={cor}
                      style={{
                        width: '28px',
                        height: '28px',
                        background: cor,
                        border: '1px solid #eee',
                        borderRadius: '2px',
                      }}
                    />
                  ))}
                  <span style={{ fontSize: '0.55rem', letterSpacing: '1px', color: '#aaa', alignSelf: 'center', marginLeft: '4px', textTransform: 'uppercase' }}>
                    PALETA
                  </span>
                </div>

                {/* BOTÃO EXPANDIR */}
                <button
                  onClick={() => toggleCard(item.id)}
                  style={{
                    ...btnStyle,
                    background: isExpandido ? '#000' : '#fff',
                    color: isExpandido ? '#fff' : '#000',
                    borderColor: '#000',
                  }}
                  onMouseOver={(e) => {
                    if (!isExpandido) {
                      e.currentTarget.style.background = '#000';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isExpandido) {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.color = '#000';
                    }
                  }}
                >
                  {isExpandido ? 'FECHAR' : 'VER PEÇAS-CHAVE'}
                </button>

                {/* PEÇAS EXPANDIDAS */}
                {isExpandido && (
                  <div style={{ marginTop: '16px', borderTop: '1px solid #eee', paddingTop: '16px' }}>
                    <p style={{ fontSize: '0.55rem', letterSpacing: '2px', color: '#aaa', marginBottom: '10px', textTransform: 'uppercase' }}>
                      PEÇAS ESSENCIAIS
                    </p>
                    {item.pecas.map((peca, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '10px 0', borderBottom: i < item.pecas.length - 1 ? '1px solid #f5f5f5' : 'none',
                        }}
                      >
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#000', flexShrink: 0 }}></div>
                        <span style={{ fontSize: '0.72rem', letterSpacing: '1.5px', color: '#000', textTransform: 'uppercase' }}>{peca}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* RODAPÉ DA SEÇÃO */}
      <div style={footerSection}>
        <div style={headerLine}></div>
        <p style={eyebrowStyle}>FAÇA O QUIZ E DESCUBRA</p>
        <p style={{ fontSize: '0.8rem', color: '#888', letterSpacing: '1px', marginTop: '8px' }}>
          QUAL DESSAS TENDÊNCIAS COMBINA COM O SEU DNA DE ESTILO
        </p>
        <button
          style={{ ...btnStyle, marginTop: '24px', padding: '16px 48px', borderColor: '#000' }}
          onMouseOver={(e) => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
          onClick={() => window.location.href = '/quiz'}
        >
          INICIAR ANÁLISE DE ESTILO →
        </button>
      </div>
    </div>
  );
}

const pageStyle = {
  padding: '60px 5%',
  backgroundColor: '#fff',
  minHeight: '100vh',
  fontFamily: "'Georgia', serif",
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '60px',
};

const eyebrowStyle = {
  letterSpacing: '5px',
  fontSize: '0.6rem',
  color: '#999',
  textTransform: 'uppercase',
  marginBottom: '12px',
};

const titleStyle = {
  fontSize: '3.5rem',
  fontWeight: '300',
  color: '#000',
  letterSpacing: '8px',
  margin: '0 0 4px',
  textTransform: 'uppercase',
};

const anoStyle = {
  fontSize: '1rem',
  fontWeight: '300',
  color: '#ccc',
  letterSpacing: '6px',
  marginBottom: '24px',
};

const headerLine = {
  width: '40px',
  height: '1px',
  backgroundColor: '#000',
  margin: '0 auto 20px',
};

const headerDesc = {
  fontSize: '0.8rem',
  color: '#888',
  letterSpacing: '1px',
  maxWidth: '480px',
  margin: '0 auto',
  lineHeight: '1.8',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '24px',
  maxWidth: '1100px',
  margin: '0 auto',
};

const cardStyle = {
  backgroundColor: '#fff',
  border: '1px solid #eee',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'default',
};

const imageWrapper = {
  width: '100%',
  height: '380px',
  backgroundColor: '#eee',
  overflow: 'hidden',
  position: 'relative',
};

const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
  display: 'block',
};

const numeroOverlay = {
  position: 'absolute',
  top: '16px',
  left: '16px',
  fontSize: '0.6rem',
  letterSpacing: '3px',
  color: '#fff',
  background: '#000',
  padding: '4px 10px',
};

const tagOverlay = {
  position: 'absolute',
  bottom: '16px',
  right: '16px',
  fontSize: '0.55rem',
  letterSpacing: '2px',
  color: '#fff',
  background: 'rgba(0,0,0,0.6)',
  padding: '4px 10px',
  textTransform: 'uppercase',
  backdropFilter: 'blur(4px)',
};

const textContainer = {
  padding: '24px',
  textAlign: 'left',
};

const itemTitle = {
  fontSize: '0.95rem',
  letterSpacing: '2px',
  fontWeight: '600',
  color: '#000',
  textTransform: 'uppercase',
  margin: 0,
};

const itemAno = {
  fontSize: '0.6rem',
  letterSpacing: '2px',
  color: '#bbb',
};

const divider = {
  width: '20px',
  height: '1px',
  backgroundColor: '#000',
  margin: '14px 0',
};

const itemDesc = {
  color: '#666',
  fontSize: '0.8rem',
  lineHeight: '1.7',
  letterSpacing: '0.3px',
  margin: 0,
};

const btnStyle = {
  width: '100%',
  padding: '13px 20px',
  background: '#fff',
  border: '1px solid #eee',
  fontSize: '0.65rem',
  letterSpacing: '2px',
  cursor: 'pointer',
  transition: '0.2s',
  textTransform: 'uppercase',
  color: '#000',
  fontFamily: 'inherit',
};

const footerSection = {
  textAlign: 'center',
  marginTop: '80px',
  paddingTop: '40px',
};
