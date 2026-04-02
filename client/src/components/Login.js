import { useState } from "react"
import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"

function Login({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        username,
        password
      })

      localStorage.setItem("token", response.data.token)
      setMessage("Login successful")
      if (typeof onLogin === "function") {
        onLogin()
      }
    } catch {
      setMessage("Invalid login")
    }
  }

  return (
    <div className="main-content dashboard-page">
      <h2>Admin Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>{message}</p>
    </div>
  )
}

export default Login
