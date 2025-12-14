// TutorProfileModel.js
import { supabase } from '../../supabase.js';

export const emptyTutorData = {
    name: "Loading...",
    email: "...",
    additionalNumber: "",
    gender: "...",
    dateOfBirth: "",
    religion: "",
    nationalId: "",
    nationality: "",
    facebookProfile: null,
    driveLink: null,
    fathersName: "",
    fathersNumber: "",
    mothersName: "",
    mothersNumber: "",
    emergencyContact: "",
    sscSchool: "",
    sscGrade: "",
    hscSchool: "",
    hscGrade: "",
    uniSchool: "",
    uniGrade: "",
    uniCurriculum: "",
    uniExamDegree: "",
    uniFromDate: "",
    uniMajorGroup: "",
    uniToDate: "",
    uniIdCardNo: "",
    uniYearOfPassing: "",
    uniCurrentlyStudying: false,
    tutoringMethod: "...",
    availableDays: [],
    availableTime: "...",
    location: "...",
    preferredLocations: [],
    expectedSalary: "...",
    preferredClasses: [],
    preferredSubjects: [],
    placeOfTutoring: "...",
    tutoringStyle: [],
    totalExperience: "...",
    tutorId: "...",
    profileImageUrl: null,
    profileCompletion: 0,
};

export const parseArrayStringFromDB = (value) => {
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value === 'string') {
        let sanitizedString = value.trim();
        if (sanitizedString.startsWith('{') && sanitizedString.endsWith('}')) {
            sanitizedString = sanitizedString.slice(1, -1);
        }
        const arr = sanitizedString.split(',')
            .map(item => item.trim())
            .filter(item => item !== "");
        return arr.length > 0 ? arr : [];
    }
    return [];
};

export const calculateProfileCompletion = (data) => {
    let completedFields = 0;
    const totalFieldsToConsider = 22;

    if (data.name && data.name !== "Loading...") completedFields++;
    if (data.email && data.email !== "...") completedFields++;
    if (data.additionalNumber) completedFields++;
    if (data.gender && data.gender !== "...") completedFields++;
    if (data.dateOfBirth) completedFields++;
    if (data.nationalId) completedFields++;
    if (data.uniSchool) completedFields++;
    if (data.uniExamDegree) completedFields++;
    if (data.uniGrade) completedFields++;
    if (data.sscSchool) completedFields++;
    if (data.hscSchool) completedFields++;
    if (data.tutoringMethod && data.tutoringMethod !== "...") completedFields++;
    if (data.location && data.location !== "...") completedFields++;
    if (data.preferredLocations?.length > 0) completedFields++;
    if (data.expectedSalary && data.expectedSalary !== "...") completedFields++;
    if (data.preferredClasses?.length > 0) completedFields++;
    if (data.preferredSubjects?.length > 0) completedFields++;
    if (data.profileImageUrl) completedFields++;
    if (data.driveLink) completedFields++;
    if (data.totalExperience && data.totalExperience !== "...") completedFields++;
    if (data.facebookProfile) completedFields++;

    return Math.min(100, Math.round((completedFields / totalFieldsToConsider) * 100));
};

export const fetchTutorProfile = async (userId) => {
    console.log("TUTOR PROFILE MODEL: Fetching profile for user ID:", userId);

    try {
        const { data: profile, error: profileError } = await supabase
            .from('tutor')
            .select(`
                id, name, email, phone, gender, photo, experience_years,
                expected_salary, address, 
                preferred_subjects, preferred_areas, preferred_classes, tutoring_style,
                user_id,
                date_of_birth, religion, national_id_number, nationality, facebook_profile_link,
                drive_link, fathers_name, fathers_contact_number, mothers_name, mothers_contact_number,
                emergency_contact_number, tutoring_method, available_time,
                place_of_tutoring,
                ssc_school, ssc_grade, hsc_school, hsc_grade, uni, uni_grade,
                uni_curriculum, uni_exam_degree, uni_from_date, uni_major_group,
                uni_to_date, uni_id_card_no, uni_year_of_passing, uni_currently_studying
            `)
            .eq('user_id', userId)
            .single();

        console.log("TUTOR PROFILE MODEL: Raw profile response:", JSON.stringify(profile, null, 2));
        console.log("TUTOR PROFILE MODEL: Profile error:", profileError);

        if (profileError && profileError.code !== 'PGRST116') {
            throw new Error(profileError.message || "Failed to load profile due to a database error.");
        }

        return { profile, error: profileError };
    } catch (err) {
        console.error("TUTOR PROFILE MODEL: Error fetching profile:", err);
        throw err;
    }
};

