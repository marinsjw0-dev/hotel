
export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  amenities: string[];
  category: 'Luxury' | 'Boutique' | 'Resort' | 'Budget';
}

export interface Booking {
  hotelId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
