import React, { useState, useMemo } from 'react';
import SearchFilters from '../components/SearchFilters';
import PropertyCard from '../components/PropertyCard';
import { mockProperties } from '../data/mockData';
import { SearchFilters as SearchFiltersType } from '../types';
import { MapPin, SlidersHorizontal } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [filters, setFilters] = useState<SearchFiltersType>({
    location: '',
    checkIn: null,
    checkOut: null,
    guests: 1,
    priceRange: [0, 1000],
    propertyType: [],
    amenities: []
  });

  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'relevance'>('relevance');

  const filteredProperties = useMemo(() => {
    const results = mockProperties.filter(property => {
      // Location filter
      if (filters.location && !property.location.city.toLowerCase().includes(filters.location.toLowerCase()) && 
          !property.location.country.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Price filter
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }

      // Guests filter
      if (property.maxGuests < filters.guests) {
        return false;
      }

      // Property type filter
      if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.propertyType)) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          property.amenities.includes(amenity)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });

    // Sort results
    switch (sortBy) {
      case 'price':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return results;
  }, [filters, sortBy]);

  const handleSearch = () => {
    // Trigger search - in a real app, this would make an API call
    console.log('Searching with filters:', filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Filters */}
        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={handleSearch}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {filteredProperties.length} properties found
            </h1>
            {filters.location && (
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{filters.location}</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'relevance')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="relevance">Relevance</option>
              <option value="price">Price (Low to High)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.location || filters.propertyType.length > 0 || filters.amenities.length > 0 || 
          filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
          <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h3>
            <div className="flex flex-wrap gap-2">
              {filters.location && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-800">
                  Location: {filters.location}
                  <button
                    onClick={() => setFilters({...filters, location: ''})}
                    className="ml-2 text-teal-600 hover:text-teal-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.propertyType.map(type => (
                <span key={type} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                  <button
                    onClick={() => setFilters({
                      ...filters, 
                      propertyType: filters.propertyType.filter(t => t !== type)
                    })}
                    className="ml-2 text-orange-600 hover:text-orange-800"
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.amenities.map(amenity => (
                <span key={amenity} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-800">
                  {amenity}
                  <button
                    onClick={() => setFilters({
                      ...filters, 
                      amenities: filters.amenities.filter(a => a !== amenity)
                    })}
                    className="ml-2 text-pink-600 hover:text-pink-800"
                  >
                    ×
                  </button>
                </span>
              ))}
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  <button
                    onClick={() => setFilters({...filters, priceRange: [0, 1000]})}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Results Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <MapPin className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search filters to find more properties.
            </p>
            <button
              onClick={() => setFilters({
                location: '',
                checkIn: null,
                checkOut: null,
                guests: 1,
                priceRange: [0, 1000],
                propertyType: [],
                amenities: []
              })}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;