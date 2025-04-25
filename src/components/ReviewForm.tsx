
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { Star } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ReviewFormProps {
  product: Product;
  onReviewSubmitted?: () => void;
}

const ReviewForm = ({ product, onReviewSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleStarClick = (value: number) => {
    setRating(value);
  };
  
  const handleStarHover = (value: number) => {
    setHoveredRating(value);
  };
  
  const handleStarLeave = () => {
    setHoveredRating(0);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "You need to select a rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }
    
    if (!comment.trim()) {
      toast({
        title: "Please add a comment",
        description: "You need to write a review comment before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    if (!userName.trim()) {
      toast({
        title: "Please enter your name",
        description: "You need to provide your name before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would send to MongoDB
      const newReview = {
        id: `r${Date.now()}`,
        userName,
        rating,
        comment,
        date: new Date().toISOString().split('T')[0],
        productId: product.id,
        userId: 'guest', // In a real app, this would be the actual user ID
      };
      
      console.log('Submitting review:', newReview);
      
      // Mock successful submission
      setTimeout(() => {
        setIsSubmitting(false);
        setRating(0);
        setComment('');
        setUserName('');
        
        toast({
          title: "Review submitted!",
          description: "Thank you for sharing your feedback.",
        });
        
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Failed to submit review",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6 border rounded-lg p-6">
      <h3 className="text-xl font-semibold">Write a Review</h3>
      
      <div>
        <label className="block text-sm font-medium mb-2">Your Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter your name"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
              className="focus:outline-none"
            >
              <Star
                size={24}
                className={`${
                  star <= (hoveredRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                } cursor-pointer`}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Your Review</label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product..."
          rows={4}
          required
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
};

export default ReviewForm;
