
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TutorView from '../views/TutorView';
import {
  getAuthUser,
  fetchTutorProfileByUserId,
  getPublicUrlForPhoto,
  fetchAcceptedJobsNotifications,
  signOut,
  computeDisplayName,
} from '../models/TutorModel';

const initialTutorState = { name: 'Loading...', tutorId: null, profileImageUrl: '' };

export default function TutorController() {
  const navigate = useNavigate();
  const [tutorData, setTutorData] = useState(initialTutorState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);

  const notificationPanelRef = useRef(null);

  // fetch auth + profile
  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      setLoading(true);
      setError(null);
      setTutorData(initialTutorState);

      try {
        const { user, error: authError } = await getAuthUser();
        if (authError || !user) {
          if (mounted) {
            setError('Authentication error. Please log in again.');
            navigate('/');
            setLoading(false);
          }
          return;
        }

        const { profile, error: profileError } = await fetchTutorProfileByUserId(user.id);
        if (profileError) {
          // handle "not found" gracefully
          if (profileError?.code === 'PGRST116') {
            if (mounted) setError('Tutor profile not found. Please complete your profile.');
            setTutorData(prev => ({ ...prev, name: user.email?.split('@')[0] || 'User', tutorId: null }));
          } else {
            throw profileError;
          }
        } else if (profile) {
          const imageUrl = getPublicUrlForPhoto(profile.photo);
          const displayName = computeDisplayName(user.email, profile.name);

          if (mounted) setTutorData({ name: displayName, tutorId: profile.id, profileImageUrl: imageUrl });
        } else {
          if (mounted) {
            setError('Tutor profile data is missing.');
            setTutorData(prev => ({ ...prev, name: user.email?.split('@')[0] || 'User', tutorId: null }));
          }
        }
      } catch (e) {
        console.error('fetchData: General error:', e);
        if (mounted) {
          setError(`Failed to load dashboard data: ${e.message}`);
          setTutorData(prev => ({ ...prev, name: 'Error Loading', tutorId: null }));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    return () => { mounted = false; };
  }, [navigate]);

  // fetch notifications when we have a tutorId
  useEffect(() => {
    let mounted = true;
    if (!tutorData.tutorId) {
      if (tutorData.name !== 'Loading...') setLoading(false);
      return;
    }

    async function loadNotifications() {
      if (!loading) setLoading(true);
      try {
        const { notifications: fetchedNotifications, error: notifError } = await fetchAcceptedJobsNotifications(tutorData.tutorId);
        if (notifError) throw notifError;

        // merge read state from localStorage
        const seenNotificationIds = JSON.parse(localStorage.getItem(`seenTutorNotifications_${tutorData.tutorId}`)) || [];
        const merged = (fetchedNotifications || []).map(n => ({ ...n, isRead: seenNotificationIds.includes(n.id) }));

        if (mounted) {
          setNotifications(merged);
          setUnreadCount(merged.filter(n => !n.isRead).length);
        }
      } catch (e) {
        console.error('fetchNotifications: Exception:', e);
        if (mounted) {
          setError(prev => prev || 'Failed to process notifications.');
          setNotifications([]);
          setUnreadCount(0);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadNotifications();
    return () => { mounted = false; };
  }, [tutorData.tutorId]);

  // click outside to close notification panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      const bellButton = document.getElementById('notification-bell-button');
      if (notificationPanelRef.current &&
        !notificationPanelRef.current.contains(event.target) &&
        !(bellButton && bellButton.contains(event.target))) {
        setShowNotificationsPanel(false);
      }
    };

    if (showNotificationsPanel) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotificationsPanel]);

  const handleNotificationBellClick = useCallback(() => {
    setShowNotificationsPanel(prev => !prev);

    // mark as read when opening
    if (!showNotificationsPanel && unreadCount > 0 && tutorData.tutorId) {
      const idsToMark = notifications.filter(n => !n.isRead).map(n => n.id);
      if (idsToMark.length > 0) {
        const currentSeen = JSON.parse(localStorage.getItem(`seenTutorNotifications_${tutorData.tutorId}`)) || [];
        const updatedSeen = [...new Set([...currentSeen, ...idsToMark])];
        localStorage.setItem(`seenTutorNotifications_${tutorData.tutorId}`, JSON.stringify(updatedSeen));
        setNotifications(prev => prev.map(n => idsToMark.includes(n.id) ? { ...n, isRead: true } : n));
      }
      setUnreadCount(0);
    }
  }, [notifications, showNotificationsPanel, unreadCount, tutorData.tutorId]);

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

  const getFontSizeClass = (name) => {
    const length = name?.length || 0;
    if (length < 9) return 'text-3xl sm:text-4xl md:text-5xl';
    if (length < 12) return 'text-2xl sm:text-3xl md:text-4xl';
    return 'text-xl sm:text-2xl md:text-3xl';
  };

  const profileImageFallback = 'https://placehold.co/150x200/6344cc/FFF?text=' +
    (tutorData.name && tutorData.name !== 'Loading...' ? tutorData.name.split(' ').map(n => n[0]).join('') : 'T');

  return (
    <TutorView
      tutorData={tutorData}
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
}
