import { useEffect, useState } from 'react'
import http from './api/http'

function StatusBadge({ text }) {
  return (
    <span className="text-sm text-slate-300">
      {text}
    </span>
  )
}

export default function App() {
  const [status, setStatus] = useState('Checking backend...')

  useEffect(() => {
    const check = async () => {
      try {
        const res = await http.get('/up')
        setStatus(`Backend reachable (${res.status})`)
      } catch {
        setStatus('Backend not reachable')
      }
    }

    check()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-semibold">
          Todo Task App
        </h1>

        <StatusBadge text={status} />
      </div>
    </div>
  )
}