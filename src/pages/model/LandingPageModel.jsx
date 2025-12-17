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
}

export default LandingPageModel;