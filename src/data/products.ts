
import { Product, Category } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Canceling Headphones",
    description: "Premium wireless headphones with active noise cancellation for an immersive audio experience. Features 30-hour battery life and comfortable over-ear design.",
    price: 249.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "electronics",
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: [
      {
        id: "r1",
        userName: "AudioPhile",
        rating: 5,
        comment: "Best headphones I've ever owned. The noise cancellation is exceptional!",
        date: "2023-10-15"
      },
      {
        id: "r2",
        userName: "MusicLover",
        rating: 4.5,
        comment: "Great sound quality and comfortable for long listening sessions.",
        date: "2023-09-22"
      }
    ]
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Track your workouts, heart rate, sleep, and more with this advanced fitness watch. Water-resistant with a 7-day battery life.",
    price: 179.99,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "electronics",
    inStock: true,
    featured: true,
    rating: 4.5,
    reviews: [
      {
        id: "r3",
        userName: "FitnessGuru",
        rating: 5,
        comment: "Tracks everything I need and the battery lasts for days!",
        date: "2023-10-05"
      }
    ]
  },
  {
    id: "3",
    name: "Premium Coffee Maker",
    description: "Brew barista-quality coffee at home with this premium coffee maker. Features programmable settings and a built-in grinder.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1572119865084-43c285814d63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "home",
    inStock: true,
    rating: 4.2,
    reviews: []
  },
  {
    id: "4",
    name: "Designer Leather Handbag",
    description: "Elegant leather handbag with multiple compartments and adjustable strap. Perfect for work or evening outings.",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "fashion",
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: []
  },
  {
    id: "5",
    name: "Organic Skincare Set",
    description: "Complete skincare routine with all-natural, organic ingredients. Includes cleanser, toner, moisturizer, and serum.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "beauty",
    inStock: true,
    rating: 4.9,
    reviews: []
  },
  {
    id: "6",
    name: "Ultra-Thin Laptop",
    description: "Powerful, lightweight laptop with 14-hour battery life. Features a vibrant 4K display and fast performance.",
    price: 1299.99,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "electronics",
    inStock: true,
    rating: 4.6,
    reviews: []
  }
];

export const categories: Category[] = [
  {
    id: "c1",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "c2",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "c3",
    name: "Home",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "c4",
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category.toLowerCase());
};
