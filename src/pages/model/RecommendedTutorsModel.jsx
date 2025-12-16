import { supabase } from '../../supabase.js';

class RecommendedTutorsModel {
    async getCurrentGuardianDbId() {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return null;
            const { data: guardianProfile, error: profileError } = await supabase
                .from('guardian')
                .select('id')
                .eq('user_id', user.id)
                .single();
            if (profileError) {
                if (profileError.code === 'PGRST116') return null;
                throw profileError;
            }
            return guardianProfile?.id ?? null;
        } catch (e) {
            throw e;
        }
    }

    async fetchRecommendedTutors(currentGuardianDbId) {
        try {
            let alreadyAcceptedTutorIds = new Set();
            if (currentGuardianDbId) {
                const { data: acceptedData, error: acceptedError } = await supabase
                    .from('recc_tutors_accepted')
                    .select('tutor_id')
                    .eq('guardian_id', currentGuardianDbId);
                if (!acceptedError && acceptedData) acceptedData.forEach(item => alreadyAcceptedTutorIds.add(item.tutor_id));
            }

            const { data: recommendedData, error: recError } = await supabase.from('recommendedtutors').select('id2');
            if (recError) throw recError;
            if (!recommendedData || recommendedData.length === 0) return [];

            const recommendedTutorIntIDs = recommendedData.map(r => r.id2).filter(id => id != null);
            if (recommendedTutorIntIDs.length === 0) return [];

            const { data: tutorsDetails, error: fetchError } = await supabase
                .from('recommendedtutors')
                .select('id, tutorname, uni, uni_grade, qualification, preferred_areas, rating, ssc_grade, ssc_school, hsc_grade, hsc_school, photo, experience_years, expected_salary, available_time')
                .in('id', recommendedTutorIntIDs)
                .order('rating', { ascending: false, nullsFirst: false });
            if (fetchError) throw fetchError;

            const mappedTutors = tutorsDetails
                .filter(tutor => !alreadyAcceptedTutorIds.has(tutor.id))
                .map(tutor => {
                    let imageUrl = null;
                    if (tutor.photo) {
                        const { data: publicUrlData } = supabase.storage.from('photo').getPublicUrl(tutor.photo);
                        imageUrl = publicUrlData.publicUrl;
                    }
                    return {
                        id: tutor.id,
                        name: tutor.name || 'N/A',
                        university: tutor.uni || 'N/A',
                        grade: tutor.uni_grade || 'N/A',
                        department: tutor.qualification || 'N/A',
                        location: Array.isArray(tutor.preferred_areas) ? tutor.preferred_areas.join(', ') : (tutor.preferred_areas || 'Not specified'),
                        rating: tutor.rating ? parseFloat(tutor.rating) : null,
                        sscInfo: `SSC Grade: ${tutor.ssc_grade || 'N/A'}`,
                        hscInfo: `HSC Grade: ${tutor.hsc_grade || 'N/A'}`,
                        profileImageUrl: imageUrl,
                        experience_years: tutor.experience_years,
                        expectedSalary: tutor.expected_salary,
                        availableTime: tutor.available_time,
                    };
                });

            return mappedTutors;
        } catch (err) {
            throw err;
        }
    }

    async acceptTutor(guardianId, tutorId) {
        try {
            const { error } = await supabase.from('recc_tutors_accepted').insert({ guardian_id: guardianId, tutor_id: tutorId, accepted_status: true });
            if (error) throw error;
            return true;
        } catch (e) {
            throw e;
        }
    }

    async fetchAllTutors(currentGuardianDbId) {
        try {
            let alreadyAcceptedTutorIds = new Set();
            if (currentGuardianDbId) {
                const { data: acceptedData, error: acceptedError } = await supabase
                    .from('recc_tutors_accepted')
                    .select('tutor_id')
                    .eq('guardian_id', currentGuardianDbId);
                if (!acceptedError && acceptedData) acceptedData.forEach(item => alreadyAcceptedTutorIds.add(item.tutor_id));
            }

            const { data: tutorsDetails, error: fetchError } = await supabase
                .from('recommendedtutors')
                .select('id, name')
                .order('rating', { ascending: false, nullsFirst: false });
            if (fetchError) throw fetchError;

            const mappedTutors = tutorsDetails
                .filter(tutor => !alreadyAcceptedTutorIds.has(tutor.id))
                .map(tutor => {
                    let imageUrl = null;
                    if (tutor.photo) {
                        const { data: publicUrlData } = supabase.storage.from('photo').getPublicUrl(tutor.photo);
                        imageUrl = publicUrlData.publicUrl;
                    }
                    return {
                        id: tutor.id,
                        name: tutor.name || 'N/A',
                        university: tutor.uni || 'N/A',
                        grade: tutor.uni_grade || 'N/A',
                        department: tutor.qualification || 'N/A',
                        location: Array.isArray(tutor.preferred_areas) ? tutor.preferred_areas.join(', ') : (tutor.preferred_areas || 'Not specified'),
                        rating: tutor.rating ? parseFloat(tutor.rating) : null,
                        sscInfo: `SSC Grade: ${tutor.ssc_grade || 'N/A'}`,
                        hscInfo: `HSC Grade: ${tutor.hsc_grade || 'N/A'}`,
                        profileImageUrl: imageUrl,
                        experience_years: tutor.experience_years,
                        expectedSalary: tutor.expected_salary,
                        availableTime: tutor.available_time,
                    };
                });

            return mappedTutors;
        } catch (err) {
            throw err;
        }
    }
}

export default RecommendedTutorsModel;
