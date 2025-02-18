import React, { useState } from 'react';
import { 
  Square,
  DollarSign,  Users 
} from 'lucide-react';

interface Booth {
  id: string;
  number: string;
  section: string;
  size: 'small' | 'medium' | 'large';
  price: number;
  status: 'available' | 'reserved' | 'booked';
  position: {
    x: number;
    y: number;
  };
}

interface Section {
  id: string;
  name: string;
  description: string;
  booths: Booth[];
}

const BoothBooking: React.FC = () => {
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>('A');

  // Sample sections data
  const sections: Section[] = [
    {
      id: 'A',
      name: 'Premium Zone',
      description: 'High-traffic area near main entrance',
      booths: Array.from({ length: 20 }, (_, i) => ({
        id: `A${i + 1}`,
        number: `A${i + 1}`,
        section: 'A',
        size: i < 5 ? 'large' : i < 12 ? 'medium' : 'small',
        price: i < 5 ? 2500 : i < 12 ? 1800 : 1200,
        status: Math.random() > 0.7 ? 'booked' : 'available',
        position: {
          x: (i % 5) * 100,
          y: Math.floor(i / 5) * 100
        }
      }))
    },
    {
      id: 'B',
      name: 'Central Zone',
      description: 'Central location with steady traffic',
      booths: Array.from({ length: 15 }, (_, i) => ({
        id: `B${i + 1}`,
        number: `B${i + 1}`,
        section: 'B',
        size: i < 3 ? 'large' : i < 8 ? 'medium' : 'small',
        price: i < 3 ? 2200 : i < 8 ? 1500 : 1000,
        status: Math.random() > 0.6 ? 'booked' : 'available',
        position: {
          x: (i % 5) * 100,
          y: Math.floor(i / 5) * 100
        }
      }))
    }
  ];

  const getBoothColor = (status: Booth['status'], isSelected: boolean) => {
    if (isSelected) return 'bg-blue-600 border-blue-500';
    switch (status) {
      case 'available':
        return 'bg-gray-800 border-gray-700 hover:border-blue-500';
      case 'reserved':
        return 'bg-yellow-600/20 border-yellow-500';
      case 'booked':
        return 'bg-gray-700/50 border-gray-600';
      default:
        return 'bg-gray-800 border-gray-700';
    }
  };

  const getBoothSize = (size: Booth['size']) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2';
      case 'medium':
        return 'col-span-2';
      default:
        return '';
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Floor Plan */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Floor Plan</h2>
            
            {/* Section Tabs */}
            <div className="flex space-x-4 mb-6">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Section {section.id}
                </button>
              ))}
            </div>

            {/* Booth Grid */}
            <div className="grid grid-cols-5 gap-4">
              {sections
                .find(s => s.id === selectedSection)
                ?.booths.map(booth => (
                  <div
                    key={booth.id}
                    className={`${getBoothSize(booth.size)} aspect-square`}
                  >
                    <button
                      onClick={() => booth.status === 'available' && setSelectedBooth(booth)}
                      disabled={booth.status === 'booked'}
                      className={`w-full h-full rounded-lg border ${getBoothColor(
                        booth.status,
                        selectedBooth?.id === booth.id
                      )} transition-colors p-2 flex flex-col items-center justify-center`}
                    >
                      <span className="text-white font-medium">{booth.number}</span>
                      <span className="text-sm text-gray-400">{booth.size}</span>
                      {booth.status === 'booked' && (
                        <span className="text-xs text-gray-500 mt-1">Booked</span>
                      )}
                    </button>
                  </div>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-800 border border-gray-700 rounded mr-2" />
                <span className="text-gray-400">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-600 border border-blue-500 rounded mr-2" />
                <span className="text-gray-400">Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-700/50 border border-gray-600 rounded mr-2" />
                <span className="text-gray-400">Booked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="space-y-6">
          {selectedBooth ? (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Booking Details</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Booth Number</span>
                  <span className="text-white font-medium">{selectedBooth.number}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Section</span>
                  <span className="text-white font-medium">
                    {sections.find(s => s.id === selectedBooth.section)?.name}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Size</span>
                  <span className="text-white font-medium capitalize">
                    {selectedBooth.size}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Price</span>
                  <span className="text-white font-medium">
                    ${selectedBooth.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Proceed to Book
              </button>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-center text-gray-400">
                <Square className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                <p>Select a booth to view details</p>
              </div>
            </div>
          )}

          {/* Section Info */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Section Information</h3>
            <div className="space-y-4">
              <p className="text-gray-400">
                {sections.find(s => s.id === selectedSection)?.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <Users className="w-5 h-5 text-blue-400 mb-2" />
                  <span className="block text-sm text-gray-400">Average Traffic</span>
                  <span className="text-white font-medium">2,500/day</span>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <DollarSign className="w-5 h-5 text-green-400 mb-2" />
                  <span className="block text-sm text-gray-400">Avg. Sales</span>
                  <span className="text-white font-medium">$5,000/day</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoothBooking;