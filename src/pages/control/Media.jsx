import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MediaView from '../view/MediaView';
import {
    getAuthUser,
    fetchMediaData,
    fetchMediaNotifications,
    signOut,
    computeDisplayName,
    fetchAdminRecommendations,
    updateSelectionStatus, // New Model function
} from '../model/MediaModel';

const initialMediaState = { 
    name: 'Loading...', 
    mediaId: null, 
    email: '', 
    profileImageUrl: '' 
};

const MediaController = () => {
    const navigate = useNavigate();
    const [mediaData, setMediaData] = useState(initialMediaState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
    const notificationPanelRef = useRef(null);

    // Admin Recommendation States
    const [adminRecommendations, setAdminRecommendations] = useState([]);
    const [isAdminLoading, setIsAdminLoading] = useState(false);

    // 1. Initial Auth + Profile Fetch
    useEffect(() => {
        let mounted = true;
        async function fetchData() {
            setLoading(true);
            try {
                const { user, error: authError } = await getAuthUser();
                if (authError || !user) {
                    if (mounted) navigate('/');
                    return;
                }
                const data = await fetchMediaData(user.id);
                if (mounted) {
                    const displayName = computeDisplayName(user.email, data.name);
                    setMediaData({
                        name: displayName,
                        mediaId: data.mediaId,
                        email: data.email,
                        profileImageUrl: data.profileImageUrl,
                    });
                }
            } catch (e) {
                if (mounted) setError(e.message || 'Failed to load dashboard');
            } finally {
                if (mounted) setLoading(false);
            }
        }
        fetchData();
        return () => { mounted = false; };
    }, [navigate]);

    // 2. Fetch Admin Recommendations
    useEffect(() => {
        let mounted = true;
        if (!mediaData.mediaId || mediaData.mediaId === 'N/A') return;

        async function loadAdminData() {
            setIsAdminLoading(true);
            try {
                const data = await fetchAdminRecommendations(mediaData.mediaId);
                if (mounted) setAdminRecommendations(data);
            } catch (e) {
                console.error("Failed to load recommendations:", e);
            } finally {
                if (mounted) setIsAdminLoading(false);
            }
        }
        loadAdminData();
        return () => { mounted = false; };
    }, [mediaData.mediaId]);

    // 3. Handle Tutor Selection (Update boolean to true)
    const handleSelectTutor = async (recId) => {
        try {
            await updateSelectionStatus(recId, true);
            // Local state update for instant UI feedback
            setAdminRecommendations(prev => 
                prev.map(rec => rec.id === recId ? { ...rec, tutor_selected: true } : rec)
            );
        } catch (err) {
            alert("Failed to confirm selection: " + err.message);
        }
    };

    // --- Notification & Auth Handlers ---
    const handleNotificationBellClick = useCallback(() => {
        setShowNotificationsPanel(prev => !prev);
        if (!showNotificationsPanel && unreadCount > 0 && mediaData.mediaId) {
            setUnreadCount(0); // Simple reset for UI
        }
    }, [showNotificationsPanel, unreadCount, mediaData.mediaId]);

    const handleSignOut = async () => {
        try { await signOut(); navigate('/'); } catch (e) { setError('Sign out failed'); }
    };

    const getFontSizeClass = (name) => {
        const length = name?.length || 0;
        if (length < 9) return 'text-3xl sm:text-4xl md:text-5xl';
        return 'text-xl sm:text-2xl md:text-3xl';
    };

    const profileImageFallback = `https://placehold.co/150x200/334155/f8fafc?text=${mediaData.name[0]}`;

    return (
        <MediaView
            mediaData={mediaData}
            loading={loading}
            error={error}
            notifications={notifications}
            unreadCount={unreadCount}
            showNotificationsPanel={showNotificationsPanel}
            notificationPanelRef={notificationPanelRef}
            onNotificationBellClick={handleNotificationBellClick}
            onSignOut={handleSignOut}
            getFontSizeClass={getFontSizeClass}
            profileImageFallback={profileImageFallback}
            // Admin Table Props
            adminRecommendations={adminRecommendations}
            isAdminLoading={isAdminLoading}
            onSelectTutor={handleSelectTutor}
        />
    );
};

export default MediaController;