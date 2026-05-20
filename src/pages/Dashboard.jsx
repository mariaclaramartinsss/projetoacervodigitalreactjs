import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

const ESTILOS_FILTRO = ['TODOS', 'MINIMALISTA', 'STREETWEAR', 'ELEGANTE', 'GÓTICO', 'ROMÂNTICO', 'BOHO CHIC', 'CASUAL', 'ESPORTIVO'];

const CATEGORIAS_ICONE = {
  'PARTE DE CIMA': '',
  'PARTE DE BAIXO': '',
  'VESTIDO / MACACÃO': '',
  'CASACO / JAQUETA': '',
  'CALÇADO': '',
  'ACESSÓRIO': '',
  'BOLSA': '',
};

export default function Dashboard() {
  const [looks, setLooks] = useState([]);
  const [filtroEstilo, setFiltroEstilo] = useState('MEU DNA');
  const [carregando, setCarregando] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [deletandoId, setDeletandoId] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const estiloUsuario = localStorage.getItem('perfilEstilo')?.trim();
  const nomeUsuario = localStorage.getItem('nomeUsuario');

  async function carregarDados(filtro) {
    try {
      setCarregando(true);
      let query = supabase.from('meus_looks').select('*');

      if (filtro === 'MEU DNA' && estiloUsuario) {
        query = query.ilike('estilo', estiloUsuario);
      } else if (filtro !== 'MEU DNA' && filtro !== 'TODOS') {
        query = query.ilike('estilo', filtro);
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

  useEffect(() => { carregarDados(filtroEstilo); }, [filtroEstilo]);

  const handleFiltro = (f) => setFiltroEstilo(f);

  const handleDeletar = async (id) => {
    setDeletandoId(id);
    try {
      const { error } = await supabase.from('meus_looks').delete().eq('id', id);
      if (error) throw error;
      setLooks(looks.filter(l => l.id !== id));
      setMensagem('PEÇA REMOVIDA DO ACERVO.');
      setTimeout(() => setMensagem(''), 3000);
    } catch (err) {
      console.error(err.message);
    } finally {
      setDeletandoId(null);
    }
  };

  const totalPecas = looks.length;
  const totalFavoritas = looks.filter(l => l.favorita).length;
  const categoriaMaisFrequente = looks.length > 0
    ? Object.entries(looks.reduce((acc, l) => { acc[l.categoria || 'OUTRO'] = (acc[l.categoria || 'OUTRO'] || 0) + 1; return acc; }, {}))
        .sort((a, b) => b[1] - a[1])[0]?.[0]
    : null;

  return (
    <div style={wrapperStyle} translate="no">
      <div style={squareContainer}>

        {/* HEADER */}
        <header style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p style={eyebrowStyle}>ACERVO PESSOAL</p>
          <h1 style={titleStyle}>
            {filtroEstilo === 'MEU DNA' && nomeUsuario
              ? `CURADORIA DE ${nomeUsuario.toUpperCase()}`
              : 'ACERVO TOTAL'}
          </h1>
          <div style={lineStyle}></div>
          {estiloUsuario && (
            <p style={{ fontSize: '0.6rem', letterSpacing: '2px', color: '#aaa', textTransform: 'uppercase' }}>
              DNA: {estiloUsuario}
            </p>
          )}
        </header>

        {/* MÉTRICAS */}
        {!carregando && looks.length > 0 && (
          <div style={metricasGrid}>
            <div style={metricaCard}>
              <p style={metricaNum}>{totalPecas}</p>
              <p style={metricaLabel}>PEÇAS NO ACERVO</p>
            </div>
            <div style={metricaCard}>
              <p style={metricaNum}>{totalFavoritas}</p>
              <p style={metricaLabel}>FAVORITAS</p>
            </div>
            <div style={metricaCard}>
              <p style={metricaNum}>{categoriaMaisFrequente ? (CATEGORIAS_ICONE[categoriaMaisFrequente] || '◻') : '—'}</p>
              <p style={metricaLabel}>{categoriaMaisFrequente || 'SEM DADOS'}</p>
            </div>
          </div>
        )}

        {/* FILTROS */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ ...eyebrowStyle, marginBottom: '12px', textAlign: 'left' }}>FILTRAR POR ESTILO</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              onClick={() => handleFiltro('MEU DNA')}
              style={chipStyle(filtroEstilo === 'MEU DNA')}
            >
              ◈ MEU DNA
            </button>
            {ESTILOS_FILTRO.map(f => (
              <button key={f} onClick={() => handleFiltro(f)} style={chipStyle(filtroEstilo === f)}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', background: '#f0f0f0', marginBottom: '28px' }}></div>

        {/* FEEDBACK */}
        {mensagem && (
          <div style={{ background: '#f5f5f5', border: '1px solid #eee', fontSize: '0.6rem', letterSpacing: '2px', padding: '12px', marginBottom: '20px', color: '#000', textTransform: 'uppercase' }}>
            {mensagem}
          </div>
        )}

        {/* CONTEÚDO */}
        {carregando ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={loadingStyle}>SINCRONIZANDO ACERVO...</p>
            <div style={{ width: '40px', height: '1px', background: '#eee', margin: '16px auto 0' }}></div>
          </div>
        ) : looks.length === 0 ? (
          <div style={emptyState}>
            <p style={{ fontSize: '2rem', marginBottom: '16px' }}>◻</p>
            <p style={{ fontSize: '0.7rem', letterSpacing: '3px', color: '#ccc', marginBottom: '8px' }}>
              NENHUMA PEÇA ENCONTRADA
            </p>
            <p style={{ fontSize: '0.6rem', letterSpacing: '1px', color: '#ddd' }}>
              {filtroEstilo === 'MEU DNA'
                ? 'ADICIONE PEÇAS NO UPLOAD PARA VER SEU ACERVO AQUI'
                : 'TENTE OUTRO FILTRO DE ESTILO'}
            </p>
          </div>
        ) : (
          <div style={gridAcervo}>
            {looks.map((item) => {
              const isHovered = hoveredId === item.id;
              return (
                <div
                  key={item.id}
                  style={{
                    ...cardEstilo,
                    boxShadow: isHovered ? '0 8px 30px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.02)',
                    transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                  }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* ÍCONE CATEGORIA */}
                  <div style={{ fontSize: '1.4rem', marginBottom: '12px' }}>
                    {CATEGORIAS_ICONE[item.categoria] || '◻'}
                  </div>

                  {/* NOME */}
                  <h3 style={itemTitleStyle}>{item.nome_look?.toUpperCase()}</h3>

                  {/* LINHA */}
                  <div style={{ width: '16px', height: '1px', background: '#000', margin: '10px 0' }}></div>

                  {/* TAGS */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {item.estilo && (
                      <span style={tagStyle}>{item.estilo}</span>
                    )}
                    {item.cor && (
                      <span style={{ ...tagStyle, color: '#ccc' }}>{item.cor}</span>
                    )}
                    {item.marca && (
                      <span style={{ ...tagStyle, color: '#bbb', fontSize: '0.5rem' }}>{item.marca}</span>
                    )}
                  </div>

                  {/* FAVORITA */}
                  {item.favorita && (
                    <div style={{ marginTop: '10px', fontSize: '0.5rem', letterSpacing: '1px', color: '#aaa' }}>
                      ★ FAVORITA
                    </div>
                  )}

                  {/* BOTÃO REMOVER */}
                  {isHovered && (
                    <button
                      onClick={() => handleDeletar(item.id)}
                      disabled={deletandoId === item.id}
                      style={{
                        marginTop: '14px', width: '100%', padding: '8px',
                        background: 'none', border: '1px solid #eee',
                        fontSize: '0.5rem', letterSpacing: '1.5px', color: '#ccc',
                        cursor: 'pointer', textTransform: 'uppercase', fontFamily: 'inherit',
                        transition: '0.2s',
                      }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.color = '#000'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.color = '#ccc'; }}
                    >
                      {deletandoId === item.id ? 'REMOVENDO...' : 'REMOVER'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* RODAPÉ */}
        {!carregando && looks.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '28px', borderTop: '1px solid #f0f0f0' }}>
            <p style={{ fontSize: '0.55rem', letterSpacing: '2px', color: '#ccc', textTransform: 'uppercase' }}>
              {totalPecas} {totalPecas === 1 ? 'PEÇA' : 'PEÇAS'} · ACERVO DE {nomeUsuario?.toUpperCase() || 'USUÁRIO'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const wrapperStyle = { display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', width: '100%', padding: '40px 20px', backgroundColor: '#f9f9f9' };
const squareContainer = { width: '100%', maxWidth: '820px', padding: '60px 48px', backgroundColor: '#fff', border: '1px solid #eee', boxShadow: '0 20px 60px rgba(0,0,0,0.04)', fontFamily: "'Georgia', serif" };
const eyebrowStyle = { letterSpacing: '5px', fontSize: '0.55rem', color: '#999', textTransform: 'uppercase', marginBottom: '12px' };
const titleStyle = { fontSize: '1.4rem', fontWeight: '300', letterSpacing: '5px', color: '#000', textTransform: 'uppercase', margin: '0 0 16px' };
const lineStyle = { width: '30px', height: '1px', background: '#000', margin: '0 auto 16px' };
const metricasGrid = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#eee', border: '1px solid #eee', marginBottom: '32px' };
const metricaCard = { background: '#fff', padding: '20px', textAlign: 'center' };
const metricaNum = { fontSize: '1.6rem', fontWeight: '300', color: '#000', margin: '0 0 4px', letterSpacing: '2px' };
const metricaLabel = { fontSize: '0.5rem', letterSpacing: '2px', color: '#aaa', textTransform: 'uppercase', margin: 0 };
const chipStyle = (ativo) => ({ padding: '7px 14px', fontSize: '0.55rem', letterSpacing: '1.5px', border: ativo ? '1px solid #000' : '1px solid #eee', background: ativo ? '#000' : '#fff', color: ativo ? '#fff' : '#888', cursor: 'pointer', transition: '0.15s', textTransform: 'uppercase', fontFamily: 'inherit' });
const gridAcervo = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' };
const cardEstilo = { padding: '24px 20px', border: '1px solid #eee', backgroundColor: '#fff', transition: 'transform 0.2s, box-shadow 0.2s', textAlign: 'left' };
const itemTitleStyle = { fontSize: '0.8rem', letterSpacing: '1.5px', fontWeight: '600', color: '#000', margin: 0, textTransform: 'uppercase', lineHeight: '1.4' };
const tagStyle = { fontSize: '0.6rem', color: '#888', letterSpacing: '1px', textTransform: 'uppercase' };
const loadingStyle = { fontSize: '0.6rem', letterSpacing: '4px', color: '#ccc', textTransform: 'uppercase' };
const emptyState = { textAlign: 'center', padding: '60px 0', gridColumn: '1/-1' };