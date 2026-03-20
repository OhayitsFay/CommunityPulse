// components/SidebarLeft.js
import { motion } from "framer-motion"

function SidebarLeft() {
  return (
    <motion.div
    className="sidebar"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }}
    >
    <div className="sidebar">
      <h3>Why CommunityPulse?</h3>
      <ul>
        <li>Collect anonymous feedback</li>
        <li>Understand community needs</li>
        <li>Make better decisions</li>
        <li>Track engagement</li>
      </ul>
      
      <hr />

      <h3>Features</h3>
      <ul>
        <li>Real time feedback system</li>
        <li>Secure admin dashboard</li>
        <li>Sentiment analysis</li>
        <li>Export reports</li>
      </ul>

      <hr />

      <h3>Community Impact</h3>
      <p>
        CommunityPulse helps organizations grow by listening to people and
        making data driven decisions that improve trust and communication.
      </p>

    </div>
    </motion.div>
  )
}

export default SidebarLeft