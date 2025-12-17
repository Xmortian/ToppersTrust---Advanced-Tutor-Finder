/**
 * @fileoverview MediaModel.jsx
 * Supabase logic for handling Media Partner data from the 'media' table.
 */

import { supabase } from '../../supabase.js';

/**
 * Fetch authenticated user.
 * Returns { user, error }
 */
export async function getAuthUser() {
    const { data, error } = await supabase.auth.getUser();
    return { user: data?.user ?? null, error };
}

/**
 * Fetch media partner profile by user_id.
 * Returns { profile, error }
 */
export async function fetchMediaProfileByUserId(userId) {
    const { data, error } = await supabase
        .from('media')
        .select('id, name, email, photo')
        .eq('user_id', userId)
        .single();
    
    return { profile: data ?? null, error };
}

/**
 * Get a public URL for a photo path stored in 'photo' bucket.
 * Returns string publicUrl ('' if none)
 */
export function getPublicUrlForPhoto(path) {
    if (!path) return '';
    const { data: publicUrlData } = supabase.storage.from('photo').getPublicUrl(path);
    return publicUrlData?.publicUrl ?? '';
}

/**
 * Fetch media partner data (main function).
 * This is called by the controller.
 * 
 * @param {string} userId - The authenticated user ID
 * @returns {Promise<object>} Media data object
 */
export async function fetchMediaData(userId) {
    if (!userId) {
        throw new Error('User ID is required');
    }

    try {
        const { profile, error } = await fetchMediaProfileByUserId(userId);
        
        if (error) {
            // Handle "not found" gracefully
            if (error?.code === 'PGRST116') {
                throw new Error('Media partner profile not found. Please complete your profile.');
            }
            throw error;
        }

        if (!profile) {
            throw new Error('Media partner profile data is missing.');
        }

        // Get profile image URL if exists
        const imageUrl = getPublicUrlForPhoto(profile.photo);

        return {
            mediaId: profile.id?.toString() || 'N/A',
            name: profile.name || 'Name Not Set',
            email: profile.email || 'N/A',
            profileImageUrl: imageUrl || '',
        };
    } catch (error) {
        console.error('[MediaModel] Error fetching media data:', error);
        throw error;
    }
}

/**
 * Fetch notifications for media partner
 * (Mock implementation - replace with real Supabase query when you have a notifications table)
 * 
 * @param {number} mediaId - The media partner ID
 * @returns {Promise<Array>} Array of notification objects
 */
export async function fetchMediaNotifications(mediaId) {
    // TODO: Replace with real Supabase query when you create a notifications table
    // Example:
    // const { data, error } = await supabase
    //     .from('notifications')
    //     .select('*')
    //     .eq('media_id', mediaId)
    //     .order('created_at', { ascending: false });
    
    // Mock notifications for now
    await new Promise(resolve => setTimeout(resolve, 200));

    return [
        { 
            id: 1, 
            message: "New tutor application received.", 
            isRead: false, 
            timestamp: Date.now() - 3600000 
        },
        { 
            id: 2, 
            message: "Your job post was viewed 15 times today.", 
            isRead: false, 
            timestamp: Date.now() - 7200000 
        },
    ];
}

/**
 * Sign out helper
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    return error;
}

/**
 * Pick a display name from profile name/email
 */
export function computeDisplayName(userEmail, profileName) {
    if (!profileName || profileName === 'Name Not Set') {
        return userEmail?.split('@')[0] || 'Media Partner';
    }
    return profileName;
}