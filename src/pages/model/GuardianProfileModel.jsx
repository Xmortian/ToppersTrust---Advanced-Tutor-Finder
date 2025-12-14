import { supabase } from '../../supabase.js';

// --- INITIAL STATE & CONSTANTS ---
export const initialGuardianDataOnLoad = {
  name: "Loading...",
  contactNumber: "...",
  email: "...",
  facebookProfile: null,
  city: "...",
  address: "...",
  relationWithStudent: "...",
  isVerified: false,
  guardianId: "...",
  profileCompletion: 0,
  profileImageUrl: null,
};

// --- DATA LOGIC / BUSINESS LOGIC ---
export const calculateProfileCompletion = (data) => {
  let completedFields = 0;
  const totalConsideredFields = 7; // name, contact, email, city, address, relation, photo
  if (data.name && data.name !== "Loading...") completedFields++;
  if (data.contactNumber && data.contactNumber !== "...") completedFields++;
  if (data.email && data.email !== "...") completedFields++;
  if (data.city && data.city !== "...") completedFields++;
  if (data.address && data.address !== "...") completedFields++;
  if (data.relationWithStudent && data.relationWithStudent !== "...") completedFields++;
  if (data.profileImageUrl) completedFields++;

  return Math.min(100, Math.round((completedFields / totalConsideredFields) * 100));
};

// --- API INTERACTIONS ---
export const fetchGuardianProfileData = async (navigate) => {
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Error fetching user or no user logged in:", authError);
    navigate('/');
    // Returning null to signal a critical error (redirecting)
    return { data: null, error: "Authentication failed. Redirecting." };
  }

  try {
    const { data: profileData, error: profileFetchError } = await supabase
      .from('guardian')
      .select(`
        id,
        name,
        phone,
        email,
        facebook_profile_link,
        city,
        address,
        relation_with_student,
        verified_yn,
        photo
      `)
      .eq('user_id', user.id)
      .single();

    let finalData = {
      ...initialGuardianDataOnLoad,
      name: user.email?.split('@')[0] || "Guardian",
      email: user.email || "N/A",
      guardianId: "N/A",
    };

    if (profileFetchError) {
      if (profileFetchError.code === 'PGRST116') {
        finalData.guardianId = "New User";
        finalData.profileCompletion = calculateProfileCompletion(finalData);
        return { data: finalData, error: "Guardian profile not found. Complete registration." };
      }
      throw profileFetchError;
    }

    if (profileData) {
      let imageUrl = profileData.photo || null;
      if (profileData.photo && !profileData.photo.startsWith('http')) {
        const { data: publicUrlData } = supabase.storage.from('photo').getPublicUrl(profileData.photo);
        imageUrl = publicUrlData?.publicUrl || profileData.photo;
      }

      const newGuardianData = {
        name: profileData.name || user.email?.split('@')[0] || "Guardian",
        contactNumber: profileData.phone || "N/A",
        email: profileData.email || user.email || "N/A",
        facebookProfile: profileData.facebook_profile_link || null,
        city: profileData.city || "N/A",
        address: profileData.address || "N/A",
        relationWithStudent: profileData.relation_with_student || "N/A",
        isVerified: profileData.verified_yn || false,
        guardianId: profileData.id?.toString() || "N/A",
        profileImageUrl: imageUrl,
      };

      newGuardianData.profileCompletion = calculateProfileCompletion(newGuardianData);
      return { data: newGuardianData, error: null };
    }

    // Fallback if profileData is null without an error code 116
    return { data: finalData, error: "Guardian profile data could not be loaded." };

  } catch (error) {
    console.error("Error fetching guardian profile details:", error);
    return { data: null, error: `Failed to load profile: ${error.message}` };
  }
};

export const handleSignOutApi = async () => {
  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError) throw signOutError;
};