
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative bg-cover bg-center h-[600px]" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556742111-a301076d9d18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')" }}>
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shop the Latest Trends
          </h1>
          <p className="text-xl text-white opacity-90 mb-8">
            Discover our curated collection of premium products designed for modern living.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
              <Link to="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
