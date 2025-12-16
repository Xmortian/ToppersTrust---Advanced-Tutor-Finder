// models/GuardianProfileModel.jsx
import { supabase } from '../../supabase.js';

export const initialFormData = {
    name: "",
    contactNumber: "",
    email: "",
    gender: "", 
    facebookProfile: "",
    city: "",
    address: "",
    relationWithStudent: "",
    guardianId: "",
    profileImageUrl: null, 
    howDidYouKnow: "",
    driveLink: "", 
};

export const howDidYouKnowOptions = [
    {label: "-- Select an Option --", value: ""},
    {label: "Facebook", value: "Facebook"},
    {label: "LinkedIn", value: "LinkedIn"},
    {label: "Friend/Colleague", value: "Friend/Colleague"},
    {label: "Search Engine (Google, etc.)", value: "Search Engine (Google, etc.)"},
    {label: "Advertisement", value: "Advertisement"},
    {label: "Who are you?", value: "Who are you?"},
    {label: "Other", value: "Other"}
];

export const genderOptions = [ 
    {label: "-- Select Student Gender --", value: ""}, 
    {label: "Male", value: "Male"}, 
    {label: "Female", value: "Female"}
];

export class GuardianProfileModel {
    /**
     * Fetch guardian profile data for authenticated user
     */
    static async fetchProfile(userId) {
        try {
            console.log("MODEL: Fetching profile for user ID:", userId);
            
            const { data: profileData, error: profileFetchError } = await supabase
                .from('guardian') 
                .select(`
                    id, name, phone, email, gender, facebook_profile_link, 
                    city, address, relation_with_student, photo,
                    how_did_you_know, drive_link 
                `) 
                .eq('user_id', userId) 
                .single();

            console.log("MODEL: Raw profile data:", profileData);
            console.log("MODEL: Profile error:", profileFetchError);

            if (profileFetchError && profileFetchError.code !== 'PGRST116') { 
                throw profileFetchError;
            }

            return profileData;
        } catch (error) {
            console.error("MODEL: Error fetching profile:", error);
            throw error;
        }
    }

    /**
     * Get authenticated user
     */
    static async getAuthenticatedUser() {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
            throw new Error('Authentication error. Please log in again.');
        }
        
        return user;
    }

    /**
     * Upload profile image to storage
     */
    static async uploadProfileImage(userId, file, oldImagePath) {
        try {
            const fileExt = file.name.split('.').pop();
            const newFileName = `${userId}/guardian-profile-${Date.now()}.${fileExt}`;
            
            // Remove old image if exists and not an HTTP URL
            if (oldImagePath && !oldImagePath.startsWith('http')) {
                console.log("MODEL: Removing old image:", oldImagePath);
                await supabase.storage.from('photo').remove([oldImagePath]);
            }

            console.log("MODEL: Uploading new image:", newFileName);
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('photo') 
                .upload(newFileName, file, {
                    cacheControl: '3600',
                    upsert: true, 
                });

            if (uploadError) {
                console.error("MODEL: Upload error:", uploadError);
                if (uploadError.message.toLowerCase().includes("bucket not found")) {
                    throw new Error("Storage bucket 'photo' not found. Please ensure it exists in your Supabase project.");
                }
                throw uploadError; 
            }

            console.log("MODEL: Image uploaded, path:", uploadData.path);
            return uploadData.path;
        } catch (error) {
            console.error("MODEL: Error uploading image:", error);
            throw error;
        }
    }

    /**
     * Update guardian profile
     */
    static async updateProfile(userId, updates) {
        try {
            console.log("MODEL: Updating profile with:", JSON.stringify(updates, null, 2));
            
            const { data: updatedData, error: updateError } = await supabase
                .from('guardian')
                .update(updates)
                .eq('user_id', userId) 
                .select() 
                .single(); 

            if (updateError) {
                console.error("MODEL: Update error:", updateError);
                throw updateError; 
            }
            
            console.log("MODEL: Profile updated successfully:", updatedData);
            return updatedData;
        } catch (error) {
            console.error("MODEL: Error updating profile:", error);
            throw error;
        }
    }

    /**
     * Get public URL for storage image
     */
    static getPublicImageUrl(imagePath) {
        if (!imagePath) return null;
        
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        
        const { data: urlData } = supabase.storage.from('photo').getPublicUrl(imagePath);
        return urlData?.publicUrl || imagePath;
    }

    /**
     * Transform database profile to form data
     */
    static transformToFormData(profileData, userEmail) {
        if (!profileData) {
            return {
                ...JSON.parse(JSON.stringify(initialFormData)),
                email: userEmail || "",
            };
        }

        return {
            ...JSON.parse(JSON.stringify(initialFormData)),
            name: profileData.name || "",
            contactNumber: profileData.phone || "",
            email: profileData.email || userEmail || "",
            gender: profileData.gender || "", 
            facebookProfile: profileData.facebook_profile_link || "",
            city: profileData.city || "",
            address: profileData.address || "",
            relationWithStudent: profileData.relation_with_student || "",
            guardianId: profileData.id?.toString() || "",
            profileImageUrl: profileData.photo || null, 
            howDidYouKnow: profileData.how_did_you_know || "",
            driveLink: profileData.drive_link || "",
        };
    }

    /**
     * Transform form data to database updates
     */
    static transformToDbUpdates(formData, imagePath) {
        return {
            phone: formData.contactNumber || null,
            gender: formData.gender || null, 
            facebook_profile_link: formData.facebookProfile || null,
            city: formData.city || null,
            address: formData.address || null,
            relation_with_student: formData.relationWithStudent || null,
            photo: imagePath, 
            how_did_you_know: formData.howDidYouKnow || null,
            drive_link: formData.driveLink || null,
        };
    }

    /**
     * Calculate profile completion percentage
     */
    static calculateProfileCompletion(data) {
        let completedFields = 0;
        const totalFieldsToConsider = 10; 

        if (data.name && data.name !== "Loading...") completedFields++;
        if (data.contactNumber && data.contactNumber !== "...") completedFields++;
        if (data.email && data.email !== "...") completedFields++;
        if (data.gender) completedFields++;
        if (data.city) completedFields++;
        if (data.address) completedFields++;
        if (data.relationWithStudent) completedFields++;
        if (data.profileImageUrl) completedFields++; 
        if (data.driveLink) completedFields++;
        if (data.howDidYouKnow) completedFields++;
        
        return Math.min(100, Math.round((completedFields / totalFieldsToConsider) * 100));
    }
}