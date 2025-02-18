import  { useState } from 'react';
import { Upload,  CheckCircle } from 'lucide-react';

const VendorRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    description: '',
    categories: [] as string[],
    documents: {
      businessLicense: null as File | null,
      taxCertificate: null as File | null,
      tradeLicense: null as File | null
    }
  });

  const categories = [
    'Carpets & Rugs',
    'Shawls & Textiles',
    'Wood Carving',
    'Paper Mache',
    'Metal Crafts',
    'Chain Stitch',
    'Crewel Embroidery'
  ];

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleFileUpload = (documentType: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-24 h-1 ${
                  step > stepNumber ? 'bg-blue-600' : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>Business Details</span>
          <span>Categories & Products</span>
          <span>Documentation</span>
        </div>
      </div>

      {/* Step 1: Business Details */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-gray-300">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500"
                placeholder="Your business name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-300">Business Type</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type</option>
                <option value="sole-proprietorship">Sole Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="corporation">Corporation</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500"
                placeholder="business@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-300">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-300">Business Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us about your business and products..."
            />
          </div>
        </div>
      )}

      {/* Step 2: Categories & Products */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-gray-300">Product Categories</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`p-4 rounded-lg border ${
                    formData.categories.includes(category)
                      ? 'border-blue-500 bg-blue-600/20 text-white'
                      : 'border-gray-700 bg-gray-800 text-gray-300'
                  } hover:border-blue-500 transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Documentation */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries({
              businessLicense: 'Business License',
              taxCertificate: 'Tax Certificate',
              tradeLicense: 'Trade License'
            }).map(([key, label]) => (
              <div
                key={key}
                className="p-6 bg-gray-800 border border-gray-700 rounded-lg space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{label}</span>
                  {formData.documents[key as keyof typeof formData.documents] && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileUpload(key)}
                    className="hidden"
                    id={`file-${key}`}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor={`file-${key}`}
                    className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    {formData.documents[key as keyof typeof formData.documents]
                      ? formData.documents[key as keyof typeof formData.documents]?.name
                      : 'Upload Document'
                    }
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <button
            onClick={() => setStep((prev: number) => prev - 1)}
            className="px-6 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Previous
          </button>
        )}
        
        <button
          onClick={() => {
            if (step < 3) setStep((prev: number) => prev + 1);
            else {
              // Handle form submission
              console.log('Form submitted:', formData);
            }
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
        >
          {step === 3 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default VendorRegistration;