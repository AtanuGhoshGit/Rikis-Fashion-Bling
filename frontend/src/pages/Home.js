import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Heart, ShoppingCart, Instagram, Facebook, Youtube, Mail, Phone, MapPin, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [wishlist, setWishlist] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");

  const categories = ["all", "earrings", "necklaces", "rings", "bracelets", "cosmetics"];
  
  const collections = [
    {
      title: "K-Pop Collection",
      emoji: "🎤",
      description: "Trend-driven, youthful jewelry inspired by Korean fashion",
      image: "https://images.unsplash.com/photo-1692421098809-6cdfcfea289a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxrb3JlYW4lMjBmYXNoaW9ufGVufDB8fHx8MTc2MDY5MDM5NHww&ixlib=rb-4.1.0&q=85",
      collection: "kpop"
    },
    {
      title: "Latest Trends",
      emoji: "💍",
      description: "New arrivals and limited edition pieces",
      image: "https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85",
      collection: "latest"
    },
    {
      title: "Classics Reimagined",
      emoji: "🌸",
      description: "Timeless styles with modern flair",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85",
      collection: "classics"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      text: "Perfect blend of Korean glam and everyday sparkle! I'm obsessed with my new earrings.",
      image: "https://images.unsplash.com/photo-1727784892059-c85b4d9f763c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "Ananya Khanna",
      text: "The cosmetics quality is amazing! And the jewelry adds such a unique touch to my style.",
      image: "https://images.unsplash.com/photo-1755536219951-70e9c1933fe3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHw0fHxmZW1pbmluZSUyMGVsZWdhbnR8ZW58MHx8fHwxNzYwNjkwMzk4fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "Diya Rai",
      text: "Love the Darjeeling charm mixed with K-Pop vibes. Riki's Fashion Bling is my go-to!",
      image: "https://images.unsplash.com/photo-1755536220517-18ca6c9a2971?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxmZW1pbmluZSUyMGVsZWdhbnR8ZW58MHx8fHwxNzYwNjkwMzk4fDA&ixlib=rb-4.1.0&q=85"
    }
  ];

  const instagramPosts = [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3N8ZW58MHx8fHwxNzYwNjkwMzg5fDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1692421098809-6cdfcfea289a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxrb3JlYW4lMjBmYXNoaW9ufGVufDB8fHx8MTc2MDY5MDM5NHww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxjb3NtZXRpY3N8ZW58MHx8fHwxNzYwNjkwMzg5fDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1755536220517-18ca6c9a2971?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxmZW1pbmluZSUyMGVsZWdhbnR8ZW58MHx8fHwxNzYwNjkwMzk4fDA&ixlib=rb-4.1.0&q=85"
  ];

  useEffect(() => {
    fetchProducts();
    loadWishlist();
    
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filterProducts = () => {
    if (selectedCategory === "all") {
      setFeaturedProducts(products);
    } else {
      setFeaturedProducts(products.filter(p => p.category === selectedCategory));
    }
  };

  const loadWishlist = () => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  };

  const toggleWishlist = (productId) => {
    let newWishlist;
    if (wishlist.includes(productId)) {
      newWishlist = wishlist.filter(id => id !== productId);
      toast.info("Removed from wishlist");
    } else {
      newWishlist = [...wishlist, productId];
      toast.success("Added to wishlist!");
    }
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  const addToCart = async (product) => {
    try {
      const sessionId = localStorage.getItem("sessionId") || generateSessionId();
      await axios.post(`${API}/cart/${sessionId}/add`, {
        product_id: product.id,
        quantity: 1
      });
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  const generateSessionId = () => {
    const id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("sessionId", id);
    return id;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/newsletter`, {
        email: newsletterEmail,
        name: newsletterName
      });
      toast.success("Successfully subscribed to newsletter!");
      setNewsletterEmail("");
      setNewsletterName("");
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Email already subscribed");
      } else {
        toast.error("Failed to subscribe");
      }
    }
  };

  return (
    <div>
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-section" data-testid="hero-section">
        <div className="hero-content" style={{ padding: "120px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h1 className="gradient-text" style={{ fontSize: "4.5rem", fontWeight: "700", marginBottom: "24px", lineHeight: "1.1" }} data-testid="brand-title">
              Riki's Fashion Bling
            </h1>
            <p style={{ fontSize: "1.5rem", color: "#666", marginBottom: "40px", fontStyle: "italic" }} data-testid="tagline">
              Where style, sparkle, and Seoul collide.
            </p>
            <p style={{ fontSize: "1.125rem", color: "#555", marginBottom: "48px", maxWidth: "700px", margin: "0 auto 48px" }} data-testid="hero-description">
              Explore chic cosmetics and costume jewelry curated with K-Pop flair and Darjeeling charm. Elevate your style with elegance and personality.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#products" className="btn-primary" data-testid="shop-now-btn">
                Shop Now
              </a>
              <a href="#collections" className="btn-secondary" data-testid="explore-kpop-btn">
                Explore K-Pop Collection
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{ padding: "80px 24px", backgroundColor: "white" }} data-testid="about-section">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <h2 className="section-title" style={{ textAlign: "left", fontSize: "2.5rem" }}>Born in Darjeeling, crafted for modern trendsetters.</h2>
              <p style={{ fontSize: "1.125rem", color: "#666", lineHeight: "1.8", marginBottom: "24px" }}>
                Riki's Fashion Bling offers a chic selection of branded cosmetics to enhance your beauty routine. Our curated costume jewelry collection adds flair and personality to any outfit.
              </p>
              <p style={{ fontSize: "1.125rem", color: "#666", lineHeight: "1.8" }}>
                Explore the elegance of Korean jewelry with our handpicked designs, blending Darjeeling's timeless charm with the vibrant energy of K-Pop culture.
              </p>
            </div>
            <div style={{ borderRadius: "20px", overflow: "hidden", height: "400px" }}>
              <img 
                src="https://images.unsplash.com/photo-1727784892059-c85b4d9f763c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85" 
                alt="About Riki's Fashion Bling" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section id="collections" style={{ padding: "80px 24px", background: "#FFFBF5" }} data-testid="collections-section">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 className="section-title">Featured Collections</h2>
          <p className="section-subtitle">Discover our curated collections that blend K-Pop trends with timeless elegance</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
            {collections.map((collection, index) => (
              <div key={index} className="collection-card" data-testid={`collection-card-${index}`}>
                <img src={collection.image} alt={collection.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="collection-content">
                  <div style={{ fontSize: "3rem", marginBottom: "8px" }}>{collection.emoji}</div>
                  <h3 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "8px" }}>{collection.title}</h3>
                  <p style={{ fontSize: "1rem", marginBottom: "16px", opacity: "0.9" }}>{collection.description}</p>
                  <a href="#products" className="btn-primary" style={{ display: "inline-block" }} data-testid={`view-collection-btn-${index}`}>
                    View Collection <ArrowRight style={{ display: "inline", marginLeft: "8px" }} size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section id="products" style={{ padding: "80px 24px", backgroundColor: "white" }} data-testid="products-section">
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 className="section-title">Our Collection</h2>
          <p className="section-subtitle">Handpicked pieces that add sparkle to your everyday style</p>
          
          {/* Category Filters */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }} data-testid="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                data-testid={`category-filter-${category}`}
                style={{
                  padding: "12px 24px",
                  borderRadius: "50px",
                  border: selectedCategory === category ? "2px solid #E6BBE2" : "2px solid #E5E5E5",
                  background: selectedCategory === category ? "#E6BBE2" : "white",
                  color: selectedCategory === category ? "white" : "#666",
                  cursor: "pointer",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  transition: "all 0.3s ease"
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "32px" }} data-testid="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card" data-testid={`product-card-${product.id}`}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.images[0]} alt={product.name} />
                  </Link>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    data-testid={`wishlist-btn-${product.id}`}
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      background: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "transform 0.3s ease"
                    }}
                  >
                    <Heart 
                      size={20} 
                      fill={wishlist.includes(product.id) ? "#E6BBE2" : "none"}
                      color={wishlist.includes(product.id) ? "#E6BBE2" : "#666"}
                    />
                  </button>
                </div>
                <div style={{ padding: "20px" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "8px" }}>{product.name}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "12px" }}>{product.description.substring(0, 60)}...</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#C89EC7" }}>₹{product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      data-testid={`add-to-cart-btn-${product.id}`}
                      style={{
                        background: "#E6BBE2",
                        color: "white",
                        border: "none",
                        borderRadius: "50px",
                        padding: "10px 20px",
                        cursor: "pointer",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "transform 0.3s ease"
                      }}
                    >
                      <ShoppingCart size={18} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #FFF5F8 0%, #F5F0FF 100%)" }} data-testid="testimonials-section">
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Hear from fashion lovers who trust Riki's Fashion Bling</p>
          
          <div style={{ position: "relative" }}>
            <div className="testimonial-card" style={{ textAlign: "center" }} data-testid="testimonial-card">
              <div style={{ width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 24px" }}>
                <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <p style={{ fontSize: "1.25rem", color: "#555", marginBottom: "16px", fontStyle: "italic", lineHeight: "1.8" }}>
                "{testimonials[currentTestimonial].text}"
              </p>
              <p style={{ fontSize: "1.125rem", fontWeight: "600", color: "#C89EC7" }}>
                {testimonials[currentTestimonial].name}
              </p>
            </div>
            
            <button
              onClick={prevTestimonial}
              data-testid="prev-testimonial-btn"
              style={{
                position: "absolute",
                left: "-60px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "white",
                border: "2px solid #E6BBE2",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              <ChevronLeft color="#C89EC7" />
            </button>
            
            <button
              onClick={nextTestimonial}
              data-testid="next-testimonial-btn"
              style={{
                position: "absolute",
                right: "-60px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "white",
                border: "2px solid #E6BBE2",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              <ChevronRight color="#C89EC7" />
            </button>
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section style={{ padding: "80px 24px", backgroundColor: "white", position: "relative", overflow: "hidden" }} data-testid="visit-section">
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: "0.1", backgroundImage: "url('https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Sparkles size={48} color="#C89EC7" style={{ margin: "0 auto 24px" }} />
          <h2 className="section-title">Visit Us</h2>
          <p style={{ fontSize: "1.25rem", color: "#666", marginBottom: "32px", lineHeight: "1.8" }}>
            Visit Riki's Fashion Bling in the heart of Darjeeling. Discover designs inspired by elegance and energy.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <MapPin color="#C89EC7" size={24} />
              <span style={{ fontSize: "1.125rem", color: "#555" }}>Darjeeling, West Bengal, India</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Phone color="#C89EC7" size={24} />
              <span style={{ fontSize: "1.125rem", color: "#555" }}>+91 XXXXX XXXXX</span>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section style={{ padding: "80px 24px", background: "#FFFBF5" }} data-testid="instagram-section">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 className="section-title">Follow Us on Instagram</h2>
          <p className="section-subtitle">
            Follow @RikisFashionBling for new drops and K-Pop-inspired looks
          </p>
          
          <div className="instagram-grid">
            {instagramPosts.map((post, index) => (
              <div key={index} className="instagram-post" data-testid={`instagram-post-${index}`}>
                <img src={post} alt={`Instagram post ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: "80px 24px", backgroundColor: "white" }} data-testid="newsletter-section">
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <Mail size={48} color="#C89EC7" style={{ margin: "0 auto 24px" }} />
          <h2 className="section-title" style={{ fontSize: "2.5rem" }}>Get the Latest Drops</h2>
          <p className="section-subtitle">Subscribe for K-Pop-inspired fashion updates and exclusive offers</p>
          
          <form onSubmit={handleNewsletterSubmit} data-testid="newsletter-form" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              type="text"
              placeholder="Your Name"
              value={newsletterName}
              onChange={(e) => setNewsletterName(e.target.value)}
              data-testid="newsletter-name-input"
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: "2px solid #E5E5E5",
                fontSize: "1rem",
                outline: "none"
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              data-testid="newsletter-email-input"
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: "2px solid #E5E5E5",
                fontSize: "1rem",
                outline: "none"
              }}
            />
            <button type="submit" className="btn-primary" data-testid="newsletter-submit-btn" style={{ width: "100%", fontSize: "1.125rem" }}>
              Subscribe Now
            </button>
          </form>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        data-testid="whatsapp-btn"
      >
        💬
      </a>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        data-testid="back-to-top-btn"
      >
        ❤️
      </button>
    </div>
  );
};

export default Home;
