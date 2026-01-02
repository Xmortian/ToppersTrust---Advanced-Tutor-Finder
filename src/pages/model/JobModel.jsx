import { supabase } from '../../supabase.js';

export const JobModel = {
    async fetchTutorProfile(userId) {
        const { data, error } = await supabase
            .from('tutor')
            .select('id')
            .eq('user_id', userId)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return data?.id;
    },

    async fetchJobs(tutorId) {
        let appliedJobIds = [];
        if (tutorId) {
            const { data } = await supabase
                .from('apply_job')
                .select('job_id')
                .eq('tutor_id', tutorId)
                .eq('swiped_right', true);
            appliedJobIds = data?.map(app => app.job_id) || [];
        }

        const { data: allJobs, error } = await supabase
            .from('job')
            .select('*')
            .order('posted_date', { ascending: false });

        if (error) throw error;
        return allJobs.filter(job => !appliedJobIds.includes(job.id));
    },

    async applyForJob(jobId, tutorId) {
        return await supabase.from('apply_job').insert([{ 
            job_id: jobId, 
            tutor_id: tutorId, 
            swiped_right: true, 
            matched: false 
        }]);
    }
};