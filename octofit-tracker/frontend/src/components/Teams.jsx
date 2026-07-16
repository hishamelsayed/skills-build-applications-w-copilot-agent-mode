import { useEffect, useState } from 'react'
import { getCollection } from '../config/api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : '/api/teams/'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(teamsEndpoint)
        if (!response.ok) {
          throw new Error('Failed to fetch teams data')
        }

        const payload = await response.json()
        setTeams(getCollection(payload, 'teams'))
      } catch (fetchError) {
        setError(fetchError.message)
      }
    }

    loadData()
  }, [])

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-5">
        <h2 className="h4 mb-3">Teams</h2>
        <div className="list-group">
          {teams.map((team) => (
            <div key={team._id || team.name} className="list-group-item">
              <strong>{team.name}</strong> — {team.description || 'No description'} • Members: {team.members?.length ?? 0}
            </div>
          ))}
        </div>
        {error ? <div className="alert alert-danger mt-3 mb-0">{error}</div> : null}
      </div>
    </div>
  )
}
