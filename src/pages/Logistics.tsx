import React, { useState } from 'react';
import { 
  Truck, Package, Warehouse, Clock, 
  FileText, MapPin, Calendar,
  ArrowRight, CheckCircle, AlertTriangle 
} from 'lucide-react';

interface ShipmentStatus {
  id: string;
  expoName: string;
  origin: string;
  destination: string;
  status: 'preparing' | 'in-transit' | 'customs' | 'delivered' | 'stored';
  trackingNumber: string;
  eta: Date;
  items: {
    productId: string;
    name: string;
    quantity: number;
  }[];
  documents: {
    type: string;
    status: 'pending' | 'approved' | 'rejected';
  }[];
}

const LogisticsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pre-expo' | 'current' | 'post-expo'>('pre-expo');
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);

  // Sample shipment data
  const shipments: ShipmentStatus[] = [
    {
      id: '1',
      expoName: 'NY International Gift Fair',
      origin: 'Srinagar, Kashmir',
      destination: 'New York, USA',
      status: 'in-transit',
      trackingNumber: 'SHIP123456',
      eta: new Date('2025-03-10'),
      items: [
        { productId: '1', name: 'Kashmiri Carpet', quantity: 15 },
        { productId: '2', name: 'Pashmina Shawls', quantity: 30 }
      ],
      documents: [
        { type: 'Commercial Invoice', status: 'approved' },
        { type: 'Customs Declaration', status: 'approved' },
        { type: 'Certificate of Origin', status: 'approved' }
      ]
    }
  ];

  const getStatusColor = (status: ShipmentStatus['status']) => {
    switch (status) {
      case 'preparing':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'in-transit':
        return 'bg-blue-500/20 text-blue-400';
      case 'customs':
        return 'bg-purple-500/20 text-purple-400';
      case 'delivered':
        return 'bg-green-500/20 text-green-400';
      case 'stored':
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getDocumentStatusIcon = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'rejected':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div className="p-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Active Shipments</p>
              <p className="text-2xl font-bold text-white">8</p>
            </div>
            <Truck className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">In Customs</p>
              <p className="text-2xl font-bold text-purple-400">3</p>
            </div>
            <FileText className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Stored Items</p>
              <p className="text-2xl font-bold text-white">245</p>
            </div>
            <Warehouse className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Pending Docs</p>
              <p className="text-2xl font-bold text-yellow-400">5</p>
            </div>
            <FileText className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        {[
          { id: 'pre-expo', label: 'Pre-Expo Logistics', icon: Package },
          { id: 'current', label: 'Current Shipments', icon: Truck },
          { id: 'post-expo', label: 'Post-Expo Storage', icon: Warehouse }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'pre-expo' | 'current' | 'post-expo')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Shipments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipments List */}
        <div className="lg:col-span-2 space-y-4">
          {shipments.map(shipment => (
            <div
              key={shipment.id}
              onClick={() => setSelectedShipment(shipment.id)}
              className={`bg-gray-800 rounded-lg p-6 border cursor-pointer transition-colors ${
                selectedShipment === shipment.id
                  ? 'border-blue-500'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{shipment.expoName}</h3>
                  <p className="text-gray-400">Tracking: {shipment.trackingNumber}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(shipment.status)}`}>
                  {shipment.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>From: {shipment.origin}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>To: {shipment.destination}</span>
                </div>
              </div>

              <div className="flex items-center text-gray-300">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <span>ETA: {shipment.eta.toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Shipment Details */}
        {selectedShipment && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Shipment Items</h3>
              <div className="space-y-3">
                {shipments.find(s => s.id === selectedShipment)?.items.map(item => (
                  <div key={item.productId} className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-white font-medium">{item.quantity} units</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Documents</h3>
              <div className="space-y-3">
                {shipments.find(s => s.id === selectedShipment)?.documents.map((doc, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">{doc.type}</span>
                    {getDocumentStatusIcon(doc.status)}
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
              View Full Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogisticsManagement;