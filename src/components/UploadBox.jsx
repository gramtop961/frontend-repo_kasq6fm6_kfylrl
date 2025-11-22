import { useState } from 'react'

function UploadBox({ token, onUploaded }) {
  const [file, setFile] = useState(null)
  const [visibility, setVisibility] = useState('private')
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('visibility', visibility)
      const res = await fetch(`${baseUrl}/documents/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Upload failed')
      onUploaded(data.document_id)
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleUpload} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 flex flex-col gap-3">
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full text-sm text-blue-100" />
      </div>
      <div className="flex items-center gap-4 text-blue-100">
        <label className="flex items-center gap-2">
          <input type="radio" name="vis" value="private" checked={visibility==='private'} onChange={() => setVisibility('private')} />
          Private
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="vis" value="shared" checked={visibility==='shared'} onChange={() => setVisibility('shared')} />
          Shareable link
        </label>
      </div>
      <button disabled={loading || !file} className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white rounded-lg px-4 py-2">
        {loading ? 'Uploading…' : 'Upload'}
      </button>
    </form>
  )
}

export default UploadBox
