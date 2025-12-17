import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MediaProfileEditView from '../view/MediaProfileEditView.jsx';
import { GuardianProfileModel } from '../model/MediaProfileEditModel.jsx';

/**
 * Controller for Media Profile Edit View
 */
const MediaProfileEditController = () => {
    const navigate = useNavigate();
    
    // State management
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [profileCompletion, setProfileCompletion] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    // Load profile on mount
    useEffect(() => {
        loadProfile();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * Load profile data for editing
     */
    const loadProfile = async () => {
        setLoading(true);
        setError(null);
        console.log("EDIT CONTROLLER: loadProfile called");

        try {
            // Get authenticated user
            const user = await GuardianProfileModel.getAuthenticatedUser();
            console.log("EDIT CONTROLLER: Authenticated user:", user.id);

            // Fetch profile data
            const profileDataFromDb = await GuardianProfileModel.fetchProfile(user.id);
            
            if (!profileDataFromDb) {
                // No profile found - create new profile
                console.log("EDIT CONTROLLER: No profile found, creating new");
                const emptyProfileData = GuardianProfileModel.transformToFormData(null, user.email);
                setProfileData(emptyProfileData);
                setProfileCompletion(0);
                return;
            }

            // Transform data for form
            const formData = GuardianProfileModel.transformToFormData(profileDataFromDb, user.email);
            setProfileData(formData);

            // Set profile image
            if (profileDataFromDb.photo) {
                const imageUrl = GuardianProfileModel.getPublicImageUrl(profileDataFromDb.photo);
                setProfileImageUrl(imageUrl);
            }

            // Calculate and set profile completion
            const completion = GuardianProfileModel.calculateProfileCompletion(formData);
            setProfileCompletion(completion);

            console.log("EDIT CONTROLLER: Profile loaded successfully, completion:", completion + "%");

        } catch (error) {
            console.error("EDIT CONTROLLER: Error loading profile:", error);
            setError(error.message || 'Failed to load profile');
            
            if (error.message.includes('Authentication')) {
                setTimeout(() => navigate('/login'), 2000);
            }
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle profile update
     */
    const handleUpdateProfile = async (updatedFormData, imageFile) => {
        setIsSaving(true);
        setError(null);
        console.log("EDIT CONTROLLER: handleUpdateProfile called");

        try {
            const user = await GuardianProfileModel.getAuthenticatedUser();
            
            let imagePath = profileData?.profileImageUrl;
            
            // Upload image if provided
            if (imageFile) {
                console.log("EDIT CONTROLLER: Uploading new image");
                imagePath = await GuardianProfileModel.uploadProfileImage(
                    user.id, 
                    imageFile, 
                    profileData?.profileImageUrl
                );
            }

            // Prepare updates
            const dbUpdates = GuardianProfileModel.transformToDbUpdates(updatedFormData, imagePath);
            
            // Update profile
            const updatedProfile = await GuardianProfileModel.updateProfile(user.id, dbUpdates);
            
            console.log("EDIT CONTROLLER: Profile updated successfully");
            
            // Update state
            const newFormData = GuardianProfileModel.transformToFormData(updatedProfile, user.email);
            setProfileData(newFormData);
            
            if (imagePath) {
                setProfileImageUrl(GuardianProfileModel.getPublicImageUrl(imagePath));
            }
            
            const completion = GuardianProfileModel.calculateProfileCompletion(newFormData);
            setProfileCompletion(completion);
            
            // Navigate back to profile view
            setTimeout(() => navigate('/media/profile'), 1500);
            
        } catch (error) {
            console.error("EDIT CONTROLLER: Error updating profile:", error);
            setError(error.message || 'Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    /**
     * Handle cancel
     */
    const handleCancel = () => {
        console.log("EDIT CONTROLLER: Navigating back to profile");
        navigate('/media/profile');
    };

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

    // Render the View
    return (
        <MediaProfileEditView
            profileData={profileData}
            loading={loading}
            error={error}
            profileImageUrl={profileImageUrl}
            profileCompletion={profileCompletion}
            isSaving={isSaving}
            onUpdateProfile={handleUpdateProfile}
            onCancel={handleCancel}
        />
    );
};

export default MediaProfileEditController;