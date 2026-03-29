import { useEffect, useState } from "react"
import axios from "axios"
import Login from "../components/Login"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"

function Dashboard() {
  const [data, setData] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      setLoggedIn(true)

      axios
        .get(`${API_BASE_URL}/api/feedback`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => setData(response.data))
        .catch(() => {
          setLoggedIn(false)
        })
    }
  }, [])

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />
  }

  return (
    <div className="main-content dashboard-page">
      <h2>Admin Dashboard</h2>

      {data.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        data.map((item) => (
          <div key={item._id} className="feedback-card">
            <div className="feedback-card-header">
              <div>
                <strong>{item.isAnonymous ? "Anonymous" : item.submitterName || "Named submission"}</strong>
                <small>{new Date(item.createdAt).toLocaleString()}</small>
              </div>
              <span className="rating-badge">{item.rating}/5</span>
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
    </div>
  )
}

export default Dashboard
