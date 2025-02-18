import { useState } from 'react';
import { 
  User, Building2, Mail, Phone, 
  Edit2, Save, X, Camera 
} from 'lucide-react';

const VendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    businessName: 'Kashmir Arts Emporium',
    ownerName: 'Ahmed Khan',
    email: 'ahmed@kashmirarts.com',
    phone: '+1 (555) 123-4567',
    website: 'www.kashmirarts.com',
    address: '123 Artisan Street, Srinagar, Kashmir',
    bio: 'Specializing in authentic Kashmiri handicrafts including hand-knotted carpets, pashmina shawls, and traditional woodcarvings. Over 25 years of experience in international exhibitions.',
    categories: ['Carpets & Rugs', 'Shawls & Textiles', 'Wood Carving'],
    certifications: [
      { name: 'Master Craftsman Certificate', issuer: 'Kashmir Arts Council', year: '2020' },
      { name: 'Export Excellence Award', issuer: 'India Trade Commission', year: '2022' }
    ]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated data to your backend
    console.log('Saving profile:', profileData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900">
      {/* Profile Header */}
      <div className="relative mb-8">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg" />
        <div className="absolute -bottom-16 left-8 flex items-end">
          <div className="relative">
            <div className="w-32 h-32 bg-gray-800 rounded-lg border-4 border-gray-900 overflow-hidden">
              <img
                src="/api/placeholder/128/128"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          {isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">Business Information</h2>
            <div className="space-y-6">
              {/* Business Name */}
              <div className="flex items-start space-x-4">
                <Building2 className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400">Business Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="businessName"
                      value={profileData.businessName}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-white mt-1">{profileData.businessName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-white mt-1">{profileData.email}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-white mt-1">{profileData.phone}</p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="flex items-start space-x-4">
                <User className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-400">Business Description</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-white mt-1">{profileData.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Product Categories</h3>
            <div className="space-y-2">
              {profileData.categories.map((category, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-gray-700 text-white rounded-lg"
                >
                  {category}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Certifications</h3>
            <div className="space-y-4">
              {profileData.certifications.map((cert, index) => (
                <div key={index} className="border-b border-gray-700 last:border-0 pb-4 last:pb-0">
                  <h4 className="text-white font-medium">{cert.name}</h4>
                  <p className="text-gray-400 text-sm">{cert.issuer}</p>
                  <p className="text-gray-400 text-sm">Year: {cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;