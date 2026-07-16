import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const features = [
  'User authentication and profiles',
  'Activity logging and leaderboard tracking',
  'Team creation and workout suggestions',
]

function DashboardPage() {
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
          <div className="col-md-12">
            <div className="border rounded p-3 bg-light h-100">
              <h2 className="h5">Presentation tier configuration</h2>
              <p className="mb-0">
                Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> to enable the public Codespaces API URL pattern.
                If it is not set, the app safely falls back to the local Vite proxy endpoint.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <Users />
          </div>
          <div className="col-md-6">
            <Activities />
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <Leaderboard />
          </div>
          <div className="col-md-6">
            <Teams />
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-12">
            <Workouts />
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <main className="container py-4">
      <nav className="nav nav-pills gap-2 mb-4">
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/users">Users</NavLink>
        <NavLink className="nav-link" to="/activities">Activities</NavLink>
        <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
        <NavLink className="nav-link" to="/teams">Teams</NavLink>
        <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  )
}

export default App
