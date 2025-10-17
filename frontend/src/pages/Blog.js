import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 K-Pop Jewelry Trends You'll Love This Season",
    excerpt: "Discover the hottest K-Pop inspired jewelry trends that are taking the fashion world by storm. From chunky chains to delicate charms...",
    image: "https://images.unsplash.com/photo-1692421098809-6cdfcfea289a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxrb3JlYW4lMjBmYXNoaW9ufGVufDB8fHx8MTc2MDY5MDM5NHww&ixlib=rb-4.1.0&q=85",
    date: "January 15, 2025",
    category: "Trends"
  },
  {
    id: 2,
    title: "How to Style Layered Necklaces Like a Pro",
    excerpt: "Master the art of necklace layering with our expert tips. Learn how to mix lengths, textures, and styles for a perfectly curated look...",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85",
    date: "January 10, 2025",
    category: "Style Guide"
  },
  {
    id: 3,
    title: "Darjeeling's Emerging Fashion Scene — Local Meets Global",
    excerpt: "Explore how Darjeeling's unique cultural heritage is influencing contemporary fashion. From traditional craftsmanship to modern design...",
    image: "https://images.unsplash.com/photo-1727784892059-c85b4d9f763c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85",
    date: "January 5, 2025",
    category: "Culture"
  },
  {
    id: 4,
    title: "Behind the Bling: How We Curate Our Collection",
    excerpt: "Get an inside look at our curation process. Learn about the careful selection, quality checks, and inspiration behind every piece we offer...",
    image: "https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85",
    date: "December 28, 2024",
    category: "Behind the Scenes"
  },
  {
    id: 5,
    title: "Fashion Gifts That Make a Statement",
    excerpt: "Looking for the perfect gift? Discover our curated selection of jewelry pieces that speak volumes. From minimalist studs to bold statement necklaces...",
    image: "https://images.unsplash.com/photo-1755536219951-70e9c1933fe3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHw0fHxmZW1pbmluZSUyMGVsZWdhbnR8ZW58MHx8fHwxNzYwNjkwMzk4fDA&ixlib=rb-4.1.0&q=85",
    date: "December 20, 2024",
    category: "Gift Guide"
  },
  {
    id: 6,
    title: "Minimalist Jewelry: Less is More",
    excerpt: "Embrace the beauty of simplicity with our guide to minimalist jewelry. Discover how subtle pieces can make the biggest impact...",
    image: "https://images.unsplash.com/photo-1755536220517-18ca6c9a2971?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxmZW1pbmluZSUyMGVsZWdhbnR8ZW58MHx8fHwxNzYwNjkwMzk4fDA&ixlib=rb-4.1.0&q=85",
    date: "December 15, 2024",
    category: "Style Guide"
  }
];

const Blog = () => {
  return (
    <div>
      <Navigation />

      {/* Hero Section */}
      <div 
        style={{
          position: "relative",
          minHeight: "500px",
          overflow: "hidden",
          marginTop: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        data-testid="blog-hero"
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('https://images.unsplash.com/photo-1583209814683-c023dd293cc6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3N8ZW58MHx8fHwxNzYwNjkwMzg5fDA&ixlib=rb-4.1.0&q=85')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.4)" }}></div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(135deg, rgba(255, 240, 245, 0.8) 0%, rgba(230, 210, 255, 0.6) 100%)" }}></div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "24px" }}>
          <h1 style={{ fontSize: "4rem", fontWeight: "700", color: "#2D2D2D", marginBottom: "24px", fontFamily: "Playfair Display, serif" }} data-testid="blog-title">
            Style Journal
          </h1>
          <p style={{ fontSize: "1.5rem", color: "#555", maxWidth: "800px", margin: "0 auto" }}>
            Tips, Trends, and Inspirations from the World of Fashion Bling
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <section style={{ padding: "80px 24px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "32px" }} data-testid="blog-grid">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                data-testid={`blog-post-${post.id}`}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer"
                }}
                className="blog-card"
              >
                <div style={{ position: "relative", overflow: "hidden", height: "250px" }}>
                  <img 
                    src={post.image} 
                    alt={post.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    className="blog-card-image"
                  />
                  <div style={{ position: "absolute", top: "16px", left: "16px", background: "#E6BBE2", color: "white", padding: "6px 16px", borderRadius: "20px", fontSize: "0.875rem", fontWeight: "600" }}>
                    {post.category}
                  </div>
                </div>

                <div style={{ padding: "32px" }}>
                  <div style={{ display: "flex", gap: "16px", marginBottom: "16px", fontSize: "0.875rem", color: "#888" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <User size={16} />
                      <span>Team Riki's</span>
                    </div>
                  </div>

                  <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px", lineHeight: "1.3", fontFamily: "Playfair Display, serif" }}>
                    {post.title}
                  </h2>

                  <p style={{ fontSize: "1rem", color: "#666", lineHeight: "1.6", marginBottom: "24px" }}>
                    {post.excerpt}
                  </p>

                  <button 
                    className="read-more-btn"
                    style={{
                      background: "transparent",
                      color: "#C89EC7",
                      border: "none",
                      fontSize: "1rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "gap 0.3s ease"
                    }}
                  >
                    Read More <ArrowRight size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quote Section */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #FFF5F8 0%, #F5F0FF 100%)", textAlign: "center" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <blockquote style={{ fontSize: "2rem", fontWeight: "600", color: "#2D2D2D", lineHeight: "1.6", fontStyle: "italic", fontFamily: "Playfair Display, serif" }}>
            "Fashion is about expressing who you are without having to speak. Let your jewelry tell your story."
          </blockquote>
          <p style={{ marginTop: "24px", fontSize: "1.125rem", color: "#666" }}>— Riki's Fashion Philosophy</p>
        </div>
      </section>

      {/* Shop CTA */}
      <section style={{ padding: "80px 24px", backgroundColor: "white", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "24px", fontFamily: "Playfair Display, serif" }}>
            Ready to Find Your Perfect Piece?
          </h2>
          <p style={{ fontSize: "1.125rem", color: "#666", marginBottom: "32px" }}>
            Explore our curated collection of K-Pop inspired jewelry and timeless classics.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/category/kpop" className="btn-primary">
              Shop K-Pop Collection
            </Link>
            <Link to="/" className="btn-secondary">
              Browse All Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
        }
        .blog-card:hover .blog-card-image {
          transform: scale(1.1);
        }
        .read-more-btn:hover {
          gap: 12px;
        }
      `}</style>
    </div>
  );
};

export default Blog;
