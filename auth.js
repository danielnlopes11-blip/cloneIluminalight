// ── INDICA.AI · auth.js ──────────────────────────────────────────
// Importe este arquivo em todos os painéis antes do </body>
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
// <script src="auth.js"></script>
// ─────────────────────────────────────────────────────────────────

const SUPABASE_URL = 'https://rxaxmurvqnccecxpjkhi.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4YXhtdXJ2cW5jY2VjeHBqa2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyODMyNjEsImV4cCI6MjA5ODg1OTI2MX0.y7ZDaQqb9P1fqNEZcMTn2YK363OS0T2bajXnJmXfoko'

const { createClient } = supabase
const db = createClient(SUPABASE_URL, SUPABASE_KEY)

// ── Nome do painel atual (detectado pela URL) ──
const PAINEL_ATUAL = (() => {
  const path = window.location.pathname.toLowerCase()
  if (path.includes('dashboard_sla'))         return 'sla'
  if (path.includes('dashboard_operacional')) return 'operacional'
  if (path.includes('publicar_dados'))        return 'menu'
  if (path.includes('gerar_apresentacao'))    return 'menu'
  if (path.includes('admin'))                 return 'admin'
  if (path.includes('index'))                 return 'menu'
  return 'menu'
})()

// ── Tela de login ──
function mostrarTelaLogin(msgErro = '') {
  document.body.setAttribute('style', 'margin:0;padding:0;min-height:100vh;width:100vw;display:block;background:#1a2535;overflow:hidden');
  document.body.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a2535,#2d4a7a);font-family:'Barlow',sans-serif">
      <div style="background:white;border-radius:16px;padding:40px;width:100%;max-width:400px;box-shadow:0 20px 60px rgba(0,0,0,.3)">
        <div style="font-family:'Barlow Condensed',sans-serif;font-size:1.5rem;font-weight:700;color:#1a2535;letter-spacing:.3px;margin-bottom:4px">
          INDICA<em style="font-style:normal;color:#008fa8">.AI</em>
        </div>
        <p style="font-size:.85rem;color:#5a6e82;margin-bottom:28px">Acesse com seu email e senha.</p>
        <input id="li-email" type="email" placeholder="email" autocomplete="email"
          style="width:100%;padding:10px 14px;border:1.5px solid #e5e7eb;border-radius:8px;font-size:14px;margin-bottom:12px;outline:none;box-sizing:border-box">
        <input id="li-senha" type="password" placeholder="senha" autocomplete="current-password"
          style="width:100%;padding:10px 14px;border:1.5px solid #e5e7eb;border-radius:8px;font-size:14px;margin-bottom:16px;outline:none;box-sizing:border-box">
        <button id="li-btn" onclick="window._authLogin()"
          style="width:100%;padding:12px;background:#1a2535;color:white;border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;box-sizing:border-box">
          Entrar
        </button>
        <div id="li-erro" style="color:#b91c1c;font-size:13px;margin-top:12px;min-height:18px">${msgErro}</div>
      </div>
    </div>`

  document.getElementById('li-senha').addEventListener('keydown', e => {
    if (e.key === 'Enter') window._authLogin()
  })
}

// ── Tela de acesso negado ──
function mostrarAcessoNegado() {
  document.body.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f4f6f9;font-family:'Barlow',sans-serif">
      <div style="background:white;border-radius:16px;padding:40px;max-width:400px;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,.08)">
        <div style="font-size:2.5rem;margin-bottom:16px">🔒</div>
        <h2 style="color:#1a2535;font-size:1.2rem;margin-bottom:8px">Acesso não autorizado</h2>
        <p style="color:#5a6e82;font-size:.9rem;margin-bottom:24px">Você não tem permissão para acessar este painel.</p>
        <button onclick="window._authLogout()"
          style="padding:10px 24px;background:#1a2535;color:white;border:none;border-radius:8px;font-size:14px;cursor:pointer">
          Voltar ao início
        </button>
      </div>
    </div>`
}

// ── Botão de logout fixo ──
function injetarBotaoLogout(nomeUsuario) {
  const btn = document.createElement('div')
  btn.id = 'auth-logout-btn'
  btn.innerHTML = `
    <div style="position:fixed;top:14px;right:16px;z-index:9999;display:flex;align-items:center;gap:10px;font-family:'Barlow',sans-serif">
      <span style="font-size:12px;color:rgba(255,255,255,.6);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${nomeUsuario}</span>
      <button onclick="window._authLogout()"
        style="background:rgba(255,255,255,.1);color:rgba(255,255,255,.8);border:1px solid rgba(255,255,255,.2);border-radius:7px;padding:5px 14px;font-size:13px;cursor:pointer;font-family:'Barlow',sans-serif;transition:background .2s"
        onmouseover="this.style.background='rgba(255,255,255,.2)'"
        onmouseout="this.style.background='rgba(255,255,255,.1)'">
        Sair
      </button>
    </div>`
  document.body.appendChild(btn)
}

// ── Login ──
window._authLogin = async function() {
  const email = document.getElementById('li-email')?.value?.trim()
  const senha = document.getElementById('li-senha')?.value
  const btn   = document.getElementById('li-btn')
  const erro  = document.getElementById('li-erro')

  if (!email || !senha) {
    if (erro) erro.textContent = 'Preencha email e senha.'
    return
  }

  if (btn) { btn.disabled = true; btn.textContent = 'Entrando...' }
  if (erro) erro.textContent = ''

  const { error } = await db.auth.signInWithPassword({ email, password: senha })

  if (error) {
    mostrarTelaLogin('Email ou senha incorretos.')
    return
  }

  location.reload()
}

// ── Logout ──
window._authLogout = async function() {
  await db.auth.signOut()
  location.reload()
}

// ── Verificação principal ──
async function verificarAcesso() {
  const { data: { session } } = await db.auth.getSession()

  if (!session) {
    mostrarTelaLogin()
    return
  }


  // Se é o menu principal, só precisa estar logado
  if (PAINEL_ATUAL === 'menu') {
    injetarBotaoLogout(session.user.email)
    window.dispatchEvent(new Event('authReady'))
    return
  }

  // Painel de administracao - checa admins_globais
  if (PAINEL_ATUAL === 'admin') {
    const { data: admin } = await db
      .from('admins_globais')
      .select('id')
      .eq('user_id', session.user.id)
      .maybeSingle()
    if (!admin) {
      mostrarAcessoNegado()
      return
    }
    injetarBotaoLogout(session.user.email)
    window.dispatchEvent(new Event('authReady'))
    return
  }

  // Verifica permissao especifica do painel
  const { data: permissao } = await db
    .from('painel_permissoes')
    .select('ativo')
    .eq('user_id', session.user.id)
    .eq('painel', PAINEL_ATUAL)
    .maybeSingle()

  if (!permissao?.ativo) {
    mostrarAcessoNegado()
    return
  }

  injetarBotaoLogout(session.user.email)
  window.dispatchEvent(new Event('authReady'))
}

// ── Inicia verificação ──

// ── Descobre o tenant_id do usuario logado (multi-tenant) ──
let _cachedTenantId = null;
window.getTenantId = async function() {
  if(_cachedTenantId) return _cachedTenantId;
  const { data: { session } } = await db.auth.getSession();
  if(!session) return null;
  const { data } = await db
    .from('painel_permissoes')
    .select('tenant_id')
    .eq('user_id', session.user.id)
    .eq('ativo', true)
    .limit(1)
    .maybeSingle();
  _cachedTenantId = data ? data.tenant_id : null;
  return _cachedTenantId;
}
verificarAcesso()
