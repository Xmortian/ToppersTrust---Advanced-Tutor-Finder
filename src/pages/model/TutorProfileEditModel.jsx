// TutorProfileEditModel.js
import { supabase } from '../../supabase.js';

// Constants
export const SUPABASE_BUCKET_NAME = 'photo';

export const initialFormData = {
    name: "", 
    email: "", 
    additionalNumber: "", 
    gender: "", 
    dateOfBirth: "", 
    religion: "", 
    nationalId: "",
    nationality: "", 
    facebookProfile: "", 
    driveLink: "",
    fathersName: "", 
    fathersNumber: "", 
    mothersName: "", 
    mothersNumber: "", 
    emergencyContact: "",
    location: "", 
    education: [
        { 
            id: 1, 
            level: "Bachelors/Honors", 
            institute: "", 
            examDegree: "", 
            majorGroup: "", 
            idCardNo: "", 
            result: "", 
            curriculum: "", 
            fromDate: "", 
            toDate: "", 
            yearOfPassing: "", 
            currentInstitute: false 
        },
        { 
            id: 2, 
            level: "Higher Secondary", 
            institute: "", 
            examDegree: "", 
            majorGroup: "", 
            idCardNo: "", 
            result: "", 
            curriculum: "", 
            fromDate: "", 
            toDate: "", 
            yearOfPassing: "", 
            currentInstitute: false 
        },
        { 
            id: 3, 
            level: "Secondary", 
            institute: "", 
            examDegree: "", 
            majorGroup: "", 
            idCardNo: "", 
            result: "", 
            curriculum: "", 
            fromDate: "", 
            toDate: "", 
            yearOfPassing: "", 
            currentInstitute: false 
        },
    ],
    tutoringMethod: "",
    availableDays: "", 
    availableTime: "",
    preferredLocations: "", 
    expectedSalary: "",
    preferredClasses: "",
    preferredSubjects: "",
    placeOfTutoring: "",
    tutoringStyle: "",
    totalExperience: "", 
    tutorId: "", 
    profileImageUrl: null, 
    howDidYouKnow: "",
};

/**
 * Get authenticated user from Supabase
 */
export const getAuthenticatedUser = async () => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
        throw new Error("Authentication failed");
    }
    
    return user;
};

/**
 * Fetch tutor profile from database
 */
export const fetchTutorProfile = async (userId) => {
    try {
        const { data: profileData, error: profileError } = await supabase
            .from('tutor')
            .select(`
                id, name, phone, gender, date_of_birth, religion, national_id_number, nationality,
                facebook_profile_link, drive_link, fathers_name, fathers_contact_number,
                mothers_name, mothers_contact_number, emergency_contact_number,
                ssc_school, ssc_grade, hsc_school, hsc_grade, 
                uni, uni_grade, qualification, uni_curriculum, uni_exam_degree, uni_from_date, 
                uni_major_group, uni_to_date, uni_id_card_no, uni_year_of_passing, uni_currently_studying,
                tutoring_method, available_days_text, available_time, address, 
                preferred_areas, expected_salary, preferred_classes, preferred_subjects,
                place_of_tutoring, tutoring_style, experience_years, photo, how_did_you_know, user_id
            `)
            .eq('user_id', userId)
            .single();

        if (profileError && profileError.code !== 'PGRST116') {
            throw profileError;
        }

        return profileData;
    } catch (error) {
        console.error("MODEL: Error fetching profile:", error);
        throw error;
    }
};

/**
 * Parse array data from database (handles both array and string formats)
 */
const parseAndJoin = (data) => {
    return Array.isArray(data) ? data.join(', ') : (data || "");
};

/**
 * Process profile data into form structure
 */
export const processProfileDataForForm = (profileData, user) => {
    if (!profileData) {
        const defaultFormData = JSON.parse(JSON.stringify(initialFormData));
        return {
            ...defaultFormData,
            email: user.email,
            name: user.user_metadata?.full_name || "",
            tutorId: `NEW-${Date.now().toString().slice(-4)}`
        };
    }

    // Populate education array
    const baseEducationFormStructure = JSON.parse(JSON.stringify(initialFormData.education));
    const populatedEducation = baseEducationFormStructure.map(formSlot => {
        if (formSlot.level === "Bachelors/Honors") {
            return {
                ...formSlot,
                institute: profileData.uni || "",
                result: profileData.uni_grade || "",
                curriculum: profileData.uni_curriculum || "",
                examDegree: profileData.uni_exam_degree || "",
                fromDate: profileData.uni_from_date || "",
                majorGroup: profileData.uni_major_group || "",
                toDate: profileData.uni_to_date || "",
                idCardNo: profileData.uni_id_card_no || "",
                yearOfPassing: profileData.uni_year_of_passing || "",
                currentInstitute: profileData.uni_currently_studying || false
            };
        } else if (formSlot.level === "Higher Secondary") {
            return {
                ...formSlot,
                institute: profileData.hsc_school || "",
                result: profileData.hsc_grade || ""
            };
        } else if (formSlot.level === "Secondary") {
            return {
                ...formSlot,
                institute: profileData.ssc_school || "",
                result: profileData.ssc_grade || ""
            };
        }
        return formSlot;
    });

    return {
        name: profileData.name || "",
        email: user.email || "",
        additionalNumber: profileData.phone || "",
        gender: profileData.gender || "",
        dateOfBirth: profileData.date_of_birth || "",
        religion: profileData.religion || "",
        nationalId: profileData.national_id_number || "",
        nationality: profileData.nationality || "",
        facebookProfile: profileData.facebook_profile_link || "",
        driveLink: profileData.drive_link || "",
        fathersName: profileData.fathers_name || "",
        fathersNumber: profileData.fathers_contact_number || "",
        mothersName: profileData.mothers_name || "",
        mothersNumber: profileData.mothers_contact_number || "",
        emergencyContact: profileData.emergency_contact_number || "",
        location: profileData.address || "",
        education: populatedEducation,
        tutoringMethod: profileData.tutoring_method || "",
        availableDays: profileData.available_days_text || "",
        availableTime: profileData.available_time || "",
        preferredLocations: parseAndJoin(profileData.preferred_areas),
        expectedSalary: profileData.expected_salary?.toString() || "",
        preferredClasses: parseAndJoin(profileData.preferred_classes),
        preferredSubjects: parseAndJoin(profileData.preferred_subjects),
        placeOfTutoring: profileData.place_of_tutoring || "",
        tutoringStyle: parseAndJoin(profileData.tutoring_style),
        totalExperience: profileData.experience_years ? `${profileData.experience_years} years` : "",
        tutorId: profileData.id || "N/A",
        profileImageUrl: profileData.photo || null,
        howDidYouKnow: profileData.how_did_you_know || "",
    };
};

