import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import AdminPortalView from "../view/AdminPortalView";

const AdminPortal = () => {
    const navigate = useNavigate();
    
    // --- State Management ---
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('dashboard'); // 'dashboard' or 'media'
    const [mediaJobs, setMediaJobs] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null); // The specific job admin is replying to

    // --- 1. Security & Initialization ---
    useEffect(() => {
        const verifyAndFetch = async () => {
            try {
                // Get current session user
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    navigate("/");
                    return;
                }

                // Verify user exists in the admin table
                const { data: admin, error: adminError } = await supabase
                    .from('admin')
                    .select('id, name, email')
                    .eq('email', user.email)
                    .single();

                if (adminError || !admin) {
                    console.error("Unauthorized: Not an admin");
                    navigate("/");
                    return;
                }

                setAdminData(admin);
                
                // If verified, fetch the media requests immediately
                await fetchMediaJobs();
                
            } catch (err) {
                console.error("System error during admin verification:", err);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        verifyAndFetch();
    }, [navigate]);

    // --- 2. Data Fetching ---
    const fetchMediaJobs = async () => {
        const { data, error } = await supabase
            .from('media_to_admin')
            .select(`
                id, 
                created_at, 
                job_description, 
                media_id,
                media ( name )
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching media jobs:", error);
        } else {
            setMediaJobs(data || []);
        }
    };

    // --- 3. Action Logic: Send Tutor to Media ---
    const handleSendToMedia = async (tutorId, note) => {
        if (!tutorId) {
            alert("Please provide a Tutor ID");
            return;
        }

        try {
            // We use the adminData.id we fetched during verification
            const { error } = await supabase
                .from('admin_to_media')
                .insert([{
                    media_request_id: selectedRequest.id,
                    tutor_id: parseInt(tutorId),
                    admin_id: adminData.id,
                    admin_note: note,
                    tutor_selected: false // Default state
                }]);

            if (error) throw error;

            alert(`Success! Tutor #${tutorId} recommended to ${selectedRequest.media?.name}`);
            
            // Reset UI state
            setSelectedRequest(null); 
            
        } catch (error) {
            console.error("Error inserting into admin_to_media:", error.message);
            alert("Database Error: " + error.message);
        }
    };

    // --- 4. Render Logic ---
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-blue-400 font-mono animate-pulse">
                    VERIFYING ADMIN CREDENTIALS...
                </div>
            </div>
        );
    }

    return (
        <AdminPortalView 
            adminName={adminData?.name} 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            mediaJobs={mediaJobs}
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
            onSendToMedia={handleSendToMedia}
        />
    );
};

export default AdminPortal;