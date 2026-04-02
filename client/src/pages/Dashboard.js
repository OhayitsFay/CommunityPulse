import { useEffect, useState } from "react"
import axios from "axios"
import Login from "../components/Login"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import Analytics from "../components/Analytics"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"

function Dashboard() {

  const [data, setData] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  const loadFeedback = () => {
    const token = localStorage.getItem("token")
    if (!token) return setLoggedIn(false)
      

    axios.get(`${API_BASE_URL}/api/feedback`, {
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
            <div className="feedback-card-header">
              <div>
                <strong>{item.isAnonymous ? "Anonymous" : item.userName || "Named submission"}</strong>
                <small>{new Date(item.createdAt).toLocaleString()}</small>
              <small>{item.rating}/5</small>
              </div>
            </div>

            <p>{item.message}</p>

            <div className="feedback-meta-row">
              <small>Category: {item.category}</small>
              <small>Sentiment: {item.sentiment}</small>
            </div>

            {Array.isArray(item.attachments) && item.attachments.length > 0 && (
              <div className="dashboard-media-grid">
                {item.attachments.map((file, index) => (
                  <a key={`${item._id}-attachment-${index}`} href={file.dataUrl} target="_blank" rel="noreferrer">
                    <img src={file.dataUrl} alt={file.name || `Attachment ${index + 1}`} />
                  </a>
                ))}
              </div>
            )}

            {item.voiceNote?.dataUrl && (
              <div className="dashboard-audio-block">
                <audio controls src={item.voiceNote.dataUrl} />
                <small>Voice note: {item.voiceNote.durationSeconds || 0}s</small>
              </div>
            )}
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