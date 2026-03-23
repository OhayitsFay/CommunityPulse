import { useEffect, useState } from "react"
import axios from "axios"
import Login from "../components/Login"

function Dashboard() {

  const [data, setData] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {

      const token = localStorage.getItem("token")

    if (token) {
      setLoggedIn(true)

      axios.get("http://localhost:5000/api/feedback", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => setData(res.data))
      .catch(() => {
        setLoggedIn(false)
      })
    }

  }, [])

  // 🔴 IF NOT LOGGED IN → SHOW LOGIN
  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />
  }

  // ✅ IF LOGGED IN → SHOW DASHBOARD
  return (
    <div className="main-content">

      <h2>Admin Dashboard</h2>

      {data.length === 0 ? (
        <p>No feedback yet</p>
      ) : (
        data.map((item, index) => (
          <div key={index} className="feedback-card">
            <p>{item.message}</p>
            <small>{item.category}</small>
          </div>
        ))
      )}

    </div>
  )
}

export default Dashboard