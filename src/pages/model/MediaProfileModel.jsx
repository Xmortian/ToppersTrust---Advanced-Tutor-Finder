import { supabase } from '../../supabase.js';

// --- INITIAL STATE & CONSTANTS ---
export const initialGuardianDataOnLoad = {
  name: "Loading...",
  contactNumber: "...",
  email: "...",
  facebookProfile: null,
  city: "...",
  address: "...",
  isVerified: false,
  guardianId: "...",
  profileCompletion: 0,
  profileImageUrl: null,
};

// --- DATA LOGIC / BUSINESS LOGIC ---
export const calculateProfileCompletion = (data) => {
  let completedFields = 0;
  // Adjusted fields based on Media table schema: name, contact, email, city, address, photo
  const totalConsideredFields = 6; 
  if (data.name && data.name !== "Loading...") completedFields++;
  if (data.contactNumber && data.contactNumber !== "...") completedFields++;
  if (data.email && data.email !== "...") completedFields++;
  if (data.city && data.city !== "...") completedFields++;
  if (data.address && data.address !== "...") completedFields++;
  if (data.profileImageUrl) completedFields++;

  return Math.min(100, Math.round((completedFields / totalConsideredFields) * 100));
};

// --- API INTERACTIONS ---
export const fetchGuardianProfileData = async (navigate) => {
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Error fetching user or no user logged in:", authError);
    navigate('/');
    return { data: null, error: "Authentication failed. Redirecting." };
  }

  try {
    const { data: profileData, error: profileFetchError } = await supabase
      .from('media') // CHANGED: Correct table name
      .select(`
        id,
        name,
        phone,
        email,
        facebook_profile_link,
        city,
        address,
        verified_yn,
        photo
      `)
      .eq('user_id', user.id)
      .single();

    let finalData = {
      ...initialGuardianDataOnLoad,
      name: user.email?.split('@')[0] || "Media User",
      email: user.email || "N/A",
      guardianId: "N/A",
    };

    if (profileFetchError) {
      if (profileFetchError.code === 'PGRST116') {
        finalData.guardianId = "New User";
        finalData.profileCompletion = calculateProfileCompletion(finalData);
        return { data: finalData, error: "Media profile not found. Complete registration." };
      }
      throw profileFetchError;
    }

    if (profileData) {
      let imageUrl = profileData.photo || null;
      if (profileData.photo && !profileData.photo.startsWith('http')) {
        const { data: publicUrlData } = supabase.storage.from('photo').getPublicUrl(profileData.photo);
        imageUrl = publicUrlData?.publicUrl || profileData.photo;
      }

      const newMediaData = {
        name: profileData.name || user.email?.split('@')[0] || "Media User",
        contactNumber: profileData.phone || "N/A",
        email: profileData.email || user.email || "N/A",
        facebookProfile: profileData.facebook_profile_link || null,
        city: profileData.city || "N/A",
        address: profileData.address || "N/A",
        isVerified: profileData.verified_yn || false,
        guardianId: profileData.id?.toString() || "N/A",
        profileImageUrl: imageUrl,
      };

      newMediaData.profileCompletion = calculateProfileCompletion(newMediaData);
      return { data: newMediaData, error: null };
    }

    return { data: finalData, error: "Media profile data could not be loaded." };

  } catch (error) {
    console.error("Error fetching media profile details:", error);
    return { data: null, error: `Failed to load profile: ${error.message}` };
  }
};

export const handleSignOutApi = async () => {
  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError) throw signOutError;
};