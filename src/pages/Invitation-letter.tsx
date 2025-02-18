import React, { useState } from 'react';
import { 
   Download,  
  Plus, Trash2,  Eye 
} from 'lucide-react';

interface Applicant {
  name: string;
  passportNo: string;
  designation: string;
  nationality: string;
  passportExpiry: string;
}

const InvitationLetterGenerator: React.FC = () => {
  const [letterData, setLetterData] = useState({
    companyName: '',
    boothNumber: '',
    expoName: 'NY International Gift Fair 2025',
    expoStartDate: '2025-03-15',
    expoEndDate: '2025-03-20',
    expoVenue: 'Jacob K. Javits Convention Center, New York',
    applicants: [
      {
        name: '',
        passportNo: '',
        designation: '',
        nationality: '',
        passportExpiry: ''
      }
    ]
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleApplicantChange = (index: number, field: keyof Applicant, value: string) => {
    const newApplicants = [...letterData.applicants];
    newApplicants[index] = {
      ...newApplicants[index],
      [field]: value
    };
    setLetterData({ ...letterData, applicants: newApplicants });
  };

  const addApplicant = () => {
    setLetterData({
      ...letterData,
      applicants: [
        ...letterData.applicants,
        {
          name: '',
          passportNo: '',
          designation: '',
          nationality: '',
          passportExpiry: ''
        }
      ]
    });
  };

  const removeApplicant = (index: number) => {
    const newApplicants = letterData.applicants.filter((_, i) => i !== index);
    setLetterData({ ...letterData, applicants: newApplicants });
  };

  const renderPreview = () => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className="bg-white text-gray-900 p-8 rounded-lg">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-right">{today}</div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">LETTER OF INVITATION</h1>
            <h2 className="text-xl">For Business Visa Application</h2>
          </div>

          <p>To Whom It May Concern:</p>

          <p>This letter is to confirm that the following representative(s) from {letterData.companyName} will be participating as exhibitors at the {letterData.expoName}, to be held from {new Date(letterData.expoStartDate).toLocaleDateString()} to {new Date(letterData.expoEndDate).toLocaleDateString()} at {letterData.expoVenue}.</p>

          <div className="space-y-4">
            {letterData.applicants.map((applicant, index) => (
              <div key={index} className="ml-6">
                <p><strong>{index + 1}. {applicant.name}</strong></p>
                <p className="ml-4">Designation: {applicant.designation}</p>
                <p className="ml-4">Nationality: {applicant.nationality}</p>
                <p className="ml-4">Passport Number: {applicant.passportNo}</p>
                <p className="ml-4">Passport Expiry: {applicant.passportExpiry}</p>
              </div>
            ))}
          </div>

          <p>{letterData.companyName} has been allocated Booth {letterData.boothNumber} at the exhibition.</p>

          <p>The company and its representatives will bear all travel, accommodation, and other expenses related to their participation in the exhibition.</p>

          <div className="mt-12 space-y-8">
            <div>
              <p>Sincerely,</p>
              <p className="font-bold mt-8">Exhibition Director</p>
              <p>{letterData.expoName}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Invitation Letter Generator</h1>
          <p className="text-gray-400">Create official invitation letters for visa applications</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Edit' : 'Preview'}
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      {previewMode ? (
        renderPreview()
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company & Event Details */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">Company & Event Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Company Name</label>
                <input
                  type="text"
                  value={letterData.companyName}
                  onChange={(e) => setLetterData({ ...letterData, companyName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Booth Number</label>
                <input
                  type="text"
                  value={letterData.boothNumber}
                  onChange={(e) => setLetterData({ ...letterData, boothNumber: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter booth number"
                />
              </div>
            </div>
          </div>

          {/* Applicants */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Applicants</h2>
              <button
                onClick={addApplicant}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Applicant
              </button>
            </div>

            <div className="space-y-6">
              {letterData.applicants.map((applicant, index) => (
                <div key={index} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-medium">Applicant {index + 1}</h3>
                    {letterData.applicants.length > 1 && (
                      <button
                        onClick={() => removeApplicant(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={applicant.name}
                        onChange={(e) => handleApplicantChange(index, 'name', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Passport Number</label>
                      <input
                        type="text"
                        value={applicant.passportNo}
                        onChange={(e) => handleApplicantChange(index, 'passportNo', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter passport number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Designation</label>
                      <input
                        type="text"
                        value={applicant.designation}
                        onChange={(e) => handleApplicantChange(index, 'designation', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter designation"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Nationality</label>
                      <input
                        type="text"
                        value={applicant.nationality}
                        onChange={(e) => handleApplicantChange(index, 'nationality', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter nationality"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Passport Expiry</label>
                      <input
                        type="date"
                        value={applicant.passportExpiry}
                        onChange={(e) => handleApplicantChange(index, 'passportExpiry', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvitationLetterGenerator;