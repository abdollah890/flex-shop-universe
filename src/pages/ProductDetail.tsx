import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Star, Minus, Plus, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import AddReview from '@/components/AddReview';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(0); // Reset selected image
        
        // Get related products from the same category
        if (foundProduct.category) {
          const related = products
            .filter(p => p.category === foundProduct.category && p.id !== id)
            .slice(0, 3);
          setRelatedProducts(related);
        }
      }
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity(q => q + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const handleNewReview = () => {
    console.log('Review added, refreshing product data...');
  };

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/products" className="text-primary hover:underline">
            Back to all products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/products" className="flex items-center text-gray-600 hover:text-primary">
            <ArrowLeft size={16} className="mr-1" /> Back to Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded border-2 overflow-hidden ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <span className="text-sm text-gray-500 uppercase">{product.category}</span>
            <h1 className="text-3xl font-bold mt-1 mb-4">{product.name}</h1>
            
            {product.rating && (
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={`${i < Math.floor(product.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="ml-2 text-gray-600">{product.rating} Rating</span>
                {product.reviews && (
                  <span className="ml-2 text-gray-600">
                    ({product.reviews.length} Reviews)
                  </span>
                )}
              </div>
            )}
            
            <div className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</div>
            
            <p className="text-gray-700 mb-8">{product.description}</p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <Input 
                  type="number" 
                  min="1"
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 mx-2 text-center"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={incrementQuantity}
                >
                  <Plus size={16} />
                </Button>
              </div>
              
              <Button onClick={handleAddToCart} className="flex-1">
                <ShoppingCart size={18} className="mr-2" /> Add to Cart
              </Button>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <Tabs defaultValue="description">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="pt-4">
                  <div className="prose">
                    <p>{product.description}</p>
                    <ul className="list-disc pl-5 mt-4">
                      <li>High-quality materials</li>
                      <li>1-year warranty</li>
                      <li>Free shipping on orders over $50</li>
                      <li>30-day money back guarantee</li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="pt-4">
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {product.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{review.userName}</h3>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={`${i < Math.floor(review.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 mb-8">No reviews yet. Be the first to leave a review!</p>
                  )}
                  
                  <AddReview productId={product.id} onReviewAdded={handleNewReview} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold mb-6">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
