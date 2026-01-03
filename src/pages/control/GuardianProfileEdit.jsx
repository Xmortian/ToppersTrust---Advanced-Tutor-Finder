// GuardianProfileEditController.jsx - React Component for Editing Guardian Profile
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    GuardianProfileModel, 
    initialFormData,
    howDidYouKnowOptions,
    genderOptions
} from '../model/GuardianProfileEditModel';
import { FaSave, FaTimes, FaUpload, FaSpinner, FaInfoCircle } from 'react-icons/fa';

const GuardianProfileEditController = () => {
    const navigate = useNavigate();
    
    // State management
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [userId, setUserId] = useState(null);

    // Load profile on mount
    useEffect(() => {
        loadProfile();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * Load existing profile data
     */
    const loadProfile = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Get authenticated user
            const user = await GuardianProfileModel.getAuthenticatedUser();
            setUserId(user.id);
            
            // Fetch existing profile
            const profileData = await GuardianProfileModel.fetchProfile(user.id);
            
            if (profileData) {
                // Transform DB data to form data
                const formDataFromDb = GuardianProfileModel.transformToFormData(profileData, user.email);
                setFormData(formDataFromDb);
                
                // Set profile image preview if exists
                if (profileData.photo) {
                    const imageUrl = GuardianProfileModel.getPublicImageUrl(profileData.photo);
                    setProfileImagePreview(imageUrl);
                }
            } else {
                // New profile - set email from auth
                setFormData(prev => ({ ...prev, email: user.email }));
            }
            
        } catch (err) {
            console.error("Error loading profile:", err);
            if (err.message.includes('Authentication')) {
                navigate('/login');
            } else {
                setError(err.message || 'Failed to load profile');
            }
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle input changes
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    /**
     * Handle profile image selection
     */
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size (max 512KB)
        if (file.size > 512 * 1024) {
            setError('Image size must be less than 512KB');
            return;
        }

        // Validate file type
        if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
            setError('Only PNG, JPEG, and WebP images are allowed');
            return;
        }

        setProfileImageFile(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        setError(null);
    };

    /**
     * Handle form submission
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(false);
        
        try {
            if (!userId) {
                throw new Error('User not authenticated');
            }

            // Upload image if provided
            let imagePath = formData.profileImageUrl;
            if (profileImageFile) {
                imagePath = await GuardianProfileModel.uploadProfileImage(
                    userId, 
                    profileImageFile, 
                    formData.profileImageUrl
                );
            }

            // Prepare data for database
            const dbUpdates = GuardianProfileModel.transformToDbUpdates(formData, imagePath);
            
            // Update profile
            await GuardianProfileModel.updateProfile(userId, dbUpdates);
            
            setSuccess(true);
            setTimeout(() => {
                navigate('/guardian/profile');
            }, 1500);
            
        } catch (err) {
            console.error("Error saving profile:", err);
            setError(err.message || 'Failed to save profile');
        } finally {
            setSaving(false);
        }
    };

    /**
     * Handle cancel
     */
    const handleCancel = () => {
        navigate('/guardian/profile');
    };

    // Generate fallback image for preview
    const profileImageFallback = formData.name 
        ? `https://placehold.co/200x200/6344cc/FFF?text=${formData.name.split(' ').map(n=>n[0]).join('')}`
        : "https://placehold.co/200x200/6344cc/FFF?text=G";

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-800">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
                    <p className="text-white text-lg">Loading profile...</p>
                </div>
            </div>
        );
    }

    // Render form
    return (
        <div className="w-full min-h-screen bg-slate-800 p-4 sm:p-6 lg:p-8 font-roboto">
            <div className="container mx-auto max-w-4xl">
                
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">Edit Guardian Profile</h1>
                    <p className="text-gray-300">Update your profile information</p>
                </div>

                {/* Messages */}
                {error && (
                    <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                        Profile updated successfully! Redirecting...
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
                    
                    {/* Profile Image Section */}
                    <div className="mb-8 flex flex-col items-center">
                        <label htmlFor="profileImageInput" className="cursor-pointer group relative">
                            <img 
                                src={profileImagePreview || profileImageFallback} 
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
                                    value={formData.name}
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
                                    value={formData.email}
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
                                    value={formData.contactNumber}
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
                                    value={formData.gender}
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
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6344cc]"
                                    placeholder="Enter your city"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Relation with Student <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="relationWithStudent"
                                    value={formData.relationWithStudent}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6344cc]"
                                    placeholder="e.g., Father, Mother, etc."
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
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
                                    value={formData.facebookProfile}
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
                                    value={formData.driveLink}
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
                                    value={formData.howDidYouKnow}
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
                            onClick={handleCancel}
                            disabled={saving}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaTimes /> Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#6344cc] text-white rounded-lg hover:bg-[#5238a8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
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

export default GuardianProfileEditController;