import { useEffect, useState } from 'react'
import { getApiBaseUrl, getCollection } from '../config/api.js'

const activitiesEndpoint = getApiBaseUrl('activities')

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(activitiesEndpoint)
        if (!response.ok) {
          throw new Error('Failed to fetch activities data')
        }

        const payload = await response.json()
        setActivities(getCollection(payload, 'activities'))
      } catch (fetchError) {
        setError(fetchError.message)
      }
    }

    loadData()
  }, [])

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-5">
        <h2 className="h4 mb-3">Activities</h2>
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity._id || `${activity.type}-${activity.userId}`} className="list-group-item">
              <strong>{activity.type}</strong> — {activity.durationMinutes} minutes • {activity.caloriesBurned} calories
            </div>
          ))}
        </div>
        {error ? <div className="alert alert-danger mt-3 mb-0">{error}</div> : null}
      </div>
    </div>
  )
}
