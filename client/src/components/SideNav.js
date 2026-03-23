import { useState } from "react"
import { Link } from "react-router-dom"

function SideNav() {

  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>

      <div className={`sidenav ${open ? "open" : ""}`}>

        <div className="sidenav-content"> {/* 🔥 wrapper */}

          <h2>CommunityPulse</h2>

          <Link to="/">Home</Link>
          <Link to="/feedback">Feedback</Link>
          <Link to="/dashboard">Dashboard</Link>

        </div>

      </div>

      {/* OVERLAY */}
      {open && (
        <div className="overlay" onClick={() => setOpen(false)}></div>
      )}
    </>
  )
}

export default SideNav