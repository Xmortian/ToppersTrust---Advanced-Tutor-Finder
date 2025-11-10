import { supabase } from '../../supabase.js';

class ResetPassModel {
    async updateUserPassword(newPassword) {
        try {
            const { data, error } = await supabase.auth.updateUser({
                password: newPassword,
            });
            return { data, error };
        } catch (error) {
            return { data: null, error };
        }
    }

    setupAuthListener(callback) {
        return supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "PASSWORD_RECOVERY") {
                callback(event, session);
            }
        });
    }
}

export default ResetPassModel;