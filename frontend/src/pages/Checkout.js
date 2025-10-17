import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle, CreditCard, Truck } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) {
        navigate("/cart");
        return;
      }

      const cartResponse = await axios.get(`${API}/cart/${sessionId}`);
      const items = cartResponse.data.items || [];

      if (items.length === 0) {
        navigate("/cart");
        return;
      }

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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products[item.product_id];
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const orderItems = cartItems.map(item => ({
        product_id: item.product_id,
        product_name: products[item.product_id]?.name || "Unknown",
        quantity: item.quantity,
        price: products[item.product_id]?.price || 0
      }));

      const orderData = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: formData.address,
        items: orderItems,
        total: calculateTotal()
      };

      const response = await axios.post(`${API}/orders`, orderData);
      setOrderId(response.data.id);
      
      // Clear cart
      const sessionId = localStorage.getItem("sessionId");
      await axios.delete(`${API}/cart/${sessionId}`);
      
      setOrderPlaced(true);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (loading) {
    return (
      <div>
        <Navigation />
        <div style={{ padding: "120px 24px", textAlign: "center" }}>
          <p style={{ fontSize: "1.25rem", color: "#666" }}>Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div>
        <Navigation />
        
        <div style={{ padding: "120px 24px 80px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }} data-testid="order-success">
          <CheckCircle size={80} color="#4CAF50" style={{ margin: "0 auto 24px" }} />
          <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "16px" }}>Order Placed!</h1>
          <p style={{ fontSize: "1.25rem", color: "#666", marginBottom: "32px" }}>
            Thank you for your order! Your order ID is <strong>{orderId.substring(0, 8).toUpperCase()}</strong>
          </p>
          <p style={{ fontSize: "1.125rem", color: "#666", marginBottom: "48px" }}>
            We'll send you a confirmation email shortly with your order details.
          </p>
          <button
            onClick={() => navigate("/")}
            data-testid="continue-shopping-btn"
            className="btn-primary"
            style={{ fontSize: "1.125rem" }}
          >
            Continue Shopping
          </button>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      
      <div style={{ padding: "120px 24px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "48px", textAlign: "center" }} data-testid="checkout-title">
          Checkout
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "48px" }}>
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} data-testid="checkout-form">
              <div style={{ background: "white", borderRadius: "16px", padding: "32px", marginBottom: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h2 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <Truck color="#C89EC7" /> Shipping Information
                </h2>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      data-testid="checkout-name-input"
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

                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      data-testid="checkout-email-input"
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

                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      data-testid="checkout-phone-input"
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

                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Shipping Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      data-testid="checkout-address-input"
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
                </div>
              </div>

              <div style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h2 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <CreditCard color="#C89EC7" /> Payment Method
                </h2>
                
                <div style={{ padding: "24px", background: "#FFF9F5", borderRadius: "12px", border: "2px dashed #E6BBE2" }}>
                  <p style={{ fontSize: "1.125rem", color: "#666", textAlign: "center" }}>
                    <strong>Mock Payment</strong> - This is a demo checkout. No actual payment will be processed.
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div style={{ width: "350px" }}>
            <div style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", position: "sticky", top: "100px" }} data-testid="checkout-summary">
              <h2 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "24px" }}>Order Summary</h2>
              
              <div style={{ marginBottom: "24px", maxHeight: "300px", overflowY: "auto" }}>
                {cartItems.map((item) => {
                  const product = products[item.product_id];
                  if (!product) return null;

                  return (
                    <div key={item.product_id} style={{ display: "flex", gap: "12px", marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #F5F5F5" }}>
                      <img src={product.images[0]} alt={product.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "0.875rem", fontWeight: "600", marginBottom: "4px" }}>{product.name}</p>
                        <p style={{ fontSize: "0.75rem", color: "#666" }}>Qty: {item.quantity}</p>
                      </div>
                      <p style={{ fontSize: "0.875rem", fontWeight: "700", color: "#C89EC7" }}>₹{(product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  );
                })}
              </div>

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
                <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#C89EC7" }} data-testid="checkout-total">
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleSubmit}
                data-testid="place-order-btn"
                className="btn-primary"
                style={{ width: "100%", fontSize: "1.125rem" }}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
