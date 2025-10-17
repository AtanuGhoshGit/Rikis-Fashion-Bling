import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Sparkles, Heart, TrendingUp, Mountain, Users } from "lucide-react";

const AboutUs = () => {
  return (
    <div>
      <Navigation />

      {/* Hero Section */}
      <div 
        style={{
          position: "relative",
          minHeight: "500px",
          overflow: "hidden",
          marginTop: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        data-testid="about-hero"
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.4)" }}></div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(135deg, rgba(255, 240, 245, 0.8) 0%, rgba(230, 210, 255, 0.6) 100%)" }}></div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "24px" }}>
          <h1 style={{ fontSize: "4rem", fontWeight: "700", color: "#2D2D2D", marginBottom: "24px" }} data-testid="about-title">
            Where Style Meets Sparkle
          </h1>
          <p style={{ fontSize: "1.5rem", color: "#555", maxWidth: "800px", margin: "0 auto" }} data-testid="about-subtitle">
            Born in the heart of Darjeeling, Riki's Fashion Bling brings you jewelry that celebrates individuality and trend-driven elegance.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section style={{ padding: "80px 24px", backgroundColor: "white" }} data-testid="our-story">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "64px", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "24px", fontFamily: "Playfair Display, serif" }}>Our Story</h2>
              <p style={{ fontSize: "1.125rem", color: "#666", lineHeight: "1.8", marginBottom: "24px" }}>
                Riki's Fashion Bling was founded in Darjeeling with a passion for creating and curating jewelry that bridges timeless beauty and modern trends. Our designs are inspired by K-Pop culture, Korean street style, and the charm of mountain life.
              </p>
              <p style={{ fontSize: "1.125rem", color: "#666", lineHeight: "1.8" }}>
                What started as a small boutique in the hills has grown into a beloved brand for fashion enthusiasts who seek unique, expressive pieces that tell their story.
              </p>
            </div>
            <div style={{ borderRadius: "20px", overflow: "hidden" }}>
              <img 
                src="https://images.unsplash.com/photo-1727784892059-c85b4d9f763c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85" 
                alt="Our Story" 
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #FFF5F8 0%, #F5F0FF 100%)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "64px", alignItems: "center" }}>
            <div style={{ borderRadius: "20px", overflow: "hidden", order: 1 }}>
              <img 
                src="https://images.unsplash.com/photo-1755536220517-18ca6c9a2971?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxmZW1pbmluZSUyMGVsZWdhbnR8ZW58MHx8fHwxNzYwNjkwMzk4fDA&ixlib=rb-4.1.0&q=85" 
                alt="Our Philosophy" 
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
              />
            </div>
            <div style={{ order: 2 }}>
              <h2 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "24px", fontFamily: "Playfair Display, serif" }}>Our Philosophy</h2>
              <p style={{ fontSize: "1.125rem", color: "#666", lineHeight: "1.8" }}>
                Every piece we offer is meant to empower self-expression. Whether you love minimal elegance or bold statements, our jewelry adds a touch of confidence to every look. We believe fashion is personal, and your accessories should reflect your unique personality and mood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "80px 24px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "48px", textAlign: "center", fontFamily: "Playfair Display, serif" }}>Why Choose Us</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "32px" }}>
            <div style={{ background: "#FFF5F8", borderRadius: "16px", padding: "32px", textAlign: "center", transition: "transform 0.3s ease" }} className="hover-lift">
              <TrendingUp size={48} color="#E6BBE2" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "12px" }}>Latest Designs</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>Updated every season with global trends and timeless classics.</p>
            </div>

            <div style={{ background: "#F5F0FF", borderRadius: "16px", padding: "32px", textAlign: "center", transition: "transform 0.3s ease" }} className="hover-lift">
              <Sparkles size={48} color="#C89EC7" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "12px" }}>K-Pop Inspired Fashion</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>Jewelry and accessories inspired by your favorite idols.</p>
            </div>

            <div style={{ background: "#FFF5F8", borderRadius: "16px", padding: "32px", textAlign: "center", transition: "transform 0.3s ease" }} className="hover-lift">
              <Mountain size={48} color="#E6BBE2" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "12px" }}>From Darjeeling</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>Locally inspired with a global outlook and unique charm.</p>
            </div>

            <div style={{ background: "#F5F0FF", borderRadius: "16px", padding: "32px", textAlign: "center", transition: "transform 0.3s ease" }} className="hover-lift">
              <Users size={48} color="#C89EC7" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "12px" }}>Customer First</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>Fast shipping, easy returns, and friendly support always.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Vision Quote */}
      <section style={{ padding: "120px 24px", background: "linear-gradient(135deg, #E6BBE2 0%, #C89EC7 100%)", textAlign: "center" }} data-testid="brand-quote">
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <Heart size={64} color="white" style={{ margin: "0 auto 24px" }} />
          <blockquote style={{ fontSize: "2.5rem", fontWeight: "600", color: "white", lineHeight: "1.4", fontStyle: "italic", fontFamily: "Playfair Display, serif" }}>
            "Jewelry isn't just an accessory — it's your mood, your confidence, your story."
          </blockquote>
          <p style={{ marginTop: "24px", fontSize: "1.125rem", color: "rgba(255,255,255,0.9)" }}>— Team Riki's Fashion Bling</p>
        </div>
      </section>

      <Footer />

      <style>{`
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(198, 158, 199, 0.3);
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
