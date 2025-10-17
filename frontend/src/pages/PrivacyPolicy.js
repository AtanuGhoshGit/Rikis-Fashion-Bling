import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, UserCheck } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div>
      <Navigation />
      
      <div style={{ padding: "120px 24px 80px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "700", marginBottom: "16px", textAlign: "center", fontFamily: "Playfair Display, serif" }} data-testid="privacy-title">
          Privacy Policy
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#666", textAlign: "center", marginBottom: "48px" }}>
          Last updated: January 2025
        </p>

        <div style={{ fontSize: "1.125rem", color: "#555", lineHeight: "1.8" }}>
          <p style={{ marginBottom: "32px" }}>
            At Riki's Fashion Bling, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
          </p>

          {/* Information We Collect */}
          <section style={{ marginBottom: "48px", padding: "32px", background: "#FFF5F8", borderRadius: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <Eye size={32} color="#C89EC7" />
              <h2 style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "Playfair Display, serif" }}>Information We Collect</h2>
            </div>
            
            <p style={{ marginBottom: "16px" }}>We collect the following types of information:</p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "12px" }}><strong>Personal Information:</strong> Name, email address, phone number, and shipping address</li>
              <li style={{ marginBottom: "12px" }}><strong>Payment Information:</strong> Processed securely through our payment gateway (we do not store credit card details)</li>
              <li style={{ marginBottom: "12px" }}><strong>Order History:</strong> Details of purchases and preferences</li>
              <li><strong>Usage Data:</strong> Browsing behavior, IP address, and device information for improving user experience</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section style={{ marginBottom: "48px", padding: "32px", background: "#F5F0FF", borderRadius: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <UserCheck size={32} color="#C89EC7" />
              <h2 style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "Playfair Display, serif" }}>How We Use Your Information</h2>
            </div>
            
            <p style={{ marginBottom: "16px" }}>We use your information for the following purposes:</p>
            <ul style={{ paddingLeft: "24px" }}>
              <li style={{ marginBottom: "12px" }}>Process and fulfill your orders</li>
              <li style={{ marginBottom: "12px" }}>Provide customer support and respond to inquiries</li>
              <li style={{ marginBottom: "12px" }}>Send order confirmations and shipping updates</li>
              <li style={{ marginBottom: "12px" }}>Personalize your shopping experience</li>
              <li style={{ marginBottom: "12px" }}>Send marketing communications (only with your consent)</li>
              <li>Improve our website and services</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section style={{ marginBottom: "48px", padding: "32px", background: "white", borderRadius: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "24px", fontFamily: "Playfair Display, serif" }}>Data Sharing & Third Parties</h2>
            
            <p style={{ marginBottom: "16px" }}><strong>We do not sell or rent your personal information to third parties.</strong></p>
            <p style={{ marginBottom: "16px" }}>We may share your information with:</p>
            <ul style={{ paddingLeft: "24px" }}>
              <li style={{ marginBottom: "12px" }}>Payment processors for secure transaction processing</li>
              <li style={{ marginBottom: "12px" }}>Shipping partners for order delivery</li>
              <li style={{ marginBottom: "12px" }}>Service providers who help us operate our website</li>
              <li>Legal authorities if required by law</li>
            </ul>
          </section>

          {/* Security */}
          <section style={{ marginBottom: "48px", padding: "32px", background: "#FFF5F8", borderRadius: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <Lock size={32} color="#C89EC7" />
              <h2 style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "Playfair Display, serif" }}>Data Security</h2>
            </div>
            
            <p style={{ marginBottom: "16px" }}>We implement industry-standard security measures to protect your personal information:</p>
            <ul style={{ paddingLeft: "24px" }}>
              <li style={{ marginBottom: "12px" }}>SSL encryption for all data transmission</li>
              <li style={{ marginBottom: "12px" }}>Secure payment gateway integration</li>
              <li style={{ marginBottom: "12px" }}>Regular security audits and updates</li>
              <li>Access controls and data encryption</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section style={{ marginBottom: "48px", padding: "32px", background: "#F5F0FF", borderRadius: "16px" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "24px", fontFamily: "Playfair Display, serif" }}>Your Rights</h2>
            
            <p style={{ marginBottom: "16px" }}>You have the right to:</p>
            <ul style={{ paddingLeft: "24px" }}>
              <li style={{ marginBottom: "12px" }}>Access the personal information we hold about you</li>
              <li style={{ marginBottom: "12px" }}>Request correction of inaccurate information</li>
              <li style={{ marginBottom: "12px" }}>Request deletion of your personal data</li>
              <li style={{ marginBottom: "12px" }}>Opt-out of marketing communications at any time</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <p style={{ marginTop: "16px" }}>To exercise these rights, please contact us at hello@rikisfashionbling.com</p>
          </section>

          {/* Cookies */}
          <section style={{ marginBottom: "48px", padding: "32px", background: "white", borderRadius: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "24px", fontFamily: "Playfair Display, serif" }}>Cookies</h2>
            
            <p style={{ marginBottom: "16px" }}>We use cookies to enhance your browsing experience and analyze website traffic. Cookies are small text files stored on your device.</p>
            <p>You can control cookie settings through your browser preferences. However, disabling cookies may affect website functionality.</p>
          </section>

          {/* Contact */}
          <section style={{ padding: "32px", background: "linear-gradient(135deg, #E6BBE2 0%, #C89EC7 100%)", borderRadius: "12px", textAlign: "center" }}>
            <p style={{ fontSize: "1.25rem", color: "white", marginBottom: "16px", fontWeight: "600" }}>Questions about our Privacy Policy?</p>
            <p style={{ color: "white", marginBottom: "24px" }}>Contact us at hello@rikisfashionbling.com</p>
            <a href="/contact" className="btn-secondary" style={{ background: "white", color: "#C89EC7", border: "none" }}>Contact Us</a>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
