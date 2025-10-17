import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Heart, ShoppingCart, SlidersHorizontal, ChevronDown, Share2, Star } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const categories = {
  kpop: {
    title: "K-Pop Collection",
    emoji: "🎤",
    description: "Inspired by your favorite idols — bold, expressive, and full of sparkle. The perfect fusion of Korean fashion and statement jewelry.",
    image: "https://images.unsplash.com/photo-1692421098809-6cdfcfea289a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxrb3JlYW4lMjBmYXNoaW9ufGVufDB8fHx8MTc2MDY5MDM5NHww&ixlib=rb-4.1.0&q=85"
  },
  latest: {
    title: "Latest Trends",
    emoji: "💎",
    description: "Stay ahead of the curve with the season's freshest designs — minimal yet impactful jewelry for every mood.",
    image: "https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85"
  },
  classics: {
    title: "Classics Reimagined",
    emoji: "🌸",
    description: "Timeless elegance meets modern design. Discover your next everyday essential with a touch of sophistication.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85"
  },
  earrings: {
    title: "Earrings Collection",
    emoji: "✨",
    description: "From studs to statement hoops, elevate your look with earrings that define your mood.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000"
  },
  necklaces: {
    title: "Necklaces Collection",
    emoji: "💖",
    description: "Chic pendants, layered chains, and Korean-inspired chokers — curated for modern minimalists.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000"
  },
  bracelets: {
    title: "Bracelets & Bangles",
    emoji: "💫",
    description: "Wrap your wrists in elegance with sleek bracelets and statement bangles.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000"
  },
  rings: {
    title: "Rings & Charms",
    emoji: "💍",
    description: "Add a hint of playfulness and charm to your look — stackable, expressive, and uniquely you.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000"
  },
  cosmetics: {
    title: "Cosmetics Corner",
    emoji: "💄",
    description: "Enhance your glow with premium Korean-style cosmetics and handpicked beauty accessories.",
    image: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3N8ZW58MHx8fHwxNzYwNjkwMzg5fDA&ixlib=rb-4.1.0&q=85"
  }
};

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("all");

  const categoryInfo = categories[category] || categories.kpop;

  useEffect(() => {
    fetchProducts();
    loadWishlist();
  }, [category]);

  useEffect(() => {
    applyFilters();
  }, [products, sortBy, priceRange]);

  const fetchProducts = async () => {
    try {
      let query = "";
      if (["kpop", "latest", "classics"].includes(category)) {
        query = `?collection=${category}`;
      } else {
        query = `?category=${category}`;
      }
      const response = await axios.get(`${API}/products${query}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const loadWishlist = () => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Price filter
    if (priceRange === "under1000") {
      filtered = filtered.filter(p => p.price < 1000);
    } else if (priceRange === "1000-2000") {
      filtered = filtered.filter(p => p.price >= 1000 && p.price <= 2000);
    } else if (priceRange === "over2000") {
      filtered = filtered.filter(p => p.price > 2000);
    }

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
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

  return (
    <div>
      <Navigation />

      {/* Category Hero Banner */}
      <div 
        style={{
          position: "relative",
          height: "400px",
          overflow: "hidden",
          marginTop: "80px"
        }}
        data-testid="category-hero"
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${categoryInfo.image})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.7)" }}></div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(230, 187, 226, 0.3) 0%, rgba(255, 251, 245, 0.8) 100%)" }}></div>
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "24px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>{categoryInfo.emoji}</div>
          <h1 style={{ fontSize: "3.5rem", fontWeight: "700", color: "#2D2D2D", marginBottom: "16px" }} data-testid="category-title">
            {categoryInfo.title}
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#555", maxWidth: "700px" }} data-testid="category-description">
            {categoryInfo.description}
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        <nav style={{ fontSize: "0.875rem", color: "#666" }} data-testid="breadcrumbs">
          <Link to="/" style={{ color: "#C89EC7", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span>{categoryInfo.title}</span>
        </nav>
      </div>

      {/* Filters & Products */}
      <div style={{ padding: "0 24px 80px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Filter Bar */}
        <div style={{ background: "white", borderRadius: "16px", padding: "24px", marginBottom: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }} data-testid="filter-bar">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                data-testid="toggle-filters-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  borderRadius: "50px",
                  border: "2px solid #E6BBE2",
                  background: "white",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                data-testid="price-filter"
                style={{
                  padding: "12px 20px",
                  borderRadius: "50px",
                  border: "2px solid #E5E5E5",
                  fontSize: "1rem",
                  cursor: "pointer"
                }}
              >
                <option value="all">All Prices</option>
                <option value="under1000">Under ₹1000</option>
                <option value="1000-2000">₹1000 - ₹2000</option>
                <option value="over2000">Over ₹2000</option>
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: "#666", fontSize: "0.875rem" }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                data-testid="sort-select"
                style={{
                  padding: "12px 20px",
                  borderRadius: "50px",
                  border: "2px solid #E5E5E5",
                  fontSize: "1rem",
                  cursor: "pointer"
                }}
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: "16px", color: "#666", fontSize: "0.875rem" }}>
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </div>
        </div>

        {/* Products Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "32px" }} data-testid="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card" data-testid={`product-card-${product.id}`}>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <Link to={`/product/${product.id}`}>
                  <img src={product.images[0]} alt={product.name} />
                </Link>
                
                {/* Inventory Badge */}
                {product.stock < 5 && product.stock > 0 && (
                  <div style={{ position: "absolute", top: "16px", left: "16px", background: "#FF6B6B", color: "white", padding: "6px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "600" }}>
                    Only {product.stock} left!
                  </div>
                )}
                
                {product.featured && (
                  <div style={{ position: "absolute", top: "16px", left: "16px", background: "#FFD700", color: "#000", padding: "6px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "600" }}>
                    New Arrival
                  </div>
                )}

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
                    transition: "transform 0.3s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
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
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} fill="#FFD700" color="#FFD700" />
                  ))}
                  <span style={{ fontSize: "0.75rem", color: "#666", marginLeft: "4px" }}>(4.8)</span>
                </div>
                <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "8px" }}>{product.name}</h3>
                </Link>
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

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <p style={{ fontSize: "1.25rem", color: "#666" }}>No products found. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
