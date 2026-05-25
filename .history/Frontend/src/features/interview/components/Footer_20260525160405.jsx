import React from 'react'
import '../style/footer.scss'

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Footer Content */}
        <div className="footer-content">
          <div className="footer-column">
            <h3>About</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Product</h3>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#roadmap">Roadmap</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#guides">Guides</a></li>
              <li><a href="#api">API</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Legal</h3>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#conduct">Code of Conduct</a></li>
              <li><a href="#cookies">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2024 Interview Boost. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <a href="#privacy">Privacy & Terms</a>
            <a href="#conduct">Code of Conduct</a>
            <a href="#sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
