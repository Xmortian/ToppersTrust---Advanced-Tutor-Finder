// MediaProfileEditView.jsx - Edit Form for Media Profile
import React, { useState } from 'react';
import { FaSave, FaTimes, FaUpload, FaSpinner, FaInfoCircle } from 'react-icons/fa';

const MediaProfileEditView = ({
    profileData,
    loading,
    error,
    profileImageUrl,
    profileCompletion,
    isSaving,
    onUpdateProfile,
    onCancel
}) => {
    // Local state for form fields
    const [formData, setFormData] = useState(profileData || {
        name: "",
        contactNumber: "",
        email: "",
        gender: "",
        facebookProfile: "",
        city: "",
        address: "",
        relationWithStudent: "",
        profileImageUrl: null,
        howDidYouKnow: "",
        driveLink: ""
    });
    
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(profileImageUrl);

    // Update form data when profileData changes
    React.useEffect(() => {
        if (profileData) {
            setFormData(profileData);
        }
    }, [profileData]);

    React.useEffect(() => {
        if (profileImageUrl) {
            setImagePreview(profileImageUrl);
        }
    }, [profileImageUrl]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle image selection
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size (max 512KB)
        if (file.size > 512 * 1024) {
            alert('Image size must be less than 512KB');
            return;
        }

        // Validate file type
        if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
            alert('Only PNG, JPEG, and WebP images are allowed');
            return;
        }

        setImageFile(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateProfile(formData, imageFile);
    };

    // Generate fallback image
    const profileImageFallback = formData.name 
        ? `https://placehold.co/200x200/6344cc/FFF?text=${formData.name.split(' ').map(n=>n[0]).join('')}`
        : "https://placehold.co/200x200/6344cc/FFF?text=M";

    const genderOptions = [
        { label: "-- Select Gender --", value: "" },
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" }
    ];

    const howDidYouKnowOptions = [
        { label: "-- Select an Option --", value: "" },
        { label: "Facebook", value: "Facebook" },
        { label: "LinkedIn", value: "LinkedIn" },
        { label: "Friend/Colleague", value: "Friend/Colleague" },
        { label: "Search Engine (Google, etc.)", value: "Search Engine (Google, etc.)" },
        { label: "Advertisement", value: "Advertisement" },
        { label: "Other", value: "Other" }
    ];

    return (
        <div className="w-full min-h-screen bg-slate-800 p-4 sm:p-6 lg:p-8 font-roboto">
            <div className="container mx-auto max-w-4xl">
                
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">Edit Media Partner Profile</h1>
                    <p className="text-gray-300">Update your profile information</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
                    
                    {/* Profile Image Section */}
                    <div className="mb-8 flex flex-col items-center">
                        <label htmlFor="profileImageInput" className="cursor-pointer group relative">
                            <img 
                                src={imagePreview || profileImageFallback} 
                                alt="Profile Preview" 
                                onError={(e) => { 
                                    e.target.onerror = null; 
                                    e.target.src = profileImageFallback; 
                                }}
                                className="w-32 h-32 rounded-full border-4 border-[#6344cc] shadow-md object-cover group-hover:opacity-70 transition-opacity" 
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <FaUpload className="text-white text-2xl" />
                            </div>
                        </label>
                        <input 
                            type="file" 
                            id="profileImageInput" 
                            accept="image/png, image/jpeg, image/webp" 
                            onChange={handleFileChange} 
                            className="hidden" 
                        />
                        <p className="text-xs text-gray-500 mt-2">Click image to change (Max 512KB)</p>
                    </div>

                    {/* Personal Information */}
                    <div className="mb-6">
                        <div className="bg-[#6344cc] text-white px-4 py-2 rounded-t-lg flex items-center gap-2 mb-4">
                            <FaInfoCircle />
                            <h2 className="text-lg font-semibold">Personal Information</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6344cc]"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email || ""}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    value={formData.contactNumber || ""}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6344cc]"
                                    placeholder="Enter contact number"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Gender <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender || ""}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6344cc]"
                                >
                                    {genderOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city || ""}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6344cc]"
                                    placeholder="Enter your city"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Organization/Institution
                                </label>
                                <input
                                    type="text"
                                    name="relationWithStudent"
                                    value={formData.relationWithStudent || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6344cc]"
                                    placeholder="e.g., Media Company, Institution"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address || ""}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6344cc]"
                                    placeholder="Enter your full address"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Facebook Profile (Optional)
                                </label>
                                <input
                                    type="url"
                                    name="facebookProfile"
                                    value={formData.facebookProfile || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6344cc]"
                                    placeholder="https://facebook.com/yourprofile"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Drive Link (Optional)
                                </label>
                                <input
                                    type="url"
                                    name="driveLink"
                                    value={formData.driveLink || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6344cc]"
                                    placeholder="https://drive.google.com/..."
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    How did you find us? <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="howDidYouKnow"
                                    value={formData.howDidYouKnow || ""}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6344cc]"
                                >
                                    {howDidYouKnowOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8 pt-6 border-t">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isSaving}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaTimes /> Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#6344cc] text-white rounded-lg hover:bg-[#5238a8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <>
                                    <FaSpinner className="animate-spin" /> Saving...
                                </>
                            ) : (
                                <>
                                    <FaSave /> Save Profile
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MediaProfileEditView;

/**
 * Info Card Component
 */
const InfoCard = ({ icon: Icon, label, value, color = "text-gray-700" }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3">
            <Icon className={`${color} text-xl mt-0.5 flex-shrink-0`} />
            <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
                <p className="text-sm text-gray-900 break-words">{value || "Not provided"}</p>
            </div>
        </div>
    </div>
);

/**
 * Profile Completion Badge
 */
const ProfileCompletionBadge = ({ percentage }) => {
    const getColor = () => {
        if (percentage >= 80) return "bg-green-100 text-green-800 border-green-300";
        if (percentage >= 50) return "bg-yellow-100 text-yellow-800 border-yellow-300";
        return "bg-red-100 text-red-800 border-red-300";
    };

    const getIcon = () => {
        if (percentage >= 80) return <FaCheckCircle className="text-green-600" />;
        return <FaExclamationTriangle className="text-yellow-600" />;
    };

    return (
        <div className={`${getColor()} border-2 rounded-lg p-4 flex items-center gap-3 mb-6`}>
            {getIcon()}
            <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold">Profile Completion</span>
                    <span className="text-lg font-bold">{percentage}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2.5 overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 ${
                            percentage >= 80 ? 'bg-green-600' : 
                            percentage >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                {percentage < 100 && (
                    <p className="text-xs mt-2">Complete your profile to improve verification chances</p>
                )}
            </div>
        </div>
    );
};

// /**
//  * Main Guardian Profile View Component
//  */
// const GuardianProfileView = () => {
//     const navigate = useNavigate();
    
//     // State management
//     const [profileData, setProfileData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [profileImageUrl, setProfileImageUrl] = useState(null);
//     const [profileCompletion, setProfileCompletion] = useState(0);

//     // Initialize controller
//     const controller = new GuardianProfileViewController(
//         setProfileData,
//         setLoading,
//         setError,
//         setProfileImageUrl,
//         setProfileCompletion,
//         navigate
//     );

//     // Load profile on mount
//     useEffect(() => {
//         controller.loadProfile();
//     }, []); // eslint-disable-line react-hooks/exhaustive-deps

//     // Event handlers
//     const handleEditProfile = () => {
//         controller.navigateToEdit();
//     };

//     const handleLogout = async () => {
//         await controller.handleLogout();
//     };

//     // Generate fallback image
//     const profileImageFallback = profileData?.name 
//         ? `https://placehold.co/200x200/6344cc/FFF?text=${profileData.name.split(' ').map(n=>n[0]).join('')}`
//         : "https://placehold.co/200x200/6344cc/FFF?text=G";

//     // Loading state
//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen bg-slate-800">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
//                     <p className="text-white text-lg">Loading profile...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Error state
//     if (error) {
//         return (
//             <div className="flex justify-center items-center min-h-screen bg-slate-800">
//                 <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
//                     <div className="text-center">
//                         <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-4" />
//                         <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Profile</h2>
//                         <p className="text-gray-600 mb-6">{error}</p>
//                         <button
//                             onClick={() => controller.loadProfile()}
//                             className="bg-[#6344cc] text-white px-6 py-2 rounded-lg hover:bg-[#5238a8] transition-colors"
//                         >
//                             Retry
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="w-full min-h-screen bg-slate-800 p-4 sm:p-6 lg:p-8 font-roboto">
//             <div className="container mx-auto max-w-5xl">
                
//                 {/* Header with Edit Button */}
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-3xl font-bold text-white">Guardian Profile</h1>
//                     <div className="flex gap-3">
//                         <button
//                             onClick={handleEditProfile}
//                             className="flex items-center gap-2 bg-[#6344cc] text-white px-6 py-2.5 rounded-lg hover:bg-[#5238a8] transition-colors shadow-lg font-medium"
//                         >
//                             <FaEdit /> Edit Profile
//                         </button>
//                         <button
//                             onClick={handleLogout}
//                             className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors shadow-lg font-medium"
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
//                     {/* Left Column - Profile Image & Basic Info */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
//                             <div className="flex flex-col items-center mb-6">
//                                 <img
//                                     src={profileImageUrl || profileImageFallback}
//                                     alt="Profile"
//                                     onError={(e) => { 
//                                         e.target.onerror = null; 
//                                         e.target.src = profileImageFallback; 
//                                     }}
//                                     className="w-40 h-40 rounded-full border-4 border-[#6344cc] shadow-lg object-cover mb-4"
//                                 />
//                                 <h2 className="text-2xl font-bold text-gray-800 text-center">
//                                     {profileData?.name || "Guardian"}
//                                 </h2>
//                                 <p className="text-sm text-gray-500 mt-1">
//                                     Guardian ID: {profileData?.guardianId || 'N/A'}
//                                 </p>
//                             </div>

//                             {/* Profile Completion */}
//                             <ProfileCompletionBadge percentage={profileCompletion} />

//                             {/* Quick Stats */}
//                             <div className="border-t pt-4 space-y-3">
//                                 <div className="flex items-center justify-between text-sm">
//                                     <span className="text-gray-600">Gender:</span>
//                                     <span className="font-medium text-gray-900">
//                                         {profileData?.gender || "Not specified"}
//                                     </span>
//                                 </div>
//                                 <div className="flex items-center justify-between text-sm">
//                                     <span className="text-gray-600">Relation:</span>
//                                     <span className="font-medium text-gray-900">
//                                         {profileData?.relationWithStudent || "Not specified"}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Column - Detailed Information */}
//                     <div className="lg:col-span-2 space-y-6">
                        
//                         {/* Contact Information Section */}
//                         <div className="bg-white p-6 rounded-xl shadow-lg">
//                             <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
//                                 <FaUser className="text-[#6344cc] text-xl" />
//                                 <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <InfoCard 
//                                     icon={FaEnvelope} 
//                                     label="Email Address" 
//                                     value={profileData?.email}
//                                     color="text-blue-600"
//                                 />
//                                 <InfoCard 
//                                     icon={FaPhone} 
//                                     label="Contact Number" 
//                                     value={profileData?.contactNumber}
//                                     color="text-green-600"
//                                 />
//                                 <InfoCard 
//                                     icon={FaMapMarkerAlt} 
//                                     label="City" 
//                                     value={profileData?.city}
//                                     color="text-red-600"
//                                 />
//                                 <InfoCard 
//                                     icon={FaMapMarkerAlt} 
//                                     label="Full Address" 
//                                     value={profileData?.address}
//                                     color="text-purple-600"
//                                 />
//                             </div>
//                         </div>

//                         {/* Social & Additional Information Section */}
//                         <div className="bg-white p-6 rounded-xl shadow-lg">
//                             <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
//                                 <FaUsers className="text-[#6344cc] text-xl" />
//                                 <h3 className="text-xl font-semibold text-gray-800">Additional Information</h3>
//                             </div>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <InfoCard 
//                                     icon={FaFacebook} 
//                                     label="Facebook Profile" 
//                                     value={profileData?.facebookProfile ? (
//                                         <a 
//                                             href={profileData.facebookProfile} 
//                                             target="_blank" 
//                                             rel="noopener noreferrer"
//                                             className="text-blue-600 hover:underline"
//                                         >
//                                             View Profile
//                                         </a>
//                                     ) : "Not provided"}
//                                     color="text-blue-700"
//                                 />
//                                 <InfoCard 
//                                     icon={FaGoogle} 
//                                     label="Document Drive Link" 
//                                     value={profileData?.driveLink ? (
//                                         <a 
//                                             href={profileData.driveLink} 
//                                             target="_blank" 
//                                             rel="noopener noreferrer"
//                                             className="text-blue-600 hover:underline"
//                                         >
//                                             View Documents
//                                         </a>
//                                     ) : "Not provided"}
//                                     color="text-red-600"
//                                 />
//                                 <InfoCard 
//                                     icon={FaUsers} 
//                                     label="Relation with Student" 
//                                     value={profileData?.relationWithStudent}
//                                     color="text-purple-600"
//                                 />
//                                 <InfoCard 
//                                     icon={FaUser} 
//                                     label="How did you find us?" 
//                                     value={profileData?.howDidYouKnow}
//                                     color="text-orange-600"
//                                 />
//                             </div>
//                         </div>

//                         {/* Verification Status */}
//                         {profileCompletion < 80 && (
//                             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
//                                 <div className="flex items-start">
//                                     <FaExclamationTriangle className="text-yellow-600 mt-1 flex-shrink-0" />
//                                     <div className="ml-3">
//                                         <h4 className="text-sm font-semibold text-yellow-800">
//                                             Complete Your Profile
//                                         </h4>
//                                         <p className="text-sm text-yellow-700 mt-1">
//                                             Your profile is {profileCompletion}% complete. 
//                                             Add missing information to improve your verification status and access more features.
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GuardianProfileView;