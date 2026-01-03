import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import AdminPortalView from "../view/AdminPortalView";

const AdminPortal = () => {
    const navigate = useNavigate();
    
    // --- State Management ---
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('dashboard'); 
    const [mediaJobs, setMediaJobs] = useState([]);
    const [acceptedJobs, setAcceptedJobs] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [dues, setDues] = useState([]);
    const [mediaInterests, setMediaInterests] = useState([]); // interested_tutors_media
    const [tutorAcceptances, setTutorAcceptances] = useState([]); // recc_tutors_accepted
    const [selectedRequest, setSelectedRequest] = useState(null); 

    // --- 1. Security & Initialization ---
    useEffect(() => {
        const verifyAndFetch = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    navigate("/");
                    return;
                }

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
                
                // Fetch all system nodes simultaneously
                await Promise.all([
                    fetchMediaJobs(),
                    fetchAcceptedJobs(),
                    fetchComplaints(),
                    fetchDues(),
                    fetchMediaInterests(),
                    fetchTutorAcceptances()
                ]);
                
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
            .select(`id, created_at, job_description, media_id, media ( name )`)
            .order('created_at', { ascending: false });
        if (!error) setMediaJobs(data || []);
    };

    const fetchAcceptedJobs = async () => {
        const { data, error } = await supabase
            .from('accepted_jobs')
            .select(`job_id, tutor_id, guardian_id, comment, tutor ( name ), guardian ( name )`)
            .order('job_id', { ascending: false });
        if (!error) setAcceptedJobs(data || []);
    };

    const fetchComplaints = async () => {
        const { data, error } = await supabase
            .from('complaint')
            .select(`id, rating, complaint_text, created_at, job_id, tutor ( name ), guardian ( name )`)
            .order('created_at', { ascending: false });
        if (!error) setComplaints(data || []);
    };

    const fetchDues = async () => {
        const { data, error } = await supabase
            .from('dues')
            .select(`due_idd, amount, payment, payed_at, tutor:id ( name )`)
            .order('payed_at', { ascending: false });
        if (!error) setDues(data || []);
    };

    const fetchMediaInterests = async () => {
        const { data, error } = await supabase
            .from('interested_tutors_media')
            .select(`id, created_at, media_id, tutor_id, media ( name ), tutor ( name )`)
            .order('created_at', { ascending: false });
        if (!error) setMediaInterests(data || []);
    };

    const fetchTutorAcceptances = async () => {
        const { data, error } = await supabase
            .from('recc_tutors_accepted')
            .select(`id, created_at, guardian_id, tutor_id, accepted_status, guardian ( name ), tutor ( name )`)
            .order('created_at', { ascending: false });
        if (!error) setTutorAcceptances(data || []);
    };

    // --- 3. Action Logic ---
    const handleSendToMedia = async (tutorId, note) => {
        if (!tutorId) {
            alert("Please provide a Tutor ID");
            return;
        }
        try {
            const { error } = await supabase
                .from('admin_to_media')
                .insert([{
                    media_request_id: selectedRequest.id,
                    tutor_id: parseInt(tutorId),
                    admin_id: adminData.id,
                    admin_note: note,
                    tutor_selected: false 
                }]);
            if (error) throw error;
            alert(`Success! Tutor #${tutorId} recommended to ${selectedRequest.media?.name}`);
            setSelectedRequest(null); 
        } catch (error) {
            alert("Database Error: " + error.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center font-mono">
                <div className="text-green-500 animate-pulse tracking-[0.3em]">
                    {">"} SYNCHRONIZING_ALL_SYSTEM_NODES...
                </div>
            </div>
        );
    }

    return (
        <AdminPortalView 
            adminName={adminData?.name} 
            adminId={adminData?.id}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            mediaJobs={mediaJobs}
            acceptedJobs={acceptedJobs}
            complaints={complaints}
            dues={dues}
            mediaInterests={mediaInterests}
            tutorAcceptances={tutorAcceptances}
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
            onSendToMedia={handleSendToMedia}
        />
    );
};

export default AdminPortal;