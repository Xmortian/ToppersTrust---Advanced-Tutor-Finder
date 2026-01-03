// TutorProfileController.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    emptyTutorData,
    getAuthenticatedUser,
    fetchTutorProfile,
    processProfileData
} from '../model/TutorProfileModel';

import TutorProfileView from '../view/TutorProfileView';

// -----------------------------
// CONTROLLER HOOK
// -----------------------------
export const useTutorProfileController = () => {
    const navigate = useNavigate();
    
    const [tutorData, setTutorData] = useState(emptyTutorData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProfile();
    }, [navigate]);

    const loadProfile = async () => {
        setLoading(true);
        setError(null);

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
        }
    };

    const authenticateUser = async () => {
        try {
            return await getAuthenticatedUser();
        } catch (err) {
            if (err.message === "No authenticated user found.") {
                navigate('/login');
            }
            throw err;
        }
    };

    const getProfile = async (userId) => {
        return await fetchTutorProfile(userId);
    };

    const processProfileDataFromModel = (profile, user) => {
        return processProfileData(profile, user);
    };

    const updateTutorData = (data) => {
        setTutorData(data);
    };

    const handleProfileNotFound = (profile, profileError) => {
        if (!profile && profileError?.code === 'PGRST116') {
            setError("Profile not found. Please complete your profile information.");
        }
    };

    const handleError = async (err) => {
        if (err.message === "No authenticated user found.") return;

        setError(err.message || "An unknown error occurred.");

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

    // -----------------------------
    // ✅ REQUIRED BY VIEW
    // -----------------------------
    const renderProfileLink = () => {
        // Minimal safe implementation
        return null;
    };

    // Navigation
    const handleGoBack = () => navigate(-1);
    const handleReloadProfile = () => loadProfile();
    const handleEditProfile = () => navigate('/tutor/profile/edit');
    const handleGoToDashboard = () => navigate('/tutor-dashboard');

    return {
        tutorData,
        loading,
        error,

        handleGoBack,
        handleGoToDashboard,
        handleEditProfile,
        handleReloadProfile,

        // ✅ FIX
        renderProfileLink,
    };
};

// -----------------------------
// ROUTE COMPONENT
// -----------------------------
export default function TutorProfileController() {
    const controller = useTutorProfileController();
    return <TutorProfileView {...controller} />;
}
