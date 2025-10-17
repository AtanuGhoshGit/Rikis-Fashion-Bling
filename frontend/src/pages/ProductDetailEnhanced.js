import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Heart, ShoppingCart, ArrowLeft, Star, Share2, Instagram, Facebook, Twitter, Package, Shield, Truck } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductDetailEnhanced = () => {
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

  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(`${API}/products?category=${product.category}`);
      const related = response.data.filter(p => p.id !== id).slice(0, 4);
      setRelatedProducts(related);
    } catch (error) {
      console.error("Error fetching related products:", error);
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
      
      // Sparkle animation effect
      const sparkle = document.createElement('div');
      sparkle.textContent = '✨';
      sparkle.style.cssText = 'position: fixed; font-size: 2rem; pointer-events: none; z-index: 9999; animation: sparkleFloat 1s ease-out;';
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
      
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

  const shareProduct = (platform) => {
    const url = window.location.href;
    const text = `Check out ${product.name} at Riki's Fashion Bling!`;
    
    let shareUrl;
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'instagram':
        toast.info("Copy the link and share on Instagram!");
        navigator.clipboard.writeText(url);
        return;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
    setShowShareMenu(false);
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
      
      <style>{`
        @keyframes sparkleFloat {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-50px) scale(1.5); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .product-image-hover {
          transition: transform 0.5s ease;
        }
        .product-image-hover:hover {
          transform: scale(1.05);
        }
        .shimmer-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
          pointer-events: none;
        }
      `}</style>
      
      <div style={{ padding: "120px 24px 80px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Breadcrumbs */}
        <nav style={{ fontSize: "0.875rem", color: "#666", marginBottom: "32px" }} data-testid="breadcrumbs">
          <Link to="/" style={{ color: "#C89EC7", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <Link to={`/category/${product.category}`} style={{ color: "#C89EC7", textDecoration: "none", textTransform: "capitalize" }}>{product.category}</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span>{product.name}</span>
        </nav>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "64px" }}>
          {/* Product Images */}
          <div>
            <div style={{ borderRadius: "20px", overflow: "hidden", marginBottom: "24px", position: "relative", background: "#F9F9F9" }}>
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                data-testid="main-product-image"
                className="product-image-hover"
                style={{ width: "100%", height: "500px", objectFit: "cover" }}
              />
              <div className="shimmer-effect"></div>
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
                      transition: "all 0.3s ease",
                      transform: selectedImage === index ? "scale(1.05)" : "scale(1)"
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
              {product.collection && (
                <span style={{ marginLeft: "8px", background: "#FFD700", color: "#000", padding: "6px 16px", borderRadius: "20px", fontSize: "0.875rem", fontWeight: "600", textTransform: "capitalize" }}>
                  {product.collection} Collection
                </span>
              )}
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
              product.stock < 5 ? (
                <p style={{ color: "#FF6B6B", fontSize: "1rem", marginBottom: "24px", fontWeight: "600" }}>
                  🔥 Only {product.stock} left in stock - Order soon!
                </p>
              ) : (
                <p style={{ color: "#4CAF50", fontSize: "1rem", marginBottom: "24px" }}>✓ In Stock ({product.stock} available)</p>
              )
            ) : (
              <p style={{ color: "#F44336", fontSize: "1rem", marginBottom: "24px" }}>✗ Out of Stock</p>
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
                    fontWeight: "600",
                    transition: "all 0.3s ease"
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
                    fontWeight: "600",
                    transition: "all 0.3s ease"
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}>
              <button
                onClick={addToCart}
                data-testid="add-to-cart-btn"
                disabled={product.stock === 0}
                className="btn-primary"
                style={{
                  flex: 1,
                  minWidth: "200px",
                  background: product.stock === 0 ? "#CCC" : "linear-gradient(135deg, #E6BBE2 0%, #C89EC7 100%)",
                  cursor: product.stock === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  fontSize: "1.125rem"
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
                  borderRadius: "50px",
                  padding: "14px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.3s ease"
                }}
              >
                <Heart size={20} fill={wishlist.includes(id) ? "white" : "none"} />
                Wishlist
              </button>

              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  data-testid="share-btn"
                  style={{
                    background: "white",
                    color: "#E6BBE2",
                    border: "2px solid #E6BBE2",
                    borderRadius: "50px",
                    padding: "14px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}
                >
                  <Share2 size={20} />
                  Share
                </button>

                {showShareMenu && (
                  <div style={{ position: "absolute", top: "60px", right: 0, background: "white", borderRadius: "12px", padding: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", zIndex: 100, minWidth: "200px" }}>
                    <button onClick={() => shareProduct('facebook')} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px", border: "none", background: "none", cursor: "pointer", textAlign: "left", borderRadius: "8px", transition: "background 0.3s" }}>
                      <Facebook size={20} color="#1877F2" />
                      <span>Facebook</span>
                    </button>
                    <button onClick={() => shareProduct('twitter')} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px", border: "none", background: "none", cursor: "pointer", textAlign: "left", borderRadius: "8px" }}>
                      <Twitter size={20} color="#1DA1F2" />
                      <span>Twitter</span>
                    </button>
                    <button onClick={() => shareProduct('instagram')} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px", border: "none", background: "none", cursor: "pointer", textAlign: "left", borderRadius: "8px" }}>
                      <Instagram size={20} color="#E4405F" />
                      <span>Instagram</span>
                    </button>
                    <button onClick={() => shareProduct('whatsapp')} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px", border: "none", background: "none", cursor: "pointer", textAlign: "left", borderRadius: "8px" }}>
                      <span style={{ fontSize: "20px" }}>💬</span>
                      <span>WhatsApp</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Product Tabs */}
            <Tabs defaultValue="details" style={{ marginTop: "48px" }}>
              <TabsList style={{ display: "flex", gap: "8px", borderBottom: "2px solid #E5E5E5", marginBottom: "24px" }}>
                <TabsTrigger value="details" data-testid="details-tab">Details</TabsTrigger>
                <TabsTrigger value="care" data-testid="care-tab">Care Instructions</TabsTrigger>
                <TabsTrigger value="shipping" data-testid="shipping-tab">Shipping & Returns</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div style={{ padding: "24px", background: "#F9F9F9", borderRadius: "12px" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "16px" }}>Product Details</h3>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #E5E5E5", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#666" }}>Category:</span>
                      <span style={{ fontWeight: "600", textTransform: "capitalize" }}>{product.category}</span>
                    </li>
                    {product.collection && (
                      <li style={{ padding: "12px 0", borderBottom: "1px solid #E5E5E5", display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#666" }}>Collection:</span>
                        <span style={{ fontWeight: "600", textTransform: "capitalize" }}>{product.collection}</span>
                      </li>
                    )}
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #E5E5E5", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#666" }}>Material:</span>
                      <span style={{ fontWeight: "600" }}>Premium Alloy & Crystals</span>
                    </li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #E5E5E5", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#666" }}>Finish:</span>
                      <span style={{ fontWeight: "600" }}>Rose Gold Plated</span>
                    </li>
                    <li style={{ padding: "12px 0", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#666" }}>SKU:</span>
                      <span style={{ fontWeight: "600" }}>{product.id.substring(0, 8).toUpperCase()}</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="care">
                <div style={{ padding: "24px", background: "#F9F9F9", borderRadius: "12px" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "16px" }}>Care Instructions</h3>
                  <ul style={{ lineHeight: "2", color: "#666", paddingLeft: "20px" }}>
                    <li>Store in a dry, airtight box when not in use</li>
                    <li>Avoid direct contact with perfumes, lotions, and chemicals</li>
                    <li>Remove jewelry before swimming, bathing, or exercising</li>
                    <li>Clean gently with a soft, dry cloth</li>
                    <li>Handle with love and care to maintain its sparkle ✨</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="shipping">
                <div style={{ padding: "24px", background: "#F9F9F9", borderRadius: "12px" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "16px" }}>Shipping & Returns</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <Truck size={24} color="#C89EC7" />
                      <div>
                        <h4 style={{ fontWeight: "600", marginBottom: "8px" }}>Free Shipping</h4>
                        <p style={{ color: "#666", lineHeight: "1.6" }}>Free shipping on all orders above ₹999. Delivery within 5-7 business days.</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <Package size={24} color="#C89EC7" />
                      <div>
                        <h4 style={{ fontWeight: "600", marginBottom: "8px" }}>7-Day Return Policy</h4>
                        <p style={{ color: "#666", lineHeight: "1.6" }}>Not satisfied? Return within 7 days for a full refund. Product must be unused and in original packaging.</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <Shield size={24} color="#C89EC7" />
                      <div>
                        <h4 style={{ fontWeight: "600", marginBottom: "8px" }}>Secure Packaging</h4>
                        <p style={{ color: "#666", lineHeight: "1.6" }}>All items are carefully packaged in elegant gift boxes to ensure safe delivery.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Style Inspiration Section */}
        <div style={{ marginTop: "80px" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "16px", textAlign: "center" }}>How to Style It</h2>
          <p style={{ fontSize: "1.125rem", color: "#666", textAlign: "center", marginBottom: "48px" }}>Get inspired by these looks featuring similar pieces</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            <div style={{ borderRadius: "16px", overflow: "hidden", position: "relative", height: "400px" }}>
              <img src="https://images.unsplash.com/photo-1755536220517-18ca6c9a2971?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxmZW1pbmluZSUyMGVsZWdhbnR8ZW58MHx8fHwxNzYwNjkwMzk4fDA&ixlib=rb-4.1.0&q=85" alt="Style 1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: "16px", left: "16px", background: "rgba(255,255,255,0.9)", padding: "12px 20px", borderRadius: "8px" }}>
                <p style={{ fontWeight: "600" }}>K-Pop Street Style</p>
              </div>
            </div>
            <div style={{ borderRadius: "16px", overflow: "hidden", position: "relative", height: "400px" }}>
              <img src="https://images.unsplash.com/photo-1755536219951-70e9c1933fe3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHw0fHxmZW1pbmluZSUyMGVsZWdhbnR8ZW58MHx8fHwxNzYwNjkwMzk4fDA&ixlib=rb-4.1.0&q=85" alt="Style 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: "16px", left: "16px", background: "rgba(255,255,255,0.9)", padding: "12px 20px", borderRadius: "8px" }}>
                <p style={{ fontWeight: "600" }}>Everyday Elegance</p>
              </div>
            </div>
            <div style={{ borderRadius: "16px", overflow: "hidden", position: "relative", height: "400px" }}>
              <img src="https://images.unsplash.com/photo-1727784892059-c85b4d9f763c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85" alt="Style 3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: "16px", left: "16px", background: "rgba(255,255,255,0.9)", padding: "12px 20px", borderRadius: "8px" }}>
                <p style={{ fontWeight: "600" }}>Special Occasions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: "80px" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "48px", textAlign: "center" }}>You May Also Like</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="product-card" style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img src={relatedProduct.images[0]} alt={relatedProduct.name} />
                  </div>
                  <div style={{ padding: "20px" }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "8px" }}>{relatedProduct.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} fill="#FFD700" color="#FFD700" />
                      ))}
                    </div>
                    <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#C89EC7" }}>₹{relatedProduct.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailEnhanced;
