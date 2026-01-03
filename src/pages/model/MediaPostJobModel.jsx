
import { supabase } from '../../supabase.js';


export async function getAuthUser() {
    const { data, error } = await supabase.auth.getUser();
    return { user: data?.user ?? null, error };
}


export async function fetchMediaProfileByUserId(userId) {
    const { data, error } = await supabase
        .from('media')
        .select('id, name, email')
        .eq('user_id', userId)
        .single();
    
    return { profile: data ?? null, error };
}


export async function fetchMediaData(userId) {
    if (!userId) {
        throw new Error('User ID is required');
    }

    try {
        const { profile, error } = await fetchMediaProfileByUserId(userId);
        
        if (error) {
            if (error?.code === 'PGRST116') {
                throw new Error('Media partner profile not found.');
            }
            throw error;
        }

        if (!profile) {
            throw new Error('Media partner profile data is missing.');
        }

        return {
            mediaId: profile.id?.toString() || 'N/A',
            name: profile.name || 'Name Not Set',
            email: profile.email || 'N/A',
        };
    } catch (error) {
        console.error('[PostJobModel] Error fetching media data:', error);
        throw error;
    }
}


export async function submitJobRequest(mediaId, jobDescription) {
    if (!mediaId) {
        throw new Error('Media ID is required');
    }

    if (!jobDescription || jobDescription.trim().length === 0) {
        throw new Error('Job description cannot be empty');
    }

    if (jobDescription.trim().length < 10) {
        throw new Error('Job description must be at least 10 characters');
    }

    if (jobDescription.trim().length > 5000) {
        throw new Error('Job description must be less than 5000 characters');
    }

    try {
        const { data, error } = await supabase
            .from('media_to_admin')
            .insert([
                {
                    media_id: mediaId,
                    job_description: jobDescription.trim()
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('[PostJobModel] Insert error:', error);
            throw new Error('Failed to submit job request. Please try again.');
        }

        return data;
    } catch (error) {
        console.error('[PostJobModel] Error submitting job request:', error);
        throw error;
    }
}


export async function fetchUserJobRequests(mediaId) {
    if (!mediaId) {
        return [];
    }

    try {
        const { data, error } = await supabase
            .from('media_to_admin')
            .select('id, created_at, job_description')
            .eq('media_id', mediaId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[PostJobModel] Fetch requests error:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('[PostJobModel] Error fetching job requests:', error);
        return [];
    }
}