import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/admin/login`, formData);
      
      // Store token in localStorage
      localStorage.setItem("adminToken", response.data.access_token);
      
      toast.success("Login successful!");
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        toast.error("Incorrect username or password");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "linear-gradient(135deg, #FFF5F8 0%, #F5F0FF 100%)",
      padding: "24px"
    }}>
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "48px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        maxWidth: "450px",
        width: "100%"
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <img 
            src="https://customer-assets.emergentagent.com/job_sparkleshop/artifacts/m228ygdb_Rikis%20Fashion%20Bling.jpg" 
            alt="Riki's Fashion Bling" 
            style={{ maxWidth: "200px", width: "100%", height: "auto", margin: "0 auto 24px" }}
          />
          <h1 style={{ 
            fontSize: "2rem", 
            fontWeight: "700", 
            color: "#2D2D2D",
            marginBottom: "8px",
            fontFamily: "Playfair Display, serif"
          }}>
            Admin Login
          </h1>
          <p style={{ color: "#666", fontSize: "1rem" }}>
            Enter your credentials to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} data-testid="admin-login-form">
          {/* Username Field */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: "600", 
              color: "#2D2D2D",
              fontSize: "0.875rem"
            }}>
              Username
            </label>
            <div style={{ position: "relative" }}>
              <User size={20} color="#999" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                data-testid="username-input"
                placeholder="Enter username"
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 48px",
                  borderRadius: "12px",
                  border: "2px solid #E5E5E5",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border 0.3s ease"
                }}
                onFocus={(e) => e.target.style.borderColor = "#E6BBE2"}
                onBlur={(e) => e.target.style.borderColor = "#E5E5E5"}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "32px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: "600", 
              color: "#2D2D2D",
              fontSize: "0.875rem"
            }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={20} color="#999" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                data-testid="password-input"
                placeholder="Enter password"
                style={{
                  width: "100%",
                  padding: "14px 48px 14px 48px",
                  borderRadius: "12px",
                  border: "2px solid #E5E5E5",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border 0.3s ease"
                }}
                onFocus={(e) => e.target.style.borderColor = "#E6BBE2"}
                onBlur={(e) => e.target.style.borderColor = "#E5E5E5"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                data-testid="toggle-password"
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px"
                }}
              >
                {showPassword ? <EyeOff size={20} color="#999" /> : <Eye size={20} color="#999" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            data-testid="login-submit-btn"
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "50px",
              border: "none",
              background: "linear-gradient(135deg, #E6BBE2 0%, #C89EC7 100%)",
              color: "white",
              fontSize: "1.125rem",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              transition: "all 0.3s ease",
              boxShadow: "0 4px 16px rgba(230, 187, 226, 0.3)"
            }}
          >
            {isLoading ? "Logging in..." : "Login to Admin Panel"}
          </button>
        </form>

        {/* Back to Home Link */}
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <a 
            href="/" 
            style={{ 
              color: "#C89EC7", 
              textDecoration: "none", 
              fontSize: "0.875rem",
              fontWeight: "600"
            }}
          >
            ← Back to Home
          </a>
        </div>

        {/* Default Credentials Info (Remove in production) */}
        <div style={{ 
          marginTop: "32px", 
          padding: "16px", 
          background: "#FFF5F8", 
          borderRadius: "12px",
          border: "1px solid #E6BBE2"
        }}>
          <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "8px", fontWeight: "600" }}>
            Default Credentials:
          </p>
          <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "4px" }}>
            Username: <strong>admin</strong>
          </p>
          <p style={{ fontSize: "0.875rem", color: "#666" }}>
            Password: <strong>admin123</strong>
          </p>
          <p style={{ fontSize: "0.75rem", color: "#999", marginTop: "8px", fontStyle: "italic" }}>
            Change these in backend/.env file
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
