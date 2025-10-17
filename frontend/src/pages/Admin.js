import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, Save, X, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "earrings",
    stock: 100,
    featured: false,
    collection: "",
    images: [""]
  });
  const [uploadingImages, setUploadingImages] = useState(false);

  const categories = ["earrings", "necklaces", "rings", "bracelets", "cosmetics"];
  const collections = ["kpop", "latest", "classics"];

  useEffect(() => {
    verifyAuthentication();
  }, []);

  const verifyAuthentication = async () => {
    const token = localStorage.getItem("adminToken");
    
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      await axios.get(`${API}/admin/verify`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsAuthenticated(true);
      fetchProducts();
    } catch (error) {
      console.error("Authentication failed:", error);
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;
    
    setUploadingImages(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    
    try {
      const response = await axios.post(`${API}/upload-image`, formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update the image URL in the form
      const newImages = [...formData.images];
      newImages[index] = response.data.url;
      setFormData({ ...formData, images: newImages });
      
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImages(false);
    }
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: formData.images.filter(img => img.trim() !== "")
      };

      if (editingId) {
        await axios.put(`${API}/products/${editingId}`, productData);
        toast.success("Product updated successfully!");
      } else {
        await axios.post(`${API}/products`, productData);
        toast.success("Product created successfully!");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock,
      featured: product.featured,
      collection: product.collection || "",
      images: product.images
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await axios.delete(`${API}/products/${id}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "earrings",
      stock: 100,
      featured: false,
      collection: "",
      images: [""]
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <Navigation />
      
      <div style={{ padding: "120px 24px 80px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "700" }} data-testid="admin-title">Admin Panel</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            data-testid="add-product-btn"
            className="btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            {showForm ? <X size={20} /> : <Plus size={20} />}
            {showForm ? "Cancel" : "Add Product"}
          </button>
        </div>

        {/* Product Form */}
        {showForm && (
          <div style={{ background: "white", borderRadius: "16px", padding: "32px", marginBottom: "48px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }} data-testid="product-form">
            <h2 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "24px" }}>
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  data-testid="product-name-input"
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #E5E5E5", fontSize: "1rem" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  data-testid="product-price-input"
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #E5E5E5", fontSize: "1rem" }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  data-testid="product-description-input"
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #E5E5E5", fontSize: "1rem" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  data-testid="product-category-select"
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #E5E5E5", fontSize: "1rem" }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Collection</label>
                <select
                  name="collection"
                  value={formData.collection}
                  onChange={handleInputChange}
                  data-testid="product-collection-select"
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #E5E5E5", fontSize: "1rem" }}
                >
                  <option value="">None</option>
                  {collections.map(col => (
                    <option key={col} value={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Stock *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  data-testid="product-stock-input"
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #E5E5E5", fontSize: "1rem" }}
                />
              </div>

              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    data-testid="product-featured-checkbox"
                  />
                  <span style={{ fontWeight: "600" }}>Featured Product</span>
                </label>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Product Images *</label>
                <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "12px" }}>Upload images from your computer or paste image URLs</p>
                {formData.images.map((image, index) => (
                  <div key={index} style={{ marginBottom: "16px", padding: "16px", background: "#F9F9F9", borderRadius: "12px" }}>
                    <div style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "8px" }}>
                          Option 1: Upload from Computer
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, e.target.files[0])}
                          disabled={uploadingImages}
                          data-testid={`product-image-file-${index}`}
                          style={{ 
                            width: "100%", 
                            padding: "12px", 
                            borderRadius: "8px", 
                            border: "2px solid #E5E5E5", 
                            fontSize: "1rem",
                            background: "white"
                          }}
                        />
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      <div style={{ flex: 1, height: "1px", background: "#E5E5E5" }}></div>
                      <span style={{ fontSize: "0.875rem", color: "#999" }}>OR</span>
                      <div style={{ flex: 1, height: "1px", background: "#E5E5E5" }}></div>
                    </div>
                    
                    <div style={{ marginBottom: "12px" }}>
                      <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "8px" }}>
                        Option 2: Paste Image URL
                      </label>
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        data-testid={`product-image-url-${index}`}
                        style={{ 
                          width: "100%", 
                          padding: "12px", 
                          borderRadius: "8px", 
                          border: "2px solid #E5E5E5", 
                          fontSize: "1rem" 
                        }}
                      />
                    </div>

                    {image && (
                      <div style={{ marginTop: "12px" }}>
                        <p style={{ fontSize: "0.875rem", fontWeight: "600", marginBottom: "8px" }}>Preview:</p>
                        <img 
                          src={image} 
                          alt={`Preview ${index + 1}`} 
                          style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    )}

                    <div style={{ marginTop: "12px", display: "flex", justifyContent: "flex-end" }}>
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(index)}
                          data-testid={`remove-image-${index}`}
                          style={{ padding: "8px 16px", background: "#F44336", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "0.875rem", fontWeight: "600" }}
                        >
                          <Trash2 size={16} style={{ display: "inline", marginRight: "6px" }} />
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  data-testid="add-image-field-btn"
                  className="btn-secondary"
                  style={{ marginTop: "8px" }}
                >
                  Add Another Image
                </button>
                {uploadingImages && (
                  <p style={{ marginTop: "12px", color: "#C89EC7", fontSize: "0.875rem" }}>Uploading image...</p>
                )}
              </div>

              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "16px" }}>
                <button type="submit" data-testid="save-product-btn" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Save size={18} />
                  {editingId ? "Update Product" : "Create Product"}
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div>
          <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "24px" }}>All Products ({products.length})</h2>
          
          <div style={{ display: "grid", gap: "16px" }}>
            {products.map((product) => (
              <div 
                key={product.id} 
                data-testid={`admin-product-${product.id}`}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "24px",
                  display: "grid",
                  gridTemplateColumns: "120px 1fr auto",
                  gap: "24px",
                  alignItems: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}
              >
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "12px" }}
                />
                
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "8px" }}>{product.name}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "8px" }}>{product.description.substring(0, 100)}...</p>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "#C89EC7" }}>₹{product.price}</span>
                    <span style={{ fontSize: "0.875rem", color: "#666", textTransform: "capitalize" }}>{product.category}</span>
                    <span style={{ fontSize: "0.875rem", color: "#666" }}>Stock: {product.stock}</span>
                    {product.featured && (
                      <span style={{ background: "#FFD700", color: "#000", padding: "4px 12px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "600" }}>
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => handleEdit(product)}
                    data-testid={`edit-product-${product.id}`}
                    style={{
                      background: "#E6BBE2",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: "600"
                    }}
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    data-testid={`delete-product-${product.id}`}
                    style={{
                      background: "#F44336",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: "600"
                    }}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
