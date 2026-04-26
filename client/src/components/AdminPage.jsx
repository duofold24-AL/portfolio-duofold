import { useState, useEffect, useCallback } from 'react'

const API = '/api'
const TOKEN_KEY = 'admin_token'

// ── Auth helpers ────────────────────────────────────────────────────────────
const getToken = () => sessionStorage.getItem(TOKEN_KEY)
const saveToken = (t) => sessionStorage.setItem(TOKEN_KEY, t)
const clearToken = () => sessionStorage.removeItem(TOKEN_KEY)

// Wraps fetch — always adds Authorization header when a token exists
function apiFetch(path, opts = {}) {
  const token = getToken()
  const headers = { ...(opts.headers || {}) }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return fetch(`${API}${path}`, { ...opts, headers })
}

// ── Palette & theme matching #0b0b0f + Trifold-HALO aesthetic ────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #060608;
    --surface:   rgba(255, 255, 255, 0.03);
    --surface-h: rgba(255, 255, 255, 0.06);
    --border:    rgba(255, 255, 255, 0.08);
    --accent:    #fb4268;
    --accent-d:  #c4304e;
    --accent-g:  linear-gradient(135deg, #fb4268, #ff7aa2);
    --text:      #ffffff;
    --muted:     rgba(255, 255, 255, 0.5);
    --danger:    #ff4d4d;
    --success:   #00ff9d;
    --font-head: 'Epilogue', sans-serif;
    --font-body: 'Space Grotesk', sans-serif;
    --radius:    16px;
    --glass:     blur(20px) saturate(180%);
    --shadow:    0 20px 40px rgba(0, 0, 0, 0.4);
  }

  body { 
    background: var(--bg); 
    color: var(--text); 
    font-family: var(--font-body);
    overflow-x: hidden;
  }

  /* ── Animations ── */
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes logoPulse { 0%, 100% { filter: drop-shadow(0 0 5px var(--accent)); } 50% { filter: drop-shadow(0 0 15px var(--accent)); } }

  /* ── Login screen ── */
  .login-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at center, #0f0f1a 0%, var(--bg) 100%);
    padding: 20px;
  }
  .login-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 56px 48px;
    width: 100%;
    max-width: 420px;
    backdrop-filter: var(--glass);
    box-shadow: 0 40px 100px rgba(0,0,0,0.6);
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .login-logo {
    font-family: var(--font-head);
    font-size: 28px;
    font-weight: 900;
    letter-spacing: -1px;
    margin-bottom: 12px;
    text-align: center;
    background: linear-gradient(to right, #fff, var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .login-sub {
    color: var(--muted);
    font-size: 14px;
    margin-bottom: 40px;
    text-align: center;
  }
  .login-error {
    background: rgba(255,77,77,0.1);
    border: 1px solid rgba(255,77,77,0.2);
    color: var(--danger);
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 13px;
    margin-bottom: 24px;
    text-align: center;
  }

  /* ── Admin Layout ── */
  .admin-root {
    display: grid;
    grid-template-columns: 280px 1fr;
    min-height: 100vh;
  }

  .sidebar {
    background: rgba(255, 255, 255, 0.01);
    border-right: 1px solid var(--border);
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    backdrop-filter: var(--glass);
    position: sticky;
    top: 0;
    height: 100vh;
  }

  .sidebar-logo {
    font-family: var(--font-head);
    font-weight: 900;
    font-size: 20px;
    margin-bottom: 48px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: #fff;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .sidebar-logo .dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--accent);
    animation: logoPulse 2s infinite;
  }

  .nav-item {
    padding: 12px 16px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: var(--muted);
    transition: all 0.2s ease;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .nav-item:hover { background: var(--surface-h); color: #fff; }
  .nav-item.active {
    background: var(--surface-h);
    color: #fff;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
  }
  .nav-item.active::after {
    content: '';
    margin-left: auto;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
  }

  .admin-main {
    padding: 60px 80px;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    animation: fadeIn 0.8s ease;
  }

  .page-header { margin-bottom: 48px; }
  .page-header h1 {
    font-family: var(--font-head);
    font-size: 40px;
    font-weight: 900;
    letter-spacing: -1.5px;
    margin-bottom: 8px;
  }
  .page-header p { color: var(--muted); font-size: 16px; }

  /* ── UI Components ── */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 32px;
    backdrop-filter: var(--glass);
    box-shadow: var(--shadow);
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }
  .card-title { font-family: var(--font-head); font-size: 18px; font-weight: 800; }

  .btn {
    padding: 10px 20px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: none;
    font-family: var(--font-body);
  }
  .btn-primary {
    background: #fff;
    color: #000;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(255,255,255,0.1); }
  .btn-ghost {
    background: rgba(255,255,255,0.05);
    color: #fff;
    border: 1px solid var(--border);
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.1); }
  .btn-danger {
    background: rgba(255, 77, 77, 0.1);
    color: var(--danger);
    border: 1px solid rgba(255, 77, 77, 0.2);
  }
  .btn-danger:hover { background: rgba(255, 77, 77, 0.2); }

  /* ── Table ── */
  .table-wrap { overflow: hidden; border-radius: 12px; }
  table { width: 100%; border-collapse: collapse; }
  th {
    text-align: left;
    padding: 16px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
    font-weight: 700;
  }
  td {
    padding: 20px 16px;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
    vertical-align: middle;
  }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,255,255,0.02); }

  /* ── Stats ── */
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 40px; }
  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .stat-label { font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; }
  .stat-value { font-family: var(--font-head); font-size: 44px; font-weight: 900; color: #fff; }

  /* ── Forms ── */
  .field { margin-bottom: 24px; }
  .field label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-bottom: 8px; }
  .field input, .field textarea, .field select {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 16px;
    color: #fff;
    font-family: var(--font-body);
    font-size: 14px;
    transition: all 0.2s;
  }
  .field input:focus, .field textarea:focus {
    background: rgba(255,255,255,0.06);
    border-color: rgba(255,255,255,0.2);
    outline: none;
    box-shadow: 0 0 0 4px rgba(255,255,255,0.05);
  }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(10px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .modal {
    background: #0d0d12;
    border: 1px solid var(--border);
    border-radius: 28px;
    padding: 48px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 50px 100px rgba(0,0,0,0.8);
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    max-height: 90vh;
    overflow-y: auto;
  }
  .modal-title { font-family: var(--font-head); font-size: 24px; font-weight: 900; margin-bottom: 32px; letter-spacing: -0.5px; }
  .modal-footer { display: flex; gap: 12px; justify-content: flex-end; margin-top: 32px; }

  /* ── Misc ── */
  .tag { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.8); padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 600; }
  .loader { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 100px; color: var(--muted); }
  .spinner { width: 32px; height: 32px; border: 3px solid rgba(255,255,255,0.1); border-top-color: #fff; border-radius: 50%; animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }

  @media (max-width: 1024px) {
    .admin-root { grid-template-columns: 1fr; }
    .sidebar { display: none; }
    .admin-main { padding: 40px 24px; }
  }
`

// ── Utility ────────────────────────────────────────────────────────────────
const Alert = ({ type, msg, onClose }) => (
  <div className={`alert alert-${type}`} style={{
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '13px',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: type === 'success' ? 'rgba(0,255,157,0.1)' : 'rgba(255,77,77,0.1)',
    border: type === 'success' ? '1px solid rgba(0,255,157,0.2)' : '1px solid rgba(255,77,77,0.2)',
    color: type === 'success' ? 'var(--success)' : 'var(--danger)'
  }}>
    <span>{type === 'success' ? '✓' : '✕'}</span>
    <span style={{ flex: 1 }}>{msg}</span>
    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 18, opacity: 0.6 }}>×</button>
  </div>
)

const Loader = () => (
  <div className="loader"><div className="spinner" /> <span>Loading workspace…</span></div>
)

// ── Login Screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!password) return
    setLoading(true)
    setError('')
    try {
      const r = await fetch(`${API}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!r.ok) { setError('Access denied. Invalid credentials.'); setLoading(false); return }
      const { token } = await r.json()
      saveToken(token)
      onLogin()
    } catch {
      setError('Connection failed. Backend is offline.')
    }
    setLoading(false)
  }

  const onKey = (e) => { if (e.key === 'Enter') submit() }

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-logo">Trifold-HALO</div>
        <div className="login-sub">Secure Authentication Required</div>
        {error && <div className="login-error">{error}</div>}
        <div className="field">
          <label>Root Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={onKey}
            placeholder="••••••••"
            autoFocus
          />
        </div>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: '48px' }} onClick={submit} disabled={loading}>
          {loading ? 'Verifying…' : 'Enter Workspace →'}
        </button>
      </div>
    </div>
  )
}

