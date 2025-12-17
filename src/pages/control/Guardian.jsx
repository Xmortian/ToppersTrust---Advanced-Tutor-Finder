import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GuardianModel } from '../model/GuardianModel.jsx';
import GuardianView from '../view/GuardianView.jsx';

const initialGuardianData = {
  name: "Loading...",
  guardianId: "...",
  profileImageUrl: "", 
};

/**
 * Guardian Controller - Handles business logic and state management for Guardian dashboard
 */
const Guardian = () => {
  const navigate = useNavigate();
  const [guardianData, setGuardianData] = useState(initialGuardianData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [recommendedTutors, setRecommendedTutors] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);
  const [recommendationsError, setRecommendationsError] = useState(null);

  const tutorImageFallback = () => `https://placehold.co/80x80/e0e0e0/7f7f7f?text=N/A`;

  useEffect(() => {
    const fetchGuardianData = async () => {
      setLoading(true);
      setError(null);

      const { user, error: authError } = await GuardianModel.getCurrentUser();

      if (authError || !user) {
        console.error('Error fetching user or no user logged in:', authError);
        navigate('/');
        return;
      }

      try {
        const { profile, error: profileFetchError } = await GuardianModel.fetchGuardianProfile(user.id);

        if (profileFetchError) {
          if (profileFetchError.code === 'PGRST116') {
            console.warn('Guardian profile not found for user:', user.id);
            setGuardianData({
              name: user.email?.split('@')[0] || "User",
              guardianId: "New User",
              profileImageUrl: "",
            });
            setError("Guardian profile not found. Please complete your profile.");
          } else {
            throw profileFetchError;
          }
        } else if (profile) {
          const imageUrl = GuardianModel.getPhotoPublicUrl(profile.photo);
          
          let displayName = user.email?.split('@')[0] || "User";
          if (profile.name) {
            const shortName = GuardianModel.extractShortestName(profile.name);
            if (shortName) {
              displayName = shortName;
            }
          }

          setGuardianData({
            name: displayName,
            guardianId: profile.id?.toString() || "N/A",
            profileImageUrl: imageUrl,
          });
        }
      } catch (fetchError) {
        console.error('Error fetching guardian profile:', fetchError);
        setError(`Failed to load dashboard data: ${fetchError.message}`);
        setGuardianData({
          name: user.email?.split('@')[0] || "User",
          guardianId: "Error",
          profileImageUrl: "",
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendedTutorsList = async () => {
      setRecommendationsLoading(true);
      setRecommendationsError(null);
      setRecommendedTutors([]);
      
      const { tutors, error: fetchError } = await GuardianModel.fetchRecommendedTutors();
      
      if (fetchError) {
        setRecommendationsError(fetchError);
      } else {
        const mappedTutors = tutors.map(tutor => ({
          id: tutor.id,
          name: tutor.name,
          imageUrl: GuardianModel.getTutorImageUrl(tutor.photo)
        }));
        setRecommendedTutors(mappedTutors);
      }
      
      setRecommendationsLoading(false);
    };

    fetchGuardianData();
    fetchRecommendedTutorsList();
  }, [navigate]);

  const handleSignOut = async () => {
    setError(null);
    try {
      const { success, error: signOutError } = await GuardianModel.signOut();
      if (!success) throw signOutError;
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
      setError(`Sign out failed: ${error.message}`);
    }
  };

  const profileImageFallback = "https://placehold.co/150x200/6344cc/FFF?text=" +
    (guardianData.name && guardianData.name !== "Loading..." ? guardianData.name.split(' ').map(n=>n[0]).join('') : "G");

  const getFontSizeClass = (name) => {
    const length = name?.length || 0;
    if (length < 9) return "text-3xl sm:text-4xl md:text-5xl";
    if (length < 12) return "text-2xl sm:text-3xl md:text-4xl";
    return "text-xl sm:text-2xl md:text-3xl";
  };

  return (
    <GuardianView
      guardianData={guardianData}
      loading={loading}
      error={error}
      recommendedTutors={recommendedTutors}
      recommendationsLoading={recommendationsLoading}
      recommendationsError={recommendationsError}
      handleSignOut={handleSignOut}
      profileImageFallback={profileImageFallback}
      tutorImageFallback={tutorImageFallback}
      getFontSizeClass={getFontSizeClass}
    />
  );
};

export default Guardian;
