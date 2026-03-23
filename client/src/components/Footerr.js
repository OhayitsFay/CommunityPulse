// components/Footer.js
function Footer() {
  return (
    <footer className="footer">

      <div className="footer-grid">
        <div>
          <h3>CommunityPulse</h3>
          <p>Helping communities grow through feedback and insight.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <p><a href="/">Home</a></p>
          <p><a href="/feedback">Feedback</a></p>
          <p><a href="/dashboard">Dashboard</a></p>
        </div>

        <div>
          <h4>Resources</h4>
          <p>Documentation</p>
          <p>API</p>
          <p>Support</p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>Email: support@communitypulse.com</p>
          <p>Phone: +234 000 000 0000</p>
        </div>

      </div>

      <hr />

      <p className="footer-bottom">
        © 2026 CommunityPulse. All rights reserved.
      </p>

    </footer>
  )
}

export default Footer