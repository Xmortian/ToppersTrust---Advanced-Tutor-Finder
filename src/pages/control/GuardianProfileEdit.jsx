// controllers/GuardianProfileViewController.js
import { GuardianProfileModel } from '../models/GuardianProfileModel';
import { supabase } from '../supabase.js';

/**
 * Controller for Guardian Profile View (Read-only display)
 */
export class GuardianProfileViewController {
    constructor(
        setProfileData, 
        setLoading, 
        setError, 
        setProfileImageUrl, 
        setProfileCompletion,
        navigate
    ) {
        this.setProfileData = setProfileData;
        this.setLoading = setLoading;
        this.setError = setError;
        this.setProfileImageUrl = setProfileImageUrl;
        this.setProfileCompletion = setProfileCompletion;
        this.navigate = navigate;
    }

    /**
     * Load profile data for display
     */
    async loadProfile() {
        this.setLoading(true);
        this.setError(null);
        console.log("VIEW CONTROLLER: loadProfile called");

        try {
            // Get authenticated user
            const user = await GuardianProfileModel.getAuthenticatedUser();
            console.log("VIEW CONTROLLER: Authenticated user:", user.id);

            // Fetch profile data
            const profileData = await GuardianProfileModel.fetchProfile(user.id);
            
            if (!profileData) {
                // No profile found - redirect to create/edit
                console.log("VIEW CONTROLLER: No profile found, redirecting to edit");
                this.setError("Profile not found. Please complete your profile.");
                setTimeout(() => this.navigate('/guardian/profile/edit'), 2000);
                return;
            }

            // Transform data for display
            const formattedData = {
                guardianId: profileData.id?.toString() || 'N/A',
                name: profileData.name || 'Not provided',
                email: profileData.email || user.email || 'Not provided',
                contactNumber: profileData.phone || 'Not provided',
                gender: profileData.gender || 'Not specified',
                city: profileData.city || 'Not provided',
                address: profileData.address || 'Not provided',
                relationWithStudent: profileData.relation_with_student || 'Not specified',
                facebookProfile: profileData.facebook_profile_link || null,
                driveLink: profileData.drive_link || null,
                howDidYouKnow: profileData.how_did_you_know || 'Not specified',
            };

            this.setProfileData(formattedData);

            // Set profile image
            if (profileData.photo) {
                const imageUrl = GuardianProfileModel.getPublicImageUrl(profileData.photo);
                this.setProfileImageUrl(imageUrl);
            } else {
                this.setProfileImageUrl(null);
            }

            // Calculate and set profile completion
            const transformedFormData = GuardianProfileModel.transformToFormData(profileData, user.email);
            const completion = GuardianProfileModel.calculateProfileCompletion(transformedFormData);
            this.setProfileCompletion(completion);

            console.log("VIEW CONTROLLER: Profile loaded successfully, completion:", completion + "%");

        } catch (error) {
            console.error("VIEW CONTROLLER: Error loading profile:", error);
            this.setError(error.message || 'Failed to load profile');
            
            if (error.message.includes('Authentication')) {
                setTimeout(() => this.navigate('/login'), 2000);
            }
        } finally {
            this.setLoading(false);
        }
    }

    /**
     * Navigate to profile edit page
     */
    navigateToEdit() {
        console.log("VIEW CONTROLLER: Navigating to edit page");
        this.navigate('/guardian/profile/edit');
    }

    /**
     * Handle user logout
     */
    async handleLogout() {
        console.log("VIEW CONTROLLER: Logging out user");
        
        try {
            const { error } = await supabase.auth.signOut();
            
            if (error) {
                console.error("VIEW CONTROLLER: Logout error:", error);
                this.setError('Failed to logout. Please try again.');
                return;
            }

            console.log("VIEW CONTROLLER: Logout successful, redirecting to login");
            this.navigate('/login');
            
        } catch (error) {
            console.error("VIEW CONTROLLER: Logout exception:", error);
            this.setError('An error occurred during logout.');
        }
    }

    /**
     * Refresh profile data
     */
    async refreshProfile() {
        console.log("VIEW CONTROLLER: Refreshing profile data");
        await this.loadProfile();
    }
}