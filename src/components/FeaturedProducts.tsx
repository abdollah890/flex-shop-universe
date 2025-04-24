
import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, we would fetch from an API
    // For now, we'll use our mock data
    setProducts(getFeaturedProducts());
  }, []);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Featured Products</h2>
        <p className="text-gray-600 text-center mb-8">
          Our handpicked selection of premium products just for you
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
