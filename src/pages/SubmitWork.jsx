import React, { useState } from 'react';
import { supabase } from '../services/supabase';

const ESTILOS = {
  MINIMALISTA: {
    label: 'Minimalista',
    descricao: 'Você valoriza o essencial. Cada peça tem propósito, cada look tem intenção.',
    icone: '◻',
    feminino: {
      acessorios: ['Brincos de argola fina em ouro', 'Bolsa estruturada em couro nude', 'Relógio de mostrador simples', 'Óculos de sol geométrico'],
      paleta: ['#F5F0EB', '#D4C5B0', '#8C7B6B', '#3D3530', '#1A1410'],
      nomesCores: ['Off-white', 'Areia', 'Terracota suave', 'Cacau', 'Quase preto'],
      tendencias: ['Monocromático total look', 'Tecidos naturais como linho e algodão orgânico', 'Silhuetas fluidas e oversized', 'Capsule wardrobe curada'],
      pecasChave: ['Blazer oversized bege', 'Calça pantalona off-white', 'Body de alça fina preto', 'Sobretudo caramelo'],
    },
    masculino: {
      acessorios: ['Relógio de couro simples', 'Carteira slim em couro liso', 'Óculos de sol quadrado', 'Cinto monocromático'],
      paleta: ['#F2EDE8', '#C8B9A8', '#7A6A5A', '#3A3028', '#141210'],
      nomesCores: ['Creme', 'Areia', 'Marrom médio', 'Marrom escuro', 'Preto quente'],
      tendencias: ['Looks monocromáticos de uma cor só', 'Alfaiataria relaxada sem gravata', 'Tênis minimalista branco', 'Básicos premium em tecidos nobres'],
      pecasChave: ['Calça chino bege', 'Camiseta branca premium', 'Suéter de gola alta cinza', 'Tênis branco limpo'],
    }
  },
  STREETWEAR: {
    label: 'Streetwear',
    descricao: 'Você veste cultura. Sua roupa é manifesto, atitude e identidade urbana.',
    icone: '◈',
    feminino: {
      acessorios: ['Tênis chunky colorblock', 'Boné aba reta', 'Bolsa crossbody mini', 'Meias cano alto estampadas', 'Óculos shield'],
      paleta: ['#F0F0F0', '#C8C8C8', '#888888', '#3C3C3C', '#0A0A0A'],
      nomesCores: ['Branco', 'Cinza claro', 'Cinza médio', 'Chumbo', 'Preto'],
      tendencias: ['Coordenados de moletom oversized', 'Collab de marcas de luxo + streetwear', 'Tênis plataforma com looks casuais', 'Cargo pants com cropped'],
      pecasChave: ['Hoodie oversized gráfico', 'Cargo pants wide leg', 'Tênis chunky', 'Cropped de ribana'],
    },
    masculino: {
      acessorios: ['Tênis de edição limitada', 'Boné snapback', 'Corrente prata grossa', 'Mochila técnica', 'Óculos retro'],
      paleta: ['#F0F0F0', '#C8C8C8', '#888888', '#3C3C3C', '#000000'],
      nomesCores: ['Branco', 'Cinza claro', 'Cinza médio', 'Chumbo', 'Preto'],
      tendencias: ['Jogger e tênis de luxo', 'Jaqueta bomber com estampa', 'Caps de marcas icônicas', 'Layering de peças gráficas'],
      pecasChave: ['Moletom gráfico oversized', 'Calça cargo', 'Tênis icônico', 'Jaqueta bomber'],
    }
  },
  ELEGANTE: {
    label: 'Elegante',
    descricao: 'Você tem presença antes de falar. Seu estilo é refinamento sem esforço aparente.',
    icone: '◇',
    feminino: {
      acessorios: ['Colar de pérolas', 'Clutch de cetim', 'Scarpin nude de bico fino', 'Anel de pedra semipreciosa', 'Lenço de seda'],
      paleta: ['#FAF7F2', '#E8D5B7', '#C4A882', '#8B6914', '#3D2B1F'],
      nomesCores: ['Champagne', 'Dourado pálido', 'Caramelo', 'Bronze', 'Mogno'],
      tendencias: ['Vestidos midi com fendas sutis', 'Alfaiataria feminina estruturada', 'Tecidos como seda, cetim e crepe', 'Monocromático em tons terrosos'],
      pecasChave: ['Blazer estruturado de alfaiataria', 'Calça pantalona de crepe', 'Vestido midi de cetim', 'Trench coat clássico'],
    },
    masculino: {
      acessorios: ['Relógio de luxo', 'Abotoaduras discretas', 'Lenço de bolso', 'Cinto de couro italiano', 'Óculos com armação fina'],
      paleta: ['#F5F0E8', '#D4C4A0', '#A08060', '#705030', '#2A1810'],
      nomesCores: ['Creme', 'Dourado suave', 'Caramelo', 'Marrom clássico', 'Mogno'],
      tendencias: ['Terno com corte italiano slim', 'Blazer esportivo com calça de alfaiataria', 'Camisa social sem gravata aberta', 'Double-breasted modernizado'],
      pecasChave: ['Terno navy ou cinza', 'Camisa branca de algodão egípcio', 'Sapato oxford', 'Polo de cashmere'],
    }
  },
  GOTICO: {
    label: 'Gótico',
    descricao: 'Você encontra beleza na escuridão. Seu estilo é poesia visual e mistério deliberado.',
    icone: '✦',
    feminino: {
      acessorios: ['Colete de couro com fivelas', 'Botas de couro com salto grosso', 'Colar de corrente prateada', 'Luvas de renda', 'Tiara com detalhes em veludo'],
      paleta: ['#3D1A1A', '#5A2030', '#7A2040', '#9A3050', '#C06080'],
      nomesCores: ['Preto bordô', 'Bordô escuro', 'Vinho', 'Rubi', 'Rosa escuro'],
      tendencias: ['Gótico romântico com rendas e veludo', 'Nu-goth com minimalismo moderno', 'Boots de plataforma com vestidos midi', 'Acessórios com pedras negras'],
      pecasChave: ['Corset de veludo preto', 'Saia midi de renda', 'Botas de plataforma', 'Sobretudo fluido preto'],
    },
    masculino: {
      acessorios: ['Anel de prata com detalhes', 'Colete de couro', 'Colar de corrente', 'Botas com fivelas', 'Relógio de couro preto'],
      paleta: ['#2A1A1A', '#3D2030', '#502840', '#303048', '#404060'],
      nomesCores: ['Preto quente', 'Bordô profundo', 'Vinho', 'Chumbo azulado', 'Roxo noturno'],
      tendencias: ['Dark academia com tweed e preto', 'Gótico contemporâneo com alfaiataria', 'Layering de texturas contrastantes', 'Acessórios em prata e pedras escuras'],
      pecasChave: ['Sobretudo preto longo', 'Calça slim escura', 'Camisa de seda escura', 'Colete de veludo'],
    }
  },
  ROMANTICO: {
    label: 'Romântico',
    descricao: 'Você veste sentimentos. Cada detalhe conta uma história de delicadeza e intenção.',
    icone: '◌',
    feminino: {
      acessorios: ['Tiara de flores ou pérolas', 'Bolsa de crochê ou palha', 'Sandália de tiras finas', 'Brinco de cristal gota', 'Pulseira de flores esmaltadas'],
      paleta: ['#FEF0F3', '#F4C2CE', '#E88FA4', '#C4607A', '#8B3550'],
      nomesCores: ['Rosa leite', 'Rosa bebê', 'Rosa médio', 'Rosa antigo', 'Mauve escuro'],
      tendencias: ['Babados e drapeados assimétricos', 'Vestidos florais com volume', 'Tecidos como chiffon, organza e renda', 'Cores pastéis com toques de nude'],
      pecasChave: ['Vestido floral midi com babado', 'Blusa de chiffon bufante', 'Saia plissada em tom pastel', 'Cardigã de tricô bordado'],
    },
    masculino: {
      acessorios: ['Óculos redondos de aros finos', 'Relógio vintage de couro claro', 'Lenço estampado no pescoço', 'Sapato de couro envelhecido', 'Alfinete de lapela'],
      paleta: ['#F5EEF0', '#E0C4CC', '#C09AAA', '#906080', '#604060'],
      nomesCores: ['Rosa giz', 'Mauve claro', 'Mauve médio', 'Ameixa', 'Roxo suave'],
      tendencias: ['Cottagecore masculino com linho', 'Estampas florais em camisas', 'Cortes vintage dos anos 70', 'Suéteres bordados artesanais'],
      pecasChave: ['Camisa floral de linho', 'Calça boca de sino caramelo', 'Suéter bordado', 'Colete de lã texturizado'],
    }
  },
  BOHO: {
    label: 'Boho Chic',
    descricao: 'Você é espírito livre com olhar refinado. Arte, natureza e viagem inspiram cada look.',
    icone: '◎',
    feminino: {
      acessorios: ['Chapéu de palha de aba larga', 'Sandália rasteira com tiras trançadas', 'Colar de pedras naturais empilhado', 'Bolsa de franja em couro', 'Pulseiras artesanais múltiplas'],
      paleta: ['#F5E6C8', '#D4A857', '#8B6914', '#5C3D1A', '#8B4513'],
      nomesCores: ['Bege dourado', 'Mostarda', 'Ocre', 'Marrom terra', 'Siena'],
      tendencias: ['Maxi vestidos bordados com espelhinhos', 'Layering de colares étnicos', 'Estampas paisley e tie-dye naturais', 'Tecidos com textura: lona, juta, macramê'],
      pecasChave: ['Vestido maxi floral bordado', 'Blusa de camponesa com renda', 'Saia de camadas rodada', 'Jaqueta jeans com patches'],
    },
    masculino: {
      acessorios: ['Chapéu fedora de palha', 'Pulseiras de couro e pedras', 'Mochila de couro envelhecido', 'Colar de madeira ou turquesa', 'Sandálias de couro artesanal'],
      paleta: ['#F0E0B0', '#C8A040', '#806010', '#503010', '#784020'],
      nomesCores: ['Trigo', 'Mostarda', 'Ocre escuro', 'Castanho', 'Ferrugem'],
      tendencias: ['Camisas bordadas mexicanas ou indianas', 'Calça ampla de linho', 'Looks de festival com camadas', 'Mistura de texturas naturais'],
      pecasChave: ['Camisa de linho bordada', 'Calça ampla de algodão', 'Colete de couro', 'Bota western envelhecida'],
    }
  }
};

