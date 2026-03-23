import { useState } from "react"
import axios from "axios"

function FeedbackForm() {

  const [message, setMessage] = useState("")
  const [category, setCategory] = useState("General")
  const [status, setStatus] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!message) {
      setStatus("Please enter feedback")
      return
    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/feedback",
        { message, category }
      )

      setStatus(res.data.message)
      setMessage("")

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

        <button type="submit">
          Submit Feedback
        </button>

      </form>

      {status && <p>{status}</p>}

    </div>
  )
}

export default FeedbackForm