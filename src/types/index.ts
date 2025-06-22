export interface Property {
  id: string;
  title: string;
  description: string;
  location: {
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  hostJoinedDate: string;
  propertyType: 'apartment' | 'house' | 'villa' | 'condo' | 'studio';
  isInstantBook: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  joinedDate: string;
  isHost: boolean;
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingDate: string;
}

export interface SearchFilters {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  priceRange: [number, number];
  propertyType: string[];
  amenities: string[];
}