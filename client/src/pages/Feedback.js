import FeedbackForm from "../components/FeedbackForm"
import Hero from "../components/Hero"
import Footer from "../components/Footerr"
import { motion } from "framer-motion"

function Feedback() {
  return (
    <><Hero /><motion.div
      className="main-content"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2>Welcome to CommunityPulse</h2>
      <p>
        Share your thoughts and help improve your community. Your voice matters.
      </p>
      <FeedbackForm />
    </motion.div>
    
    <Footer /></>
  )
}

export default Feedback