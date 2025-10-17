import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) {
        setLoading(false);
        return;
      }

      const cartResponse = await axios.get(`${API}/cart/${sessionId}`);
      const items = cartResponse.data.items || [];

      // Fetch product details for each cart item
      const productDetails = {};
      for (const item of items) {
        try {
          const productResponse = await axios.get(`${API}/products/${item.product_id}`);
          productDetails[item.product_id] = productResponse.data;
        } catch (error) {
          console.error(`Error fetching product ${item.product_id}:`, error);
        }
      }

      setProducts(productDetails);
      setCartItems(items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const sessionId = localStorage.getItem("sessionId");
      await axios.put(`${API}/cart/${sessionId}/item/${productId}`, null, {
        params: { quantity: newQuantity }
      });
      
      setCartItems(cartItems.map(item => 
        item.product_id === productId ? { ...item, quantity: newQuantity } : item
      ));
      toast.success("Cart updated");
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart");
    }
  };

  const removeItem = async (productId) => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      await axios.delete(`${API}/cart/${sessionId}/item/${productId}`);
      
      setCartItems(cartItems.filter(item => item.product_id !== productId));
      toast.info("Item removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products[item.product_id];
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div>
        <Navigation />
        <div style={{ padding: "120px 24px", textAlign: "center" }}>
          <p style={{ fontSize: "1.25rem", color: "#666" }}>Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      
      <div style={{ padding: "120px 24px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "48px", textAlign: "center" }} data-testid="cart-title">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px" }} data-testid="empty-cart">
            <ShoppingBag size={80} color="#E6BBE2" style={{ margin: "0 auto 24px" }} />
            <h2 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "16px", color: "#666" }}>Your cart is empty</h2>
            <p style={{ fontSize: "1.125rem", color: "#888", marginBottom: "32px" }}>Add some beautiful pieces to get started!</p>
            <Link to="/" className="btn-primary" data-testid="continue-shopping-btn">Continue Shopping</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "48px" }}>
            {/* Cart Items */}
            <div>
              {cartItems.map((item) => {
                const product = products[item.product_id];
                if (!product) return null;

                return (
                  <div 
                    key={item.product_id} 
                    data-testid={`cart-item-${item.product_id}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "120px 1fr auto",
                      gap: "24px",
                      padding: "24px",
                      background: "white",
                      borderRadius: "16px",
                      marginBottom: "16px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }}
                  >
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "12px" }}
                      />
                    </Link>

                    <div>
                      <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "8px" }}>{product.name}</h3>
                      </Link>
                      <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "16px", textTransform: "capitalize" }}>
                        Category: {product.category}
                      </p>
                      <p style={{ fontSize: "1.5rem", fontWeight: "700", color: "#C89EC7" }}>
                        ₹{product.price}
                      </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }}>
                      <button
                        onClick={() => removeItem(item.product_id)}
                        data-testid={`remove-item-${item.product_id}`}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#F44336",
                          transition: "transform 0.3s ease"
                        }}
                      >
                        <Trash2 size={20} />
                      </button>

                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          data-testid={`decrease-quantity-${item.product_id}`}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            border: "2px solid #E6BBE2",
                            background: "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Minus size={16} />
                        </button>
                        <span style={{ fontSize: "1.125rem", fontWeight: "600", minWidth: "30px", textAlign: "center" }} data-testid={`quantity-${item.product_id}`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          data-testid={`increase-quantity-${item.product_id}`}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            border: "2px solid #E6BBE2",
                            background: "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div style={{ width: "350px" }}>
              <div style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", position: "sticky", top: "100px" }} data-testid="order-summary">
                <h2 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "24px" }}>Order Summary</h2>
                
                <div style={{ borderBottom: "1px solid #E5E5E5", paddingBottom: "16px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ color: "#666" }}>Subtotal:</span>
                    <span style={{ fontWeight: "600" }}>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ color: "#666" }}>Shipping:</span>
                    <span style={{ fontWeight: "600", color: "#4CAF50" }}>FREE</span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                  <span style={{ fontSize: "1.25rem", fontWeight: "600" }}>Total:</span>
                  <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#C89EC7" }} data-testid="cart-total">
                    ₹{calculateTotal().toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={proceedToCheckout}
                  data-testid="checkout-btn"
                  className="btn-primary"
                  style={{ width: "100%", fontSize: "1.125rem", marginBottom: "16px" }}
                >
                  Proceed to Checkout
                </button>

                <Link to="/" style={{ display: "block", textAlign: "center", color: "#C89EC7", textDecoration: "none", fontSize: "1rem" }} data-testid="continue-shopping-link">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
