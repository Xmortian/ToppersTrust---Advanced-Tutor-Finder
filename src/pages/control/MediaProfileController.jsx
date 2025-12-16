import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Import Model functions and initial state
import MediaProfileView from '../view/MediaProfileView.jsx';
import { initialGuardianDataOnLoad, fetchGuardianProfileData, handleSignOutApi } from '../model/MediaProfileModel.jsx'; 
// NOTE: Adjust the import path for MediaProfileModel.jsx based on your file structure

const MediaProfileController = () => {
  const navigate = useNavigate();
  const [mediaData, setMediaData] = useState(initialGuardianDataOnLoad);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Controller function for fetching data (Side Effect)
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError(null);

      // Call the Model function to fetch and process data
      const { data, error: fetchError } = await fetchGuardianProfileData(navigate);

      if (fetchError) {
        setError(fetchError);
      }
      if (data) {
        setMediaData(data);
      }

      setLoading(false);
    };

    loadProfile();
  }, [navigate]);

  // Controller function for sign out (User Action Handler)
  const handleSignOut = useCallback(async () => {
    setError(null);
    try {
      // Call the Model function to handle the API sign out
      await handleSignOutApi();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
      setError(`Sign out failed: ${error.message}`);
    }
  }, [navigate]);

  // Controller function for navigating back (User Action Handler)
  const navigateToDashboard = useCallback(() => {
    navigate('/media-dashboard');
  }, [navigate]);

  // --- View Helpers (Data for the View) ---
  const profileImageFallback = "https://placehold.co/200x200/6344cc/FFF?text=" +
    (mediaData.name && mediaData.name !== "Loading..." ? mediaData.name.split(' ').map(n=>n[0]).join('') : "M");

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-xl text-gray-100">Loading Media Profile...</div>;
  }

  // Render the View, passing data and handlers as props
  return (
    <MediaProfileView
      guardianData={mediaData}
      error={error}
      handleSignOut={handleSignOut}
      navigateToDashboard={navigateToDashboard}
      profileImageFallback={profileImageFallback}
    />
  );
};

export default MediaProfileController;