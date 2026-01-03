// TutorProfileEditController.js
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    initialFormData,
    getAuthenticatedUser,
    fetchTutorProfile,
    processProfileDataForForm,
    getProfileImagePublicUrl,
    uploadProfileImage,
    prepareDataForSupabase,
    saveProfileToDatabase,
    validateImageFile
} from '../model/TutorProfileEditModel';
import {
    GENDER_OPTIONS,
    CURRICULUM_OPTIONS,
    PLACE_OF_TUTORING_OPTIONS,
    HOW_DID_YOU_KNOW_OPTIONS
} from '../model/TutorProfileEditViewConfig';
import TutorProfileEditView from '../view/TutorProfileEditView';

export const useTutorProfileEditController = () => {
    const navigate = useNavigate();
    
    // State Management
    const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(initialFormData)));
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [userId, setUserId] = useState(null);

    // Load profile on mount
    useEffect(() => {
        loadProfile();
    }, [navigate]);

    // ========================================================================
    // PROFILE LOADING
    // ========================================================================

    const loadProfile = async () => {
        setLoading(true);
        
        try {
            // Authenticate user
            const user = await authenticateUser();
            
            // Fetch profile data
            const profileData = await fetchProfileData(user.id);

            // Process and set form data
            const processedFormData = processProfileDataForForm(profileData, user);
            setFormData(processedFormData);

            // Set profile image preview if exists
            if (profileData?.photo) {
                const imageUrl = getProfileImagePublicUrl(profileData.photo);
                setProfileImagePreview(imageUrl);
            }

        } catch (error) {
            handleLoadError(error);
        } finally {
            setLoading(false);
        }
    };

    const authenticateUser = async () => {
        const user = await getAuthenticatedUser();
        setUserId(user.id);
        return user;
    };

    const fetchProfileData = async (userId) => {
        return await fetchTutorProfile(userId);
    };

    const handleLoadError = (error) => {
        if (error.message === "Authentication failed") {
            navigate('/login');
            return;
        }
        
        setMessage({ 
            type: 'error', 
            text: `Failed to load profile: ${error.message}` 
        });
    };

    // ========================================================================
    // INPUT HANDLERS
    // ========================================================================

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (!file) return;

        // Validate file
        const validation = validateImageFile(file);
        if (!validation.valid) {
            setMessage({ type: 'error', text: validation.error });
            return;
        }

        // Set file and preview
        setProfileImageFile(file);
        setProfileImagePreview(URL.createObjectURL(file));
        
        // Clear any previous error messages
        if (message.type === 'error') {
            setMessage({ type: '', text: '' });
        }
    };

    const handleEducationChange = (index, field, value) => {
        setFormData(prev => {
            const updatedEducation = prev.education.map((edu, i) => 
                (i === index) ? { ...edu, [field]: value } : edu
            );
            return { ...prev, education: updatedEducation };
        });
    };

    const handleEducationFloatInputChange = (index, field, value) => {
        // Remove any characters that are not a digit or a decimal point
        let sanitizedValue = value.replace(/[^0-9.]/g, '');

        // Ensure only one decimal point is allowed
        const firstDot = sanitizedValue.indexOf('.');
        if (firstDot !== -1) {
            const beforeDot = sanitizedValue.substring(0, firstDot + 1);
            const afterDot = sanitizedValue.substring(firstDot + 1).replace(/\./g, '');
            sanitizedValue = beforeDot + afterDot;
        }
        
        // Update the state with the cleaned value
        handleEducationChange(index, field, sanitizedValue);
    };

    // ========================================================================
    // SAVE HANDLERS
    // ========================================================================

    const handleSave = async (e) => {
        e.preventDefault();
        
        if (!validateBeforeSave()) {
            return;
        }

        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            // Upload image if new file selected
            const imagePathToSave = await handleImageUpload();

            // Prepare and save data
            await saveProfileData(imagePathToSave);

            // Show success and navigate
            handleSaveSuccess();

        } catch (error) {
            handleSaveError(error);
        } finally {
            setSaving(false);
        }
    };

    const validateBeforeSave = () => {
        if (!userId) {
            setMessage({ type: 'error', text: 'User not identified. Cannot save.' });
            return false;
        }
        return true;
    };

    const handleImageUpload = async () => {
        let imagePathToSave = formData.profileImageUrl;

        if (profileImageFile) {
            imagePathToSave = await uploadProfileImage(userId, profileImageFile);
        }

        return imagePathToSave;
    };

    const saveProfileData = async (imagePath) => {
        const dataToSave = prepareDataForSupabase({
            ...formData,
            profileImageUrl: imagePath
        }, userId);

        await saveProfileToDatabase(dataToSave);
    };

    const handleSaveSuccess = () => {
        setMessage({ type: 'success', text: 'Updated successfully!' });
        setTimeout(() => navigate('/tutor/profile'), 2000);
    };

    const handleSaveError = (error) => {
        const errorMessage = error.message || 
                            error.error_description || 
                            'Unknown error';
        setMessage({ 
            type: 'error', 
            text: `Failed to save profile: ${errorMessage}` 
        });
    };

    // ========================================================================
    // NAVIGATION HANDLERS
    // ========================================================================

    const handleCancel = () => {
        navigate('/tutor/profile');
    };

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    return {
        // State
        formData,
        loading,
        saving,
        message,
        profileImagePreview,
        
        // Handlers
        handleInputChange,
        handleFileChange,
        handleEducationChange,
        handleEducationFloatInputChange,
        handleSave,
        handleCancel,
        
        // Configuration (passed to View)
        genderOptions: GENDER_OPTIONS,
        curriculumOptions: CURRICULUM_OPTIONS,
        placeOfTutoringOptions: PLACE_OF_TUTORING_OPTIONS,
        howDidYouKnowOptions: HOW_DID_YOU_KNOW_OPTIONS,
    };
};

// ============================================================================
// WRAPPER COMPONENT (Default Export)
// ============================================================================

const TutorProfileEditController = () => {
    const controller = useTutorProfileEditController();
    
    return <TutorProfileEditView {...controller} />;
};

export default TutorProfileEditController;