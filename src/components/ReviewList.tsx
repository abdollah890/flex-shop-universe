
import { Star } from 'lucide-react';
import { Review } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-md">
        <p className="text-gray-600">No reviews yet. Be the first to leave a review!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center font-semibold mr-3">
                {review.userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{review.userName}</p>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
            </span>
          </div>
          <p className="mt-2 text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
