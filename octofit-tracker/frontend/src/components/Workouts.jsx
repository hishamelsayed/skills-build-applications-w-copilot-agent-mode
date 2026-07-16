import { useEffect, useState } from 'react'
import { getApiBaseUrl, getCollection } from '../config/api.js'

const workoutsEndpoint = getApiBaseUrl('workouts')

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(workoutsEndpoint)
        if (!response.ok) {
          throw new Error('Failed to fetch workouts data')
        }

        const payload = await response.json()
        setWorkouts(getCollection(payload, 'workouts'))
      } catch (fetchError) {
        setError(fetchError.message)
      }
    }

    loadData()
  }, [])

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-5">
        <h2 className="h4 mb-3">Workouts</h2>
        <div className="list-group">
          {workouts.map((workout) => (
            <div key={workout._id || workout.name} className="list-group-item">
              <strong>{workout.name}</strong> — {workout.type} • {workout.durationMinutes} minutes
            </div>
          ))}
        </div>
        {error ? <div className="alert alert-danger mt-3 mb-0">{error}</div> : null}
      </div>
    </div>
  )
}
