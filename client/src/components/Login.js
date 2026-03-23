import { useState } from "react"
import axios from "axios"

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { username, password }
      )

      localStorage.setItem("token", res.data.token)

      setMessage("Login successful")

    } catch {
      setMessage("Invalid login")
    }

  }

  return (
    <div className="main-content">

      <h2>Admin Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>{message}</p>

    </div>
  )
}

export default Login