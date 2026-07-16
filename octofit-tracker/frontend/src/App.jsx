import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

const features = [
  'User authentication and profiles',
  'Activity logging and leaderboard tracking',
  'Team creation and workout suggestions',
]

function DashboardPage() {
  const [users, setUsers] = useState([])
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersResponse, activitiesResponse] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/activities'),
        ])

        if (!usersResponse.ok || !activitiesResponse.ok) {
          throw new Error('Failed to fetch OctoFit API data')
        }

        const usersData = await usersResponse.json()
        const activitiesData = await activitiesResponse.json()

        setUsers(usersData.users ?? [])
        setActivities(activitiesData.activities ?? [])
      } catch (fetchError) {
        setError(fetchError.message)
      }
    }

    loadData()
  }, [])

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-5">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: 56, height: 56, fontSize: 24 }}>
            ⚡
          </div>
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">OctoFit Tracker</p>
            <h1 className="h3 mb-0">Modern multi-tier fitness dashboard</h1>
          </div>
        </div>

        <p className="lead text-muted mb-4">
          A collaborative fitness and activity-tracking experience built with React, Express, TypeScript, and MongoDB.
        </p>

        <div className="row g-3 mb-4">
          {features.map((feature) => (
            <div className="col-md-4" key={feature}>
              <div className="border rounded p-3 h-100 bg-light">
                <span className="fw-semibold">{feature}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="border rounded p-3 bg-light h-100">
              <h2 className="h5">Users</h2>
              <p className="mb-0">{users.length} tracked users</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border rounded p-3 bg-light h-100">
              <h2 className="h5">Activities</h2>
              <p className="mb-0">{activities.length} logged activities</p>
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-12">
            <div className="border rounded p-3 bg-light h-100">
              <h2 className="h5">Recent users</h2>
              <ul className="mb-0 list-unstyled">
                {users.map((user) => (
                  <li key={user._id} className="border-bottom pb-2 mb-2">
                    <strong>{user.name}</strong> — {user.fitnessLevel} • {user.team || 'No team'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-12">
            <div className="border rounded p-3 bg-light h-100">
              <h2 className="h5">Recent activities</h2>
              <ul className="mb-0 list-unstyled">
                {activities.map((activity) => (
                  <li key={activity._id} className="border-bottom pb-2 mb-2">
                    <strong>{activity.type}</strong> — {activity.durationMinutes} minutes • {activity.caloriesBurned} calories
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {error ? <div className="alert alert-danger">{error}</div> : null}

        <div className="d-flex gap-2 flex-wrap">
          <a className="btn btn-primary" href="http://localhost:8000/api/users">Open API users</a>
          <a className="btn btn-outline-primary" href="http://localhost:8000/api/activities">Open API activities</a>
        </div>
      </div>
    </div>
  )
}

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/leaderboard')
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data')
        }

        const data = await response.json()
        setLeaderboard(data.leaderboard ?? [])
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
            <div key={entry._id} className="list-group-item">
              Rank {entry.rank} • Score {entry.score} • User {entry.userId}
            </div>
          ))}
        </div>
        {error ? <div className="alert alert-danger mt-3 mb-0">{error}</div> : null}
      </div>
    </div>
  )
}

function TeamsPage() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/teams')
        if (!response.ok) {
          throw new Error('Failed to fetch teams data')
        }

        const data = await response.json()
        setTeams(data.teams ?? [])
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
            <div key={team._id} className="list-group-item">
              <strong>{team.name}</strong> — {team.description || 'No description'} • Members: {team.members.length}
            </div>
          ))}
        </div>
        {error ? <div className="alert alert-danger mt-3 mb-0">{error}</div> : null}
      </div>
    </div>
  )
}

function App() {
  return (
    <main className="container py-4">
      <nav className="nav nav-pills gap-2 mb-4">
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
        <NavLink className="nav-link" to="/teams">Teams</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/teams" element={<TeamsPage />} />
      </Routes>
    </main>
  )
}

export default App
