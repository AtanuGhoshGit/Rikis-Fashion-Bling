import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Heart, ShoppingCart, ArrowLeft, Star, Share2, Instagram, Facebook, Twitter } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    fetchProduct();
    loadWishlist();
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product");
    }
  };

  const loadWishlist = () => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  };

  const toggleWishlist = () => {
    let newWishlist;
    if (wishlist.includes(id)) {
      newWishlist = wishlist.filter(wId => wId !== id);
      toast.info("Removed from wishlist");
    } else {
      newWishlist = [...wishlist, id];
      toast.success("Added to wishlist!");
    }
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  const addToCart = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId") || generateSessionId();
      await axios.post(`${API}/cart/${sessionId}/add`, {
        product_id: id,
        quantity: quantity
      });
      toast.success(`Added ${quantity} item(s) to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  const generateSessionId = () => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("sessionId", sessionId);
    return sessionId;
  };

  if (!product) {
    return (
      <div>
        <Navigation />
        <div style={{ padding: "120px 24px", textAlign: "center" }}>
          <p style={{ fontSize: "1.25rem", color: "#666" }}>Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      
      <div style={{ padding: "120px 24px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#C89EC7", fontSize: "1rem", marginBottom: "32px", textDecoration: "none" }} data-testid="back-to-home">
          <ArrowLeft size={20} /> Back to Shop
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "64px" }}>
          {/* Product Images */}
          <div>
            <div style={{ borderRadius: "20px", overflow: "hidden", marginBottom: "24px" }}>
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                data-testid="main-product-image"
                style={{ width: "100%", height: "500px", objectFit: "cover" }}
              />
            </div>
            
            {product.images.length > 1 && (
              <div style={{ display: "flex", gap: "12px" }}>
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    onClick={() => setSelectedImage(index)}
                    data-testid={`thumbnail-${index}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: selectedImage === index ? "3px solid #E6BBE2" : "3px solid transparent",
                      transition: "border 0.3s ease"
                    }}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ background: "#E6BBE2", color: "white", padding: "6px 16px", borderRadius: "20px", fontSize: "0.875rem", fontWeight: "600", textTransform: "capitalize" }}>
                {product.category}
              </span>
            </div>

            <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "16px", lineHeight: "1.2" }} data-testid="product-name">
              {product.name}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={20} fill="#FFD700" color="#FFD700" />
              ))}
              <span style={{ color: "#666", marginLeft: "8px" }}>(4.8 / 127 reviews)</span>
            </div>

            <p style={{ fontSize: "3rem", fontWeight: "700", color: "#C89EC7", marginBottom: "24px" }} data-testid="product-price">
              ₹{product.price}
            </p>

            <p style={{ fontSize: "1.125rem", color: "#666", lineHeight: "1.8", marginBottom: "32px" }} data-testid="product-description">
              {product.description}
            </p>

            {product.stock > 0 ? (
              <p style={{ color: "#4CAF50", fontSize: "1rem", marginBottom: "24px" }}>In Stock ({product.stock} available)</p>
            ) : (
              <p style={{ color: "#F44336", fontSize: "1rem", marginBottom: "24px" }}>Out of Stock</p>
            )}

            {/* Quantity Selector */}
            <div style={{ marginBottom: "32px" }}>
              <label style={{ display: "block", fontSize: "1rem", fontWeight: "600", marginBottom: "12px" }}>Quantity:</label>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  data-testid="decrease-quantity"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "2px solid #E6BBE2",
                    background: "white",
                    fontSize: "1.25rem",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}
                >
                  -
                </button>
                <span style={{ fontSize: "1.5rem", fontWeight: "600", minWidth: "40px", textAlign: "center" }} data-testid="quantity-value">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="increase-quantity"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "2px solid #E6BBE2",
                    background: "white",
                    fontSize: "1.25rem",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
              <button
                onClick={addToCart}
                data-testid="add-to-cart-btn"
                disabled={product.stock === 0}
                style={{
                  flex: 1,
                  background: product.stock === 0 ? "#CCC" : "#E6BBE2",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                  padding: "16px 32px",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  cursor: product.stock === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  transition: "transform 0.3s ease"
                }}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button
                onClick={toggleWishlist}
                data-testid="wishlist-btn"
                style={{
                  background: wishlist.includes(id) ? "#E6BBE2" : "white",
                  color: wishlist.includes(id) ? "white" : "#E6BBE2",
                  border: "2px solid #E6BBE2",
                  borderRadius: "50%",
                  width: "56px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                <Heart size={24} fill={wishlist.includes(id) ? "white" : "none"} />
              </button>
            </div>

            {/* Product Details */}
            <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "24px" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "16px" }}>Product Details</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ padding: "12px 0", borderBottom: "1px solid #F5F5F5", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#666" }}>Category:</span>
                  <span style={{ fontWeight: "600", textTransform: "capitalize" }}>{product.category}</span>
                </li>
                {product.collection && (
                  <li style={{ padding: "12px 0", borderBottom: "1px solid #F5F5F5", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#666" }}>Collection:</span>
                    <span style={{ fontWeight: "600", textTransform: "capitalize" }}>{product.collection}</span>
                  </li>
                )}
                <li style={{ padding: "12px 0", borderBottom: "1px solid #F5F5F5", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#666" }}>SKU:</span>
                  <span style={{ fontWeight: "600" }}>{product.id.substring(0, 8).toUpperCase()}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
