import { Property } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Oceanfront Villa',
    description: 'Stunning beachfront villa with panoramic ocean views, private pool, and direct beach access. Perfect for families or groups seeking luxury.',
    location: {
      city: 'Malibu',
      country: 'United States',
      coordinates: { lat: 34.0259, lng: -118.7798 }
    },
    price: 450,
    rating: 4.9,
    reviewCount: 127,
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Kitchen', 'Parking', 'Air Conditioning'],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    hostId: 'host1',
    hostName: 'Sarah Johnson',
    hostAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    hostJoinedDate: '2019-03-15',
    propertyType: 'villa',
    isInstantBook: true
  },
  {
    id: '2',
    title: 'Cozy Downtown Loft',
    description: 'Stylish industrial loft in the heart of downtown. Walking distance to restaurants, galleries, and nightlife.',
    location: {
      city: 'New York',
      country: 'United States',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    price: 180,
    rating: 4.7,
    reviewCount: 89,
    images: [
      'https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    amenities: ['WiFi', 'Kitchen', 'Workspace', 'Gym Access', 'Elevator'],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    hostId: 'host2',
    hostName: 'Michael Chen',
    hostAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    hostJoinedDate: '2020-08-22',
    propertyType: 'apartment',
    isInstantBook: false
  },
  {
    id: '3',
    title: 'Mountain Cabin Retreat',
    description: 'Peaceful cabin nestled in the mountains with hiking trails, fireplace, and breathtaking sunrise views.',
    location: {
      city: 'Aspen',
      country: 'United States',
      coordinates: { lat: 39.1911, lng: -106.8175 }
    },
    price: 280,
    rating: 4.8,
    reviewCount: 156,
    images: [
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    amenities: ['WiFi', 'Fireplace', 'Mountain View', 'Kitchen', 'Parking', 'Hot Tub'],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    hostId: 'host3',
    hostName: 'Emma Davis',
    hostAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    hostJoinedDate: '2018-11-07',
    propertyType: 'house',
    isInstantBook: true
  },
  {
    id: '4',
    title: 'Historic Tuscan Villa',
    description: 'Authentic 16th-century villa surrounded by vineyards and olive groves. Experience Italian countryside luxury.',
    location: {
      city: 'Florence',
      country: 'Italy',
      coordinates: { lat: 43.7696, lng: 11.2558 }
    },
    price: 350,
    rating: 4.9,
    reviewCount: 203,
    images: [
      'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    amenities: ['WiFi', 'Pool', 'Garden', 'Kitchen', 'Wine Cellar', 'Terrace'],
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    hostId: 'host4',
    hostName: 'Lorenzo Rossi',
    hostAvatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
    hostJoinedDate: '2017-05-20',
    propertyType: 'villa',
    isInstantBook: false
  },
  {
    id: '5',
    title: 'Tokyo Modern Studio',
    description: 'Minimalist studio in Shibuya district. Experience authentic Tokyo living with modern amenities.',
    location: {
      city: 'Tokyo',
      country: 'Japan',
      coordinates: { lat: 35.6762, lng: 139.6503 }
    },
    price: 120,
    rating: 4.6,
    reviewCount: 78,
    images: [
      'https://images.pexels.com/photos/2029734/pexels-photo-2029734.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2115218/pexels-photo-2115218.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    amenities: ['WiFi', 'Kitchen', 'Workspace', 'City View', 'Transit Access'],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    hostId: 'host5',
    hostName: 'Yuki Tanaka',
    hostAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    hostJoinedDate: '2021-02-10',
    propertyType: 'studio',
    isInstantBook: true
  },
  {
    id: '6',
    title: 'Beachfront Bungalow',
    description: 'Tropical paradise with direct beach access, hammocks, and sunset views. Perfect for romantic getaways.',
    location: {
      city: 'Bali',
      country: 'Indonesia',
      coordinates: { lat: -8.3405, lng: 115.0920 }
    },
    price: 95,
    rating: 4.8,
    reviewCount: 145,
    images: [
      'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2102566/pexels-photo-2102566.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2034333/pexels-photo-2034333.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    amenities: ['WiFi', 'Beach Access', 'Garden', 'Kitchen', 'Outdoor Shower', 'Bike Rental'],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    hostId: 'host6',
    hostName: 'Made Widiana',
    hostAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    hostJoinedDate: '2019-07-12',
    propertyType: 'house',
    isInstantBook: true
  }
];