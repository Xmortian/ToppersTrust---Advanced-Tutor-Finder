import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import GuardianProfileView from '../view/GuardianProfileView';
import { initialGuardianDataOnLoad, fetchGuardianProfileData, handleSignOutApi } from '../model/GuardianProfileModel'; 

const GuardianProfile = () => {
  const navigate = useNavigate();
  const [guardianData, setGuardianData] = useState(initialGuardianDataOnLoad);
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
        setGuardianData(data);
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
    navigate('/guardian-dashboard');
  }, [navigate]);

  // --- View Helpers (Data for the View) ---
  const profileImageFallback = "https://placehold.co/200x200/6344cc/FFF?text=" +
    (guardianData.name && guardianData.name !== "Loading..." ? guardianData.name.split(' ').map(n=>n[0]).join('') : "G");

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-xl text-gray-100">Loading Guardian Profile...</div>;
  }

  // Render the View, passing data and handlers as props
  return (
    <GuardianProfileView
      guardianData={guardianData}
      error={error}
      handleSignOut={handleSignOut}
      navigateToDashboard={navigateToDashboard}
      profileImageFallback={profileImageFallback}
    />
  );
};

export default GuardianProfile;