// ── Projects Tab ───────────────────────────────────────────────────────────
const GRADIENT_OPTIONS = [
  'linear-gradient(135deg,#fb4268,#ff7aa2)',
  'linear-gradient(135deg,#6a11cb,#2575fc)',
  'linear-gradient(135deg,#f7971e,#ffd200)',
  'linear-gradient(135deg,#11998e,#38ef7d)',
  'linear-gradient(135deg,#fc4a1a,#f7b733)',
  'linear-gradient(135deg,#834d9b,#d04ed6)',
]

const emptyProject = {
  title: '', description: '', developer: '', tags: '', gradient: GRADIENT_OPTIONS[0],
  live_url: '', github_url: '', image_url: '', display_order: 0,
}

function ProjectsTab({ onUnauth }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyProject)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await apiFetch('/projects')
      setProjects(await r.json())
    } catch { setAlert({ type: 'error', msg: 'Failed to load projects' }) }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openAdd = () => { setForm(emptyProject); setEditId(null); setModal('add') }
  const openEdit = (p) => {
    setForm({ ...p, tags: p.tags.join(', ') })
    setEditId(p.id)
    setModal('edit')
  }

  const save = async () => {
    setSaving(true)
    try {
      const body = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), display_order: Number(form.display_order) }
      const url = modal === 'edit' ? `/projects/${editId}` : '/projects'
      const method = modal === 'edit' ? 'PUT' : 'POST'
      const r = await apiFetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (r.status === 401) { onUnauth(); return }
      if (!r.ok) throw new Error()
      setAlert({ type: 'success', msg: `Project ${modal === 'edit' ? 'updated' : 'created'} successfully!` })
      setModal(null)
      load()
    } catch { setAlert({ type: 'error', msg: 'Save failed. Check your API.' }) }
    setSaving(false)
  }

  const del = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      const r = await apiFetch(`/projects/${id}`, { method: 'DELETE' })
      if (r.status === 401) { onUnauth(); return }
      setAlert({ type: 'success', msg: 'Project deleted.' })
      load()
    } catch { setAlert({ type: 'error', msg: 'Delete failed.' }) }
  }

  return (
    <div>
      {alert && <Alert {...alert} onClose={() => setAlert(null)} />}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Production Projects</span>
          <button className="btn btn-primary" onClick={openAdd}>+ New Project</button>
        </div>
        {loading ? <Loader /> : projects.length === 0 ? <div className="empty" style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)' }}>No production assets found.</div> : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Ref</th><th>Title</th><th>Stack</th><th>Style</th><th>Live</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id}>
                    <td style={{ color: 'var(--muted)', fontSize: 11, fontVariantNumeric: 'tabular-nums' }}>#{p.id}</td>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{p.title}</div>
                      <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4, maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.description}</div>
                    </td>
                    <td><div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>{p.tags?.map(t => <span className="tag" key={t}>{t}</span>)}</div></td>
                    <td><div style={{ width: 40, height: 24, borderRadius: 6, background: p.gradient, border: '1px solid rgba(255,255,255,0.1)' }} /></td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', opacity: 0.6 }}>🌐</a>}
                        {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', opacity: 0.6 }}>🐙</a>}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 11 }} onClick={() => openEdit(p)}>Edit</button>
                        <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: 11 }} onClick={() => del(p.id)}>Del</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal">
            <div className="modal-title">{modal === 'edit' ? 'Update Project' : 'Register New Project'}</div>
            <div className="field"><label>Project Title</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Asset name" /></div>
            <div className="field">
              <label>Lead Developer</label>
              <select value={form.developer} onChange={e => setForm(f => ({ ...f, developer: e.target.value }))}>
                <option value="">Assign Lead</option>
                <option value="Anmol Chaudhary">Anmol Chaudhary</option>
                <option value="Loveneesh">Loveneesh</option>
                <option value="Harshit Khatana">Harshit Khatana</option>
                <option value="Collab">Trifold-HALO (Team)</option>
              </select>
            </div>
            <div className="field"><label>Core Description</label><textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief summary of the work…" /></div>
            <div className="field"><label>Technology Stack (Comma separated)</label><input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="React, Three.js, GSAP" /></div>
            <div className="field">
              <label>Brand Gradient</label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
                {GRADIENT_OPTIONS.map(g => (
                  <div key={g} onClick={() => setForm(f => ({ ...f, gradient: g }))}
                    style={{ width: 32, height: 32, borderRadius: 10, background: g, cursor: 'pointer', border: form.gradient === g ? '2px solid #fff' : '2px solid transparent', transform: form.gradient === g ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.2s' }} />
                ))}
              </div>
              <input value={form.gradient} onChange={e => setForm(f => ({ ...f, gradient: e.target.value }))} placeholder="Custom CSS Gradient" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="field"><label>Live Preview</label><input value={form.live_url} onChange={e => setForm(f => ({ ...f, live_url: e.target.value }))} placeholder="https://…" /></div>
              <div className="field"><label>Source Code</label><input value={form.github_url} onChange={e => setForm(f => ({ ...f, github_url: e.target.value }))} placeholder="https://github.com/…" /></div>
            </div>
            <div className="field">
              <label>Hero Image</label>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                <input type="file" accept="image/*" onChange={e => {
                    const file = e.target.files[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = (rev) => setForm(f => ({ ...f, image_url: rev.target.result }))
                    reader.readAsDataURL(file)
                  }} 
                  style={{ fontSize: 11, background: 'none', border: 'none', padding: 0 }}
                />
                {form.image_url && <img src={form.image_url} alt="Preview" style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', border: '1px solid var(--border)' }} />}
              </div>
              <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="External Image URL" />
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Discard</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Processing…' : 'Finalize Project'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Skills Tab ─────────────────────────────────────────────────────────────
const emptySkill = { name: '', category: '', icon: '' }

function SkillsTab({ onUnauth }) {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(emptySkill)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await apiFetch('/skills')
      setSkills(await r.json())
    } catch { setAlert({ type: 'error', msg: 'Failed to load skills' }) }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openAdd = () => { setForm(emptySkill); setEditId(null); setModal(true) }
  const openEdit = (s) => { setForm({ name: s.name, category: s.category, icon: s.icon || '' }); setEditId(s.id); setModal(true) }

  const save = async () => {
    setSaving(true)
    try {
      const url = editId ? `/skills/${editId}` : '/skills'
      const method = editId ? 'PUT' : 'POST'
      const r = await apiFetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (r.status === 401) { onUnauth(); return }
      if (!r.ok) throw new Error()
      setAlert({ type: 'success', msg: `Capability ${editId ? 'updated' : 'added'} successfully.` })
      setModal(false)
      load()
    } catch { setAlert({ type: 'error', msg: 'Action failed.' }) }
    setSaving(false)
  }

  const del = async (id) => {
    if (!confirm('Permanently remove this capability?')) return
    try {
      const r = await apiFetch(`/skills/${id}`, { method: 'DELETE' })
      if (r.status === 401) { onUnauth(); return }
      setAlert({ type: 'success', msg: 'Skill removed.' })
      load()
    } catch { setAlert({ type: 'error', msg: 'Removal failed.' }) }
  }

  return (
    <div>
      {alert && <Alert {...alert} onClose={() => setAlert(null)} />}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Technical Capabilities</span>
          <button className="btn btn-primary" onClick={openAdd}>+ Add Skill</button>
        </div>
        {loading ? <Loader /> : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Icon</th><th>Capability</th><th>Category</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {skills.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontSize: 20 }}>{s.icon || '⚡'}</td>
                    <td style={{ fontWeight: 700 }}>{s.name}</td>
                    <td><span style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>{s.category}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 11 }} onClick={() => openEdit(s)}>Edit</button>
                        <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: 11 }} onClick={() => del(s.id)}>Remove</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal">
            <div className="modal-title">Configure Capability</div>
            <div className="field"><label>Skill Name</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. React" /></div>
            <div className="field"><label>Classification</label><input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Frontend" /></div>
            <div className="field"><label>Visual Icon (Emoji or SVG Path)</label><input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="⚡" /></div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>Save Config</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Contact Tab ────────────────────────────────────────────────────────────
function ContactTab({ onUnauth }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null)
  const [selectedMessage, setSelectedMessage] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await apiFetch('/contact')
      setMessages(await r.json())
    } catch { setAlert({ type: 'error', msg: 'Failed to load messages' }) }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const del = async (id) => {
    if (!confirm('Archive this communication?')) return
    try {
      const r = await apiFetch(`/contact/${id}`, { method: 'DELETE' })
      if (r.status === 401) { onUnauth(); return }
      if (selectedMessage && selectedMessage.id === id) setSelectedMessage(null)
      load()
    } catch { setAlert({ type: 'error', msg: 'Archive failed.' }) }
  }

  return (
    <div>
      {alert && <Alert {...alert} onClose={() => setAlert(null)} />}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Inbound Communications</span>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{messages.length} Active Leads</div>
        </div>
        {loading ? <Loader /> : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Timestamp</th><th>Sender</th><th>Inquiry</th><th>Action</th></tr>
              </thead>
              <tbody>
                {messages.map(m => (
                  <tr key={m.id}>
                    <td style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{new Date(m.created_at).toLocaleString()}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{m.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--accent)' }}>{m.email}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{m.subject}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.message}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 11 }} onClick={() => setSelectedMessage(m)}>View</button>
                        <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: 11 }} onClick={() => del(m.id)}>Archive</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedMessage && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setSelectedMessage(null)}>
          <div className="modal">
            <div className="modal-title">Lead Details</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div className="field" style={{ marginBottom: 0 }}><label>Sender Name</label><div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--border)' }}>{selectedMessage.name}</div></div>
              <div className="field" style={{ marginBottom: 0 }}><label>Sender Email</label><div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--border)', color: 'var(--accent)' }}>{selectedMessage.email}</div></div>
            </div>

            <div className="field">
              <label>Subject / Inquiry Type</label>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--border)', fontWeight: 600 }}>{selectedMessage.subject}</div>
            </div>

            <div className="field">
              <label>Full Message</label>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: 12, border: '1px solid var(--border)', whiteSpace: 'pre-wrap', lineHeight: 1.6, minHeight: '120px' }}>
                {selectedMessage.message}
              </div>
            </div>

            <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'right', marginTop: -12 }}>
              Received: {new Date(selectedMessage.created_at).toLocaleString()}
            </div>

            <div className="modal-footer">
              <button className="btn btn-danger" onClick={() => { del(selectedMessage.id); }}>Archive Lead</button>
              <button className="btn btn-primary" onClick={() => setSelectedMessage(null)}>Close Window</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Admin Page ─────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(!!getToken())
  const [tab, setTab] = useState('projects')
  const [projectsCount, setProjectsCount] = useState(0)
  const [skillsCount, setSkillsCount] = useState(0)
  const [leadsCount, setLeadsCount] = useState(0)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pr, sk, co] = await Promise.all([
          apiFetch('/projects'),
          apiFetch('/skills'),
          apiFetch('/contact')
        ])
        if (pr.ok) setProjectsCount((await pr.json()).length)
        if (sk.ok) setSkillsCount((await sk.json()).length)
        if (co.ok) setLeadsCount((await co.json()).length)
      } catch (err) {
        console.error("Dashboard stats sync error:", err)
      }
    }
    if (authed) fetchStats()
  }, [authed, tab])

  const onUnauth = () => { clearToken(); setAuthed(false) }

  if (!authed) return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <LoginScreen onLogin={() => setAuthed(true)} />
    </>
  )

  return (
    <div className="admin-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="dot" />
          <span>HALO Console</span>
        </div>
        
        <nav style={{ flex: 1 }}>
          <div className={`nav-item ${tab === 'projects' ? 'active' : ''}`} onClick={() => setTab('projects')}>
            Production
          </div>
          <div className={`nav-item ${tab === 'skills' ? 'active' : ''}`} onClick={() => setTab('skills')}>
            Capabilities
          </div>
          <div className={`nav-item ${tab === 'contact' ? 'active' : ''}`} onClick={() => setTab('contact')}>
            Leads
          </div>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <div className="nav-item" onClick={onUnauth} style={{ color: 'var(--danger)' }}>
            Terminate Session
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="page-header">
          <h1>Workspace Control</h1>
          <p>Managing Trifold-HALO Digital Assets & Communications</p>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Production Assets</span>
            <span className="stat-value">{projectsCount}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Active Leads</span>
            <span className="stat-value">{leadsCount}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Core Capabilities</span>
            <span className="stat-value">{skillsCount}</span>
          </div>
        </section>

        {tab === 'projects' && <ProjectsTab onUnauth={onUnauth} />}
        {tab === 'skills' && <SkillsTab onUnauth={onUnauth} />}
        {tab === 'contact' && <ContactTab onUnauth={onUnauth} />}
      </main>
    </div>
  )
}