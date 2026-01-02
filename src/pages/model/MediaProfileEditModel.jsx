import { supabase } from '../../supabase.js';

export const initialFormData = {
    name: "",
    contactNumber: "",
    email: "",
    gender: "", 
    facebookProfile: "",
    city: "",
    address: "",
    organization: "", // mapped from relationWithStudent in your previous code
    guardianId: "",
    profileImageUrl: null, 
    howDidYouKnow: "",
    driveLink: "", 
};

export class MediaProfileModel {
    /**
     * Fetch media profile data for authenticated user
     */
    static async fetchProfile(userId) {
        try {
            const { data: profileData, error: profileFetchError } = await supabase
                .from('media') // FIXED: Table name changed from 'guardian' to 'media'
                .select(`
                    id, name, phone, email, facebook_profile_link, 
                    city, address, photo, how_did_you_know, drive_link 
                `) 
                .eq('user_id', userId) 
                .single();

            if (profileFetchError && profileFetchError.code !== 'PGRST116') { 
                throw profileFetchError;
            }

            return profileData;
        } catch (error) {
            console.error("MODEL: Error fetching profile:", error);
            throw error;
        }
    }

    static async getAuthenticatedUser() {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) throw new Error('Authentication error. Please log in again.');
        return user;
    }

    static async uploadProfileImage(userId, file, oldImagePath) {
        try {
            const fileExt = file.name.split('.').pop();
            const newFileName = `${userId}/media-profile-${Date.now()}.${fileExt}`;
            
            if (oldImagePath && !oldImagePath.startsWith('http')) {
                await supabase.storage.from('photo').remove([oldImagePath]);
            }

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('photo') 
                .upload(newFileName, file, { cacheControl: '3600', upsert: true });

            if (uploadError) throw uploadError; 
            return uploadData.path;
        } catch (error) {
            throw error;
        }
    }

    static async updateProfile(userId, updates) {
        try {
            // Check if profile exists
            const { data: existingProfile } = await supabase
                .from('media') // FIXED: Table name
                .select('id')
                .eq('user_id', userId)
                .single();
            
            let result;
            if (existingProfile) {
                const { data, error } = await supabase
                    .from('media') // FIXED: Table name
                    .update(updates)
                    .eq('user_id', userId)
                    .select().single();
                if (error) throw error;
                result = data;
            } else {
                const { data, error } = await supabase
                    .from('media') // FIXED: Table name
                    .insert([{ user_id: userId, ...updates }])
                    .select().single();
                if (error) throw error;
                result = data;
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    static getPublicImageUrl(imagePath) {
        if (!imagePath || imagePath.startsWith('http')) return imagePath;
        const { data: urlData } = supabase.storage.from('photo').getPublicUrl(imagePath);
        return urlData?.publicUrl || imagePath;
    }

    /**
     * Map DB Table fields -> Form State
     */
    static transformToFormData(profileData, userEmail) {
        if (!profileData) {
            return { ...initialFormData, email: userEmail || "" };
        }

        return {
            ...initialFormData,
            name: profileData.name || "",
            contactNumber: profileData.phone || "",
            email: profileData.email || userEmail || "",
            facebookProfile: profileData.facebook_profile_link || "",
            city: profileData.city || "",
            address: profileData.address || "",
            guardianId: profileData.id?.toString() || "",
            profileImageUrl: profileData.photo || null, 
            howDidYouKnow: profileData.how_did_you_know || "",
            driveLink: profileData.drive_link || "",
        };
    }

    /**
     * Map Form State -> DB Table fields
     */
    static transformToDbUpdates(formData, imagePath) {
        return {
            name: formData.name || null,
            phone: formData.contactNumber || null,
            email: formData.email || null,
            facebook_profile_link: formData.facebookProfile || null,
            city: formData.city || null,
            address: formData.address || null,
            photo: imagePath, 
            how_did_you_know: formData.howDidYouKnow || null,
            drive_link: formData.driveLink || null,
            // Note: fulladdress and area from your SQL table are not currently in the form
        };
    }

    static calculateProfileCompletion(data) {
        let completedFields = 0;
        const fields = ['name', 'contactNumber', 'email', 'city', 'address', 'profileImageUrl', 'howDidYouKnow'];
        fields.forEach(field => { if (data[field]) completedFields++; });
        return Math.round((completedFields / fields.length) * 100);
    }
}