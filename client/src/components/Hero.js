// components/Hero.js
import { motion } from "framer-motion"

function Hero() {
  return (
    <motion.div 
      className="hero"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>CommunityPulse</h1>
      <p>Understand your community through real feedback and insights</p>
      <button><a href="/feedback">Get Started</a></button>
    </motion.div>
  )
}

export default Hero