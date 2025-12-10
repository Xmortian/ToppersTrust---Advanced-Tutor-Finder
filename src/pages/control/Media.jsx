import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MediaView from '../view/MediaView';
import {
    getAuthUser,
    fetchMediaData,
    fetchMediaNotifications,
    signOut,
    computeDisplayName,
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

    // Fetch auth + profile
    useEffect(() => {
        let mounted = true;

        async function fetchData() {
            setLoading(true);
            setError(null);
            setMediaData(initialMediaState);

            try {
                // 1. Get authenticated user
                const { user, error: authError } = await getAuthUser();
                if (authError || !user) {
                    if (mounted) {
                        setError('Authentication error. Please log in again.');
                        navigate('/');
                        setLoading(false);
                    }
                    return;
                }

                // 2. Fetch media profile using user.id
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
                console.error('fetchData: General error:', e);
                if (mounted) {
                    setError(e.message || 'Failed to load dashboard data');
                    setMediaData(prev => ({ 
                        ...prev, 
                        name: 'Error Loading', 
                        mediaId: null 
                    }));
                }
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchData();
        return () => { mounted = false; };
    }, [navigate]);

    // Fetch notifications when we have a mediaId
    useEffect(() => {
        let mounted = true;
        
        if (!mediaData.mediaId) {
            if (mediaData.name !== 'Loading...') setLoading(false);
            return;
        }

        async function loadNotifications() {
            try {
                const fetchedNotifications = await fetchMediaNotifications(mediaData.mediaId);
                
                // Merge read state from localStorage
                const seenNotificationIds = JSON.parse(
                    localStorage.getItem(`seenMediaNotifications_${mediaData.mediaId}`)
                ) || [];
                
                const merged = (fetchedNotifications || []).map(n => ({
                    ...n,
                    isRead: seenNotificationIds.includes(n.id)
                }));

                if (mounted) {
                    setNotifications(merged);
                    setUnreadCount(merged.filter(n => !n.isRead).length);
                }
            } catch (e) {
                console.error('fetchNotifications: Exception:', e);
                if (mounted) {
                    setError(prev => prev || 'Failed to load notifications.');
                    setNotifications([]);
                    setUnreadCount(0);
                }
            }
        }

        loadNotifications();
        return () => { mounted = false; };
    }, [mediaData.mediaId]);

    // Click outside to close notification panel
    useEffect(() => {
        const handleClickOutside = (event) => {
            const bellButton = document.getElementById('notification-bell-button');
            if (
                notificationPanelRef.current &&
                !notificationPanelRef.current.contains(event.target) &&
                !(bellButton && bellButton.contains(event.target))
            ) {
                setShowNotificationsPanel(false);
            }
        };

        if (showNotificationsPanel) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showNotificationsPanel]);

    // Handle notification bell click
    const handleNotificationBellClick = useCallback(() => {
        setShowNotificationsPanel(prev => !prev);

        // Mark as read when opening
        if (!showNotificationsPanel && unreadCount > 0 && mediaData.mediaId) {
            const idsToMark = notifications.filter(n => !n.isRead).map(n => n.id);
            if (idsToMark.length > 0) {
                const currentSeen = JSON.parse(
                    localStorage.getItem(`seenMediaNotifications_${mediaData.mediaId}`)
                ) || [];
                const updatedSeen = [...new Set([...currentSeen, ...idsToMark])];
                localStorage.setItem(
                    `seenMediaNotifications_${mediaData.mediaId}`,
                    JSON.stringify(updatedSeen)
                );
                setNotifications(prev =>
                    prev.map(n => (idsToMark.includes(n.id) ? { ...n, isRead: true } : n))
                );
            }
            setUnreadCount(0);
        }
    }, [notifications, showNotificationsPanel, unreadCount, mediaData.mediaId]);

    // Handle sign out
    const handleSignOut = async () => {
        setError(null);
        try {
            const signOutError = await signOut();
            if (signOutError) throw signOutError;
            navigate('/');
        } catch (e) {
            console.error('Sign out error:', e);
            setError('Failed to sign out. Please try again.');
        }
    };

    // Function to determine text size based on name length
    const getFontSizeClass = useCallback((name) => {
        const length = name?.length || 0;
        if (length < 9) return 'text-3xl sm:text-4xl md:text-5xl';
        if (length < 12) return 'text-2xl sm:text-3xl md:text-4xl';
        return 'text-xl sm:text-2xl md:text-3xl';
    }, []);

    // Profile image fallback
    const profileImageFallback = 
        'https://placehold.co/150x200/4c0519/fecaca?text=' +
        (mediaData.name && mediaData.name !== 'Loading...' 
            ? mediaData.name.split(' ').map(n => n[0]).join('') 
            : 'M');

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
        />
    );
};

export default MediaController;