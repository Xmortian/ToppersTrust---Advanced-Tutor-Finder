import { supabase } from '../../supabase.js';

class RecommendedTutorsModel {
    // Expose supabase so the controller can access auth if needed
    supabase = supabase;

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

    async fetchTutors(currentGuardianDbId, isRecommendedOnly = false) {
        try {
            let alreadyAcceptedTutorIds = new Set();
            if (currentGuardianDbId) {
                const { data: acceptedData } = await supabase
                    .from('recc_tutors_accepted')
                    .select('tutor_id')
                    .eq('guardian_id', currentGuardianDbId);
                if (acceptedData) acceptedData.forEach(item => alreadyAcceptedTutorIds.add(item.tutor_id));
            }

            // JOIN: Get tutor details via id2
            let query = supabase
                .from('recommendedtutors')
                .select(`
                    id,
                    id2,
                    tutor:tutor!id2 (
                        id,
                        name,
                        photo,
                        experience_years,
                        qualification,
                        rating,
                        ssc_grade,
                        hsc_grade,
                        uni,
                        uni_grade,
                        preferred_areas,
                        expected_salary,
                        available_time
                    )
                `);

            if (isRecommendedOnly) {
                query = query.not('id2', 'is', null);
            }

            const { data: results, error: fetchError } = await query;
            if (fetchError) throw fetchError;

            return results
                .filter(item => item.tutor && !alreadyAcceptedTutorIds.has(item.tutor.id))
                .map(item => {
                    const t = item.tutor;
                    let imageUrl = null;
                    if (t.photo) {
                        const { data: publicUrlData } = supabase.storage.from('photo').getPublicUrl(t.photo);
                        imageUrl = publicUrlData.publicUrl;
                    }

                    return {
                        recTableId: item.id, // ID from recommendedtutors table
                        id: t.id,           // ACTUAL ID from tutor table (important for foreign keys)
                        name: t.name || 'N/A',
                        university: t.uni || 'N/A',
                        grade: t.uni_grade || 'N/A',
                        department: t.qualification || 'N/A',
                        location: t.preferred_areas || 'Not specified',
                        rating: t.rating ? parseFloat(t.rating) : null,
                        sscInfo: `SSC Grade: ${t.ssc_grade || 'N/A'}`,
                        hscInfo: `HSC Grade: ${t.hsc_grade || 'N/A'}`,
                        profileImageUrl: imageUrl,
                        experience_years: t.experience_years,
                        expectedSalary: t.expected_salary,
                        availableTime: t.available_time,
                    };
                });
        } catch (err) {
            throw err;
        }
    }

    async acceptTutor(guardianId, tutorId) {
        // tutorId must be the integer ID from the 'tutor' table
        const { error } = await supabase
            .from('recc_tutors_accepted')
            .insert({ 
                guardian_id: guardianId, 
                tutor_id: tutorId, 
                accepted_status: true 
            });
        if (error) throw error;
        return true;
    }
}

export default RecommendedTutorsModel;