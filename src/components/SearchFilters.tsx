import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, SlidersHorizontal } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { SearchFilters as SearchFiltersType } from '../types';
import "react-datepicker/dist/react-datepicker.css";

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onSearch: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const propertyTypes = ['apartment', 'house', 'villa', 'condo', 'studio'];
  const amenities = ['WiFi', 'Pool', 'Kitchen', 'Parking', 'Air Conditioning', 'Beach Access', 'Hot Tub', 'Fireplace'];

  const handleFilterChange = (key: keyof SearchFiltersType, value: SearchFiltersType[keyof SearchFiltersType]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      {/* Main Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Location */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Where</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search destinations"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
            <DatePicker
              selected={filters.checkIn}
              onChange={(date) => handleFilterChange('checkIn', date)}
              placeholderText="Add dates"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              minDate={new Date()}
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
            <DatePicker
              selected={filters.checkOut}
              onChange={(date) => handleFilterChange('checkOut', date)}
              placeholderText="Add dates"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              minDate={filters.checkIn || new Date()}
            />
          </div>
        </div>

        {/* Guests */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={filters.guests}
              onChange={(e) => handleFilterChange('guests', parseInt(e.target.value))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Search Button and Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>More filters</span>
        </button>

        <button
          onClick={onSearch}
          className="flex items-center space-x-2 px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Price Range (per night)</label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 1000])}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      const newTypes = filters.propertyType.includes(type)
                        ? filters.propertyType.filter(t => t !== type)
                        : [...filters.propertyType, type];
                      handleFilterChange('propertyType', newTypes);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.propertyType.includes(type)
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {amenities.map(amenity => (
                  <button
                    key={amenity}
                    onClick={() => {
                      const newAmenities = filters.amenities.includes(amenity)
                        ? filters.amenities.filter(a => a !== amenity)
                        : [...filters.amenities, amenity];
                      handleFilterChange('amenities', newAmenities);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.amenities.includes(amenity)
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;