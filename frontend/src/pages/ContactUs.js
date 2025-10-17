import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you! Our team will respond within 24 hours.");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      <Navigation />

      {/* Hero Section */}
      <div 
        style={{
          position: "relative",
          minHeight: "400px",
          overflow: "hidden",
          marginTop: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        data-testid="contact-hero"
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.4)" }}></div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(135deg, rgba(255, 240, 245, 0.8) 0%, rgba(230, 210, 255, 0.6) 100%)" }}></div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "24px" }}>
          <h1 style={{ fontSize: "4rem", fontWeight: "700", color: "#2D2D2D", marginBottom: "24px" }} data-testid="contact-title">
            We'd Love to Hear From You
          </h1>
          <p style={{ fontSize: "1.5rem", color: "#555", maxWidth: "700px", margin: "0 auto" }}>
            Get in touch with us for orders, collaborations, or styling advice.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section style={{ padding: "80px 24px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "64px" }}>
            {/* Contact Information */}
            <div>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "32px", fontFamily: "Playfair Display, serif" }}>Get in Touch</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "20px", background: "#FFF5F8", borderRadius: "12px" }}>
                  <MapPin size={24} color="#C89EC7" style={{ marginTop: "4px" }} />
                  <div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "8px" }}>Visit Us</h3>
                    <p style={{ color: "#666", lineHeight: "1.6" }}>Darjeeling City, West Bengal, India</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "20px", background: "#F5F0FF", borderRadius: "12px" }}>
                  <Mail size={24} color="#C89EC7" style={{ marginTop: "4px" }} />
                  <div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "8px" }}>Email Us</h3>
                    <p style={{ color: "#666", lineHeight: "1.6" }}>hello@rikisfashionbling.com</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "20px", background: "#FFF5F8", borderRadius: "12px" }}>
                  <Phone size={24} color="#C89EC7" style={{ marginTop: "4px" }} />
                  <div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "8px" }}>Call or WhatsApp</h3>
                    <p style={{ color: "#666", lineHeight: "1.6" }}>+91 XXXXX XXXXX</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "20px", background: "#F5F0FF", borderRadius: "12px" }}>
                  <Clock size={24} color="#C89EC7" style={{ marginTop: "4px" }} />
                  <div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "8px" }}>Working Hours</h3>
                    <p style={{ color: "#666", lineHeight: "1.6" }}>Mon–Sat: 10:00 AM – 7:00 PM</p>
                    <p style={{ color: "#666", lineHeight: "1.6" }}>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "32px", fontFamily: "Playfair Display, serif" }}>Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} data-testid="contact-form" style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#2D2D2D" }}>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    data-testid="contact-name-input"
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: "12px",
                      border: "2px solid #E5E5E5",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "border 0.3s ease"
                    }}
                  />
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#2D2D2D" }}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-testid="contact-email-input"
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: "12px",
                      border: "2px solid #E5E5E5",
                      fontSize: "1rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#2D2D2D" }}>Your Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    data-testid="contact-message-input"
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: "12px",
                      border: "2px solid #E5E5E5",
                      fontSize: "1rem",
                      outline: "none",
                      resize: "vertical"
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="contact-submit-btn"
                  className="btn-primary"
                  style={{
                    width: "100%",
                    fontSize: "1.125rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  <Send size={20} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: "0", height: "500px", position: "relative" }} data-testid="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113840.30428831886!2d88.18765829726562!3d27.036006000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e42faf20902967%3A0x2c6835190d5f9c33!2sDarjeeling%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890123"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Darjeeling Location"
        ></iframe>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