const perguntas = [
  {
    q: 'QUAL A SUA PRIORIDADE AO SE VESTIR?',
    opcoes: [
      { t: 'ESSENCIALISMO E CORES NEUTRAS', tipo: 'MINIMALISTA' },
      { t: 'CONFORTO E EXPRESSÃO URBANA', tipo: 'STREETWEAR' },
      { t: 'SOFISTICAÇÃO E CAIMENTO PERFEITO', tipo: 'ELEGANTE' },
      { t: 'MISTÉRIO E PROFUNDIDADE VISUAL', tipo: 'GOTICO' },
      { t: 'DELICADEZA E ROMANTISMO', tipo: 'ROMANTICO' },
      { t: 'LIBERDADE E ESPÍRITO ARTÍSTICO', tipo: 'BOHO' },
    ]
  },
  {
    q: 'ESCOLHA UM ACESSÓRIO ESSENCIAL:',
    opcoes: [
      { t: 'ÓCULOS DE SOL GEOMÉTRICO SIMPLES', tipo: 'MINIMALISTA' },
      { t: 'TÊNIS DE EDIÇÃO LIMITADA', tipo: 'STREETWEAR' },
      { t: 'RELÓGIO DE LUXO OU JOIA CLÁSSICA', tipo: 'ELEGANTE' },
      { t: 'CORRENTE PRATEADA E ANEL MARCANTE', tipo: 'GOTICO' },
      { t: 'TIARA OU COLAR DE FLORES', tipo: 'ROMANTICO' },
      { t: 'PULSEIRAS ARTESANAIS EMPILHADAS', tipo: 'BOHO' },
    ]
  },
  {
    q: 'QUAL O SEU AMBIENTE FAVORITO?',
    opcoes: [
      { t: 'GALERIAS E ESPAÇOS CLEAN', tipo: 'MINIMALISTA' },
      { t: 'RUAS E EVENTOS URBANOS', tipo: 'STREETWEAR' },
      { t: 'JANTARES E LUGARES CLÁSSICOS', tipo: 'ELEGANTE' },
      { t: 'MUSEUS, CASTELOS E LUGARES HISTÓRICOS', tipo: 'GOTICO' },
      { t: 'JARDINS, CAFÉS E MERCADOS ARTESANAIS', tipo: 'ROMANTICO' },
      { t: 'FESTIVAIS, VIAGENS E NATUREZA', tipo: 'BOHO' },
    ]
  }
];

