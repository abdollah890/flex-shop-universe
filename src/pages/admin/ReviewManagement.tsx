
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash, Star, Check, X, Search } from 'lucide-react';

// Mock data for reviews
const mockReviews = [
  {
    id: "r1",
    userName: "AudioPhile",
    productId: "1",
    productName: "Wireless Noise-Canceling Headphones",
    rating: 5,
    comment: "Best headphones I've ever owned. The noise cancellation is exceptional!",
    date: "2023-10-15",
    userId: "user1"
  },
  {
    id: "r2",
    userName: "MusicLover",
    productId: "1",
    productName: "Wireless Noise-Canceling Headphones",
    rating: 4.5,
    comment: "Great sound quality and comfortable for long listening sessions.",
    date: "2023-09-22",
    userId: "user2"
  },
  {
    id: "r3",
    userName: "FitnessGuru",
    productId: "2",
    productName: "Smart Fitness Watch",
    rating: 5,
    comment: "Tracks everything I need and the battery lasts for days!",
    date: "2023-10-05",
    userId: "user3"
  }
];

const ReviewManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews] = useState(mockReviews);

  const filteredReviews = reviews.filter(review => 
    review.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApproveReview = (id: string) => {
    console.log('Approve review:', id);
    // In a real app, we would update in MongoDB
  };

  const handleRejectReview = (id: string) => {
    console.log('Reject review:', id);
    // In a real app, we would update in MongoDB
  };

  const handleDeleteReview = (id: string) => {
    console.log('Delete review:', id);
    // In a real app, we would delete from MongoDB
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Review Management</h1>
          <p className="text-gray-600 mt-1">Moderate customer reviews for your products</p>
        </div>

        <div className="mb-6 flex gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="text-sm text-gray-600">{review.date}</TableCell>
                  <TableCell className="font-medium">{review.userName}</TableCell>
                  <TableCell>{review.productName}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{review.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={review.comment}>
                    {review.comment}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleApproveReview(review.id)}>
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="sr-only">Approve</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleRejectReview(review.id)}>
                        <X className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Reject</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteReview(review.id)}>
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredReviews.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No reviews found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewManagement;
