import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      data-testid="navigation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        padding: "20px 24px",
        transition: "all 0.3s ease",
        boxShadow: scrolled ? "0 2px 16px rgba(0, 0, 0, 0.05)" : "none"
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none" }} data-testid="nav-logo">
          <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#2D2D2D", fontFamily: "Playfair Display, serif" }}>
            Riki's <span className="gradient-text">Fashion Bling</span>
          </h1>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link to="/" style={{ fontSize: "1rem", fontWeight: "600", color: "#2D2D2D", textDecoration: "none", transition: "color 0.3s ease" }} data-testid="nav-home">
            Home
          </Link>
          <Link to="/admin" style={{ fontSize: "1rem", fontWeight: "600", color: "#2D2D2D", textDecoration: "none", transition: "color 0.3s ease" }} data-testid="nav-admin">
            Admin
          </Link>
          <Link to="/cart" style={{ position: "relative", color: "#2D2D2D", textDecoration: "none" }} data-testid="nav-cart">
            <ShoppingCart size={24} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