/**
 * Get public URL for profile image
 */
export const getProfileImagePublicUrl = (photoPath) => {
    if (!photoPath) return null;
    
    const { data: urlData } = supabase.storage
        .from(SUPABASE_BUCKET_NAME)
        .getPublicUrl(photoPath);
    
    return urlData?.publicUrl || null;
};

/**
 * Upload profile image to storage
 */
export const uploadProfileImage = async (userId, file) => {
    try {
        const fileExt = file.name.split('.').pop();
        const newFileName = `${userId}/profile-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
            .from(SUPABASE_BUCKET_NAME)
            .upload(newFileName, file, {
                cacheControl: '3600',
                upsert: true
            });
        
        if (uploadError) throw uploadError;
        
        return newFileName;
    } catch (error) {
        console.error("MODEL: Error uploading image:", error);
        throw error;
    }
};

/**
 * Prepare data for Supabase upsert
 */
export const prepareDataForSupabase = (formData, userId) => {
    const experienceYears = formData.totalExperience 
        ? (parseInt(formData.totalExperience.match(/\d+/)?.[0], 10) || null) 
        : null;
    
    const eduArray = formData.education || [];
    const sscData = eduArray.find(edu => edu.level === "Secondary");
    const hscData = eduArray.find(edu => edu.level === "Higher Secondary");
    const uniData = eduArray.find(edu => edu.level === "Bachelors/Honors");

    const dataForSupabase = {
        user_id: userId,
        name: formData.name,
        phone: formData.additionalNumber,
        gender: formData.gender,
        date_of_birth: formData.dateOfBirth,
        religion: formData.religion,
        national_id_number: formData.nationalId,
        nationality: formData.nationality,
        facebook_profile_link: formData.facebookProfile,
        drive_link: formData.driveLink,
        fathers_name: formData.fathersName,
        fathers_contact_number: formData.fathersNumber,
        mothers_name: formData.mothersName,
        mothers_contact_number: formData.mothersNumber,
        emergency_contact_number: formData.emergencyContact,
        address: formData.location,
        ssc_school: sscData?.institute,
        ssc_grade: sscData?.result,
        hsc_school: hscData?.institute,
        hsc_grade: hscData?.result,
        uni: uniData?.institute,
        uni_grade: uniData?.result,
        uni_curriculum: uniData?.curriculum,
        uni_exam_degree: uniData?.examDegree,
        uni_from_date: uniData?.fromDate,
        uni_major_group: uniData?.majorGroup,
        uni_to_date: uniData?.toDate,
        uni_id_card_no: uniData?.idCardNo,
        uni_year_of_passing: uniData?.yearOfPassing,
        uni_currently_studying: uniData?.currentInstitute,
        qualification: uniData?.majorGroup,
        tutoring_method: formData.tutoringMethod,
        available_time: formData.availableTime,
        available_days_text: formData.availableDays,
        preferred_areas: formData.preferredLocations,
        expected_salary: formData.expectedSalary,
        preferred_classes: formData.preferredClasses,
        preferred_subjects: formData.preferredSubjects,
        place_of_tutoring: formData.placeOfTutoring,
        tutoring_style: formData.tutoringStyle,
        experience_years: experienceYears,
        photo: formData.profileImageUrl,
        how_did_you_know: formData.howDidYouKnow,
    };

    // Add ID if updating existing profile
    if (formData.tutorId && 
        formData.tutorId !== "N/A" && 
        !String(formData.tutorId).startsWith("NEW-")) {
        dataForSupabase.id = formData.tutorId;
    }

    // Convert empty strings to null
    Object.keys(dataForSupabase).forEach(key => {
        if (dataForSupabase[key] === "") {
            dataForSupabase[key] = null;
        }
    });

    return dataForSupabase;
};

/**
 * Save profile data to database
 */
export const saveProfileToDatabase = async (data) => {
    try {
        const { data: upsertedData, error: upsertError } = await supabase
            .from('tutor')
            .upsert(data, { onConflict: 'user_id' })
            .select()
            .single();

        if (upsertError) throw upsertError;

        return upsertedData;
    } catch (error) {
        console.error("MODEL: Error saving profile:", error);
        throw error;
    }
};

/**
 * Validate image file
 */
export const validateImageFile = (file) => {
    const MAX_SIZE = 512 * 1024; // 512KB
    
    if (file.size > MAX_SIZE) {
        return {
            valid: false,
            error: 'Image size should be less than 512KB.'
        };
    }
    
    return { valid: true };
};