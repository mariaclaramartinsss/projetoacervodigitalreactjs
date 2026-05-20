import React, { useState } from 'react';
import { supabase } from '../services/supabase';

const CATEGORIAS = ['PARTE DE CIMA', 'PARTE DE BAIXO', 'VESTIDO / MACACÃO', 'CASACO / JAQUETA', 'CALÇADO', 'ACESSÓRIO', 'BOLSA'];
const ESTILOS_OPCOES = ['MINIMALISTA', 'STREETWEAR', 'ELEGANTE', 'GÓTICO', 'ROMÂNTICO', 'BOHO CHIC', 'CASUAL', 'ESPORTIVO'];
const CORES_OPCOES = ['PRETO', 'BRANCO', 'CINZA', 'BEGE / NUDE', 'MARROM', 'AZUL', 'VERDE', 'VERMELHO', 'ROSA', 'ROXO', 'AMARELO / MOSTARDA', 'ESTAMPADO'];
const OCASIOES = ['DIA A DIA', 'TRABALHO', 'BALADA / FESTA', 'ENCONTRO', 'ESPORTE', 'VIAGEM'];

const SECOES = [
  { id: 'peca', label: 'PEÇA', icone: '◻', desc: 'Adicione uma peça do seu guarda-roupa' },
  { id: 'cores', label: 'PALETA', icone: '◈', desc: 'Quais cores dominam seu armário?' },
  { id: 'acessorios', label: 'ACESSÓRIOS', icone: '◇', desc: 'O que você usa para finalizar seus looks?' },
  { id: 'ocasiao', label: 'OCASIÕES', icone: '◌', desc: 'Para quais momentos você costuma se vestir?' },
];

