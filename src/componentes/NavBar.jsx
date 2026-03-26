import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>MODA 2026</Link>
      </div>

      <ul style={menuStyle}>
        <li><Link to="/" style={linkStyle}>Início</Link></li>
        <li><Link to="/submit" style={linkStyle}>Teste de Estilo</Link></li>
        <li><Link to="/review" style={linkStyle}>Tendências</Link></li>
        <li><Link to="/certificate" style={linkStyle}>Meu Perfil</Link></li>
      </ul>
    </nav>
  );
};

const navStyle = {
  backgroundColor: '#000',
  padding: '0 5%',
  height: '70px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 1000
};

const logoStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  letterSpacing: '3px',
  textTransform: 'uppercase'
};

const menuStyle = {
  display: 'flex',
  gap: '25px',
  listStyle: 'none',
  margin: 0,
  padding: 0
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
  letterSpacing: '1px'
};

export default NavBar;