import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ background: "linear-gradient(135deg, #2D2D2D 0%, #1A1A1A 100%)", color: "white", padding: "64px 24px 24px" }} data-testid="footer">
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "48px", marginBottom: "48px" }}>
          {/* Brand Section */}
          <div>
            <img 
              src="https://customer-assets.emergentagent.com/job_sparkleshop/artifacts/m228ygdb_Rikis%20Fashion%20Bling.jpg" 
              alt="Riki's Fashion Bling" 
              style={{ maxWidth: "200px", width: "100%", height: "auto", marginBottom: "16px" }}
            />
            <p style={{ fontSize: "1rem", color: "#CCC", lineHeight: "1.8", marginBottom: "24px" }}>
              Where style, sparkle, and Seoul collide. Discover K-Pop inspired jewelry and cosmetics from Darjeeling.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "white", transition: "color 0.3s ease" }} data-testid="footer-instagram">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "white", transition: "color 0.3s ease" }} data-testid="footer-facebook">
                <Facebook size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: "white", transition: "color 0.3s ease" }} data-testid="footer-youtube">
                <Youtube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "16px" }}>Quick Links</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/" style={{ color: "#CCC", textDecoration: "none", transition: "color 0.3s ease" }}>Home</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/category/kpop" style={{ color: "#CCC", textDecoration: "none", transition: "color 0.3s ease" }}>K-Pop Collection</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/about" style={{ color: "#CCC", textDecoration: "none", transition: "color 0.3s ease" }}>About Us</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/blog" style={{ color: "#CCC", textDecoration: "none", transition: "color 0.3s ease" }}>Blog</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/contact" style={{ color: "#CCC", textDecoration: "none", transition: "color 0.3s ease" }}>Contact</Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "16px" }}>Policies</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/privacy-policy" style={{ color: "#CCC", textDecoration: "none", transition: "color 0.3s ease" }}>Privacy Policy</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/terms-conditions" style={{ color: "#CCC", textDecoration: "none", transition: "color 0.3s ease" }}>Terms & Conditions</Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/shipping-returns" style={{ color: "#CCC", textDecoration: "none", transition: "color 0.3s ease" }}>Shipping & Returns</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "16px" }}>Contact Us</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "12px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <MapPin size={20} color="#E6BBE2" style={{ marginTop: "2px" }} />
                <span style={{ color: "#CCC" }}>Darjeeling, West Bengal, India</span>
              </li>
              <li style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                <Phone size={20} color="#E6BBE2" />
                <span style={{ color: "#CCC" }}>+91 XXXXX XXXXX</span>
              </li>
              <li style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                <Mail size={20} color="#E6BBE2" />
                <span style={{ color: "#CCC" }}>hello@rikisfashionbling.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: "1px solid #444", paddingTop: "24px", textAlign: "center" }}>
          <p style={{ fontSize: "0.875rem", color: "#999" }}>
            © 2025 Riki's Fashion Bling. Made with <Heart size={14} style={{ display: "inline", color: "#E6BBE2", marginBottom: "-2px" }} /> in Darjeeling.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
