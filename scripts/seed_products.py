import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/backend/.env')

# Get REACT_APP_BACKEND_URL from frontend .env
with open('/app/frontend/.env', 'r') as f:
    for line in f:
        if line.startswith('REACT_APP_BACKEND_URL='):
            BACKEND_URL = line.split('=')[1].strip().strip('"')
            break

API = f"{BACKEND_URL}/api"

# Sample products data
products = [
    {
        "name": "Rose Gold Pearl Earrings",
        "description": "Elegant pearl earrings with rose gold finish, perfect for any occasion. Inspired by Korean minimalist design.",
        "price": 1299.00,
        "category": "earrings",
        "stock": 50,
        "featured": True,
        "collection": "classics",
        "images": [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85"
        ]
    },
    {
        "name": "K-Pop Diamond Studs",
        "description": "Trendy American Diamond studs as seen on your favorite K-Pop idols. Adds instant sparkle to your look.",
        "price": 899.00,
        "category": "earrings",
        "stock": 75,
        "featured": True,
        "collection": "kpop",
        "images": [
            "https://images.unsplash.com/photo-1692421098809-6cdfcfea289a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxrb3JlYW4lMjBmYXNoaW9ufGVufDB8fHx8MTc2MDY5MDM5NHww&ixlib=rb-4.1.0&q=85"
        ]
    },
    {
        "name": "Sapphire Statement Ring",
        "description": "Bold blue sapphire ring with intricate detailing. A perfect blend of elegance and modern style.",
        "price": 2499.00,
        "category": "rings",
        "stock": 30,
        "featured": True,
        "collection": "latest",
        "images": [
            "https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85"
        ]
    },
    {
        "name": "Delicate Chain Necklace",
        "description": "Minimalist chain necklace perfect for layering. Korean-inspired design that complements any outfit.",
        "price": 1599.00,
        "category": "necklaces",
        "stock": 60,
        "featured": False,
        "collection": "kpop",
        "images": [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85"
        ]
    },
    {
        "name": "Charm Bracelet Set",
        "description": "Set of 3 charm bracelets with heart and star pendants. Mix and match for your unique style.",
        "price": 1199.00,
        "category": "bracelets",
        "stock": 45,
        "featured": False,
        "collection": "latest",
        "images": [
            "https://images.unsplash.com/photo-1692421098809-6cdfcfea289a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxrb3JlYW4lMjBmYXNoaW9ufGVufDB8fHx8MTc2MDY5MDM5NHww&ixlib=rb-4.1.0&q=85"
        ]
    },
    {
        "name": "Korean Glow Serum",
        "description": "Luxury face serum with Korean ingredients for radiant, glowing skin. Perfect for daily skincare routine.",
        "price": 1899.00,
        "category": "cosmetics",
        "stock": 100,
        "featured": True,
        "collection": "latest",
        "images": [
            "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3N8ZW58MHx8fHwxNzYwNjkwMzg5fDA&ixlib=rb-4.1.0&q=85"
        ]
    },
    {
        "name": "Lip Tint Collection",
        "description": "Set of 5 long-lasting lip tints in trendy K-Beauty shades. Lightweight and moisturizing formula.",
        "price": 1499.00,
        "category": "cosmetics",
        "stock": 80,
        "featured": False,
        "collection": "kpop",
        "images": [
            "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxjb3NtZXRpY3N8ZW58MHx8fHwxNzYwNjkwMzg5fDA&ixlib=rb-4.1.0&q=85"
        ]
    },
    {
        "name": "Crystal Drop Earrings",
        "description": "Stunning crystal drop earrings that catch the light beautifully. Perfect for special occasions.",
        "price": 1799.00,
        "category": "earrings",
        "stock": 40,
        "featured": False,
        "collection": "classics",
        "images": [
            "https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85"
        ]
    },
    {
        "name": "Gold Infinity Necklace",
        "description": "Timeless infinity symbol necklace in gold finish. Represents eternal love and friendship.",
        "price": 1399.00,
        "category": "necklaces",
        "stock": 55,
        "featured": False,
        "collection": "classics",
        "images": [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85"
        ]
    },
    {
        "name": "Stackable Ring Set",
        "description": "Set of 5 delicate stackable rings. Mix metals and styles for a personalized look.",
        "price": 999.00,
        "category": "rings",
        "stock": 70,
        "featured": False,
        "collection": "kpop",
        "images": [
            "https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85"
        ]
    },
    {
        "name": "Makeup Brush Set",
        "description": "Professional 12-piece makeup brush set with vegan bristles. Essential for flawless makeup application.",
        "price": 2299.00,
        "category": "cosmetics",
        "stock": 50,
        "featured": False,
        "collection": "latest",
        "images": [
            "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxjb3NtZXRpY3N8ZW58MHx8fHwxNzYwNjkwMzg5fDA&ixlib=rb-4.1.0&q=85"
        ]
    },
    {
        "name": "Bohemian Layered Necklace",
        "description": "Multi-layer boho necklace with beads and charms. Adds a free-spirited touch to your ensemble.",
        "price": 1699.00,
        "category": "necklaces",
        "stock": 35,
        "featured": False,
        "collection": "latest",
        "images": [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHx8MTc2MDY5MDM4M3ww&ixlib=rb-4.1.0&q=85"
        ]
    }
]

def seed_products():
    print("Seeding products...")
    for product in products:
        try:
            response = requests.post(f"{API}/products", json=product)
            if response.status_code == 200:
                print(f"✓ Added: {product['name']}")
            else:
                print(f"✗ Failed to add: {product['name']} - {response.status_code}")
        except Exception as e:
            print(f"✗ Error adding {product['name']}: {str(e)}")
    
    print(f"\nSeeding complete! Added {len(products)} products.")

if __name__ == "__main__":
    seed_products()
