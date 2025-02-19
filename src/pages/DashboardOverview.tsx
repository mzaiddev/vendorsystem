import { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Bell, 
  Calendar, 
  Users, 
  ShoppingBag, 
  BarChart3, 
  Clock,
  CheckCircle2,
  Search
} from 'lucide-react';

const KashmirCraftsHubDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Activity Data
  const activityData = [
    {
      title: 'Booth Applications',
      value: '3 pending approvals',
      icon: <CheckCircle2 className="h-5 w-5 text-blue-500" />
    },
    {
      title: 'Visitor Inquiries',
      value: '27 new messages',
      change: 12,
      icon: <Users className="h-5 w-5 text-indigo-500" />
    },
    {
      title: 'Product Catalog',
      value: 'Last updated 5 days ago',
      icon: <ShoppingBag className="h-5 w-5 text-purple-500" />
    }
  ];

  // Analytics Data
  const analyticsData = [
    {
      label: 'Total Booth Visitors',
      value: '842',
      percentage: 15,
      isPositive: true
    },
    {
      label: 'Lead Generation',
      value: '156',
      percentage: 8,
      isPositive: true
    },
    {
      label: 'Engagement Rate',
      value: '34%',
      percentage: 5,
      isPositive: true
    },
    {
      label: 'Conversion Rate',
      value: '12.8%',
      percentage: 2,
      isPositive: false
    }
  ];

  // Product Popularity
  const productPopularity = [
    { name: 'Pashmina Shawls', percentage: 62 },
    { name: 'Paper Mâché Art', percentage: 28 },
    { name: 'Embroidered Items', percentage: 7 },
    { name: 'Other Products', percentage: 3 }
  ];

  // Deadline Data
  const deadlineData = [
    {
      event: 'San Francisco Artisan Expo',
      description: 'Booth setup deadline',
      daysLeft: 12,
      isUrgent: false
    },
    {
      event: 'Chicago Craft Festival',
      description: 'Registration closes',
      daysLeft: 8,
      isUrgent: false
    },
    {
      event: 'New York Luxury Market',
      description: 'Early bird discount ends',
      daysLeft: 1,
      isUrgent: true
    }
  ];

  // Recommendations
  const recommendationData = [
    {
      text: 'Complete your product catalog to increase visibility',
      completed: false
    },
    {
      text: 'Schedule 1:1 demo with potential buyers from West Coast expo',
      completed: false
    },
    {
      text: 'Update promotional materials for upcoming Midwest events',
      completed: true
    },
    {
      text: 'Submit logistics requirements for East Coast exhibitions',
      completed: false
    }
  ];

  // Expo cards data
  const expoData = [
    {
      region: 'West Coast USA',
      count: 5,
      featuring: 'Pashmina Fashion, Boutique Art, Sustainable Textiles'
    },
    {
      region: 'East Coast USA',
      count: 7,
      featuring: 'Paper Mâché, Handcrafted Décor, Luxury Artisanal Pieces'
    },
    {
      region: 'Midwest USA',
      count: 3,
      featuring: 'Pashmina Shawls, Embroidery, Boutique Fashion'
    }
  ];

  return (
    <div className="bg-slate-900 min-h-screen font-sans">


      {/* Main Content */}
      <div className="p-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative w-full md:w-72 group">
            <input
              type="text"
              placeholder="Search exhibitions..."
              className="w-full py-2.5 pl-10 pr-4 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-blue-400 transition-colors" size={18} />
          </div>
          <div className="flex gap-3 items-center">
            <select className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Regions</option>
              <option>West Coast</option>
              <option>East Coast</option>
              <option>Midwest</option>
            </select>
          </div>
        </div>
        
        {/* Expo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {expoData.map((expo, index) => (
            <div key={index} className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg">
              <div className="p-5">
                <h3 className="text-green-400 font-medium mb-1">Active Expos</h3>
                <h4 className="text-slate-300 mb-3">{expo.region}</h4>
                <p className="text-blue-400 text-4xl font-bold mb-3">{expo.count}</p>
                <p className="text-green-400 text-xs font-medium mb-1">Featuring:</p>
                <p className="text-slate-400 text-sm">{expo.featuring}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Content */}
        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
          <div className="border-b border-slate-700">
            <div className="flex items-center justify-between px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Dashboard Content</h2>
              <div className="flex items-center gap-3">
                <button className="p-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                  Last updated: Today, 10:45 AM
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex overflow-x-auto px-6">
              {["overview", "analytics", "deadlines", "recommendations"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-medium text-sm transition-colors relative whitespace-nowrap ${
                    activeTab === tab 
                      ? 'text-blue-400' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Recent Activity */}
                <div>
                  <h3 className="text-slate-200 font-medium mb-4">Recent Activity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activityData.map((item, index) => (
                      <div 
                        key={index} 
                        className="bg-slate-700/50 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="bg-slate-700 p-2 rounded-lg">
                            {item.icon}
                          </div>
                          {item.change && (
                            <div className={`flex items-center text-xs ${
                              item.change > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {item.change > 0 ? (
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 mr-1" />
                              )}
                              {Math.abs(item.change)}%
                            </div>
                          )}
                        </div>
                        <div className="mt-3">
                          <h4 className="text-slate-300 text-sm font-medium">{item.title}</h4>
                          <p className="text-slate-200 mt-1 font-semibold">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analytics Preview */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-slate-200 font-medium">Analytics Snapshot</h3>
                    <button 
                      onClick={() => setActiveTab('analytics')}
                      className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
                    >
                      View Details →
                    </button>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {analyticsData.slice(0, 4).map((item, index) => (
                        <div key={index} className="space-y-1">
                          <p className="text-slate-400 text-xs">{item.label}</p>
                          <p className="text-white text-2xl font-semibold">{item.value}</p>
                          <div className={`flex items-center text-xs ${
                            item.isPositive ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {item.isPositive ? (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                            )}
                            {item.percentage}% from last month
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-slate-200 font-medium mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Update Profile', icon: <Users className="h-5 w-5" /> },
                      { label: 'Manage Products', icon: <ShoppingBag className="h-5 w-5" /> },
                      { label: 'View Schedule', icon: <Calendar className="h-5 w-5" /> },
                      { label: 'Performance', icon: <BarChart3 className="h-5 w-5" /> }
                    ].map((item, index) => (
                      <button
                        key={index}
                        className="bg-slate-700/50 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-slate-700 transition-colors border border-slate-700 hover:border-slate-600"
                      >
                        <div className="bg-slate-600 p-2 rounded-lg text-blue-400 mb-3">
                          {item.icon}
                        </div>
                        <span className="text-slate-200 text-sm">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div>
                  <h3 className="text-slate-200 font-medium mb-4">Key Performance Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {analyticsData.map((item, index) => (
                      <div 
                        key={index} 
                        className="bg-slate-700/50 rounded-lg p-4 border border-slate-700"
                      >
                        <p className="text-slate-400 text-xs">{item.label}</p>
                        <p className="text-white text-2xl font-semibold mt-1">{item.value}</p>
                        <div className={`flex items-center text-xs mt-1 ${
                          item.isPositive ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {item.isPositive ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          {item.percentage}% from last month
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Popularity */}
                <div>
                  <h3 className="text-slate-200 font-medium mb-4">Product Popularity</h3>
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-700">
                    <div className="space-y-4">
                      {productPopularity.map((product, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-slate-300 text-sm">{product.name}</span>
                            <span className="text-slate-300 text-sm font-medium">{product.percentage}%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${product.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visitor Demographics */}
                <div>
                  <h3 className="text-slate-200 font-medium mb-4">Visitor Demographics</h3>
                  <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-700 flex justify-center items-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-slate-500 mx-auto mb-2" />
                      <p className="text-slate-400 text-sm">Detailed analytics available in the full report</p>
                      <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                        Generate Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'deadlines' && (
              <div className="space-y-6">
                <h3 className="text-slate-200 font-medium mb-4">Upcoming Deadlines</h3>
                <div className="space-y-4">
                  {deadlineData.map((deadline, index) => (
                    <div 
                      key={index} 
                      className={`bg-slate-700/50 rounded-lg p-4 border ${
                        deadline.isUrgent ? 'border-red-500/50' : 'border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-slate-200 font-medium">{deadline.event}</h4>
                          <p className="text-slate-400 text-sm mt-1">{deadline.description}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          deadline.daysLeft <= 1 
                            ? 'bg-red-500/10 text-red-400' 
                            : deadline.daysLeft <= 7
                              ? 'bg-yellow-500/10 text-yellow-400'
                              : 'bg-green-500/10 text-green-400'
                        }`}>
                          {deadline.daysLeft === 1 ? 'Tomorrow' : `${deadline.daysLeft} days left`}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center text-slate-400 text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Set Reminder</span>
                        </div>
                        {deadline.isUrgent && (
                          <div className="flex items-center text-red-400 text-xs">
                            <Bell className="h-3 w-3 mr-1" />
                            <span>Urgent</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <button className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors text-sm">
                    View All Upcoming Events
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'recommendations' && (
              <div className="space-y-6">
                <h3 className="text-slate-200 font-medium mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {recommendationData.map((recommendation, index) => (
                    <div 
                      key={index} 
                      className={`rounded-lg p-4 border flex items-start gap-3 ${
                        recommendation.completed
                          ? 'bg-green-500/5 border-green-500/20'
                          : 'bg-slate-700/50 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className={`rounded-full p-1 ${
                        recommendation.completed ? 'text-green-500 bg-green-500/10' : 'text-blue-400 bg-blue-500/10'
                      }`}>
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={recommendation.completed ? 'text-green-300' : 'text-slate-200'}>
                          {recommendation.text}
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          {recommendation.completed ? (
                            <span className="text-green-400 text-xs flex items-center">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Completed
                            </span>
                          ) : (
                            <>
                              <button className="text-blue-400 text-xs hover:text-blue-300 transition-colors">
                                Take Action
                              </button>
                              <button className="text-slate-400 text-xs hover:text-slate-300 transition-colors">
                                Dismiss
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-blue-300 font-medium">Personalized Insights</h4>
                      <p className="text-blue-200 text-sm mt-1">
                        Based on your exhibition history, we've identified opportunities to expand your market reach.
                      </p>
                      <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                        View Insights
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KashmirCraftsHubDashboard;