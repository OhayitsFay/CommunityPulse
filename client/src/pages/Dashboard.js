import { useEffect, useState } from "react"
import axios from "axios"
import Login from "../components/Login"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
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
  const sorted = res.data.sort((a,b) => {
    // Anonymous first
    if (a.isAnonymous && !b.isAnonymous) return -1
    if (!a.isAnonymous && b.isAnonymous) return 1
    // Newest first
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
      setData(sorted)
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
    <>
    <Hero />
    <div className="main-content">
      <h2>Admin Dashboard</h2>

      {data.length === 0 ? (
        <p>No feedback yet</p>
      ) : (
        data.map((item, index) => (
          <div key={index} className="feedback-card" >
            <p>{item.message}</p>
            <small>{item.category}</small>
            <medium>
              {item.isAnonymous ? " Anonymous" : ` From: ${item.userName}`}
            </medium>
          </div>
        ))
      )}

      {/* Analytics section */}
      {data.length > 0 && (
        <>
          <h3 className="analytics" style={{ marginTop: "40px" }}>Analytics</h3>
          <Analytics data={data} />
        </>
      )}
    </div>
    <Footer /></>
  )
}

export default Dashboard