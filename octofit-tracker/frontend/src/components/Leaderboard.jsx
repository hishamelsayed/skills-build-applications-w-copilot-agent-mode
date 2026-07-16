import { useEffect, useState } from 'react'
import { getApiBaseUrl, getCollection } from '../config/api.js'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(getApiBaseUrl('/leaderboard'))
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data')
        }

        const payload = await response.json()
        setLeaderboard(getCollection(payload, 'leaderboard'))
      } catch (fetchError) {
        setError(fetchError.message)
      }
    }

    loadData()
  }, [])

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-5">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <div className="list-group">
          {leaderboard.map((entry) => (
            <div key={entry._id || `${entry.rank}-${entry.userId}`} className="list-group-item">
              Rank {entry.rank} • Score {entry.score} • User {entry.userId}
            </div>
          ))}
        </div>
        {error ? <div className="alert alert-danger mt-3 mb-0">{error}</div> : null}
      </div>
    </div>
  )
}
