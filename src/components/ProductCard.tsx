
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg product-card-hover"
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 capitalize">{product.category}</span>
          {product.rating && (
            <div className="flex items-center">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-700 ml-1">{product.rating}</span>
            </div>
          )}
        </div>

        <h3 className="font-medium text-lg mt-2 line-clamp-1">{product.name}</h3>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
          
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            className="opacity-90 group-hover:opacity-100"
          >
            <ShoppingCart size={16} className="mr-1" /> Add
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