export default function SubmitWork() {
  const [telaNome, setTelaNome] = useState('inicio');
  const [etapa, setEtapa] = useState(0);
  const [pontos, setPontos] = useState({ MINIMALISTA: 0, STREETWEAR: 0, ELEGANTE: 0, GOTICO: 0, ROMANTICO: 0, BOHO: 0 });
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [genero, setGenero] = useState(null);
  const [resultadoFinal, setResultadoFinal] = useState(null);
  const [abaResultado, setAbaResultado] = useState('dna');

  const responder = async (tipo) => {
    const novosPontos = { ...pontos, [tipo]: pontos[tipo] + 1 };
    setPontos(novosPontos);
    if (etapa < perguntas.length - 1) {
      setEtapa(etapa + 1);
    } else {
      let estiloGanhador = 'MINIMALISTA';
      let maiorPontuacao = -1;
      for (let estilo in novosPontos) {
        if (novosPontos[estilo] > maiorPontuacao) {
          maiorPontuacao = novosPontos[estilo];
          estiloGanhador = estilo;
        }
      }
      try {
        await supabase.from('perfis_estilo').insert([{ nome_usuario: nomeUsuario, estilo_resultado: estiloGanhador }]);
      } catch (err) {
        console.error('Erro ao salvar:', err.message);
      }
      localStorage.setItem('perfilEstilo', estiloGanhador);
      localStorage.setItem('nomeUsuario', nomeUsuario);
      setResultadoFinal(estiloGanhador);
      setTelaNome('resultado');
    }
  };

  const reiniciar = () => {
    setEtapa(0);
    setPontos({ MINIMALISTA: 0, STREETWEAR: 0, ELEGANTE: 0, GOTICO: 0, ROMANTICO: 0, BOHO: 0 });
    setNomeUsuario('');
    setGenero(null);
    setResultadoFinal(null);
    setAbaResultado('dna');
    setTelaNome('inicio');
  };

  // ─── RESULTADO ────────────────────────────────────────────────
  if (telaNome === 'resultado' && resultadoFinal) {
    const estilo = ESTILOS[resultadoFinal];
    const versao = genero === 'F' ? estilo.feminino : estilo.masculino;
    const abas = [
      { id: 'dna', label: 'SEU DNA' },
      { id: 'acessorios', label: 'ACESSÓRIOS' },
      { id: 'paleta', label: 'PALETA' },
      { id: 'tendencias', label: 'TENDÊNCIAS' },
    ];
    return (
      <div style={wrapperStyle} translate="no">
        <div style={squareContainer}>
          <p style={{ ...stepStyle, color: '#000' }}>ANÁLISE CONCLUÍDA</p>
          <div style={lineStyle}></div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '3px', color: '#000', marginBottom: '4px', textTransform: 'uppercase' }}>
            {nomeUsuario.toUpperCase()}, SEU DNA É:
          </p>
          <div style={resultadoDestaque}>
            {estilo.icone} {estilo.label.toUpperCase()} {estilo.icone}
          </div>
          <p style={{ fontSize: '0.85rem', letterSpacing: '1px', color: '#000', marginBottom: '24px', lineHeight: '1.7' }}>
            {estilo.descricao}
          </p>

          <div style={{ display: 'flex', borderBottom: '1px solid #eee', marginBottom: '24px' }}>
            {abas.map(aba => (
              <button
                key={aba.id}
                onClick={() => setAbaResultado(aba.id)}
                style={{
                  flex: 1, padding: '10px 4px', fontSize: '0.55rem', letterSpacing: '1.5px',
                  background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase',
                  color: '#000', fontWeight: abaResultado === aba.id ? 'bold' : 'normal',
                  borderBottom: abaResultado === aba.id ? '2px solid #000' : '2px solid transparent',
                  transition: '0.2s',
                }}
              >
                {aba.label}
              </button>
            ))}
          </div>

          {abaResultado === 'dna' && (
            <div>
              <p style={labelStyle}>PEÇAS-CHAVE — VERSÃO {genero === 'F' ? 'FEMININA' : 'MASCULINA'}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                {versao.pecasChave.map((peca, i) => (
                  <div key={i} style={{ padding: '14px', border: '1px solid #ddd', textAlign: 'left', borderRadius: '2px' }}>
                    <span style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#000' }}>{peca}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaResultado === 'acessorios' && (
            <div>
              <p style={labelStyle}>ACESSÓRIOS QUE ELEVAM O SEU LOOK</p>
              {versao.acessorios.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#000', flexShrink: 0 }}></div>
                  <span style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#000', textTransform: 'uppercase' }}>{item}</span>
                </div>
              ))}
            </div>
          )}

          {abaResultado === 'paleta' && (
            <div>
              <p style={labelStyle}>SUA PALETA DE CORES</p>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                {versao.paleta.map((cor, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '100%', height: '60px', background: cor, borderRadius: '2px', border: '1px solid #eee' }}></div>
                    <span style={{ fontSize: '0.5rem', letterSpacing: '0.5px', color: '#000', textAlign: 'center' }}>
                      {versao.nomesCores[i].toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.6rem', letterSpacing: '1px', color: '#888', textAlign: 'center', marginTop: '8px' }}>
                COMBINE ESSAS CORES PARA CRIAR LOOKS HARMÔNICOS
              </p>
            </div>
          )}

          {abaResultado === 'tendencias' && (
            <div>
              <p style={labelStyle}>TENDÊNCIAS DO SEU ESTILO EM 2025</p>
              {versao.tendencias.map((item, i) => (
                <div key={i} style={{ padding: '14px', marginBottom: '10px', border: '1px solid #e8e8e8', background: '#fafafa' }}>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '1.5px', color: '#000' }}>
                    {String(i + 1).padStart(2, '0')} — {item.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '28px' }}>
            <button onClick={reiniciar} style={{ ...buttonStyle, flex: 1 }}>REFAZER TESTE</button>
            <button
              onClick={() => { localStorage.setItem('perfilEstilo', resultadoFinal); window.location.href = '/guarda-roupa'; }}
              style={{ ...buttonStyle, flex: 1, background: '#000', color: '#fff', borderColor: '#000' }}
            >
              VER GUARDA-ROUPA
            </button>
          </div>
        </div>
      </div>
    );
  }

// ─── INICIO ───────────────────────────────────────────────────
  if (telaNome === 'inicio') {
    return (
      <div style={wrapperStyle} translate="no">
        <div style={squareContainer}>
          <h2 style={{ ...questionStyle, fontSize: '1.8rem', marginBottom: '8px' }}>ANÁLISE DE ESTILO</h2>
          <p style={{ fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '32px', color: '#888', textTransform: 'uppercase' }}>
            DESCUBRA SEU DNA DE MODA
          </p>
          <div style={lineStyle}></div>
          <p style={{ ...stepStyle, marginBottom: '20px', color: '#000' }}>SELECIONE:</p>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '36px' }}>
            {['F', 'M'].map((g) => (
              <button
                key={g}
                onClick={() => setGenero(g)}
                style={{
                  ...buttonStyle, flex: 1, borderColor: '#000',
                  background: genero === g ? '#000' : '#fff',
                  color: genero === g ? '#fff' : '#000',
                }}
              >
                {g === 'F' ? 'FEMININO' : 'MASCULINO'}
              </button>
            ))}
          </div>
          <button
            onClick={() => genero && setTelaNome('quiz')}
            disabled={!genero}
            style={{
              ...buttonStyle, width: '100%',
              background: genero ? '#000' : '#eee',
              color: genero ? '#fff' : '#aaa',
              borderColor: genero ? '#000' : '#eee',
              cursor: !genero ? 'not-allowed' : 'pointer',
            }}
          >
            INICIAR ANÁLISE
          </button>
        </div>
      </div>
    );
  }


  // ─── QUIZ ─────────────────────────────────────────────────────
  return (
    <div style={wrapperStyle} translate="no">
      <div style={squareContainer}>
        <div style={progressContainer}>
          <div style={{ ...progressBar, width: `${((etapa + 1) / perguntas.length) * 100}%` }}></div>
        </div>
        <p style={{ ...stepStyle, color: '#000' }}>ANÁLISE PARA: {nomeUsuario.toUpperCase()}</p>
        <p style={{ ...stepStyle, color: '#000', fontWeight: 'bold' }}>ETAPA {etapa + 1} DE {perguntas.length}</p>
        <div style={lineStyle}></div>
        <h2 style={{ ...questionStyle, fontSize: '1.1rem', marginBottom: '28px' }}>{perguntas[etapa].q}</h2>
        <div style={optionsGrid}>
          {perguntas[etapa].opcoes.map((opt, i) => (
            <button
              key={i}
              onClick={() => responder(opt.tipo)}
              style={{ ...buttonStyle, color: '#000' }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#000'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = '#eee'; }}
            >
              {opt.t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const wrapperStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%', padding: '20px', backgroundColor: '#f9f9f9' };
const squareContainer = { width: '100%', maxWidth: '600px', padding: '60px 40px', backgroundColor: '#ffffff', border: '1px solid #eee', textAlign: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.05)' };
const lineStyle = { width: '40px', height: '1px', backgroundColor: '#000', margin: '20px auto' };
const inputNomeStyle = { width: '100%', border: 'none', borderBottom: '2px solid #000', padding: '12px 0', fontSize: '1.4rem', textAlign: 'center', marginBottom: '28px', outline: 'none', letterSpacing: '2px', textTransform: 'uppercase', background: 'transparent', color: '#000' };
const resultadoDestaque = { padding: '32px', border: '1px solid #000', fontSize: '2rem', letterSpacing: '6px', fontWeight: 'bold', margin: '16px 0 20px', textTransform: 'uppercase', color: '#000' };
const labelStyle = { fontSize: '0.6rem', letterSpacing: '2px', color: '#000', textTransform: 'uppercase', marginBottom: '16px', textAlign: 'left' };
const progressContainer = { width: '100%', height: '1px', background: '#eee', marginBottom: '28px' };
const progressBar = { height: '100%', background: '#000', transition: 'width 0.4s ease' };
const stepStyle = { fontSize: '0.6rem', letterSpacing: '3px', color: '#888', marginBottom: '10px', textTransform: 'uppercase' };
const questionStyle = { fontWeight: '300', textAlign: 'center', marginBottom: '32px', color: '#000', letterSpacing: '1px', textTransform: 'uppercase', lineHeight: '1.5' };
const optionsGrid = { display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' };
const buttonStyle = { padding: '16px 20px', background: '#fff', border: '1px solid #eee', fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer', transition: '0.2s', textTransform: 'uppercase', width: '100%', color: '#000' };
