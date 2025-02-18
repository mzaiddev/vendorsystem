import React, { useState } from 'react';
import { 
 Box, Package, ArrowRight, Search, BarChart2 
} from 'lucide-react';

interface StorageUnit {
  id: string;
  name: string;
  type: 'shelf' | 'rack' | 'bulk';
  status: 'available' | 'partial' | 'full';
  capacity: {
    total: number;
    used: number;
  };
  items: StorageItem[];
  location: {
    zone: string;
    aisle: string;
    level: number;
  };
}

interface StorageItem {
  productId: string;
  name: string;
  quantity: number;
  expoId?: string;
}

const WarehouseManagement: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<StorageUnit | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoneFilter, setZoneFilter] = useState('all');

  const storageUnits: StorageUnit[] = [
    {
      id: '1',
      name: 'Storage Unit A1',
      type: 'rack',
      status: 'partial',
      capacity: {
        total: 100,
        used: 65
      },
      items: [
        {
          productId: '1',
          name: 'Kashmiri Carpet',
          quantity: 5,
          expoId: 'EXPO123'
        },
        {
          productId: '2',
          name: 'Pashmina Shawls',
          quantity: 20
        }
      ],
      location: {
        zone: 'A',
        aisle: '1',
        level: 2
      }
    }
  ];

  const zones = ['all', 'A', 'B', 'C', 'D'];

  const getStatusColor = (status: StorageUnit['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/20 text-green-400';
      case 'partial':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'full':
        return 'bg-red-500/20 text-red-400';
    }
  };

  const getCapacityColor = (percentage: number) => {
    if (percentage < 50) return 'text-green-400';
    if (percentage < 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="p-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Storage Units</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
            <Box className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Capacity Used</p>
              <p className="text-2xl font-bold text-yellow-400">75%</p>
            </div>
            <BarChart2 className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Items Stored</p>
              <p className="text-2xl font-bold text-white">1,245</p>
            </div>
            <Package className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search storage units or items..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
          >
            {zones.map(zone => (
              <option key={zone} value={zone}>
                {zone === 'all' ? 'All Zones' : `Zone ${zone}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Storage Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storageUnits.map(unit => (
          <div
            key={unit.id}
            onClick={() => setSelectedUnit(unit)}
            className={`bg-gray-800 rounded-lg p-6 border cursor-pointer transition-colors ${
              selectedUnit?.id === unit.id
                ? 'border-blue-500'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{unit.name}</h3>
                <p className="text-gray-400">Type: {unit.type}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(unit.status)}`}>
                {unit.status}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-400 mb-1">Capacity</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{ width: `${(unit.capacity.used / unit.capacity.total) * 100}%` }}
                  />
                </div>
                <p className="text-sm mt-1">
                  <span className={getCapacityColor((unit.capacity.used / unit.capacity.total) * 100)}>
                    {unit.capacity.used}
                  </span>
                  <span className="text-gray-400">
                    {' '}/ {unit.capacity.total} units
                  </span>
                </p>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Location:</span>
                <span>Zone {unit.location.zone}, Aisle {unit.location.aisle}, Level {unit.location.level}</span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Items Stored:</span>
                <span>{unit.items.length}</span>
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center justify-center">
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarehouseManagement;