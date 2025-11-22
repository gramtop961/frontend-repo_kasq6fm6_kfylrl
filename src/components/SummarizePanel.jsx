import { useState } from 'react'

function SummarizePanel({ token, documentId, onSummary }) {
  const [style, setStyle] = useState('concise')
  const [custom, setCustom] = useState('')
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const run = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/summaries/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ document_id: documentId, style, custom_prompt: custom }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to summarize')
      onSummary(data)
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {['concise','detailed','bullets','legal','executive'].map((s) => (
          <button key={s} onClick={() => setStyle(s)} className={`px-3 py-1 rounded-full text-sm ${style===s ? 'bg-blue-600 text-white' : 'bg-slate-700 text-blue-100'}`}>{s}</button>
        ))}
      </div>
      <textarea placeholder="Optional: custom instructions" value={custom} onChange={(e)=>setCustom(e.target.value)} className="w-full h-24 bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-blue-100" />
      <button onClick={run} disabled={!documentId || loading} className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-600 text-white rounded-lg px-4 py-2">
        {loading ? 'Summarizing…' : 'Generate Summary'}
      </button>
    </div>
  )
}

export default SummarizePanel
