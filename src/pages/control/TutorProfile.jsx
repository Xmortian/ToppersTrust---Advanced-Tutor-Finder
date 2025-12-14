// TutorProfileController.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    emptyTutorData,
    getAuthenticatedUser,
    fetchTutorProfile,
    processProfileData
} from './TutorProfileModel';

export const useTutorProfileController = () => {
    const navigate = useNavigate();
    
    // State Management
    const [tutorData, setTutorData] = useState(emptyTutorData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Profile on Component Mount
    useEffect(() => {
        loadProfile();
    }, [navigate]);

    // Main Profile Loading Logic
    const loadProfile = async () => {
        setLoading(true);
        setError(null);
        console.log("CONTROLLER: Starting profile load");

        try {
            const user = await authenticateUser();
            const { profile, error: profileError } = await getProfile(user.id);
            const processedData = processProfileDataFromModel(profile, user);
            
            updateTutorData(processedData);
            handleProfileNotFound(profile, profileError);

        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
            console.log("CONTROLLER: Profile load complete");
        }
    };

    // Authenticate User
    const authenticateUser = async () => {
        try {
            const user = await getAuthenticatedUser();
            console.log("CONTROLLER: User authenticated:", user.id);
            return user;
        } catch (err) {
            if (err.message === "No authenticated user found.") {
                console.log("CONTROLLER: No user found, redirecting to login");
                navigate('/login');
                throw err;
            }
            throw err;
        }
    };

    // Get Profile from Model
    const getProfile = async (userId) => {
        try {
            return await fetchTutorProfile(userId);
        } catch (err) {
            console.error("CONTROLLER: Error fetching profile:", err);
            throw err;
        }
    };

    // Process Profile Data
    const processProfileDataFromModel = (profile, user) => {
        const processedData = processProfileData(profile, user);
        console.log("CONTROLLER: Profile data processed");
        return processedData;
    };

    // Update Tutor Data State
    const updateTutorData = (data) => {
        setTutorData(data);
    };

    // Handle Profile Not Found
    const handleProfileNotFound = (profile, profileError) => {
        if (!profile && profileError?.code === 'PGRST116') {
            setError("Profile not found. Please complete your profile information.");
            console.log("CONTROLLER: Profile not found");
        }
    };

    // Handle Errors
    const handleError = async (err) => {
        console.error("CONTROLLER: Error occurred:", err);
        
        if (err.message === "No authenticated user found.") {
            return; // Already handled by authenticateUser
        }
        
        setError(err.message || "An unknown error occurred while loading the profile.");
        
        // Try to set minimal user data
        try {
            const user = await getAuthenticatedUser();
            setTutorData({
                ...emptyTutorData,
                name: user?.email?.split('@')[0] || "User",
                email: user?.email || "N/A",
                tutorId: "Error"
            });
        } catch {
            setTutorData({
                ...emptyTutorData,
                name: "User",
                email: "N/A",
                tutorId: "Error"
            });
        }
    };

    // Navigation Handler
    const handleGoBack = () => {
        console.log("CONTROLLER: Navigating back");
        navigate(-1);
    };

    // Reload Profile Handler
    const handleReloadProfile = () => {
        console.log("CONTROLLER: Reloading profile");
        loadProfile();
    };

    // Navigate to Edit Profile
    const handleEditProfile = () => {
        console.log("CONTROLLER: Navigating to edit profile");
        navigate('/tutor/profile/edit');
    };

    // Navigate to Dashboard
    const handleGoToDashboard = () => {
        console.log("CONTROLLER: Navigating to dashboard");
        navigate('/tutor-dashboard');
    };

    // Public API - Everything the View needs
    return {
        // State
        tutorData,
        loading,
        error,
        
        // Navigation Handlers
        handleGoBack,
        handleGoToDashboard,
        handleEditProfile,
        
        // Action Handlers
        handleReloadProfile,
    };
};