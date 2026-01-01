import { supabase } from '../../supabase.js';

class LandingPageModel {
    async signInWithPassword(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            return { data, error };
        } catch (error) {
            return { data: null, error };
        }
    }

    async signOut() {
        return await supabase.auth.signOut();
    }
    // LandingPageModel.js
    async checkAdminStatus(email) {
        try {
            const { data, error } = await supabase
                .from('admin')
                .select('email')
                .eq('email', email)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows found"
                console.error("Error checking admin status:", error);
                return false;
            }
            return !!data; // Returns true if data exists, false otherwise
        } catch (err) {
            return false;
        }
    }
}

export default LandingPageModel;