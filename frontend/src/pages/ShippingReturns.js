import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Package, RefreshCw, Shield, Truck } from "lucide-react";

const ShippingReturns = () => {
  return (
    <div>
      <Navigation />
      
      <div style={{ padding: "120px 24px 80px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "700", marginBottom: "16px", textAlign: "center", fontFamily: "Playfair Display, serif" }} data-testid="policy-title">
          Shipping & Returns Policy
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#666", textAlign: "center", marginBottom: "48px" }}>
          Last updated: January 2025
        </p>

        {/* Shipping Info */}
        <section style={{ marginBottom: "48px", padding: "32px", background: "#FFF5F8", borderRadius: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <Truck size={32} color="#C89EC7" />
            <h2 style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "Playfair Display, serif" }}>Shipping Information</h2>
          </div>
          
          <div style={{ fontSize: "1.125rem", color: "#555", lineHeight: "1.8" }}>
            <p style={{ marginBottom: "16px" }}><strong>Free Shipping:</strong> Enjoy free shipping on all orders above ₹999.</p>
            <p style={{ marginBottom: "16px" }}><strong>Standard Delivery:</strong> 3-7 business days within India</p>
            <p style={{ marginBottom: "16px" }}><strong>Express Delivery:</strong> 1-3 business days (additional charges apply)</p>
            <p style={{ marginBottom: "16px" }}><strong>Order Processing:</strong> Orders are processed within 1-2 business days</p>
            <p><strong>Tracking:</strong> You will receive a tracking number via email once your order ships</p>
          </div>
        </section>

        {/* Returns Info */}
        <section style={{ marginBottom: "48px", padding: "32px", background: "#F5F0FF", borderRadius: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <RefreshCw size={32} color="#C89EC7" />
            <h2 style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "Playfair Display, serif" }}>Returns Policy</h2>
          </div>
          
          <div style={{ fontSize: "1.125rem", color: "#555", lineHeight: "1.8" }}>
            <p style={{ marginBottom: "16px" }}><strong>Return Period:</strong> 7 days from the date of delivery</p>
            <p style={{ marginBottom: "16px" }}><strong>Condition:</strong> Items must be unused, unworn, and in original packaging with all tags attached</p>
            <p style={{ marginBottom: "16px" }}><strong>How to Return:</strong> Contact us at hello@rikisfashionbling.com with your order number</p>
            <p style={{ marginBottom: "16px" }}><strong>Refund Timeline:</strong> Refunds processed within 5-7 business days after inspection</p>
            <p><strong>Return Shipping:</strong> Customer is responsible for return shipping costs unless the item is defective</p>
          </div>
        </section>

        {/* Exchange Info */}
        <section style={{ marginBottom: "48px", padding: "32px", background: "white", borderRadius: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <Package size={32} color="#C89EC7" />
            <h2 style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "Playfair Display, serif" }}>Exchanges</h2>
          </div>
          
          <div style={{ fontSize: "1.125rem", color: "#555", lineHeight: "1.8" }}>
            <p style={{ marginBottom: "16px" }}>We offer exchanges for different sizes or styles within 7 days of delivery.</p>
            <p style={{ marginBottom: "16px" }}>To request an exchange, please contact our customer service team with your order details.</p>
            <p>Exchange shipping costs will be covered by Riki's Fashion Bling for the first exchange.</p>
          </div>
        </section>

        {/* Non-Returnable Items */}
        <section style={{ padding: "32px", background: "#FFF5F8", borderRadius: "16px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "24px", fontFamily: "Playfair Display, serif" }}>Non-Returnable Items</h2>
          
          <ul style={{ fontSize: "1.125rem", color: "#555", lineHeight: "1.8", paddingLeft: "24px" }}>
            <li style={{ marginBottom: "12px" }}>Earrings (for hygiene reasons)</li>
            <li style={{ marginBottom: "12px" }}>Sale or clearance items</li>
            <li style={{ marginBottom: "12px" }}>Items without original tags or packaging</li>
            <li>Custom or personalized jewelry</li>
          </ul>
        </section>

        <div style={{ marginTop: "48px", padding: "24px", background: "linear-gradient(135deg, #E6BBE2 0%, #C89EC7 100%)", borderRadius: "12px", textAlign: "center" }}>
          <p style={{ fontSize: "1.125rem", color: "white", marginBottom: "16px" }}>Have questions about shipping or returns?</p>
          <a href="/contact" className="btn-secondary" style={{ background: "white", color: "#C89EC7", border: "none" }}>Contact Us</a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShippingReturns;
