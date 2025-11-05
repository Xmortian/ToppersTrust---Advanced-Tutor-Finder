import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase.js'; 

// Placeholder Icons
import { FaSignOutAlt } from 'react-icons/fa';

const initialGuardianData = {
  name: "Loading...",
  guardianId: "...",
  profileImageUrl: "", 
};

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

      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error('Error fetching user or no user logged in:', authError);
        navigate('/');
        return;
      }

      try {
        const { data: profile, error: profileFetchError } = await supabase
          .from('guardian')
          .select('id, name, photo')
          .eq('user_id', user.id)
          .single();

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
          let imageUrl = profile.photo || "";
          if (profile.photo && !profile.photo.startsWith('http')) {
            const { data: publicUrlData } = supabase.storage.from('photo').getPublicUrl(profile.photo);
            imageUrl = publicUrlData?.publicUrl || profile.photo;
          }
          
          let displayName = user.email?.split('@')[0] || "User";
          if (profile.name) {
              const exclusionList = ['md', 'md.'];
              const nameParts = profile.name
                  .split(' ')
                  .filter(part => part.length > 0)
                  .filter(part => !exclusionList.includes(part.toLowerCase()));

              if (nameParts.length > 0) {
                  displayName = nameParts.reduce((shortest, current) => 
                      current.length < shortest.length ? current : shortest, 
                  nameParts[0]);
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
      try {
        const { data: recTutorRefs, error: recError } = await supabase.from('recommendedtutors').select('id2').limit(8);
        if (recError) throw recError;
        if (!recTutorRefs || recTutorRefs.length === 0) {
          setRecommendationsLoading(false); return;
        }
        const tutorIntegerIDs = recTutorRefs.map(r => r.id2).filter(id => id != null);
        if (tutorIntegerIDs.length === 0) {
          setRecommendationsLoading(false); return;
        }
        const { data: tutorsDetails, error: detailsError } = await supabase.from('tutor_card').select('id, name, photo').in('id', tutorIntegerIDs);
        if (detailsError) throw detailsError;
        const mappedTutors = tutorsDetails.map(tutor => {
          let imageUrl = tutorImageFallback();
          if (tutor.photo) {
            if (tutor.photo.startsWith('http')) { imageUrl = tutor.photo; }
            else { const { data: p } = supabase.storage.from('photo').getPublicUrl(tutor.photo); imageUrl = p?.publicUrl || tutorImageFallback(); }
          }
          return { id: tutor.id, name: tutor.name || 'Unnamed Tutor', imageUrl: imageUrl };
        });
        setRecommendedTutors(mappedTutors);
      } catch (err) {
        console.error("Failed to fetch recommended tutors:", err);
        setRecommendationsError(err.message || 'Could not load recommendations.');
        setRecommendedTutors([]);
      } finally {
        setRecommendationsLoading(false);
      }
    };

    fetchGuardianData();
    fetchRecommendedTutorsList();
  }, [navigate]);

  const handleSignOut = async () => {
    setError(null);
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
      setError(`Sign out failed: ${error.message}`);
    }
  };

  const profileImageFallback = "https://placehold.co/150x200/6344cc/FFF?text=" +
    (guardianData.name && guardianData.name !== "Loading..." ? guardianData.name.split(' ').map(n=>n[0]).join('') : "G");

  // MODIFIED: Further reduced font sizes for mobile to prevent wrapping
  const getFontSizeClass = (name) => {
    const length = name?.length || 0;
    if (length < 9) return "text-3xl sm:text-4xl md:text-5xl";
    if (length < 12) return "text-2xl sm:text-3xl md:text-4xl";
    return "text-xl sm:text-2xl md:text-3xl";
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-xl bg-slate-800 text-gray-300">Loading Guardian Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-800 font-roboto text-gray-100 pb-24">
      <header className="bg-[#3b394d] text-white p-4 md:p-6 shadow-md relative h-[14.875rem] flex items-center">
        <div className="container mx-auto grid grid-cols-3 items-start w-full gap-2">
          
          <div className="text-left">
            <h2 className="text-base sm:text-lg font-semibold mb-1 text-red-300 opacity-90">
              Guardian
            </h2>
            <h1 className={`font-bold leading-tight text-white ${getFontSizeClass(guardianData.name)}`}>
              {guardianData.name}
            </h1>
          </div>

          <div className="absolute left-1/2 top-[5.5rem] transform -translate-x-1/2 z-10">
              <img
              src={guardianData.profileImageUrl || profileImageFallback}
              alt="Guardian Profile"
              onError={(e) => { e.target.onerror = null; e.target.src = profileImageFallback; }}
              className="w-[9rem] h-[12rem] sm:w-[10rem] sm:h-[14rem] md:w-[12rem] md:h-[16rem] rounded-[60px] border-4 border-white shadow-lg object-cover"
            />
          </div>
          
          <div className="text-right col-start-3">
            <p className="text-base sm:text-lg text-gray-300 mb-1">Guardian ID</p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold">{guardianData.guardianId}</p>
            <button
              onClick={handleSignOut}
              className="mt-3 text-sm text-gray-300 hover:text-white transition-colors flex items-center ml-auto"
            >
              <FaSignOutAlt className="mr-1" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <section className="relative py-8 px-4 pt-40 sm:pt-44 md:pt-52">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 relative z-10">
          {[
            { name: "Profile", path: "/guardian/profile", bgColor: "bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500" },
            { name: "Shortlist", path: "/tutor-card", bgColor: "bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600" },
            { name: "Post Job", path: "/guardian/post-job", bgColor: "bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700" },
            { name: "Posted Jobs", path: "/guardian/previous-jobs", bgColor: "bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500" },
          ].map((button) => (
            <Link
              key={button.name}
              to={button.path}
              className={`p-10 md:p-12 min-h-[10rem] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center text-center text-gray-800 font-semibold text-xl md:text-2xl ${button.bgColor}`}
            >
              <span>{button.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {error && (
        <div className="container mx-auto text-center py-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <section className="pt-8 pb-12 px-4 mt-16 md:mt-24 lg:mt-32">
        <div className="container mx-auto">
          <h3 className="text-base font-semibold text-gray-300 mb-3">Recommended Tutors</h3>
          {recommendationsLoading && <p className="text-gray-400 text-center py-4">Loading recommendations...</p>}
          {!recommendationsLoading && recommendationsError && (
            <p className="text-red-400 text-center py-4">Error: {recommendationsError}</p>
          )}
          {!recommendationsLoading && !recommendationsError && recommendedTutors.length === 0 && (
            <p className="text-gray-400 text-center py-4">No recommended tutors available at the moment.</p>
          )}
          {!recommendationsLoading && !recommendationsError && recommendedTutors.length > 0 && (
            <div className="max-w-4xl mx-auto px-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {recommendedTutors.map((tutor) => (
                <Link
                  key={tutor.id}
                  to={`/browse-tutors`}
                  className="block bg-white p-2 rounded-md shadow hover:shadow-md transition-transform transform hover:scale-105 text-center group"
                >
                  <img
                    src={tutor.imageUrl}
                    alt={tutor.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = tutorImageFallback(); }}
                    className="w-full h-24 object-cover object-top rounded-sm mb-2"
                  />
                  <h4 className="text-sm font-medium text-gray-600 group-hover:text-blue-600 truncate px-1">{tutor.name}</h4>
                </Link>
              ))}
            </div>
          </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Guardian;