import { useEffect, useState } from 'react'
import './App.css'
import { API_BASE, fetchCurrentUser, getAuthCredentials } from './api'

export default function App() {
  const [user, setUser] = useState<{ displayName: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const creds = getAuthCredentials()
      if (!creds) {
        setLoading(false)
        return
      }
      try {
        const me = await fetchCurrentUser()
        if (!cancelled) setUser(me)
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  if (loading) return <div className="app">Loading…</div>
  return (
    <div className="app">
      <h1>App</h1>
      <p>API: {API_BASE || '(same origin)'}</p>
      {user ? <p>Hello, {user.displayName}</p> : <p>Not signed in. Set Basic Auth to call /api/me.</p>}
    </div>
  )
}
