// components/SidebarRight.js
import { motion } from "framer-motion"

function SidebarRight() {
  return (
    <motion.div 
      className="sidebar"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
    <div className="sidebar">

      <h3>How It Works</h3>

      <p>Users submit feedback anonymously.</p>
      <p>System analyzes sentiment automatically.</p>
      <p>Admin views insights on dashboard.</p>

      <hr />

      <h3>Use Cases</h3>

      <ul>
        <li>Church groups</li>
        <li>Schools and campuses</li>
        <li>Corporate teams</li>
        <li>Event organizers</li>
      </ul>

      <hr />

      <h3>Quick Stats</h3>

      <p>Trusted by growing communities worldwide.</p>
      <p>Improves communication and transparency.</p>

    </div>
    </motion.div>
  )
}

export default SidebarRight