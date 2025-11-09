
import { supabase } from '../supabase.js';

/**
 * Validate form fields. Returns { valid: boolean, errors: {...} }
 */
export function validateSignUpForm(formData, agreedToTerms) {
  const errors = {};
  if (!formData.name?.trim()) errors.name = "Name is required";
  if (!formData.email?.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
  if (!formData.phone?.trim()) errors.phone = "Phone number is required";
  if (!formData.gender) errors.gender = "Please select a gender";
  if (!formData.role) errors.role = "Please select your role (Guardian or Teacher)";
  if (!formData.password) errors.password = "Password is required";
  else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
  if (formData.confirmPassword !== formData.password) errors.confirmPassword = "Passwords do not match";
  if (!agreedToTerms) errors.terms = "You must agree to the terms and conditions";

  return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * Sign up user with Supabase, then create the corresponding profile row
 * in either 'tutor' or 'guardian' table.
 *
 * Returns { success: boolean, message: string, data?: any, error?: any }
 */
export async function signUpUserWithProfile(formData) {
  try {
    const userMetaData = {
      full_name: formData.name,
      phone: formData.phone,
      city: formData.city,
      user_role: formData.role,
    };

    const { data, error: signUpAuthError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: userMetaData },
    });

    if (signUpAuthError) {
      return { success: false, message: signUpAuthError.message, error: signUpAuthError };
    }

    // If signup returned a user (most cases), attempt to create profile rows
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
      if (formData.role === 'teacher') {
        const { error } = await supabase.from('tutor').insert([{ ...baseProfileData, gender: formData.gender }]);
        if (error) profileCreationError = error;
      } else if (formData.role === 'guardian') {
        const { error } = await supabase.from('guardian').insert([baseProfileData]);
        if (error) profileCreationError = error;
      }

      if (profileCreationError) {
        return {
          success: true,
          message: `Account created, but failed to set up profile: ${profileCreationError.message}`,
          data,
          error: profileCreationError
        };
      }

      // Determine if user needs email confirmation
      const requiresConfirmation = !data.session;
      if (requiresConfirmation) {
        return { success: true, message: "Sign up successful! Please check your email to verify your account.", data };
      } else {
        return { success: true, message: "Sign up successful! You should be logged in.", data };
      }
    }

    // Fallback: no data.user present
    return { success: true, message: "Sign up process initiated. Please check for a confirmation email.", data };
  } catch (err) {
    return { success: false, message: "An unexpected error occurred during sign up.", error: err };
  }
}
