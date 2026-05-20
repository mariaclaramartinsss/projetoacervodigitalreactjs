import React, { useState } from 'react';
import { supabase } from '../services/supabase';

export default function Login({ onLoginSucesso }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [focusNome, setFocusNome] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleAcesso = async (e) => {
    e.preventDefault();
    setErro('');

    if (!nome.trim()) { setErro('Por favor, informe seu nome.'); return; }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) { setErro('Informe um e-mail válido.'); return; }

    setCarregando(true);
    try {
      // Verifica se e-mail já existe no banco
      const { data: existente } = await supabase
        .from('emails_usuarios')
        .select('id, nome, email')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();

      if (!existente) {
        // Novo usuário — salva no banco
        await supabase.from('emails_usuarios').insert([{
          nome: nome.trim(),
          email: email.toLowerCase().trim(),
          aceita_email: true,
        }]);
      }

      // Salva localmente — usa nome já cadastrado se voltar
      localStorage.setItem('nomeUsuario', existente?.nome || nome.trim());
      localStorage.setItem('userEmail', email.toLowerCase().trim());

      if (onLoginSucesso) onLoginSucesso();
    } catch (err) {
      // Se banco falhar, deixa entrar mesmo assim
      console.error('Erro ao salvar no banco:', err.message);
      localStorage.setItem('nomeUsuario', nome.trim());
      localStorage.setItem('userEmail', email.toLowerCase().trim());
      if (onLoginSucesso) onLoginSucesso();
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main style={containerStyle} translate="no">
      <div style={loginCard}>

        <p style={eyebrowStyle}>MODA 2026</p>
        <div style={lineStyle}></div>
        <h1 style={titleStyle}>ACESSE SEU ACERVO</h1>
        <p style={subtitleStyle}>
          ENTRE PARA DESCOBRIR SEU ESTILO E RECEBER SEU RESULTADO POR E-MAIL
        </p>

        {erro && <div style={erroStyle}>{erro}</div>}

        <form onSubmit={handleAcesso} style={formStyle}>
          <div style={inputGroup}>
            <label style={fieldLabel}>NOME COMPLETO</label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              onFocus={() => setFocusNome(true)}
              onBlur={() => setFocusNome(false)}
              required
              style={{ ...inputStyle, borderBottomColor: focusNome ? '#000' : '#ddd' }}
              placeholder="Ex: Maria Silva"
            />
          </div>

          <div style={inputGroup}>
            <label style={fieldLabel}>E-MAIL</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocusEmail(true)}
              onBlur={() => setFocusEmail(false)}
              required
              style={{ ...inputStyle, borderBottomColor: focusEmail ? '#000' : '#ddd' }}
              placeholder="exemplo@email.com"
              onKeyDown={e => e.key === 'Enter' && handleAcesso(e)}
            />
          </div>

          <p style={emailNoteStyle}>
            📬 SEU RESULTADO DO QUIZ SERÁ ENVIADO PARA ESTE E-MAIL
          </p>

          <button
            type="submit"
            disabled={carregando || nome.length < 2 || email.length < 5}
            style={{
              ...btnStyle,
              opacity: !carregando && nome.length >= 2 && email.length >= 5 ? 1 : 0.4,
              cursor: !carregando && nome.length >= 2 && email.length >= 5 ? 'pointer' : 'not-allowed',
            }}
          >
            {carregando ? 'ENTRANDO...' : 'ENTRAR E FAZER O QUIZ →'}
          </button>
        </form>

        <p style={voltarStyle} onClick={() => window.location.reload()}>
          ← VOLTAR PARA TENDÊNCIAS
        </p>
      </div>
    </main>
  );
}

const containerStyle = { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', fontFamily: "'Georgia', serif", padding: '40px 20px' };
const loginCard = { padding: '60px 40px', textAlign: 'center', width: '100%', maxWidth: '400px', border: '1px solid #eee', boxShadow: '0 20px 60px rgba(0,0,0,0.04)' };
const eyebrowStyle = { letterSpacing: '5px', fontSize: '0.6rem', color: '#999', marginBottom: '16px', textTransform: 'uppercase' };
const lineStyle = { width: '30px', height: '1px', background: '#000', margin: '0 auto 20px' };
const titleStyle = { fontSize: '1.3rem', letterSpacing: '4px', fontWeight: '300', marginBottom: '12px', textTransform: 'uppercase', color: '#000' };
const subtitleStyle = { fontSize: '0.6rem', letterSpacing: '1px', color: '#aaa', lineHeight: '1.8', marginBottom: '32px', textTransform: 'uppercase' };
const erroStyle = { background: '#fff5f5', border: '1px solid #ffd0d0', color: '#c00', fontSize: '0.7rem', letterSpacing: '1px', padding: '10px', marginBottom: '16px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '24px' };
const inputGroup = { display: 'flex', flexDirection: 'column', textAlign: 'left' };
const fieldLabel = { fontSize: '0.55rem', letterSpacing: '2px', marginBottom: '8px', color: '#555', textTransform: 'uppercase' };
const inputStyle = { padding: '12px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', fontSize: '0.9rem', background: 'transparent', color: '#000', transition: 'border-color 0.2s', fontFamily: 'inherit' };
const emailNoteStyle = { fontSize: '0.55rem', letterSpacing: '1px', color: '#bbb', textAlign: 'left', marginTop: '-8px' };
const btnStyle = { padding: '16px', background: '#000', color: '#fff', border: 'none', letterSpacing: '3px', fontSize: '0.65rem', marginTop: '8px', transition: 'opacity 0.2s', textTransform: 'uppercase', fontFamily: 'inherit' };
const voltarStyle = { fontSize: '0.6rem', letterSpacing: '2px', color: '#bbb', marginTop: '28px', cursor: 'pointer', textTransform: 'uppercase' };
