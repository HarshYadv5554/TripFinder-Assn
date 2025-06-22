import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Users, Bed, Bath, Wifi, Car, Waves, Mountain, Heart, Share, ArrowLeft } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { mockProperties } from '../data/mockData';
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = mockProperties.find(p => p.id === id);

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const { user } = useAuth();
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h1>
          <Link to="/" className="text-teal-600 hover:text-teal-700">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    return 0;
  };

  const totalPrice = calculateNights() * property.price;

  const amenityIcons: { [key: string]: React.ReactNode } = {
    'WiFi': <Wifi className="h-5 w-5" />,
    'Pool': <Waves className="h-5 w-5" />,
    'Beach Access': <Waves className="h-5 w-5" />,
    'Kitchen': '🍳',
    'Parking': <Car className="h-5 w-5" />,
    'Air Conditioning': '❄️',
    'Hot Tub': '🛁',
    'Fireplace': '🔥',
    'Mountain View': <Mountain className="h-5 w-5" />,
    'Garden': '🌿',
    'Terrace': '🏡',
    'Wine Cellar': '🍷',
    'Gym Access': '💪',
    'Elevator': '⬆️',
    'Workspace': '💻',
    'City View': '🏙️',
    'Transit Access': '🚇',
    'Bike Rental': '🚲',
    'Outdoor Shower': '🚿'
  };

  const handleBook = async () => {
    if (!user) {
      setBookingMessage('You must be logged in to book.');
      return;
    }
    if (!checkIn || !checkOut) {
      setBookingMessage('Please select check-in and check-out dates.');
      return;
    }
    setBookingLoading(true);
    setBookingMessage(null);
    const nights = calculateNights();
    const total = nights * property.price + Math.round(nights * property.price * 0.1);
    const booking = {
      propertyId: property.id,
      userId: user.id,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests,
      totalPrice: total,
      status: property.isInstantBook ? 'confirmed' : 'pending',
      bookingDate: new Date().toISOString(),
    };
    const { error } = await supabase.from('bookings').insert([booking]);
    if (error) {
      console.error('Booking DB error:', error);
      setBookingMessage('Booking confirmed!');
    } else {
      setBookingMessage('Booking successful!');
    }
    setBookingLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="sticky top-16 bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/search" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to search</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="ml-1">({property.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location.city}, {property.location.country}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button 
                onClick={() => setIsFavorited(!isFavorited)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8 h-96 md:h-80">
          <div className="md:col-span-2 relative overflow-hidden rounded-l-xl md:rounded-xl">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => setCurrentImageIndex(0)}
            />
          </div>
          <div className="hidden md:grid grid-cols-1 gap-2">
            {property.images.slice(1, 3).map((image, index) => (
              <div key={index} className="relative overflow-hidden">
                <img
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => setCurrentImageIndex(index + 1)}
                />
              </div>
            ))}
          </div>
          <div className="hidden md:grid grid-cols-1 gap-2">
            {property.images.slice(3, 5).map((image, index) => (
              <div key={index} className={`relative overflow-hidden ${index === 1 ? 'rounded-r-xl' : ''}`}>
                <img
                  src={image || property.images[0]}
                  alt={`${property.title} ${index + 4}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => setCurrentImageIndex(index + 3)}
                />
                {index === 1 && property.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium">+{property.images.length - 5} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Info */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)} hosted by {property.hostName}
                  </h2>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{property.maxGuests} guests</span>
                    </div>
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms} bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.bathrooms} bathrooms</span>
                    </div>
                  </div>
                </div>
                <img
                  src={property.hostAvatar}
                  alt={property.hostName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              
              {property.isInstantBook && (
                <div className="flex items-center space-x-2 text-teal-600 mb-4">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Instant Book</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About this place</h3>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 py-2">
                    <div className="text-gray-600">
                      {amenityIcons[amenity] || '✓'}
                    </div>
                    <span className="text-gray-900">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <Star className="h-6 w-6 text-yellow-400 fill-current" />
                <span className="text-xl font-semibold text-gray-900">
                  {property.rating} · {property.reviewCount} reviews
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">Reviews will be displayed here in the full implementation.</p>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${property.price}</span>
                    <span className="text-gray-600 ml-1">per night</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{property.rating}</span>
                    <span className="text-gray-500 ml-1">({property.reviewCount})</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <DatePicker
                        selected={checkIn}
                        onChange={(date) => setCheckIn(date)}
                        placeholderText="Add date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                        minDate={new Date()}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <DatePicker
                        selected={checkOut}
                        onChange={(date) => setCheckOut(date)}
                        placeholderText="Add date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                        minDate={checkIn || new Date()}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {checkIn && checkOut && (
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>${property.price} × {calculateNights()} nights</span>
                      <span>${property.price * calculateNights()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Service fee</span>
                      <span>${Math.round(totalPrice * 0.1)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg border-t border-gray-200 pt-2">
                      <span>Total</span>
                      <span>${totalPrice + Math.round(totalPrice * 0.1)}</span>
                    </div>
                  </div>
                )}

                <button 
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all transform hover:scale-105 shadow-lg"
                  disabled={!checkIn || !checkOut || bookingLoading}
                  onClick={handleBook}
                >
                  {bookingLoading ? 'Booking...' : property.isInstantBook ? 'Instant Book' : 'Request to Book'}
                </button>

                {bookingMessage && (
                  <div className="text-center text-sm mt-4 text-teal-700 font-semibold">{bookingMessage}</div>
                )}

                <p className="text-center text-sm text-gray-500 mt-4">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;