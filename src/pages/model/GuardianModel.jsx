import { supabase } from '../../supabase.js';

/**
 * GuardianModel - Handles all data operations for Guardian dashboard
 */
export class GuardianModel {
    /**
     * Get the currently authenticated user
     * @returns {Promise<{user: Object|null, error: Object|null}>}
     */
    static async getCurrentUser() {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        return { user, error: authError };
    }

    /**
     * Fetch guardian profile data
     * @param {string} userId - The user ID to fetch profile for
     * @returns {Promise<{profile: Object|null, error: Object|null}>}
     */
    static async fetchGuardianProfile(userId) {
        const { data: profile, error: profileFetchError } = await supabase
            .from('guardian')
            .select('id, name, photo')
            .eq('user_id', userId)
            .single();

        return { profile, error: profileFetchError };
    }

    /**
     * Get public URL for a photo stored in Supabase storage
     * @param {string} photoPath - Path to the photo in storage
     * @returns {string} Public URL of the photo
     */
    static getPhotoPublicUrl(photoPath) {
        if (!photoPath) return "";
        if (photoPath.startsWith('http')) return photoPath;
        
        const { data: publicUrlData } = supabase.storage.from('photo').getPublicUrl(photoPath);
        return publicUrlData?.publicUrl || photoPath;
    }

    /**
     * Extract shortest meaningful name from full name
     * @param {string} fullName - Full name of the guardian
     * @returns {string} Shortest name part
     */
    static extractShortestName(fullName) {
        if (!fullName) return "";
        
        const exclusionList = ['md', 'md.'];
        const nameParts = fullName
            .split(' ')
            .filter(part => part.length > 0)
            .filter(part => !exclusionList.includes(part.toLowerCase()));

        if (nameParts.length > 0) {
            return nameParts.reduce((shortest, current) => 
                current.length < shortest.length ? current : shortest, 
                nameParts[0]
            );
        }
        
        return "";
    }

    /**
     * Fetch recommended tutors list
     * @returns {Promise<{tutors: Array, error: string|null}>}
     */
    static async fetchRecommendedTutors() {
        try {
            const { data: recTutorRefs, error: recError } = await supabase
                .from('recommendedtutors')
                .select('id2')
                .limit(8);

            if (recError) throw recError;
            if (!recTutorRefs || recTutorRefs.length === 0) {
                return { tutors: [], error: null };
            }

            const tutorIntegerIDs = recTutorRefs.map(r => r.id2).filter(id => id != null);
            if (tutorIntegerIDs.length === 0) {
                return { tutors: [], error: null };
            }

            const { data: tutorsDetails, error: detailsError } = await supabase
                .from('tutor_card')
                .select('id, name, photo')
                .in('id', tutorIntegerIDs);

            if (detailsError) throw detailsError;

            const mappedTutors = tutorsDetails.map(tutor => ({
                id: tutor.id,
                name: tutor.name || 'Unnamed Tutor',
                photo: tutor.photo
            }));

            return { tutors: mappedTutors, error: null };
        } catch (err) {
            console.error("Failed to fetch recommended tutors:", err);
            return { tutors: [], error: err.message || 'Could not load recommendations.' };
        }
    }

    /**
     * Sign out the current user
     * @returns {Promise<{success: boolean, error: Object|null}>}
     */
    static async signOut() {
        const { error } = await supabase.auth.signOut();
        return { success: !error, error };
    }

    /**
     * Get tutor image URL with fallback
     * @param {string} photoPath - Path to tutor photo
     * @returns {string} Image URL
     */
    static getTutorImageUrl(photoPath) {
        const fallback = () => `https://placehold.co/80x80/e0e0e0/7f7f7f?text=N/A`;
        
        if (!photoPath) return fallback();
        if (photoPath.startsWith('http')) return photoPath;
        
        const { data: p } = supabase.storage.from('photo').getPublicUrl(photoPath);
        return p?.publicUrl || fallback();
    }
}
