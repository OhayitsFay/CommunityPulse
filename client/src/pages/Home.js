// pages/Home.js
import Hero from "../components/Hero"
import SidebarLeft from "../components/SidebarLeft"
import SidebarRight from "../components/SidebarRight"
import Footer from "../components/Footerr"
import { motion } from "framer-motion"

function Home() {
  return (
    <>
      <Hero />

      <motion.div
        className="layout"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <SidebarLeft />

        <motion.div 
          className="main-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Welcome to CommunityPulse</h2>
          <p>
            This platform helps organizations collect feedback and understand
            the emotional state of their community using smart analysis tools.
          </p>

          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="community"
          />
        </motion.div>

        <SidebarRight />
      </motion.div>

      <Footer />
    </>
  )
}

export default Home