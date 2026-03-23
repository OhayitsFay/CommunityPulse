<<<<<<< HEAD
function App() {
  return (
    <div>
      <h1>CommunityPulse</h1>
      <p>Welcome to CommunityPulse Feedback System</p>
    </div>
=======
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SideNav from "./components/SideNav"
import "./styles.css"
import Feedback from "./pages/Feedback"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <BrowserRouter>

      <SideNav />

      <div className="main-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </div>

    </BrowserRouter>
>>>>>>> 1cd02310a2f48e10ffec43b8bc08bacd8a298dd9
  )
}

export default App