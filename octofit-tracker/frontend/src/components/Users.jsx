import { useEffect, useState } from 'react'
import { getCollection } from '../config/api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : '/api/users/'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(usersEndpoint)
        if (!response.ok) {
          throw new Error('Failed to fetch users data')
        }

        const payload = await response.json()
        setUsers(getCollection(payload, 'users'))
      } catch (fetchError) {
        setError(fetchError.message)
      }
    }

    loadData()
  }, [])

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-5">
        <h2 className="h4 mb-3">Users</h2>
        <div className="list-group">
          {users.map((user) => (
            <div key={user._id || user.email} className="list-group-item">
              <strong>{user.name}</strong> — {user.email} • {user.fitnessLevel} • {user.team || 'No team'}
            </div>
          ))}
        </div>
        {error ? <div className="alert alert-danger mt-3 mb-0">{error}</div> : null}
      </div>
    </div>
  )
}
