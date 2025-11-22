import { useState } from 'react'
import Hero from './components/Hero'
import AuthPanel from './components/AuthPanel'
import UploadBox from './components/UploadBox'
import SummarizePanel from './components/SummarizePanel'

function App() {
  const [token, setToken] = useState(localStorage.getItem('gamma_token') || '')
  const [docId, setDocId] = useState('')
  const [summary, setSummary] = useState(null)

  const onAuthed = (t) => {
    localStorage.setItem('gamma_token', t)
    setToken(t)
  }

  const onUploaded = (id) => {
    setDocId(id)
    setSummary(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      <Hero />

      <div className="mx-auto max-w-5xl px-6 -mt-10 relative z-10 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          {!token ? (
            <AuthPanel onAuthed={onAuthed} />
          ) : (
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 flex flex-col gap-3">
              <div className="text-sm text-blue-100/80">Signed in</div>
              <button onClick={()=>{localStorage.removeItem('gamma_token');setToken('')}} className="bg-slate-700 hover:bg-slate-600 text-white rounded px-3 py-1 w-max">Sign out</button>
            </div>
          )}
        </div>
        <div className="md:col-span-2 flex flex-col gap-6">
          {token && (
            <>
              <UploadBox token={token} onUploaded={onUploaded} />
              <SummarizePanel token={token} documentId={docId} onSummary={(d)=>setSummary(d)} />
              {summary && (
                <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
                  <h3 className="text-xl font-semibold mb-2">Summary</h3>
                  <pre className="whitespace-pre-wrap text-blue-100 text-sm">{summary.content}</pre>
                </div>
              )}
            </>
          )}
          {!token && (
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 text-blue-100">
              Create an account or log in to upload documents, generate summaries, and export results.
            </div>
          )}
        </div>
      </div>

      <footer className="mt-20 py-10 text-center text-blue-200/60 text-sm">
        Privacy-first • Documents never used to train models • Export to PDF/DOCX/TXT
      </footer>
    </div>
  )
}

export default App
