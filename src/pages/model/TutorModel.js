
import { supabase } from '../supabase.js';

/**
 * Fetch authenticated user.
 * Returns { user, error }
 */
export async function getAuthUser() {
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user ?? null, error };
}

/**
 * Fetch tutor profile by user_id.
 * Returns { profile, error }
 */
export async function fetchTutorProfileByUserId(userId) {
  const { data, error } = await supabase
    .from('tutor')
    .select('id, name, photo')
    .eq('user_id', userId)
    .single();
  return { profile: data ?? null, error };
}

/**
 * Get a public URL for a photo path stored in 'photo' bucket.
 * Returns string publicUrl ('' if none)
 */
export function getPublicUrlForPhoto(path) {
  if (!path) return '';
  const { data: publicUrlData } = supabase.storage.from('photo').getPublicUrl(path);
  return publicUrlData?.publicUrl ?? '';
}

/**
 * Fetch accepted jobs for given tutorId and map them to notification objects.
 * Returns { notifications, error }
 *
 * Note: notifications will have shape:
 *  { id: string, jobId: number, guardianId: number, message: string, timestamp: ISOString }
 */
export async function fetchAcceptedJobsNotifications(tutorId) {
  if (!tutorId) return { notifications: [], error: null };
  const { data: acceptedJobs, error } = await supabase
    .from('accepted_jobs')
    .select('job_id, guardian_id')
    .eq('tutor_id', tutorId);

  if (error) return { notifications: [], error };

  const notifications = (acceptedJobs || []).map(jobEntry => ({
    id: jobEntry.job_id.toString(),
    jobId: jobEntry.job_id,
    guardianId: jobEntry.guardian_id,
    message: `Congratulations! You've been selected for JOB : ${jobEntry.job_id} by Guardian : ${jobEntry.guardian_id}. We will directly contact you soon for a trial class.`,
    timestamp: new Date().toISOString(),
  }));

  return { notifications, error: null };
}

/**
 * Sign out helper
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return error;
}

/**
 * Pick a display name from profile name/email, excluding some prefixes.
 */
export function computeDisplayName(userEmail, profileName) {
  let displayName = userEmail?.split('@')[0] || 'User';
  if (!profileName) return displayName;

  const exclusionList = ['md', 'md.'];
  const nameParts = profileName
    .split(' ')
    .filter(p => p.length > 0)
    .filter(p => !exclusionList.includes(p.toLowerCase()));

  if (nameParts.length > 0) {
    // pick shortest meaningful part (like your original logic)
    displayName = nameParts.reduce((shortest, current) =>
      current.length < shortest.length ? current : shortest, nameParts[0]);
  }

  return displayName;
}
