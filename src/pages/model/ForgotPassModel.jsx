import { supabase } from '../../supabase.js';

/**
 * ForgotPassModel - Handles all data operations for password reset
 */
export class ForgotPassModel {
    /**
     * Send password reset email to the user
     * @param {string} email - User's email address
     * @returns {Promise<{success: boolean, message: string}>}
     */
    static async sendPasswordResetEmail(email) {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/update-password`,
            });

            if (error) {
                console.error("Password reset error:", error);
                return {
                    success: false,
                    message: `Error sending reset link: ${error.message}`
                };
            }

            return {
                success: true,
                message: "Password reset link sent! Please check your email (including spam folder)."
            };
        } catch (error) {
            console.error("Unexpected error:", error);
            return {
                success: false,
                message: "An unexpected error occurred. Please try again."
            };
        }
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean}
     */
    static validateEmail(email) {
        return email && email.trim().length > 0;
    }
}