export default function EnviarLook() {
  const [secaoAtiva, setSecaoAtiva] = useState('peca');
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  // Peça
  const [nomePeca, setNomePeca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [estilo, setEstilo] = useState('');
  const [corPeca, setCorPeca] = useState('');
  const [marcaPeca, setMarcaPeca] = useState('');
  const [favoritaPeca, setFavoritaPeca] = useState(false);

  // Paleta
  const [coresSelecionadas, setCoresSelecionadas] = useState([]);

  // Acessórios
  const [acessorioNome, setAcessorioNome] = useState('');
  const [acessorioTipo, setAcessorioTipo] = useState('');
  const [acessorioFrequencia, setAcessorioFrequencia] = useState('');

  // Ocasiões
  const [ocasioesSelecionadas, setOcasioesSelecionadas] = useState([]);
  const [estiloVidaObs, setEstiloVidaObs] = useState('');

  const mostrarSucesso = (msg) => {
    setMensagem(msg);
    setErro('');
    setTimeout(() => setMensagem(''), 3000);
  };

  const toggleLista = (item, lista, setLista) => {
    setLista(lista.includes(item) ? lista.filter(i => i !== item) : [...lista, item]);
  };

  const salvarPeca = async (e) => {
    e.preventDefault();
    setErro('');
    if (!nomePeca || !categoria || !estilo) { setErro('Preencha nome, categoria e estilo.'); return; }
    setEnviando(true);
    try {
      const { error } = await supabase.from('meus_looks').insert([{
        nome_look: nomePeca,
        estilo: estilo,
        categoria: categoria,
        cor: corPeca,
        marca: marcaPeca,
        favorita: favoritaPeca,
      }]);
      if (error) throw error;
      mostrarSucesso('PEÇA ADICIONADA AO ACERVO.');
      setNomePeca(''); setCategoria(''); setEstilo(''); setCorPeca(''); setMarcaPeca(''); setFavoritaPeca(false);
    } catch (err) { setErro('Erro: ' + err.message); }
    finally { setEnviando(false); }
  };

  const salvarCores = async (e) => {
    e.preventDefault();
    setErro('');
    if (coresSelecionadas.length === 0) { setErro('Selecione ao menos uma cor.'); return; }
    setEnviando(true);
    try {
      const { error } = await supabase.from('preferencias_usuario').upsert([{
        nome_usuario: localStorage.getItem('nomeUsuario') || 'anonimo',
        cores_predominantes: coresSelecionadas.join(', '),
      }]);
      if (error) throw error;
      mostrarSucesso('PALETA SALVA COM SUCESSO.');
    } catch (err) { setErro('Erro: ' + err.message); }
    finally { setEnviando(false); }
  };

  const salvarAcessorio = async (e) => {
    e.preventDefault();
    setErro('');
    if (!acessorioNome || !acessorioTipo) { setErro('Preencha nome e tipo do acessório.'); return; }
    setEnviando(true);
    try {
      const { error } = await supabase.from('meus_looks').insert([{
        nome_look: acessorioNome,
        estilo: acessorioTipo,
        categoria: 'ACESSÓRIO',
        cor: acessorioFrequencia,
      }]);
      if (error) throw error;
      mostrarSucesso('ACESSÓRIO ADICIONADO.');
      setAcessorioNome(''); setAcessorioTipo(''); setAcessorioFrequencia('');
    } catch (err) { setErro('Erro: ' + err.message); }
    finally { setEnviando(false); }
  };

  const salvarOcasioes = async (e) => {
    e.preventDefault();
    setErro('');
    if (ocasioesSelecionadas.length === 0) { setErro('Selecione ao menos uma ocasião.'); return; }
    setEnviando(true);
    try {
      const { error } = await supabase.from('preferencias_usuario').upsert([{
        nome_usuario: localStorage.getItem('nomeUsuario') || 'anonimo',
        ocasioes: ocasioesSelecionadas.join(', '),
        observacoes: estiloVidaObs,
      }]);
      if (error) throw error;
      mostrarSucesso('PERFIL DE ESTILO DE VIDA SALVO.');
    } catch (err) { setErro('Erro: ' + err.message); }
    finally { setEnviando(false); }
  };

  const nomeUsuario = localStorage.getItem('nomeUsuario');

  return (
    <div style={wrapperStyle} translate="no">
      <div style={squareContainer}>

        {/* HEADER */}
        <header style={{ marginBottom: '32px', textAlign: 'center' }}>
          <p style={eyebrowStyle}>CURADORIA PESSOAL</p>
          <h1 style={titleStyle}>SEU GUARDA-ROUPA</h1>
          <div style={lineStyle}></div>
          <p style={subtitleStyle}>
            {nomeUsuario
              ? `${nomeUsuario.toUpperCase()}, CONTE-NOS O QUE VIVE NO SEU ARMÁRIO`
              : 'CONTE-NOS O QUE VIVE NO SEU ARMÁRIO'}
          </p>
        </header>

        {/* ABAS */}
        <div style={{ display: 'flex', borderBottom: '1px solid #eee', marginBottom: '32px' }}>
          {SECOES.map(s => (
            <button
              key={s.id}
              onClick={() => { setSecaoAtiva(s.id); setErro(''); setMensagem(''); }}
              style={{
                flex: 1, padding: '10px 4px', fontSize: '0.5rem', letterSpacing: '1.5px',
                background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase',
                color: '#000', fontWeight: secaoAtiva === s.id ? 'bold' : 'normal',
                borderBottom: secaoAtiva === s.id ? '2px solid #000' : '2px solid transparent',
                transition: '0.2s', fontFamily: 'inherit',
              }}
            >
              {s.icone} {s.label}
            </button>
          ))}
        </div>

        {/* DESC DA SEÇÃO */}
        <p style={{ fontSize: '0.65rem', letterSpacing: '1.5px', color: '#aaa', textAlign: 'center', marginBottom: '28px', textTransform: 'uppercase' }}>
          {SECOES.find(s => s.id === secaoAtiva)?.desc}
        </p>

        {/* FEEDBACK */}
        {mensagem && <div style={successStyle}>{mensagem}</div>}
        {erro && <div style={erroStyle}>{erro}</div>}

        {/* ─── ABA: PEÇA ─── */}
        {secaoAtiva === 'peca' && (
          <form onSubmit={salvarPeca} style={formStyle}>
            <div style={inputGroup}>
              <label style={labelStyle}>NOME DA PEÇA</label>
              <input type="text" placeholder="Ex: BLAZER OVERSIZED BEGE" value={nomePeca}
                onChange={e => setNomePeca(e.target.value)} style={inputStyle} />
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>CATEGORIA</label>
              <div style={chipGrid}>
                {CATEGORIAS.map(c => (
                  <button type="button" key={c} onClick={() => setCategoria(c)}
                    style={chipStyle(categoria === c)}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>ESTILO DA PEÇA</label>
              <div style={chipGrid}>
                {ESTILOS_OPCOES.map(e => (
                  <button type="button" key={e} onClick={() => setEstilo(e)}
                    style={chipStyle(estilo === e)}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={inputGroup}>
                <label style={labelStyle}>COR PRINCIPAL</label>
                <input type="text" placeholder="Ex: PRETO" value={corPeca}
                  onChange={e => setCorPeca(e.target.value)} style={inputStyle} />
              </div>
              <div style={inputGroup}>
                <label style={labelStyle}>MARCA (OPCIONAL)</label>
                <input type="text" placeholder="Ex: ZARA" value={marcaPeca}
                  onChange={e => setMarcaPeca(e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="fav" checked={favoritaPeca}
                onChange={e => setFavoritaPeca(e.target.checked)}
                style={{ accentColor: '#000', width: '14px', height: '14px' }} />
              <label htmlFor="fav" style={{ fontSize: '0.6rem', letterSpacing: '2px', color: '#555', cursor: 'pointer' }}>
                PEÇA FAVORITA — USO COM FREQUÊNCIA
              </label>
            </div>

            <button type="submit" disabled={enviando} style={btnPreto}>
              {enviando ? 'SALVANDO...' : 'ADICIONAR AO ACERVO →'}
            </button>
          </form>
        )}

        {/* ─── ABA: PALETA ─── */}
        {secaoAtiva === 'cores' && (
          <form onSubmit={salvarCores} style={formStyle}>
            <div style={inputGroup}>
              <label style={labelStyle}>QUAIS CORES DOMINAM SEU ARMÁRIO?</label>
              <p style={{ fontSize: '0.6rem', color: '#aaa', letterSpacing: '1px', marginBottom: '12px' }}>
                SELECIONE TODAS QUE SE APLICAM
              </p>
              <div style={chipGrid}>
                {CORES_OPCOES.map(c => (
                  <button type="button" key={c}
                    onClick={() => toggleLista(c, coresSelecionadas, setCoresSelecionadas)}
                    style={chipStyle(coresSelecionadas.includes(c))}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {coresSelecionadas.length > 0 && (
              <div style={{ padding: '16px', border: '1px solid #eee', background: '#fafafa' }}>
                <p style={{ fontSize: '0.55rem', letterSpacing: '2px', color: '#aaa', marginBottom: '8px' }}>
                  SUA PALETA PREDOMINANTE
                </p>
                <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#000', lineHeight: '1.8' }}>
                  {coresSelecionadas.join(' · ')}
                </p>
              </div>
            )}

            <button type="submit" disabled={enviando} style={btnPreto}>
              {enviando ? 'SALVANDO...' : 'SALVAR PALETA →'}
            </button>
          </form>
        )}

        {/* ─── ABA: ACESSÓRIOS ─── */}
        {secaoAtiva === 'acessorios' && (
          <form onSubmit={salvarAcessorio} style={formStyle}>
            <div style={inputGroup}>
              <label style={labelStyle}>NOME DO ACESSÓRIO</label>
              <input type="text" placeholder="Ex: COLAR DE PÉROLAS, TÊNIS CHUNKY"
                value={acessorioNome} onChange={e => setAcessorioNome(e.target.value)} style={inputStyle} />
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>TIPO DE ACESSÓRIO</label>
              <div style={chipGrid}>
                {['COLAR / BRINCO', 'BOLSA', 'CALÇADO', 'RELÓGIO / PULSEIRA', 'ÓCULOS', 'CHAPÉU / BONÉ', 'CINTO', 'OUTRO'].map(t => (
                  <button type="button" key={t} onClick={() => setAcessorioTipo(t)}
                    style={chipStyle(acessorioTipo === t)}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>COM QUE FREQUÊNCIA USA?</label>
              <div style={chipGrid}>
                {['TODO DIA', 'FREQUENTEMENTE', 'ÀS VEZES', 'RARAMENTE'].map(f => (
                  <button type="button" key={f} onClick={() => setAcessorioFrequencia(f)}
                    style={chipStyle(acessorioFrequencia === f)}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={enviando} style={btnPreto}>
              {enviando ? 'SALVANDO...' : 'ADICIONAR ACESSÓRIO →'}
            </button>
          </form>
        )}

        {/* ─── ABA: OCASIÕES ─── */}
        {secaoAtiva === 'ocasiao' && (
          <form onSubmit={salvarOcasioes} style={formStyle}>
            <div style={inputGroup}>
              <label style={labelStyle}>PARA QUAIS MOMENTOS VOCÊ SE VESTE?</label>
              <p style={{ fontSize: '0.6rem', color: '#aaa', letterSpacing: '1px', marginBottom: '12px' }}>
                ISSO AJUDA A MONTAR LOOKS PARA A SUA VIDA REAL
              </p>
              <div style={chipGrid}>
                {OCASIOES.map(o => (
                  <button type="button" key={o}
                    onClick={() => toggleLista(o, ocasioesSelecionadas, setOcasioesSelecionadas)}
                    style={chipStyle(ocasioesSelecionadas.includes(o))}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div style={inputGroup}>
              <label style={labelStyle}>ALGUMA OBSERVAÇÃO SOBRE SEU ESTILO DE VIDA?</label>
              <textarea
                placeholder="Ex: trabalho em ambiente formal mas amo um look descolado no fim de semana..."
                value={estiloVidaObs}
                onChange={e => setEstiloVidaObs(e.target.value)}
                style={{ ...inputStyle, borderBottom: '1px solid #ddd', resize: 'none', height: '80px', paddingTop: '8px', fontSize: '0.8rem' }}
              />
            </div>

            <button type="submit" disabled={enviando} style={btnPreto}>
              {enviando ? 'SALVANDO...' : 'SALVAR PERFIL DE VIDA →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const wrapperStyle = { display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', width: '100%', padding: '40px 20px', backgroundColor: '#f9f9f9' };
const squareContainer = { width: '100%', maxWidth: '580px', padding: '60px 48px', backgroundColor: '#fff', border: '1px solid #eee', boxShadow: '0 20px 60px rgba(0,0,0,0.04)', fontFamily: "'Georgia', serif" };
const eyebrowStyle = { letterSpacing: '5px', fontSize: '0.55rem', color: '#999', textTransform: 'uppercase', marginBottom: '12px' };
const titleStyle = { fontSize: '1.6rem', fontWeight: '300', letterSpacing: '6px', color: '#000', textTransform: 'uppercase', margin: '0 0 16px' };
const lineStyle = { width: '30px', height: '1px', background: '#000', margin: '0 auto 16px' };
const subtitleStyle = { fontSize: '0.6rem', letterSpacing: '1.5px', color: '#aaa', textTransform: 'uppercase', lineHeight: '1.8' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '28px' };
const inputGroup = { display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' };
const labelStyle = { fontSize: '0.55rem', letterSpacing: '2.5px', fontWeight: '600', color: '#000', textTransform: 'uppercase' };
const inputStyle = { border: 'none', borderBottom: '1px solid #eee', padding: '12px 0', fontSize: '0.85rem', outline: 'none', transition: 'border-color 0.2s', background: 'transparent', color: '#000', fontFamily: 'inherit' };
const chipGrid = { display: 'flex', flexWrap: 'wrap', gap: '8px' };
const chipStyle = (ativo) => ({ padding: '8px 14px', fontSize: '0.6rem', letterSpacing: '1.5px', border: ativo ? '1px solid #000' : '1px solid #eee', background: ativo ? '#000' : '#fff', color: ativo ? '#fff' : '#000', cursor: 'pointer', transition: '0.15s', textTransform: 'uppercase', fontFamily: 'inherit' });
const btnPreto = { padding: '16px', background: '#000', color: '#fff', border: 'none', fontSize: '0.65rem', letterSpacing: '3px', cursor: 'pointer', textTransform: 'uppercase', fontFamily: 'inherit', marginTop: '8px' };
const successStyle = { background: '#f5f5f5', border: '1px solid #eee', color: '#000', fontSize: '0.6rem', letterSpacing: '2px', padding: '12px', marginBottom: '8px', textTransform: 'uppercase' };
const erroStyle = { background: '#fff5f5', border: '1px solid #ffd0d0', color: '#c00', fontSize: '0.6rem', letterSpacing: '1px', padding: '12px', marginBottom: '8px' };