export const getAuthenticatedUser = async () => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
        console.error("TUTOR PROFILE MODEL: Auth error:", authError);
        throw new Error("Authentication error.");
    }
    
    if (!user) {
        throw new Error("No authenticated user found.");
    }
    
    console.log("TUTOR PROFILE MODEL: Authenticated user ID:", user.id);
    return user;
};

export const processProfileData = (profile, user) => {
    const baseDefaults = JSON.parse(JSON.stringify(emptyTutorData));

    if (!profile) {
        return {
            ...baseDefaults,
            name: user.email?.split('@')[0] || "User",
            email: user.email || "N/A",
            tutorId: "N/A"
        };
    }

    console.log("TUTOR PROFILE MODEL: Processing profile data");
    console.log("DB ssc_school:", profile.ssc_school);
    console.log("DB uni (for uniSchool):", profile.uni);

    let imageUrl = profile.photo || null;
    if (profile.photo && !profile.photo.startsWith('http') && !profile.photo.startsWith('blob:')) {
        const { data: publicUrlData } = supabase.storage.from('photo').getPublicUrl(profile.photo);
        imageUrl = publicUrlData?.publicUrl || profile.photo;
    }

    const processedData = {
        ...baseDefaults,
        name: profile.name || "",
        email: profile.email || user.email || "",
        additionalNumber: profile.phone || "",
        gender: profile.gender || "",
        dateOfBirth: profile.date_of_birth || "",
        religion: profile.religion || "",
        nationalId: profile.national_id_number || "",
        nationality: profile.nationality || "",
        facebookProfile: profile.facebook_profile_link || null,
        driveLink: profile.drive_link || null,
        fathersName: profile.fathers_name || "",
        fathersNumber: profile.fathers_contact_number || "",
        mothersName: profile.mothers_name || "",
        mothersNumber: profile.mothers_contact_number || "",
        emergencyContact: profile.emergency_contact_number || "",
        tutoringMethod: profile.tutoring_method || "",
        availableDays: parseArrayStringFromDB(profile.available_days_text),
        availableTime: profile.available_time || "",
        location: profile.address || "",
        preferredLocations: parseArrayStringFromDB(profile.preferred_areas),
        expectedSalary: profile.expected_salary?.toString() || "",
        preferredClasses: parseArrayStringFromDB(profile.preferred_classes),
        preferredSubjects: parseArrayStringFromDB(profile.preferred_subjects),
        placeOfTutoring: profile.place_of_tutoring || "",
        tutoringStyle: parseArrayStringFromDB(profile.tutoring_style),
        totalExperience: profile.experience_years ? `${profile.experience_years} years` : "N/A",
        tutorId: profile.id?.toString() || "N/A",
        profileImageUrl: imageUrl,
        sscSchool: profile.ssc_school || "",
        sscGrade: profile.ssc_grade || "",
        hscSchool: profile.hsc_school || "",
        hscGrade: profile.hsc_grade || "",
        uniSchool: profile.uni || "",
        uniGrade: profile.uni_grade || "",
        uniCurriculum: profile.uni_curriculum || "",
        uniExamDegree: profile.uni_exam_degree || "",
        uniFromDate: profile.uni_from_date || "",
        uniMajorGroup: profile.uni_major_group || "",
        uniToDate: profile.uni_to_date || "",
        uniIdCardNo: profile.uni_id_card_no || "",
        uniYearOfPassing: profile.uni_year_of_passing || "",
        uniCurrentlyStudying: profile.uni_currently_studying || false,
    };

    processedData.profileCompletion = calculateProfileCompletion(processedData);
    
    console.log("TUTOR PROFILE MODEL: Processed data:", processedData);
    return processedData;
};