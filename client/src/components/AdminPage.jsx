import { useState, useEffect, useCallback } from 'react'

const API = 'http://localhost:8000/api'
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

// ── Palette & theme matching #0b0b0f + #fb4268 accent ──────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0b0b0f;
    --surface:   rgba(255,255,255,0.04);
    --surface-h: rgba(255,255,255,0.07);
    --border:    rgba(255,255,255,0.08);
    --accent:    #fb4268;
    --accent-d:  #c4304e;
    --accent-g:  linear-gradient(135deg, #fb4268, #ff7aa2);
    --text:      #e8e8f0;
    --muted:     rgba(232,232,240,0.45);
    --danger:    #ff5f5f;
    --success:   #4fffb0;
    --font-head: 'Epilogue', sans-serif;
    --font-body: 'Space Grotesk', sans-serif;
    --radius:    14px;
    --shadow:    0 8px 32px rgba(251,66,104,0.12);
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-body); }

  /* ── Login screen ── */
  .login-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    position: relative;
  }
  .login-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 40% at 80% 10%, rgba(251,66,104,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 40% 50% at 10% 80%, rgba(120,40,180,0.05) 0%, transparent 55%);
    pointer-events: none;
  }
  .login-card {
    position: relative;
    z-index: 1;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 48px 40px;
    width: 100%;
    max-width: 380px;
    backdrop-filter: blur(12px);
    box-shadow: 0 24px 80px rgba(0,0,0,0.5);
  }
  .login-logo {
    font-family: var(--font-head);
    font-size: 26px;
    font-weight: 900;
    letter-spacing: -0.5px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .login-logo .dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--accent-g);
    box-shadow: 0 0 8px var(--accent);
    animation: pulse 2s ease-in-out infinite;
  }
  .login-sub {
    color: var(--muted);
    font-size: 13px;
    margin-bottom: 32px;
  }
  .login-error {
    background: rgba(255,95,95,0.1);
    border: 1px solid rgba(255,95,95,0.25);
    color: var(--danger);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    margin-bottom: 16px;
  }

  .admin-root {
    min-height: 100vh;
    display: flex;
    background: var(--bg);
    font-family: var(--font-body);
    position: relative;
  }

  /* ── Animated background glow ── */
  .admin-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 40% at 80% 10%, rgba(251,66,104,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 40% 50% at 10% 80%, rgba(120,40,180,0.05) 0%, transparent 55%);
    pointer-events: none;
    z-index: 0;
  }

  /* ── Sidebar ── */
  .sidebar {
    width: 240px;
    min-height: 100vh;
    background: rgba(255,255,255,0.025);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 32px 0;
    position: sticky;
    top: 0;
    height: 100vh;
    z-index: 10;
    backdrop-filter: blur(12px);
  }

  .sidebar-logo {
    font-family: var(--font-head);
    font-weight: 900;
    font-size: 22px;
    letter-spacing: -0.5px;
    padding: 0 28px 32px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sidebar-logo .dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--accent-g);
    box-shadow: 0 0 8px var(--accent);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.85); }
  }

  .sidebar-nav {
    flex: 1;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
    transition: all 0.2s ease;
    border: 1px solid transparent;
    user-select: none;
  }
  .nav-item:hover { background: var(--surface-h); color: var(--text); }
  .nav-item.active {
    background: rgba(251,66,104,0.1);
    border-color: rgba(251,66,104,0.2);
    color: var(--accent);
  }
  .nav-item .icon { font-size: 16px; width: 20px; text-align: center; }

  .sidebar-footer {
    padding: 20px 28px;
    border-top: 1px solid var(--border);
    font-size: 12px;
    color: var(--muted);
  }

  /* ── Main content ── */
  .admin-main {
    flex: 1;
    padding: 40px 48px;
    position: relative;
    z-index: 1;
    overflow-y: auto;
  }

  .page-header {
    margin-bottom: 36px;
  }
  .page-header h1 {
    font-family: var(--font-head);
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, var(--text), var(--muted));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .page-header p { color: var(--muted); font-size: 14px; margin-top: 6px; }

  /* ── Glass card ── */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px;
    backdrop-filter: blur(8px);
    transition: border-color 0.2s;
  }
  .card:hover { border-color: rgba(255,255,255,0.14); }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .card-title {
    font-family: var(--font-head);
    font-size: 16px;
    font-weight: 700;
  }

  /* ── Buttons ── */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.18s ease;
    font-family: var(--font-body);
  }
  .btn-primary {
    background: var(--accent-g);
    color: #fff;
    box-shadow: 0 2px 12px rgba(251,66,104,0.3);
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(251,66,104,0.45); }
  .btn-ghost {
    background: var(--surface-h);
    color: var(--text);
    border: 1px solid var(--border);
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.2); }
  .btn-danger { background: rgba(255,95,95,0.15); color: var(--danger); border: 1px solid rgba(255,95,95,0.2); }
  .btn-danger:hover { background: rgba(255,95,95,0.25); }
  .btn-sm { padding: 5px 10px; font-size: 12px; border-radius: 6px; }
  .btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none !important; }

  /* ── Table ── */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  th {
    text-align: left;
    padding: 10px 14px;
    color: var(--muted);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    border-bottom: 1px solid var(--border);
  }
  td {
    padding: 14px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    vertical-align: middle;
  }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--surface-h); }

  /* ── Tags / pills ── */
  .tag {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
    background: rgba(255,255,255,0.07);
    border: 1px solid var(--border);
    margin: 2px 2px 2px 0;
    color: var(--muted);
  }

  .gradient-swatch {
    width: 36px; height: 20px;
    border-radius: 4px;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid var(--border);
  }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(4px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.15s ease;
  }
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

  .modal {
    background: #12121a;
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 36px;
    width: 100%;
    max-width: 520px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.6);
    animation: slideUp 0.2s ease;
    max-height: 90vh;
    overflow-y: auto;
  }
  @keyframes slideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }

  .modal-title {
    font-family: var(--font-head);
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 24px;
  }
  .modal-footer { display: flex; gap: 10px; justify-content: flex-end; margin-top: 28px; }

  /* ── Form inputs ── */
  .field { margin-bottom: 18px; }
  .field label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 7px;
  }
  .field input,
  .field textarea,
  .field select {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 13px;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .field input:focus,
  .field textarea:focus,
  .field select:focus {
    border-color: rgba(251,66,104,0.5);
    box-shadow: 0 0 0 3px rgba(251,66,104,0.1);
  }
  .field textarea { resize: vertical; min-height: 80px; }
  .field select option { background: #12121a; }

  /* ── Stats row ── */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }
  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 22px 24px;
    backdrop-filter: blur(8px);
  }
  .stat-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; font-weight: 600; }
  .stat-value {
    font-family: var(--font-head);
    font-size: 36px;
    font-weight: 900;
    margin-top: 4px;
    background: var(--accent-g);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Alert ── */
  .alert {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 13px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .alert-success { background: rgba(79,255,176,0.1); border: 1px solid rgba(79,255,176,0.25); color: var(--success); }
  .alert-error { background: rgba(255,95,95,0.1); border: 1px solid rgba(255,95,95,0.25); color: var(--danger); }

  /* ── Loader ── */
  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
    color: var(--muted);
    font-size: 14px;
    gap: 10px;
  }
  .spinner {
    width: 18px; height: 18px;
    border: 2px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg) } }

  .empty { text-align: center; padding: 48px; color: var(--muted); font-size: 14px; }

  .truncate { max-width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .link-icon { color: var(--muted); text-decoration: none; font-size: 14px; transition: color 0.15s; }
  .link-icon:hover { color: var(--accent); }

  .row-actions { display: flex; gap: 6px; align-items: center; }

  .category-badge {
    padding: 3px 9px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    background: rgba(251,66,104,0.1);
    border: 1px solid rgba(251,66,104,0.2);
    color: var(--accent);
  }

  .message-body {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
    max-width: 300px;
  }
`

// ── Utility ────────────────────────────────────────────────────────────────
const Alert = ({ type, msg, onClose }) => (
  <div className={`alert alert-${type}`}>
    <span>{type === 'success' ? '✓' : '✕'}</span>
    {msg}
    <button onClick={onClose} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 16 }}>×</button>
  </div>
)

const Loader = () => (
  <div className="loader"><div className="spinner" /> Loading…</div>
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
      if (!r.ok) { setError('Wrong password. Try again.'); setLoading(false); return }
      const { token } = await r.json()
      saveToken(token)
      onLogin()
    } catch {
      setError('Could not reach the API. Is the backend running?')
    }
    setLoading(false)
  }

  const onKey = (e) => { if (e.key === 'Enter') submit() }

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-logo"><span className="dot" /> AL · Admin</div>
        <div className="login-sub">Enter your password to continue.</div>
        {error && <div className="login-error">{error}</div>}
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={onKey}
            placeholder="••••••••"
            autoFocus
          />
        </div>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px' }} onClick={submit} disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in →'}
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
          <span className="card-title">All Projects</span>
          <button className="btn btn-primary" onClick={openAdd}>+ Add Project</button>
        </div>
        {loading ? <Loader /> : projects.length === 0 ? <div className="empty">No projects yet.</div> : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Title</th><th>Tags</th><th>Gradient</th><th>Links</th><th>Order</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id}>
                    <td style={{ color: 'var(--muted)', fontSize: 12 }}>{p.id}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{p.title}</div>
                      <div className="truncate" style={{ color: 'var(--muted)', fontSize: 12, marginTop: 2 }}>{p.description}</div>
                    </td>
                    <td>{p.tags?.map(t => <span className="tag" key={t}>{t}</span>)}</td>
                    <td><span className="gradient-swatch" style={{ background: p.gradient }} /></td>
                    <td>
                      {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" className="link-icon" title="Live">🌐 </a>}
                      {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" className="link-icon" title="GitHub">🐙</a>}
                    </td>
                    <td style={{ color: 'var(--muted)' }}>{p.display_order}</td>
                    <td>
                      <div className="row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => del(p.id)}>Delete</button>
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
            <div className="modal-title">{modal === 'edit' ? 'Edit Project' : 'New Project'}</div>
            <div className="field"><label>Title</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Project name" /></div>
            <div className="field">
              <label>Developer</label>
              <select value={form.developer} onChange={e => setForm(f => ({ ...f, developer: e.target.value }))}>
                <option value="">Select Developer</option>
                <option value="Anmol Chaudhary">Anmol Chaudhary</option>
                <option value="Loveneesh">Loveneesh</option>
                <option value="Collab">Collab</option>
              </select>
            </div>
            <div className="field"><label>Description</label><textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description…" /></div>
            <div className="field"><label>Tags (comma-separated)</label><input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="React, TypeScript, Tailwind" /></div>
            <div className="field">
              <label>Gradient</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                {GRADIENT_OPTIONS.map(g => (
                  <div key={g} onClick={() => setForm(f => ({ ...f, gradient: g }))}
                    style={{ width: 36, height: 36, borderRadius: 8, background: g, cursor: 'pointer', border: form.gradient === g ? '2px solid var(--accent)' : '2px solid transparent', transition: 'border 0.15s' }} />
                ))}
              </div>
              <input value={form.gradient} onChange={e => setForm(f => ({ ...f, gradient: e.target.value }))} placeholder="Or paste custom gradient CSS" />
            </div>
            <div className="field"><label>Live URL</label><input value={form.live_url} onChange={e => setForm(f => ({ ...f, live_url: e.target.value }))} placeholder="https://…" /></div>
            <div className="field"><label>GitHub URL</label><input value={form.github_url} onChange={e => setForm(f => ({ ...f, github_url: e.target.value }))} placeholder="https://github.com/…" /></div>
            <div className="field">
              <label>Project Image (File or URL)</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => {
                    const file = e.target.files[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = (rev) => setForm(f => ({ ...f, image_url: rev.target.result }))
                    reader.readAsDataURL(file)
                  }} 
                  style={{ fontSize: '12px' }}
                />
                {form.image_url && <img src={form.image_url} alt="Preview" style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover', border: '1px solid var(--border)' }} />}
              </div>
              <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="Or paste image URL" />
            </div>
            <div className="field"><label>Display Order</label><input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: e.target.value }))} /></div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Project'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Skills Tab ─────────────────────────────────────────────────────────────
const emptySkill = { name: '', category: '' }

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

  const categories = [...new Set(skills.map(s => s.category))].sort()

  const openAdd = () => { setForm(emptySkill); setEditId(null); setModal(true) }
  const openEdit = (s) => { setForm({ name: s.name, category: s.category }); setEditId(s.id); setModal(true) }

  const save = async () => {
    setSaving(true)
    try {
      const url = editId ? `/skills/${editId}` : '/skills'
      const method = editId ? 'PUT' : 'POST'
      const r = await apiFetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (r.status === 401) { onUnauth(); return }
      if (!r.ok) throw new Error()
      setAlert({ type: 'success', msg: `Skill ${editId ? 'updated' : 'created'}!` })
      setModal(false)
      load()
    } catch { setAlert({ type: 'error', msg: 'Save failed.' }) }
    setSaving(false)
  }

  const del = async (id) => {
    if (!confirm('Delete this skill?')) return
    try {
      const r = await apiFetch(`/skills/${id}`, { method: 'DELETE' })
      if (r.status === 401) { onUnauth(); return }
      setAlert({ type: 'success', msg: 'Skill deleted.' })
      load()
    } catch { setAlert({ type: 'error', msg: 'Delete failed.' }) }
  }

  return (
    <div>
      {alert && <Alert {...alert} onClose={() => setAlert(null)} />}
      <div className="card">
        <div className="card-header">
          <span className="card-title">All Skills</span>
          <button className="btn btn-primary" onClick={openAdd}>+ Add Skill</button>
        </div>
        {loading ? <Loader /> : skills.length === 0 ? <div className="empty">No skills yet.</div> : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>#</th><th>Skill Name</th><th>Category</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {skills.map(s => (
                  <tr key={s.id}>
                    <td style={{ color: 'var(--muted)', fontSize: 12 }}>{s.id}</td>
                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                    <td><span className="category-badge">{s.category}</span></td>
                    <td>
                      <div className="row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(s)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => del(s.id)}>Delete</button>
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
            <div className="modal-title">{editId ? 'Edit Skill' : 'New Skill'}</div>
            <div className="field"><label>Skill Name</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. TypeScript" /></div>
            <div className="field">
              <label>Category</label>
              <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Frontend, Backend, DevOps…" list="cat-suggestions" />
              <datalist id="cat-suggestions">
                {categories.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Skill'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Messages Tab ───────────────────────────────────────────────────────────
function MessagesTab({ onUnauth }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await apiFetch('/contact')
      if (r.status === 401) { onUnauth(); return }
      if (r.ok) setMessages(await r.json())
      else setMessages([])
    } catch { setMessages([]) }
    setLoading(false)
  }, [onUnauth])

  useEffect(() => { load() }, [load])

  const del = async (id) => {
    if (!confirm('Delete this message?')) return
    try {
      const r = await apiFetch(`/contact/${id}`, { method: 'DELETE' })
      if (r.status === 401) { onUnauth(); return }
      setAlert({ type: 'success', msg: 'Message deleted.' })
      load()
    } catch { setAlert({ type: 'error', msg: 'Delete failed.' }) }
  }

  return (
    <div>
      {alert && <Alert {...alert} onClose={() => setAlert(null)} />}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Contact Messages</span>
          <button className="btn btn-ghost" onClick={load}>↻ Refresh</button>
        </div>
        {loading ? <Loader /> : messages.length === 0 ? (
          <div className="empty">
            <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
            No messages yet.
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Name</th><th>Email</th><th>Message</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {messages.map(m => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{m.name}</td>
                    <td><a href={`mailto:${m.email}`} className="link-icon" style={{ textDecoration: 'underline', fontSize: 13 }}>{m.email}</a></td>
                    <td><div className="message-body">{m.message}</div></td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => del(m.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Overview Tab ───────────────────────────────────────────────────────────
function OverviewTab({ onNav }) {
  const [counts, setCounts] = useState({ projects: '—', skills: '—', messages: '—' })

  useEffect(() => {
    Promise.allSettled([
      apiFetch('/projects').then(r => r.json()),
      apiFetch('/skills').then(r => r.json()),
      apiFetch('/contact').then(r => r.ok ? r.json() : []),
    ]).then(([p, s, m]) => {
      setCounts({
        projects: p.status === 'fulfilled' ? p.value.length : '?',
        skills: s.status === 'fulfilled' ? s.value.length : '?',
        messages: m.status === 'fulfilled' ? m.value.length : '?',
      })
    })
  }, [])

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => onNav('projects')}>
          <div className="stat-label">Projects</div>
          <div className="stat-value">{counts.projects}</div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => onNav('skills')}>
          <div className="stat-label">Skills</div>
          <div className="stat-value">{counts.skills}</div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => onNav('messages')}>
          <div className="stat-label">Messages</div>
          <div className="stat-value">{counts.messages}</div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Quick Actions</span></div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => onNav('projects')}>📁 Manage Projects</button>
          <button className="btn btn-ghost" onClick={() => onNav('skills')}>⚡ Manage Skills</button>
          <button className="btn btn-ghost" onClick={() => onNav('messages')}>✉️ View Messages</button>
          <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer" className="btn btn-ghost">📄 API Docs ↗</a>
        </div>
      </div>
    </div>
  )
}

// ── Root Admin ─────────────────────────────────────────────────────────────
const TABS = [
  { id: 'overview',  label: 'Overview',  icon: '⬡' },
  { id: 'projects',  label: 'Projects',  icon: '📁' },
  { id: 'skills',    label: 'Skills',    icon: '⚡' },
  { id: 'messages',  label: 'Messages',  icon: '✉️' },
]

export default function AdminPage() {
  const [authed, setAuthed] = useState(!!getToken())
  const [tab, setTab] = useState('overview')

  const handleLogin = () => setAuthed(true)
  const handleLogout = () => { clearToken(); setAuthed(false) }
  // Called by any tab when the API returns 401 (token expired / invalid)
  const handleUnauth = () => { clearToken(); setAuthed(false) }

  const titles = {
    overview: { h: 'Dashboard', sub: 'Welcome back, AL. Your portfolio at a glance.' },
    projects: { h: 'Projects', sub: 'Add, edit, and reorder your portfolio projects.' },
    skills:   { h: 'Skills', sub: 'Manage the skills displayed on your About section.' },
    messages: { h: 'Messages', sub: 'Contact form submissions from your visitors.' },
  }

  if (!authed) {
    return (
      <>
        <style>{css}</style>
        <LoginScreen onLogin={handleLogin} />
      </>
    )
  }

  return (
    <>
      <style>{css}</style>
      <div className="admin-root">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <span className="dot" />
            AL · Admin
          </div>
          <nav className="sidebar-nav">
            {TABS.map(t => (
              <div key={t.id} className={`nav-item ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
                <span className="icon">{t.icon}</span>
                {t.label}
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div style={{ marginBottom: 8 }}>Portfolio API</div>
            <div style={{ fontSize: 11, marginBottom: 12 }}>localhost:8000</div>
            <button className="btn btn-danger btn-sm" onClick={handleLogout} style={{ width: '100%', justifyContent: 'center' }}>
              Sign out
            </button>
          </div>
        </aside>

        <main className="admin-main">
          <div className="page-header">
            <h1>{titles[tab].h}</h1>
            <p>{titles[tab].sub}</p>
          </div>
          {tab === 'overview'  && <OverviewTab onNav={setTab} />}
          {tab === 'projects'  && <ProjectsTab onUnauth={handleUnauth} />}
          {tab === 'skills'    && <SkillsTab   onUnauth={handleUnauth} />}
          {tab === 'messages'  && <MessagesTab onUnauth={handleUnauth} />}
        </main>
      </div>
    </>
  )
}