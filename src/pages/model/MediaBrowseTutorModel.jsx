import { supabase } from '../../supabase.js';

export const MediaBrowseTutorModel = {
    async fetchMediaProfile(userId) {
        const { data, error } = await supabase
            .from('media')
            .select('id')
            .eq('user_id', userId)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return data?.id;
    },

    async fetchTutors() {
        const { data: allTutors, error } = await supabase
            .from('tutor')
            .select('*')
            .order('id', { ascending: false });

        if (error) throw error;
        return allTutors || [];
    },

    async getAcceptedTutorIds(mediaId) {
        const { data, error } = await supabase
            .from('interested_tutors_media')
            .select('tutor_id')
            .eq('media_id', mediaId);
        
        if (error && error.code !== 'PGRST116') throw error;
        return data?.map(item => item.tutor_id) || [];
    },

    async acceptTutor(mediaId, tutorId) {
        return await supabase.from('interested_tutors_media').insert([{ 
            media_id: mediaId, 
            tutor_id: tutorId
        }]);
    },

    async rejectTutor(mediaId, tutorId) {
        // Currently, we don't store rejections, just skip them in the list
        // If you want to track rejections, create a similar table for them
        return { data: null, error: null };
    }
};
