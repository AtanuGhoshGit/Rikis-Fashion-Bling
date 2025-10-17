import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, AlertCircle, Scale } from "lucide-react";

const TermsConditions = () => {
  return (
    <div>
      <Navigation />
      
      <div style={{ padding: "120px 24px 80px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "700", marginBottom: "16px", textAlign: "center", fontFamily: "Playfair Display, serif" }} data-testid="terms-title">
          Terms & Conditions
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#666", textAlign: "center", marginBottom: "48px" }}>
          Last updated: January 2025
        </p>

        <div style={{ fontSize: "1.125rem", color: "#555", lineHeight: "1.8" }}>
          <p style={{ marginBottom: "32px" }}>
            Welcome to Riki's Fashion Bling. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions.
          </p>

          {/* Use of Website */}
          <section style={{ marginBottom: "48px", padding: "32px", background: "#FFF5F8", borderRadius: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <FileText size={32} color="#C89EC7" />
              <h2 style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "Playfair Display, serif" }}>Use of Website</h2>
            </div>
            
            <ul style={{ paddingLeft: "24px" }}>
              <li style={{ marginBottom: "12px" }}>You must be at least 18 years old to make a purchase on our website</li>
              <li style={{ marginBottom: "12px" }}>You agree to provide accurate and complete information when placing orders</li>
              <li style={{ marginBottom: "12px" }}>You are responsible for maintaining the confidentiality of your account</li>
              <li>You may not use our website for any unlawful purpose</li>
            </ul>
          </section>

          {/* Product Information */}
          <section style={{ marginBottom: "48px", padding: "32px", background: "#F5F0FF", borderRadius: "16px" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "24px", fontFamily: "Playfair Display, serif" }}>Product Information & Pricing</h2>
            
            <ul style={{ paddingLeft: "24px" }}>
              <li style={{ marginBottom: "12px" }}>We strive to display product colors and details as accurately as possible</li>
              <li style={{ marginBottom: "12px" }}>Actual product colors may vary slightly due to screen settings</li>
              <li style={{ marginBottom: "12px" }}>Prices are subject to change without notice</li>
              <li style={{ marginBottom: "12px" }}>Product availability is not guaranteed until payment is confirmed</li>
              <li>We reserve the right to limit quantities purchased per customer</li>
            </ul>
          </section>

          {/* Orders & Payment */}
          <section style={{ marginBottom: "48px", padding: "32px", background: "white", borderRadius: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "24px", fontFamily: "Playfair Display, serif" }}>Orders & Payment</h2>
            
            <ul style={{ paddingLeft: "24px" }}>
              <li style={{ marginBottom: "12px" }}>All orders are subject to acceptance and availability</li>
              <li style={{ marginBottom: "12px" }}>We reserve the right to refuse or cancel any order</li>
              <li style={{ marginBottom: "12px" }}>Payment must be received before order processing</li>
              <li style={{ marginBottom: "12px" }}>All payments are processed through secure payment gateways</li>
              <li>Order confirmation will be sent via email</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section style={{ marginBottom: "48px", padding: "32px", background: "#FFF5F8", borderRadius: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <Scale size={32} color="#C89EC7" />
              <h2 style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "Playfair Display, serif" }}>Intellectual Property</h2>
            </div>
            
            <p style={{ marginBottom: "16px" }}>All content on this website, including:</p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "12px" }}>Text, images, logos, and graphics</li>
              <li style={{ marginBottom: "12px" }}>Product descriptions and photographs</li>
              <li style={{ marginBottom: "12px" }}>Design and layout</li>
              <li>Trademarks and brand names</li>
            </ul>
            <p>...is the exclusive property of Riki's Fashion Bling and is protected by copyright laws. Unauthorized use is prohibited.</p>
          </section>

          {/* Limitation of Liability */}
          <section style={{ marginBottom: "48px", padding: "32px", background: "#F5F0FF", borderRadius: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <AlertCircle size={32} color="#C89EC7" />
              <h2 style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "Playfair Display, serif" }}>Limitation of Liability</h2>
            </div>
            
            <ul style={{ paddingLeft: "24px" }}>
              <li style={{ marginBottom: "12px" }}>We are not liable for any indirect, incidental, or consequential damages</li>
              <li style={{ marginBottom: "12px" }}>Our liability is limited to the purchase price of the product</li>
              <li style={{ marginBottom: "12px" }}>We are not responsible for delays caused by shipping carriers</li>
              <li>We do not guarantee uninterrupted or error-free website operation</li>
            </ul>
          </section>

          {/* Customer Conduct */}
          <section style={{ marginBottom: "48px", padding: "32px", background: "white", borderRadius: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "24px", fontFamily: "Playfair Display, serif" }}>Customer Conduct</h2>
            
            <p style={{ marginBottom: "16px" }}>You agree not to:</p>
            <ul style={{ paddingLeft: "24px" }}>
              <li style={{ marginBottom: "12px" }}>Use our website for fraudulent purposes</li>
              <li style={{ marginBottom: "12px" }}>Attempt to gain unauthorized access to our systems</li>
              <li style={{ marginBottom: "12px" }}>Post or transmit harmful or offensive content</li>
              <li style={{ marginBottom: "12px" }}>Interfere with other users' experience</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          {/* Modifications */}
          <section style={{ marginBottom: "48px", padding: "32px", background: "#FFF5F8", borderRadius: "16px" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "24px", fontFamily: "Playfair Display, serif" }}>Modifications to Terms</h2>
            
            <p style={{ marginBottom: "16px" }}>We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting to the website.</p>
            <p>Your continued use of the website after changes constitutes acceptance of the modified terms.</p>
          </section>

          {/* Governing Law */}
          <section style={{ marginBottom: "48px", padding: "32px", background: "#F5F0FF", borderRadius: "16px" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "24px", fontFamily: "Playfair Display, serif" }}>Governing Law</h2>
            
            <p>These terms and conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Darjeeling, West Bengal.</p>
          </section>

          {/* Contact */}
          <section style={{ padding: "32px", background: "linear-gradient(135deg, #E6BBE2 0%, #C89EC7 100%)", borderRadius: "12px", textAlign: "center" }}>
            <p style={{ fontSize: "1.25rem", color: "white", marginBottom: "16px", fontWeight: "600" }}>Questions about our Terms & Conditions?</p>
            <p style={{ color: "white", marginBottom: "24px" }}>Contact us at hello@rikisfashionbling.com</p>
            <a href="/contact" className="btn-secondary" style={{ background: "white", color: "#C89EC7", border: "none" }}>Contact Us</a>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsConditions;
