import { useState } from 'react'

function AuthPanel({ onAuthed }) {
  const [mode, setMode] = useState('signup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    try {
      if (mode === 'signup') {
        const res = await fetch(`${baseUrl}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.detail || 'Signup failed')
        onAuthed(data.access_token)
      } else {
        const form = new URLSearchParams()
        form.append('username', email)
        form.append('password', password)
        const res = await fetch(`${baseUrl}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: form.toString(),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.detail || 'Login failed')
        onAuthed(data.access_token)
      }
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
      <div className="flex gap-2 mb-3">
        <button onClick={()=>setMode('signup')} className={`px-3 py-1 rounded ${mode==='signup'?'bg-blue-600 text-white':'bg-slate-700 text-blue-100'}`}>Sign up</button>
        <button onClick={()=>setMode('login')} className={`px-3 py-1 rounded ${mode==='login'?'bg-blue-600 text-white':'bg-slate-700 text-blue-100'}`}>Log in</button>
      </div>
      <form onSubmit={submit} className="flex flex-col gap-3">
        {mode==='signup' && (
          <input placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} className="bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-blue-100" />
        )}
        <input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-blue-100" />
        <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-blue-100" />
        <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2">{mode==='signup'?'Create account':'Log in'}</button>
      </form>
    </div>
  )
}

export default AuthPanel
