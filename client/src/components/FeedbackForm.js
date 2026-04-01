import { useState } from "react"
import axios from "axios"

function FeedbackForm() {

  const [message, setMessage] = useState("")
  const [category, setCategory] = useState("General")
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [userName, setUserName] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!message) {
      setStatus("Please enter feedback")
      return
    }

    if (!isAnonymous && !userName) {
      setStatus("Please enter your name or email")
      return
    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/feedback",
        { message, category, isAnonymous, userName }
      )

      setStatus(res.data.message)
      setMessage("")
      setUserName("")
      setIsAnonymous(true)

    } catch (error) {
      setStatus("Error submitting feedback")
    }
  }

  return (
    <div className="feedback-form">

      <h3>Share Your Feedback</h3>

      <form onSubmit={handleSubmit}>

        <textarea
          placeholder="Write your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>General</option>
          <option>Leadership</option>
          <option>Events</option>
          <option>Communication</option>
        </select>

        {/* Anonymous toggle */}
        <div className="toggle-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
            />
            <span className="slider round"></span>
          </label>
          <span className="toggle-label">Submit Anonymously?</span>
        </div>

        {/* Show only when NOT anonymous */}
        {!isAnonymous && (
          <input
            type="text"
            placeholder="Enter your name or email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        )}


        <button type="submit">
          Submit Feedback
        </button>

      </form>

      {status && <p>{status}</p>}

    </div>
  )
}

export default FeedbackForm