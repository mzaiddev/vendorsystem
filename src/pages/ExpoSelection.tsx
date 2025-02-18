import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';

const ExpoSelection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'handicrafts',
    'textiles',
    'jewelry',
    'home decor'
  ];

  const expos = [
    {
      id: 1,
      name: 'NY International Gift Fair',
      location: 'New York, NY',
      date: '2025-03-15',
      category: 'handicrafts',
      available_booths: 12,
      attendees: '5,000+',
      image: '/api/placeholder/400/200'
    },
    {
      id: 2,
      name: 'San Francisco Artisan Expo',
      location: 'San Francisco, CA',
      date: '2025-04-22',
      category: 'textiles',
      available_booths: 8,
      attendees: '3,000+',
      image: '/api/placeholder/400/200'
    }
  ];

  const filteredExpos = expos.filter(expo => 
    (selectedCategory === 'all' || expo.category === selectedCategory) &&
    (expo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     expo.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-900">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search expos by name or location..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Expo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExpos.map(expo => (
          <div key={expo.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden group hover:border-blue-500 transition-colors">
            <div className="relative">
              <img
                src={expo.image}
                alt={expo.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {expo.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">{expo.name}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{expo.location}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{new Date(expo.date).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{expo.attendees} expected attendees</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {expo.available_booths} booths available
                  </span>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpoSelection;