
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingCart size={64} className="mx-auto mb-6 text-gray-400" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-5 bg-gray-50 p-4">
                <div className="col-span-2">
                  <span className="font-medium">Product</span>
                </div>
                <div className="text-center">
                  <span className="font-medium">Price</span>
                </div>
                <div className="text-center">
                  <span className="font-medium">Quantity</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">Total</span>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="p-4">
                    <div className="md:grid md:grid-cols-5 md:gap-6 flex flex-col space-y-4 md:space-y-0">
                      {/* Product */}
                      <div className="col-span-2 flex space-x-4">
                        <div className="w-20 h-20 rounded overflow-hidden shrink-0">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="font-medium hover:text-primary"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-500 capitalize">{item.product.category}</p>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700 text-sm flex items-center mt-2 md:hidden"
                          >
                            <Trash2 size={15} className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="md:text-center flex justify-between md:block">
                        <span className="text-sm font-medium md:hidden">Price:</span>
                        <span>${item.product.price.toFixed(2)}</span>
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:flex md:justify-center flex items-center justify-between">
                        <span className="text-sm font-medium mr-2 md:hidden">Quantity:</span>
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8"
                          >
                            <Minus size={14} />
                          </Button>
                          <Input 
                            type="number"
                            min="1" 
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value) && value > 0) {
                                updateQuantity(item.product.id, value);
                              }
                            }}
                            className="w-12 mx-2 h-8 text-center p-1"
                          />
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="md:text-right flex justify-between md:block">
                        <span className="text-sm font-medium md:hidden">Total:</span>
                        <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      {/* Remove - Desktop */}
                      <div className="hidden md:flex md:items-center md:justify-end">
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 my-6 pt-6">
                <div className="flex justify-between mb-6">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                
                <Button asChild className="w-full mb-4">
                  <Link to="/checkout">
                    Checkout <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
