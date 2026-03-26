import React from 'react';

const ReviewQueue = () => {
  const tendencias = [
    {
      id: 1,
      titulo: "MINIMALISMO 2026",
      // Link ultra-estável para moda minimalista
      imagem: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      descricao: "Cortes arquitetônicos e paleta monocromática."
    },
    {
      id: 2,
      titulo: "STREET UTILITY",
      // Link ultra-estável para moda urbana
      imagem: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      descricao: "O encontro entre o conforto das ruas e o luxo funcional."
    },
    {
      id: 3,
      titulo: "ECO-LUXE",
      // Link ultra-estável para moda luxo/sustentável
      imagem: "https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=800&q=80",
      descricao: "Sustentabilidade elevada ao mais alto nível de sofisticação."
    }
  ];

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <p style={subtitleStyle}>CURADORIA EXCLUSIVA</p>
        <h1 style={titleStyle}>TENDÊNCIAS 2026</h1>
      </header>
      
      <div style={gridStyle}>
        {tendencias.map((item) => (
          <div key={item.id} style={cardStyle}>
            <div style={imageWrapper}>
              <img 
                src={item.imagem} 
                alt={item.titulo} 
                style={imgStyle}
                // Se a imagem falhar, ela mostra um fundo cinza em vez de erro
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.style.backgroundColor = '#f0f0f0';
                }}
              />
            </div>
            <div style={textContainer}>
              <h3 style={itemTitle}>{item.titulo}</h3>
              <div style={divider}></div>
              <p style={itemDesc}>{item.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- ESTILOS CORRIGIDOS E REVISADOS --- */
const pageStyle = { 
  padding: '60px 5%', 
  backgroundColor: '#fff', 
  minHeight: '100vh',
  fontFamily: 'sans-serif' 
};

const headerStyle = { 
  textAlign: 'center', 
  marginBottom: '50px' 
};

const subtitleStyle = { 
  letterSpacing: '4px', 
  fontSize: '0.7rem', 
  color: '#999', 
  fontWeight: 'bold',
  textTransform: 'uppercase'
};

const titleStyle = { 
  fontSize: '2.2rem', 
  fontWeight: '300', 
  marginTop: '10px',
  color: '#1a1a1a'
};

const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '30px',
  maxWidth: '1200px',
  margin: '0 auto'
};

const cardStyle = { 
  backgroundColor: '#fff', 
  border: '1px solid #eee', 
  width: '320px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
};

const imageWrapper = { 
  width: '100%', 
  height: '400px', 
  backgroundColor: '#eee', 
  overflow: 'hidden' 
};

const imgStyle = { 
  width: '100%', 
  height: '100%', 
  objectFit: 'cover' 
};

const textContainer = { 
  padding: '20px', 
  textAlign: 'left' 
};

const itemTitle = { 
  fontSize: '0.9rem', 
  letterSpacing: '2px', 
  fontWeight: '600',
  color: '#000'
};

const divider = { 
  width: '20px', 
  height: '2px', 
  backgroundColor: '#000', 
  margin: '12px 0' 
};

const itemDesc = { 
  color: '#666', 
  fontSize: '0.8rem', 
  lineHeight: '1.5' 
};

export default ReviewQueue;