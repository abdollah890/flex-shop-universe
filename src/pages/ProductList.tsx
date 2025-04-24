
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, getProductsByCategory } from '@/data/products';
import { Product } from '@/types';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

const ProductList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let result = categoryParam 
      ? getProductsByCategory(categoryParam) 
      : [...products];
    
    // Apply filters
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    if (inStockOnly) {
      result = result.filter(product => product.inStock);
    }
    
    setFilteredProducts(result);
  }, [categoryParam, priceRange, inStockOnly]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            {categoryParam ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}` : 'All Products'}
          </h1>
          
          <Button variant="outline" onClick={toggleFilters} className="md:hidden">
            <Filter size={18} className="mr-2" /> Filters
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filters */}
          {showFilters && (
            <div className="fixed inset-0 bg-white z-50 md:hidden p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button variant="ghost" size="icon" onClick={toggleFilters}>
                  <X size={24} />
                </Button>
              </div>
              
              <div className="space-y-8">
                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Price Range</h3>
                  <Slider
                    defaultValue={[0, 2000]}
                    min={0}
                    max={2000}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Availability */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Availability</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="inStock-mobile" 
                      checked={inStockOnly} 
                      onCheckedChange={(checked) => setInStockOnly(!!checked)} 
                    />
                    <Label htmlFor="inStock-mobile">In Stock Only</Label>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="w-full" onClick={toggleFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
          
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-white p-5 rounded-lg shadow-sm space-y-8">
              <h2 className="text-xl font-semibold">Filters</h2>
              
              {/* Price Range */}
              <div>
                <h3 className="text-lg font-medium mb-4">Price Range</h3>
                <Slider
                  defaultValue={[0, 2000]}
                  min={0}
                  max={2000}
                  step={10}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="mb-6"
                />
                <div className="flex items-center justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              {/* Availability */}
              <div>
                <h3 className="text-lg font-medium mb-4">Availability</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="inStock" 
                    checked={inStockOnly} 
                    onCheckedChange={(checked) => setInStockOnly(!!checked)} 
                  />
                  <Label htmlFor="inStock">In Stock Only</Label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductList;
