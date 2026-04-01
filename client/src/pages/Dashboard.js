import { useEffect, useState } from "react"
import axios from "axios"
import Login from "../components/Login"
import Analytics from "../components/Analytics"

function Dashboard() {

  const [data, setData] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  const loadFeedback = () => {
    const token = localStorage.getItem("token")
    if (!token) return setLoggedIn(false)

    axios.get("http://localhost:5000/api/feedback", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setData(res.data)
      setLoggedIn(true)
    })
    .catch(() => setLoggedIn(false))
  }

  useEffect(() => {
    loadFeedback()
  }, [])

  if (!loggedIn) {
    return <Login onLogin={loadFeedback} />
  }

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



      {/* Analytics section */}
      {data.length > 0 && (
        <>
          <h3 style={{ marginTop: "40px" }}>Analytics</h3>
          <Analytics data={data} />
        </>
      )}
    </div>
  )
}

export default Dashboard