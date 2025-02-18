import React, { useState } from 'react';
import { Home, Calendar, Box, BarChart2, Truck, Settings, Bell } from 'lucide-react';
import ExpoSelection from './pages/ExpoSelection';
import VendorRegistration from './pages/Registration';
import VendorProfile from './pages/VendorProfile';
import BoothBooking from './pages/SectionBooking';
import LogisticsManagement from './pages/Logistics';
import WarehouseManagement from './pages/Warehouse-Management';
import InvitationLetterGenerator from './pages/Invitation-letter';
import ServiceCart from './pages/Payment-System';

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navigationItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'expos', label: 'Expos', icon: Calendar },
    { id: 'vendor', label: 'Vendor Registration', icon: Box },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'booking', label: 'Booth Booking', icon: BarChart2 },
    { id: 'logistics', label: 'Logistics', icon: Truck },
    { id: 'warehouse', label: 'Warehouse', icon: Truck },
    { id: 'invitation', label: 'Invitation Letter', icon: BarChart2 },
    { id: 'payment', label: 'Payment System', icon: Calendar },
    
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">Kashmir Crafts Hub</h1>
        </div>
        
        <nav className="mt-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-4 text-gray-300 hover:bg-gray-700 transition-colors ${
                  activeTab === item.id ? 'bg-blue-600 text-white' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="flex justify-between items-center px-8 py-4">
            <h2 className="text-2xl font-bold text-white">Welcome, Exhibitor</h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-300 hover:text-white">
                <Bell className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">KH</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-gray-300 text-green-400">
                Active Expos
              </h3>
              <p>West Coast USA</p>
              <div className="text-3xl font-bold text-blue-400">5</div>
              <p className="text-gray-400 mt-2"><span className='text-green-400'>Featuring: </span> Pashmina Fashion, Boutique Art, Sustainable Textiles
              .</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-gray-300 text-green-400">
                Active Expos
              </h3>
              <p>East Coast USA</p>
              <div className="text-3xl font-bold text-blue-400">7</div>
              <p className="text-gray-400 mt-2"><span className='text-green-400'>Featuring: </span>Paper Mâché, Handcrafted Décor, Luxury Artisanal Pieces</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-gray-300 text-green-400">
                Active Expos
              </h3>
              <p>Midwest USA</p>
              <div className="text-3xl font-bold text-blue-400">3</div>
              <p className="text-gray-400 mt-2"><span className='text-green-400'>Featuring: </span>Pashmina Shawls, Embroidery, Boutique Fashion.</p>
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            {/* <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Upcoming Expos</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View All
              </button>
            </div> */}
            
            {/* Content slots for child components */}
            <div id="dashboard-content" className="min-h-[400px]">
                {activeTab === 'home' && <div>Dashboard Content</div>}
                {activeTab === 'expos' && <ExpoSelection />}
                {activeTab === 'vendor' && <VendorRegistration/>}
                {activeTab === 'settings' && <VendorProfile/>}
                {activeTab === 'booking' && <BoothBooking/>}
                {activeTab === 'logistics' && <LogisticsManagement/>}
                {activeTab === 'warehouse' && <WarehouseManagement/>}
                {activeTab === 'invitation' && <InvitationLetterGenerator/>}
                {activeTab === 'payment' && <ServiceCart/>}
               
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;