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
  )
}

export default App