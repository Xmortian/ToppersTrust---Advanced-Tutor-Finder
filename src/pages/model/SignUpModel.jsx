import { supabase } from '../../supabase.js';


export function validateSignUpForm(formData, agreedToTerms) {
    const errors = {};
    if (!formData.name?.trim()) errors.name = 'Name is required';
    if (!formData.email?.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone?.trim()) errors.phone = 'Phone number is required';
    // Gender is not required for all roles, only for 'teacher' (tutor profile)
    if (formData.role === 'teacher' && !formData.gender) errors.gender = 'Please select a gender';
    
    // Updated role validation to include 'media'
    const validRoles = ['guardian', 'teacher', 'media'];
    if (!formData.role || !validRoles.includes(formData.role)) {
        errors.role = 'Please select your role (Guardian, Teacher, or Media)';
    }

    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (formData.confirmPassword !== formData.password) errors.confirmPassword = 'Passwords do not match';
    if (!agreedToTerms) errors.terms = 'You must agree to the terms and conditions';

    return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * Sign up user with Supabase, then create profile row
 * Returns { success: boolean, message: string, data?, error? }
 */
export async function signUpUserWithProfile(formData) {
    try {
        const userMetaData = {
            full_name: formData.name,
            phone: formData.phone,
            city: formData.city,
            user_role: formData.role,
        };

        // Supabase v2 auth.signUp shape with options.data
        const { data, error: signUpAuthError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: { data: userMetaData },
        });

        if (signUpAuthError) {
            return { success: false, message: signUpAuthError.message, error: signUpAuthError };
        }

        if (data?.user) {
            const userId = data.user.id;
            const baseProfileData = {
                user_id: userId,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                address: formData.location || null,
            };

            let profileCreationError = null;
            let tableName = '';

            if (formData.role === 'teacher') {
                tableName = 'tutor';
                const { error } = await supabase.from(tableName).insert([{ ...baseProfileData, gender: formData.gender }]);
                if (error) profileCreationError = error;
            } else if (formData.role === 'guardian') {
                tableName = 'guardian';
                const { error } = await supabase.from(tableName).insert([baseProfileData]);
                if (error) profileCreationError = error;
            } else if (formData.role === 'media') {
                // *** UPDATED: Using 'media' table name as confirmed by user ***
                tableName = 'media'; 
                const { error } = await supabase.from(tableName).insert([baseProfileData]);
                if (error) profileCreationError = error;
            }

            if (profileCreationError) {
                // IMPORTANT: We return success: true because the user account (auth) was created successfully.
                return {
                    success: true,
                    message: `Account created, but failed to set up ${tableName} profile: ${profileCreationError.message}. Contact support.`,
                    data,
                    error: profileCreationError,
                };
            }

            const requiresConfirmation = !data.session;
            if (requiresConfirmation) {
                return { success: true, message: 'Sign up successful! Please check your email to verify your account.', data };
            } else {
                return { success: true, message: 'Sign up successful! You should be logged in.', data };
            }
        }

        return { success: true, message: 'Sign up process initiated. Please check for a confirmation email.', data };
    } catch (err) {
        return { success: false, message: 'An unexpected error occurred during sign up.', error: err };
    }
}