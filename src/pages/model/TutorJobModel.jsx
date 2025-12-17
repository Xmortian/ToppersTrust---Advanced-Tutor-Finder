// JobModel.js - Handles all data operations
import { supabase } from '../../supabase.js';

class JobModel {
    // Fetch current tutor profile ID
    static async getCurrentTutorProfileId() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data: tutorProfile, error: tutorProfileError } = await supabase
            .from('tutor')
            .select('id')
            .eq('user_id', user.id)
            .single();

        if (tutorProfileError && tutorProfileError.code !== 'PGRST116') {
            console.error("Error fetching tutor profile ID:", tutorProfileError);
            return null;
        }

        return tutorProfile?.id || null;
    }

    // Fetch jobs that the tutor has already applied to
    static async getAppliedJobIds(tutorId) {
        if (!tutorId) return [];

        const { data: appliedData, error: appliedError } = await supabase
            .from('apply_job')
            .select('job_id')
            .eq('tutor_id', tutorId)
            .eq('swiped_right', true);

        if (appliedError) {
            console.error("Error fetching applied jobs:", appliedError);
            return [];
        }

        return appliedData ? appliedData.map(app => app.job_id) : [];
    }

    // Fetch all jobs from database
    static async getAllJobs() {
        const { data: allJobsData, error: fetchError } = await supabase
            .from('job')
            .select('*')
            .order('posted_date', { ascending: false });

        if (fetchError) throw fetchError;

        return allJobsData || [];
    }

    // Apply for a job (right swipe)
    static async applyForJob(jobId, tutorId) {
        const { error: applyError } = await supabase
            .from('apply_job')
            .insert([{
                job_id: jobId,
                tutor_id: tutorId,
                swiped_right: true,
                matched: false,
            }]);

        if (applyError) {
            if (applyError.code === '23505') {
                throw new Error('DUPLICATE_APPLICATION');
            }
            throw new Error(applyError.message);
        }

        return true;
    }

    // Check if user is authenticated
    static async checkAuth() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    }

    // Transform raw job data to display format
    static transformJobData(job) {
        const mediumText = job.medium || 'N/A Medium';
        const classText = job.class || 'N/A Class';
        const daysFormatted = this.formatDaysPerWeek(job.daysperweek);

        let titleLocationText = 'N/A Location';
        if (job.area && job.city) {
            titleLocationText = `${job.area}, ${job.city}`;
        } else if (job.city) {
            titleLocationText = job.city;
        } else if (job.area) {
            titleLocationText = job.area;
        } else if (job.location) {
            const parts = job.location.split(',');
            titleLocationText = parts.length >= 2 
                ? parts.slice(-2).join(',').trim() 
                : job.location.trim();
        }

        let displayLocation;
        if (job.area && job.city) {
            displayLocation = `${job.area}, ${job.city}`;
        } else if (job.city) {
            displayLocation = job.city;
        } else if (job.area) {
            displayLocation = job.area;
        } else {
            displayLocation = job.location || 'Not Specified';
        }

        return {
            id: job.id,
            title: `${mediumText} tutor for ${classText} student - ${daysFormatted} at ${titleLocationText}`,
            code: job.code || `JOB-${job.id}`,
            daysPerWeek: daysFormatted,
            noOfStudents: job.numberofstudents ? `${job.numberofstudents}` : '1',
            salary: job.salary ? `${job.salary}` : 'Negotiable',
            subjects: this.parseSubjects(job.subjects),
            location: displayLocation,
            fullAddressFromDB: job.location,
            paymentBasis: job.paymentbasis || 'Monthly',
            postedDate: job.posted_date,
            tuitionType: job.tuition_type || 'Not Specified',
            studentGender: job.studentgender || 'Any',
            preferredTutor: job.genderpreference || 'Any',
            tutoringTime: job.time || 'Not Specified',
            medium: job.medium || 'N/A',
            class: job.class || 'N/A',
            logoUrl: "/previewremovebgpreview-1@2x.png"
        };
    }

    // Helper: Parse subjects string
    static parseSubjects(subjectsString) {
        if (!subjectsString) return [];
        return subjectsString.split(',').map(s => s.trim()).filter(s => s);
    }

    // Helper: Format days per week
    static formatDaysPerWeek(days) {
        if (!days) return 'N/A';
        return `${days} Days/Week`;
    }

    // Helper: Format date
    static formatDate(dateString) {
        if (!dateString) return 'N/A';
        try {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        } catch (e) {
            return dateString;
        }
    }
}

export default JobModel;