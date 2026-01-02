import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

// --- Presentation Components & Helpers ---

const primaryColor = "bg-[#6344cc]";
const hoverColor = "hover:bg-[#5238a8]";
const focusRingColor = "focus:ring-[#6344cc]";
const sectionHeaderColor = "bg-[#6344cc]";

const renderProfileLink = (url) => {
  if (url && url.trim() !== '') {
    const isUrl = url.startsWith('http://') || url.startsWith('https://');
    return <a href={isUrl ? url : `https://${url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{url}</a>;
  }
  return <span className="text-gray-500 italic">Not Given</span>;
};

const renderVerificationStatus = (isVerified) => {
  return isVerified ? (
    <span className="flex items-center text-green-600 font-medium">
      <FaCheckCircle className="mr-1.5" /> Verified
    </span>
  ) : (
    <span className="flex items-center text-red-600 font-medium">
      <FaTimesCircle className="mr-1.5" /> Not Verified
    </span>
  );
};

// --- Main View Component ---
const GuardianProfileView = ({ guardianData, error, handleSignOut, navigateToDashboard, profileImageFallback }) => {
  return (
    <div className="w-full min-h-screen bg-slate-800 p-4 sm:p-6 lg:p-8 font-roboto flex justify-center items-start text-gray-100">
      <div className="container mx-auto max-w-3xl w-full">

        <div className="mb-6">
          <button
            onClick={navigateToDashboard}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-colors"
          >
            <FaArrowLeft />
            Back to Dashboard
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:gap-8">

          {/* --- Profile Card (Left/Top) --- */}
          <div className="w-full">
            <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col text-gray-800">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={guardianData.profileImageUrl || profileImageFallback}
                  alt="Profile"
                  onError={(e) => { e.target.onerror = null; e.target.src = profileImageFallback; }}
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-gray-200 shadow-md object-cover mb-4"
                />
                <h1 className="text-2xl font-bold text-gray-900">{guardianData.name}</h1>
                <p className="text-sm text-gray-600">Guardian ID: {guardianData.guardianId}</p>
              </div>

              {/* Profile Completion */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700">Profile Completed: {guardianData.profileCompletion}%</label>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div
                    className="bg-[#6344cc] h-2.5 rounded-full"
                    style={{ width: `${guardianData.profileCompletion}%` }}
                  ></div>
                </div>
              </div>

              {/* Edit Button */}
              <Link
                to="/guardian/profile/edit"
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 mb-6 text-sm font-medium text-white ${primaryColor} rounded-lg ${hoverColor} transition-colors duration-200 focus:outline-none focus:ring-2 ${focusRingColor} focus:ring-offset-2`}
              >
                <FaEdit />
                Edit Profile
              </Link>

              {/* Quick Contact Info */}
              <div className="space-y-3 text-sm text-gray-700 border-t border-gray-200 pt-4 mt-auto">
                <div className="flex items-center gap-2">
                  <FiMail className="text-gray-500 flex-shrink-0" />
                  <span className="truncate" title={guardianData.email}>{guardianData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className="text-gray-500 flex-shrink-0" />
                  <span>{guardianData.contactNumber}</span>
                </div>
                <div className="flex items-start gap-2">
                  <FiMapPin className="text-gray-500 mt-1 flex-shrink-0" />
                  <span className="break-words">{guardianData.address}</span>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 mt-6 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          </div>

          {/* --- Detail Sections (Right/Bottom) --- */}
          <div className="w-full">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg space-y-6 text-gray-800">
              {/* Error Message */}
              {error && (
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                  <span className="font-medium">Error:</span> {error}
                </div>
              )}

              {/* Personal Information Section */}
              <section>
                <div className={`${sectionHeaderColor} text-white px-4 py-2 rounded-t-lg flex items-center gap-2`}>
                  <FaInfoCircle />
                  <h2 className="text-lg font-semibold">Personal Information</h2>
                </div>
                <div className="border border-t-0 border-gray-300 rounded-b-lg p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div>
                    <strong className="block text-gray-600">Name</strong>
                    <span className="text-gray-800">{guardianData.name}</span>
                  </div>
                  <div>
                    <strong className="block text-gray-600">Contact Number</strong>
                    <span className="text-gray-800">{guardianData.contactNumber}</span>
                  </div>
                  <div>
                    <strong className="block text-gray-600">Email</strong>
                    <span className="text-gray-800 break-all">{guardianData.email}</span>
                  </div>
                  <div>
                    <strong className="block text-gray-600">Facebook Profile Link</strong>
                    {renderProfileLink(guardianData.facebookProfile)}
                  </div>
                  <div>
                    <strong className="block text-gray-600">City</strong>
                    <span className="text-gray-800">{guardianData.city || <span className="text-gray-500 italic">Not Given</span>}</span>
                  </div>
                  <div>
                    <strong className="block text-gray-600">Address</strong>
                    <span className="text-gray-800">{guardianData.address || <span className="text-gray-500 italic">Not Given</span>}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <strong className="block text-gray-600">Relation with Student</strong>
                    <span className="text-gray-800">{guardianData.relationWithStudent || <span className="text-gray-500 italic">Not Given</span>}</span>
                  </div>
                </div>
              </section>

              {/* Verification Section */}
              <section>
                <div className={`${sectionHeaderColor} text-white px-4 py-2 rounded-t-lg flex items-center gap-2`}>
                  <FaCheckCircle />
                  <h2 className="text-lg font-semibold">Verification And Security</h2>
                </div>
                <div className="border border-t-0 border-gray-300 rounded-b-lg p-4 sm:p-6 text-sm">
                  <strong className="block text-gray-600 mb-1">Status</strong>
                  {renderVerificationStatus(guardianData.isVerified)}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianProfileView;